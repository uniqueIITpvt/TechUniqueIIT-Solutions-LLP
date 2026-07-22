const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
      maxlength: [160, 'Job title cannot be more than 160 characters'],
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
      trim: true,
      maxlength: [80, 'Department cannot be more than 80 characters'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
      maxlength: [120, 'Location cannot be more than 120 characters'],
    },
    workplaceType: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      default: 'Remote',
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
      default: 'Full-time',
    },
    salary: {
      type: String,
      trim: true,
      maxlength: [120, 'Salary cannot be more than 120 characters'],
      default: '',
    },
    summary: {
      type: String,
      required: [true, 'Please add a short job summary'],
      trim: true,
      maxlength: [500, 'Summary cannot be more than 500 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a job description'],
      trim: true,
      maxlength: [10000, 'Description cannot be more than 10000 characters'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    applyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [160, 'Application email cannot be more than 160 characters'],
      default: '',
    },
    applyUrl: {
      type: String,
      trim: true,
      maxlength: [500, 'Application URL cannot be more than 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'closed'],
      default: 'draft',
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ department: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
