const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const Contact = require('../models/contactModel');
const Job = require('../models/jobModel');
const JobApplication = require('../models/jobApplicationModel');

const PERIODS = {
  '7days': { label: 'Last 7 days', days: 7 },
  '30days': { label: 'Last 30 days', days: 30 },
  '90days': { label: 'Last 90 days', days: 90 },
  year: { label: 'Last year', days: 365 },
  all: { label: 'All time', days: null },
};

const ensureDatabaseConnection = (res) => {
  if (mongoose.connection.readyState === 1) return true;

  res.status(503).json({
    success: false,
    message: 'Analytics service is temporarily unavailable. Please try again later.',
  });
  return false;
};

const startOfDay = (date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

const startOfMonth = (date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

const addDays = (date, days) => {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
};

const getPeriodRange = (period) => {
  const option = PERIODS[period] || PERIODS['30days'];
  const now = new Date();

  if (!option.days) {
    return { option, startDate: null, previousStartDate: null };
  }

  const startDate = startOfDay(addDays(now, -(option.days - 1)));
  const previousStartDate = startOfDay(addDays(startDate, -option.days));
  return { option, startDate, previousStartDate };
};

const getCountChange = async (Model, startDate, previousStartDate) => {
  if (!startDate || !previousStartDate) return null;

  const [current, previous] = await Promise.all([
    Model.countDocuments({ createdAt: { $gte: startDate } }),
    Model.countDocuments({ createdAt: { $gte: previousStartDate, $lt: startDate } }),
  ]);

  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

const getPercentage = (count, total) => {
  if (!total) return 0;
  return Number(((count / total) * 100).toFixed(1));
};

const buildTrendBuckets = (period) => {
  const now = new Date();
  const useDays = period === '7days' || period === '30days';
  const bucketCount = period === '7days' ? 7 : period === '30days' ? 30 : 12;
  const buckets = [];

  if (useDays) {
    const firstDay = startOfDay(addDays(now, -(bucketCount - 1)));
    for (let index = 0; index < bucketCount; index += 1) {
      const date = addDays(firstDay, index);
      const key = date.toISOString().slice(0, 10);
      buckets.push({
        key,
        label: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        blogs: 0,
        messages: 0,
        applications: 0,
        views: 0,
      });
    }

    return {
      unit: 'day',
      format: '%Y-%m-%d',
      start: firstDay,
      buckets,
    };
  }

  const firstMonth = startOfMonth(addMonths(now, -(bucketCount - 1)));
  for (let index = 0; index < bucketCount; index += 1) {
    const date = addMonths(firstMonth, index);
    const key = date.toISOString().slice(0, 7);
    buckets.push({
      key,
      label: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      blogs: 0,
      messages: 0,
      applications: 0,
      views: 0,
    });
  }

  return {
    unit: 'month',
    format: '%Y-%m',
    start: firstMonth,
    buckets,
  };
};

const aggregateTrend = (Model, start, format, extraGroupFields = {}) =>
  Model.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: { $dateToString: { format, date: '$createdAt' } },
        count: { $sum: 1 },
        ...extraGroupFields,
      },
    },
  ]);

const buildRecentActivity = async () => {
  const [blogs, contacts, applications] = await Promise.all([
    Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status viewCount createdAt')
      .lean(),
    Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email status createdAt')
      .lean(),
    JobApplication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name jobTitle jobDepartment createdAt')
      .lean(),
  ]);

  return [
    ...blogs.map((blog) => ({
      id: blog._id.toString(),
      type: 'blog',
      title: blog.title,
      subtitle: `${blog.status} blog - ${blog.viewCount || 0} views`,
      createdAt: blog.createdAt,
    })),
    ...contacts.map((contact) => ({
      id: contact._id.toString(),
      type: 'message',
      title: `${contact.firstName} ${contact.lastName || ''}`.trim() || contact.email,
      subtitle: `${contact.status} message from ${contact.email}`,
      createdAt: contact.createdAt,
    })),
    ...applications.map((application) => ({
      id: application._id.toString(),
      type: 'application',
      title: application.name,
      subtitle: `${application.jobTitle} - ${application.jobDepartment}`,
      createdAt: application.createdAt,
    })),
  ]
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, 8)
    .map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));
};

