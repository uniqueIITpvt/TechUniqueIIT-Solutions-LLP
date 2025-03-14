const CaseStudy = require('../models/caseStudyModel');
const asyncHandler = require('express-async-handler');
const { uploadImage } = require('../utils/cloudinary');

// @desc    Create new case study
// @route   POST /api/case-studies
// @access  Private
exports.createCaseStudy = asyncHandler(async (req, res) => {
  try {
    // Debug logs
    console.log('Headers:', req.headers);
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    console.log('User:', req.user);

    // Add author to req.body
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    req.body.author = req.user.id;

    // Handle tags
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag) => tag.trim());
    } else if (req.body['tags[]']) {
      tags = Array.isArray(req.body['tags[]'])
        ? req.body['tags[]']
        : [req.body['tags[]']];
    } else {
      tags = [];
    }

    // Handle stats
    let stats = [];
    if (req.body.stats && typeof req.body.stats === 'string') {
      try {
        stats = JSON.parse(req.body.stats);
      } catch (e) {
        console.error('Error parsing stats:', e);
        stats = [];
      }
    } else if (req.body['stats[]']) {
      // Handle form-data array format
      const statLabels = Array.isArray(req.body['stats[label][]'])
        ? req.body['stats[label][]']
        : [req.body['stats[label][]']];

      const statValues = Array.isArray(req.body['stats[value][]'])
        ? req.body['stats[value][]']
        : [req.body['stats[value][]']];

      if (statLabels && statValues && statLabels.length === statValues.length) {
        stats = statLabels.map((label, index) => ({
          label,
          value: statValues[index],
        }));
      }
    }

    // Handle image upload if provided
    let imageUrl = null;
    if (req.files && req.files.image) {
      try {
        const result = await uploadImage(req.files.image);
        imageUrl = result.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Error uploading image',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image for the case study',
      });
    }

    // Create case study with validated data
    const caseStudyData = {
      title: req.body.title?.trim(),
      description: req.body.description?.trim(),
      content: req.body.content,
      category: req.body.category,
      client: req.body.client?.trim(),
      duration: req.body.duration?.trim(),
      year: req.body.year?.trim(),
      tags: tags,
      stats: stats,
      status: req.body.status || 'published',
      featured: req.body.featured === 'true' || req.body.featured === true,
      author: req.user.id,
      image: imageUrl,
    };

    // Validate required fields
    const requiredFields = [
      'title',
      'description',
      'content',
      'category',
      'client',
      'duration',
      'year',
    ];
    for (const field of requiredFields) {
      if (!caseStudyData[field]) {
        return res.status(400).json({
          success: false,
          message: `Please provide ${field}`,
        });
      }
    }

    console.log('Creating case study with data:', caseStudyData);

    const caseStudy = await CaseStudy.create(caseStudyData);

    res.status(201).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error('Case study creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating case study',
      error: error.message,
      stack: error.stack,
    });
  }
});

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
exports.getCaseStudies = asyncHandler(async (req, res) => {
  try {
    console.log('GET /api/case-studies request received');
    console.log('Query params:', req.query);
    console.log('Headers:', req.headers);

    // Build query
    const query = {};

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by featured if provided
    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }

    // Filter by status (default to published for public access)
    query.status = 'published';

    // Allow admins to see drafts if requested
    if (req.query.status && req.user && req.user.role === 'admin') {
      query.status = req.query.status;
    }

    console.log('MongoDB query:', query);

    const caseStudies = await CaseStudy.find(query)
      .populate('author', 'name email')
      .sort('-createdAt');

    console.log(`Found ${caseStudies.length} case studies`);

    res.status(200).json({
      success: true,
      data: {
        data: caseStudies,
        count: caseStudies.length,
      },
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case studies',
      error: error.message,
    });
  }
});

// @desc    Get single case study
// @route   GET /api/case-studies/:id
// @access  Public
exports.getCaseStudy = asyncHandler(async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id).populate(
      'author',
      'name email'
    );

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    // Increment views
    caseStudy.views += 1;
    await caseStudy.save();

    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case study',
      error: error.message,
    });
  }
});

