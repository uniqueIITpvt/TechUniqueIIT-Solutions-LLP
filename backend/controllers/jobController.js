const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

const allowedFields = [
  'title',
  'department',
  'location',
  'workplaceType',
  'employmentType',
  'salary',
  'summary',
  'description',
  'applyEmail',
  'applyUrl',
  'status',
  'expiresAt',
];

const parseRequirements = (requirements) => {
  if (Array.isArray(requirements)) {
    return requirements.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof requirements === 'string') {
    return requirements
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const buildJobPayload = (body) => {
  const payload = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) payload[field] = body[field];
  });

  if (body.requirements !== undefined) {
    payload.requirements = parseRequirements(body.requirements);
  }

  if (payload.expiresAt === '') payload.expiresAt = null;
  return payload;
};

exports.getPublishedJobs = asyncHandler(async (req, res) => {
  const now = new Date();
  const query = {
    status: 'published',
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
  };

  if (req.query.department && req.query.department !== 'All') {
    query.department = req.query.department;
  }

  const jobs = await Job.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

exports.getAdminJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate({ path: 'createdBy', select: 'name email' })
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

exports.createJob = asyncHandler(async (req, res) => {
  const payload = buildJobPayload(req.body);
  payload.createdBy = req.user._id;

  const job = await Job.create(payload);
  res.status(201).json({ success: true, data: job });
});

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    buildJobPayload(req.body),
    { new: true, runValidators: true }
  );

  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  res.status(200).json({ success: true, data: job });
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  await job.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