// @desc    Get real dashboard analytics
// @route   GET /api/analytics
// @access  Private/Admin
exports.getAnalytics = asyncHandler(async (req, res) => {
  if (!ensureDatabaseConnection(res)) return;

  const period = typeof req.query.period === 'string' ? req.query.period : '30days';
  const { option, startDate, previousStartDate } = getPeriodRange(period);
  const trendConfig = buildTrendBuckets(period);

  const [
    totalViewsResult,
    totalBlogs,
    totalMessages,
    totalApplications,
    totalJobs,
    blogsChange,
    messagesChange,
    applicationsChange,
    publishedBlogs,
    draftBlogs,
    newMessages,
    repliedMessages,
    openJobs,
    closedJobs,
    topPosts,
    applicationDepartments,
    blogTrend,
    contactTrend,
    applicationTrend,
    recentActivity,
  ] = await Promise.all([
    Blog.aggregate([{ $group: { _id: null, total: { $sum: '$viewCount' } } }]),
    Blog.countDocuments(),
    Contact.countDocuments(),
    JobApplication.countDocuments(),
    Job.countDocuments(),
    getCountChange(Blog, startDate, previousStartDate),
    getCountChange(Contact, startDate, previousStartDate),
    getCountChange(JobApplication, startDate, previousStartDate),
    Blog.countDocuments({ status: 'published' }),
    Blog.countDocuments({ status: 'draft' }),
    Contact.countDocuments({ status: 'new' }),
    Contact.countDocuments({ status: 'replied' }),
    Job.countDocuments({ status: 'published' }),
    Job.countDocuments({ status: 'closed' }),
    Blog.find()
      .sort({ viewCount: -1, createdAt: -1 })
      .limit(8)
      .select('title slug category status viewCount readTime createdAt')
      .lean(),
    JobApplication.aggregate([
      { $group: { _id: '$jobDepartment', applications: { $sum: 1 } } },
      { $sort: { applications: -1, _id: 1 } },
      { $limit: 8 },
    ]),
    aggregateTrend(Blog, trendConfig.start, trendConfig.format, {
      views: { $sum: '$viewCount' },
    }),
    aggregateTrend(Contact, trendConfig.start, trendConfig.format),
    aggregateTrend(JobApplication, trendConfig.start, trendConfig.format),
    buildRecentActivity(),
  ]);

  const trendMap = new Map(trendConfig.buckets.map((bucket) => [bucket.key, { ...bucket }]));

  blogTrend.forEach((item) => {
    const bucket = trendMap.get(item._id);
    if (bucket) {
      bucket.blogs = item.count;
      bucket.views = item.views || 0;
    }
  });

  contactTrend.forEach((item) => {
    const bucket = trendMap.get(item._id);
    if (bucket) bucket.messages = item.count;
  });

  applicationTrend.forEach((item) => {
    const bucket = trendMap.get(item._id);
    if (bucket) bucket.applications = item.count;
  });

  const trend = Array.from(trendMap.values()).map((bucket) => ({
    ...bucket,
    totalActivity: bucket.blogs + bucket.messages + bucket.applications,
  }));

  res.json({
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      period: PERIODS[period] ? period : '30days',
      periodLabel: option.label,
      overview: {
        totalViews: totalViewsResult[0]?.total || 0,
        viewsChange: null,
        totalBlogs,
        blogsChange,
        totalMessages,
        messagesChange,
        totalApplications,
        applicationsChange,
        totalJobs,
        openJobs,
        closedJobs,
      },
      topPosts: topPosts.map((post) => ({
        id: post._id.toString(),
        title: post.title,
        slug: post.slug,
        category: post.category,
        status: post.status,
        views: post.viewCount || 0,
        readTime: post.readTime || 0,
        createdAt: post.createdAt.toISOString(),
      })),
      trend,
      blogStatus: [
        { label: 'Published', count: publishedBlogs, percentage: getPercentage(publishedBlogs, totalBlogs) },
        { label: 'Draft', count: draftBlogs, percentage: getPercentage(draftBlogs, totalBlogs) },
      ],
      messageStatus: [
        { label: 'New', count: newMessages, percentage: getPercentage(newMessages, totalMessages) },
        { label: 'Replied', count: repliedMessages, percentage: getPercentage(repliedMessages, totalMessages) },
      ],
      applicationsByDepartment: applicationDepartments.map((item) => ({
        department: item._id || 'Other',
        applications: item.applications,
        percentage: getPercentage(item.applications, totalApplications),
      })),
      recentActivity,
    },
  });
});