// @desc    Get case study by slug
// @route   GET /api/case-studies/slug/:slug
// @access  Public
exports.getCaseStudyBySlug = asyncHandler(async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({
      slug: req.params.slug,
    }).populate('author', 'name email');

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    // Increment views
    caseStudy.views += 1;
    await caseStudy.save();

    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error('Error fetching case study by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case study',
      error: error.message,
    });
  }
});

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private
exports.updateCaseStudy = asyncHandler(async (req, res) => {
  try {
    let caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    // Make sure user is case study owner or admin
    if (
      caseStudy.author.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this case study',
      });
    }

    // Handle tags
    if (req.body.tags) {
      if (typeof req.body.tags === 'string') {
        req.body.tags = req.body.tags.split(',').map((tag) => tag.trim());
      }
    }

    // Handle stats
    if (req.body.stats && typeof req.body.stats === 'string') {
      try {
        req.body.stats = JSON.parse(req.body.stats);
      } catch (e) {
        console.error('Error parsing stats:', e);
        delete req.body.stats;
      }
    }

    // Handle image upload if provided
    if (req.files && req.files.image) {
      try {
        const result = await uploadImage(req.files.image);
        req.body.image = result.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Error uploading image',
        });
      }
    }

    // Update case study
    caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating case study',
      error: error.message,
    });
  }
});

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private
exports.deleteCaseStudy = asyncHandler(async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }

    // Make sure user is case study owner or admin
    if (
      caseStudy.author.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this case study',
      });
    }

    await CaseStudy.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Case study deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting case study',
      error: error.message,
    });
  }
});

// @desc    Get featured case studies
// @route   GET /api/case-studies/featured
// @access  Public
exports.getFeaturedCaseStudies = asyncHandler(async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({
      featured: true,
      status: 'published',
    })
      .populate('author', 'name email')
      .sort('-createdAt')
      .limit(6);

    res.status(200).json({
      success: true,
      data: {
        data: caseStudies,
        count: caseStudies.length,
      },
    });
  } catch (error) {
    console.error('Error fetching featured case studies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured case studies',
      error: error.message,
    });
  }
});

// @desc    Get case study statistics
// @route   GET /api/case-studies/stats
// @access  Private (Admin)
exports.getCaseStudyStats = asyncHandler(async (req, res) => {
  try {
    const [caseStudies, totalViews] = await Promise.all([
      CaseStudy.find(),
      CaseStudy.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } },
      ]),
    ]);

    const stats = {
      totalCaseStudies: caseStudies.length,
      publishedCaseStudies: caseStudies.filter(
        (cs) => cs.status === 'published'
      ).length,
      draftCaseStudies: caseStudies.filter((cs) => cs.status === 'draft')
        .length,
      featuredCaseStudies: caseStudies.filter((cs) => cs.featured).length,
      totalViews: totalViews[0]?.total || 0,
      categoryCounts: {},
    };

    // Count case studies by category
    caseStudies.forEach((cs) => {
      if (!stats.categoryCounts[cs.category]) {
        stats.categoryCounts[cs.category] = 0;
      }
      stats.categoryCounts[cs.category]++;
    });

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching case study stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case study statistics',
      error: error.message,
    });
  }
});

// @desc    Get logged in user case studies
// @route   GET /api/case-studies/my-case-studies
// @access  Private
exports.getMyCaseStudies = asyncHandler(async (req, res) => {
  try {
    console.log('GET /api/case-studies/my-case-studies request received');
    console.log('User:', req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated or user ID missing',
      });
    }

    console.log('Fetching case studies for user ID:', req.user.id);

    const caseStudies = await CaseStudy.find({ author: req.user.id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    console.log(`Found ${caseStudies.length} case studies for user`);

    res.status(200).json({
      success: true,
      data: {
        data: caseStudies,
        count: caseStudies.length,
      },
    });
  } catch (error) {
    console.error('Error fetching my case studies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case studies',
      error: error.message,
    });
  }
});
