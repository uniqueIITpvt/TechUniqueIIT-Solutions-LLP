const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('../models/contactModel');

const ensureDatabaseConnection = (res) => {
  if (mongoose.connection.readyState === 1) return true;

  res.status(503).json({
    success: false,
    message: 'Message service is temporarily unavailable. Please try again later.',
  });
  return false;
};

const cleanString = (value) =>
  typeof value === 'string' ? value.trim() : '';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[\x22]/g, '&quot;')
    .replace(/'/g, '&#039;');

const createTransporter = () => {
  const requiredVariables = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_FROM',
  ];
  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    throw new Error('SMTP service is not configured');
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('SMTP port is invalid');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// @desc    Save a public contact query
// @route   POST /api/contact
// @access  Public
exports.createContactQuery = asyncHandler(async (req, res) => {
  if (!ensureDatabaseConnection(res)) return;

  const payload = {
    firstName: cleanString(req.body.firstName),
    lastName: cleanString(req.body.lastName),
    email: cleanString(req.body.email).toLowerCase(),
    countryCode: cleanString(req.body.countryCode),
    phone: cleanString(req.body.phone),
    message: cleanString(req.body.message),
  };

  if (!payload.firstName || !payload.email || !payload.phone || !payload.message) {
    return res.status(400).json({
      success: false,
      message: 'First name, email, phone, and message are required',
    });
  }

  const contact = await Contact.create(payload);

  res.status(201).json({
    success: true,
    message: 'Message received successfully',
    data: {
      id: contact._id,
      status: contact.status,
      createdAt: contact.createdAt,
    },
  });
});

// @desc    Get paginated contact queries
// @route   GET /api/contact
// @access  Private/Admin
exports.getContactQueries = asyncHandler(async (req, res) => {
  if (!ensureDatabaseConnection(res)) return;

  const requestedPage = Number.parseInt(req.query.page, 10);
  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 100)
      : 20;
  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('replies.sentBy', 'name email')
      .lean(),
    Contact.countDocuments(),
  ]);

  res.json({
    success: true,
    data: contacts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

// @desc    Get one contact query
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContactQuery = asyncHandler(async (req, res) => {
  if (!ensureDatabaseConnection(res)) return;

  const contact = await Contact.findById(req.params.id).populate(
    'replies.sentBy',
    'name email'
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found',
    });
  }

  res.json({ success: true, data: contact });
});

// @desc    Reply to a contact query by email
// @route   POST /api/contact/:id/reply
// @access  Private/Admin
exports.replyToContactQuery = asyncHandler(async (req, res) => {
  if (!ensureDatabaseConnection(res)) return;

  const body = cleanString(req.body.message);
  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'Reply message is required',
    });
  }

  if (body.length > 10000) {
    return res.status(400).json({
      success: false,
      message: 'Reply message is too long',
    });
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found',
    });
  }

  contact.replies.push({
    body,
    sentBy: req.user._id,
    deliveryStatus: 'pending',
  });
  await contact.save();

  const reply = contact.replies[contact.replies.length - 1];

  try {
    const transporter = createTransporter();
    const fullName = `${contact.firstName} ${contact.lastName}`.trim();
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: contact.email,
      subject: 'Re: Your query to TechUniqueIIT',
      text: `Hello ${fullName},\n\n${body}\n\n---\nYour original message:\n${contact.message}`,
      html: `
        <p>Hello ${escapeHtml(fullName)},</p>
        <p>${escapeHtml(body).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Your original message:</strong></p>
        <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
      `,
    });

    reply.deliveryStatus = 'sent';
    reply.sentAt = new Date();
    reply.emailMessageId = info.messageId || '';
    reply.deliveryError = '';
    contact.status = 'replied';
    await contact.save();
  } catch (error) {
    reply.deliveryStatus = 'failed';
    reply.deliveryError = error.message || 'Email delivery failed';
    await contact.save();

    return res.status(502).json({
      success: false,
      message: 'Reply was saved, but the email could not be delivered',
      data: reply,
    });
  }

  await contact.populate('replies.sentBy', 'name email');

  res.json({
    success: true,
    message: 'Reply sent successfully',
    data: contact,
  });
});
