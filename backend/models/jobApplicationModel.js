const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    jobTitle: { type: String, required: true, trim: true, maxlength: 160 },
    jobDepartment: { type: String, required: true, trim: true, maxlength: 80 },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [120, 'Name is too long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      maxlength: [254, 'Email is too long'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    phone: { type: String, trim: true, maxlength: [30, 'Phone number is too long'], default: '' },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
      trim: true,
      maxlength: [500, 'Qualification is too long'],
    },
    resumeOriginalName: { type: String, required: true, trim: true, maxlength: 255 },
    resumeMimeType: { type: String, required: true },
    resumeSize: { type: Number, required: true, min: 1 },
    resumePublicId: { type: String, required: true, select: false },
    resumeFormat: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

jobApplicationSchema.index({ createdAt: -1 });
jobApplicationSchema.index({ job: 1, createdAt: -1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);