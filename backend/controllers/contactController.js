const asyncHandler = require('express-async-handler');

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const sendEmailJsTemplate = async (templateId, templateParams) => {
  const response = await fetch(EMAILJS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS request failed: ${response.status} ${errorText}`);
  }
};

const sendContactEmail = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, countryCode, phone, message } = req.body;

  if (!firstName || !email || !phone || !message) {
    res.status(400);
    throw new Error('firstName, email, phone, and message are required');
  }

  if (
    !process.env.EMAILJS_SERVICE_ID ||
    !process.env.EMAILJS_TEMPLATE_ID ||
    !process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID ||
    !process.env.EMAILJS_PUBLIC_KEY
  ) {
    res.status(500);
    throw new Error('Email service is not configured');
  }

  const templateParams = {
    firstName,
    lastName: lastName || '',
    email,
    countryCode: countryCode || '',
    phone,
    message,
  };

  await sendEmailJsTemplate(process.env.EMAILJS_TEMPLATE_ID, templateParams);
  await sendEmailJsTemplate(
    process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID,
    templateParams
  );

  res.status(200).json({
    success: true,
    message: 'Message sent successfully',
  });
});

module.exports = {
  sendContactEmail,
};
