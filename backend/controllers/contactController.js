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

const formatMultilineHtml = (value) =>
  escapeHtml(value).replace(/\r\n|\r|\n/g, '<br>');

const buildReplyEmailText = ({ fullName, replyMessage, originalMessage }) =>
  [
    `Hello ${fullName || 'there'},`,
    '',
    replyMessage,
    '',
    'Thank you,',
    'TechUniqueIIT Solutions',
    '',
    'Your original message:',
    originalMessage,
  ].join('\n');

const buildReplyEmailHtml = ({ fullName, replyMessage, originalMessage }) => {
  const safeName = escapeHtml(fullName || 'there');
  const safeReply = formatMultilineHtml(replyMessage);
  const safeOriginal = formatMultilineHtml(originalMessage);
  const siteUrl = (
    process.env.FRONTEND_URL ||
    process.env.CLIENT_URL ||
    process.env.SITE_URL ||
    'https://tech-unique-iit-solutions-llp-front.vercel.app'
  ).replace(/\/$/, '');
  const logoUrl =
    process.env.MAIL_LOGO_URL ||
    'https://res.cloudinary.com/techuniqueiit/image/upload/c_fit,q_auto,w_220/v1784029741/techuniqueiit/email/reply-email-logo-220.png';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Response from TechUniqueIIT Solutions</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,Helvetica,sans-serif;color:#555555;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;padding:0;background:#f7f7f7;">
      <tr>
        <td align="center" style="padding:50px 16px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:820px;background:#ffffff;border:1px solid #dddddd;border-top:8px solid #2f314f;">
            <tr>
              <td align="center" style="padding:72px 52px 28px;">
                <img src="${logoUrl}" width="220" alt="TechUniqueIIT Solutions" style="display:block;border:0;outline:none;text-decoration:none;width:220px;max-width:220px;height:auto;margin:0 auto 42px;">
                <h1 style="margin:0;color:#555555;font-size:42px;line-height:1.2;font-weight:700;letter-spacing:0;">Response from TechUniqueIIT</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:46px 52px 30px;">
                <p style="margin:0 0 34px;color:#555555;font-size:24px;line-height:1.45;font-weight:400;">Hello ${safeName}!</p>
                <p style="margin:0 0 18px;color:#555555;font-size:24px;line-height:1.45;font-weight:400;">Thank you for contacting TechUniqueIIT Solutions. Our team has replied to your query:</p>
                <div style="margin:0;color:#555555;font-size:21px;line-height:1.55;font-weight:400;">${safeReply}</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 52px 54px;">
                <a href="${siteUrl}" style="display:inline-block;background:#3164ef;color:#ffffff;text-decoration:none;border-radius:4px;padding:20px 46px;font-size:22px;line-height:1.2;font-weight:400;">Visit Our Website</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 52px 42px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-left:4px solid #3164ef;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <p style="margin:0 0 10px;color:#555555;font-size:18px;line-height:1.45;font-weight:700;">Your original message:</p>
                      <div style="margin:0;color:#666666;font-size:17px;line-height:1.55;">${safeOriginal}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 52px 64px;">
                <p style="margin:0 0 26px;color:#555555;font-size:22px;line-height:1.45;">Best regards,</p>
                <p style="margin:0;color:#555555;font-size:21px;line-height:1.45;">TechUniqueIIT Solutions Team<br>Technology Consulting and Development<br><a href="${siteUrl}" style="color:#2563eb;text-decoration:underline;">${siteUrl.replace(/^https?:\/\//, '')}</a></p>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:820px;">
            <tr>
              <td align="center" style="padding:28px 20px 0;">
                <p style="margin:0 0 14px;color:#888888;font-size:16px;line-height:1.5;">TechUniqueIIT Solutions</p>
                <p style="margin:0;color:#888888;font-size:16px;line-height:1.5;">You are receiving this email because you submitted a contact query to TechUniqueIIT Solutions.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

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
    const subject = 'Response to your TechUniqueIIT query';
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      replyTo: process.env.MAIL_REPLY_TO || process.env.MAIL_FROM,
      to: contact.email,
      subject,
      text: buildReplyEmailText({
        fullName,
        replyMessage: body,
        originalMessage: contact.message,
      }),
      html: buildReplyEmailHtml({
        fullName,
        replyMessage: body,
        originalMessage: contact.message,
      }),
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
