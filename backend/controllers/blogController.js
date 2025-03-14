const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const { uploadImage } = require('../utils/cloudinary');

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = asyncHandler(async (req, res) => {
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

    // Handle thumbnail upload if provided
    let thumbnailUrl = null;
    if (req.files && req.files.thumbnail) {
      try {
        const result = await uploadImage(req.files.thumbnail);
        thumbnailUrl = result.url;
      } catch (uploadError) {
        console.error('Thumbnail upload error:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Error uploading thumbnail',
        });
      }
    }

    // Create blog with validated data
    const blogData = {
      title: req.body.title?.trim(),
      excerpt: req.body.excerpt?.trim(),
      content: req.body.content,
      category: req.body.category,
      tags: tags,
      status: req.body.status || 'draft',
      author: req.user.id,
      thumbnail: thumbnailUrl,
    };

    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'category'];
    for (const field of requiredFields) {
      if (!blogData[field]) {
        return res.status(400).json({
          success: false,
          message: `Please provide ${field}`,
        });
      }
    }

    console.log('Creating blog with data:', blogData);

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message,
      stack: error.stack,
    });
  }
});

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = asyncHandler(async (req, res) => {
  console.log('GET /api/blogs request received');
  console.log('Query params:', req.query);
  console.log('Headers:', req.headers);

  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort('-createdAt');

    console.log(`Found ${blogs.length} blogs`);

    res.status(200).json({
      success: true,
      data: {
        data: blogs,
        count: blogs.length,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    'author',
    'name email'
  );

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Increment views
  blog.views += 1;
  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Make sure user is blog owner or admin
  if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this blog');
  }

  // Handle thumbnail upload if provided
  if (req.files && req.files.thumbnail) {
    const result = await uploadImage(req.files.thumbnail);
    req.body.thumbnail = result.url;
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Make sure user is blog owner or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this blog',
      });
    }

    // If blog has a thumbnail, delete it from cloudinary
    if (blog.thumbnail) {
      // You might want to add cloudinary deletion here
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message,
    });
  }
});

// @desc    Like/Unlike blog
// @route   PUT /api/blogs/:id/like
// @access  Private
exports.toggleLike = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  blog.likes += 1;
  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Get blog statistics
// @route   GET /api/blogs/stats
// @access  Private
exports.getBlogStats = asyncHandler(async (req, res) => {
  const [blogs, totalViews, totalLikes] = await Promise.all([
    Blog.find(),
    Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
    Blog.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }]),
  ]);

  const stats = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter((blog) => blog.status === 'published').length,
    draftBlogs: blogs.filter((blog) => blog.status === 'draft').length,
    totalViews: totalViews[0]?.total || 0,
    totalLikes: totalLikes[0]?.total || 0,
  };

  res.status(200).json({
    success: true,
    data: stats,
  });
});

// @desc    Get logged in user blogs
// @route   GET /api/blogs/my-blogs
// @access  Private
exports.getMyBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching my blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
});
