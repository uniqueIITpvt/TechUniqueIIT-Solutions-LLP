const path = require('path');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Job = require('../models/jobModel');
const JobApplication = require('../models/jobApplicationModel');
const {
  createResumeDownloadUrl,
  deleteResume,
  isCloudinaryConfigured,
  uploadPrivateResume,
} = require('../utils/cloudinary');

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Map([
  ['.pdf', 'application/pdf'],
  ['.doc', 'application/msword'],
  ['.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
]);

const cleanString = (value) => typeof value === 'string' ? value.trim() : '';
const getUploadedFile = (fileOrFiles) => Array.isArray(fileOrFiles) ? fileOrFiles[0] : fileOrFiles;

const validateResume = (file, res) => {
  if (!file) {
    res.status(400).json({ success: false, message: 'Resume is required' });
    return false;
  }

  const extension = path.extname(file.name || '').toLowerCase();
  if (!ALLOWED_RESUME_TYPES.has(extension) || ALLOWED_RESUME_TYPES.get(extension) !== file.mimetype) {
    res.status(400).json({
      success: false,
      message: 'Please upload a PDF, DOC, or DOCX resume',
    });
    return false;
  }

  if (!file.size || file.size > MAX_RESUME_SIZE) {
    res.status(400).json({
      success: false,
      message: 'Resume size must be 5 MB or less',
    });
    return false;
  }

  return true;
};

exports.applyForJob = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.jobId)) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  const now = new Date();
  const job = await Job.findOne({
    _id: req.params.jobId,
    status: 'published',
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'This job is no longer accepting applications',
    });
  }

  const payload = {
    name: cleanString(req.body.name),
    email: cleanString(req.body.email).toLowerCase(),
    phone: cleanString(req.body.phone),
    qualification: cleanString(req.body.qualification),
  };

  if (!payload.name || !payload.email || !payload.qualification) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, qualification, and resume are required',
    });
  }

  if (
    payload.name.length > 120 ||
    payload.email.length > 254 ||
    payload.phone.length > 30 ||
    payload.qualification.length > 500
  ) {
    return res.status(400).json({
      success: false,
      message: 'One or more application fields are too long',
    });
  }

  if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(payload.email)) {
    return res.status(400).json({
      success: false,
      message: 'Please add a valid email',
    });
  }

  const resume = getUploadedFile(req.files?.resume);
  if (!validateResume(resume, res)) return;

  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Resume upload service is temporarily unavailable',
    });
  }

  let uploadedResume;

  try {
    uploadedResume = await uploadPrivateResume(resume);
    const application = await JobApplication.create({
      job: job._id,
      jobTitle: job.title,
      jobDepartment: job.department,
      ...payload,
      resumeOriginalName: path.basename(resume.name),
      resumeMimeType: resume.mimetype,
      resumeSize: resume.size,
      resumePublicId: uploadedResume.public_id,
      resumeFormat: uploadedResume.format,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { id: application._id, createdAt: application.createdAt },
    });
  } catch (error) {
    if (uploadedResume?.public_id) {
      try {
        await deleteResume(uploadedResume.public_id);
      } catch (cleanupError) {
        console.error('Resume rollback failed:', cleanupError.message);
      }
    }
    throw error;
  }
});

exports.getJobApplications = asyncHandler(async (req, res) => {
  const requestedPage = Number.parseInt(req.query.page, 10);
  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, 100)
    : 20;
  const query = {};

  if (req.query.jobId) {
    if (!mongoose.isValidObjectId(req.query.jobId)) {
      return res.status(400).json({ success: false, message: 'Invalid job filter' });
    }
    query.job = req.query.jobId;
  }

  const [applications, total] = await Promise.all([
    JobApplication.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('job', 'title department')
      .lean(),
    JobApplication.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

exports.getResumeDownload = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.applicationId)
    .select('+resumePublicId +resumeFormat')
    .lean();

  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const url = createResumeDownloadUrl({
    publicId: application.resumePublicId,
    format: application.resumeFormat,
  });

  res.status(200).json({ success: true, data: { url } });
});

exports.deleteJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.applicationId)
    .select('+resumePublicId +resumeFormat');

  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  await deleteResume(application.resumePublicId);
  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Application and resume deleted successfully',
    data: {},
  });
});