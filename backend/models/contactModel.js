const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Reply message is required'],
      trim: true,
      maxlength: [10000, 'Reply message is too long'],
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    sentAt: Date,
    emailMessageId: { type: String, default: '' },
    deliveryError: { type: String, default: '' },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [100, 'First name is too long'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [100, 'Last name is too long'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      maxlength: [254, 'Email is too long'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    countryCode: {
      type: String,
      trim: true,
      maxlength: [10, 'Country code is too long'],
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [30, 'Phone number is too long'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [10000, 'Message is too long'],
    },
    status: {
      type: String,
      enum: ['new', 'replied'],
      default: 'new',
    },
    replies: { type: [replySchema], default: [] },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
