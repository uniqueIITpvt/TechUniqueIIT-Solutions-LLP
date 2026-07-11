const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const parseTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  }

  return Array.isArray(tags) ? tags : [];
};

const getUploadedFile = (fileOrFiles) => {
  return Array.isArray(fileOrFiles) ? fileOrFiles[0] : fileOrFiles;
};

const validateImageFile = (file, res) => {
  if (!file || !ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
    res.status(400).json({
      success: false,
      message: 'Please upload a PNG, JPG, or WEBP image',
    });
    return false;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    res.status(400).json({
      success: false,
      message: 'Image size should be less than 5MB',
    });
    return false;
  }

  return true;
};

const buildBlogUpdatePayload = (body) => {
  const allowedFields = ['title', 'content', 'summary', 'category', 'status'];
  const payload = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  if (body.tags !== undefined) {
    payload.tags = parseTags(body.tags);
  }

  return payload;
};

const deleteStoredImage = async (blog) => {
  if (!blog.featuredImagePublicId) {
    return;
  }

  try {
    await deleteImage(blog.featuredImagePublicId);
  } catch (error) {
    console.warn('Previous blog image could not be deleted:', error.message);
  }
};

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private
exports.createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, content, summary, category, tags, status } = req.body;
    const blogData = {
      title,
      content,
      summary,
      category,
      tags: parseTags(tags),
      status: status || 'draft',
      author: req.user._id,
    };

    if (req.files && req.files.featuredImage) {
      const file = getUploadedFile(req.files.featuredImage);

      if (!validateImageFile(file, res)) {
        return;
      }

      const uploadedImage = await uploadImage(file);
      blogData.featuredImage = uploadedImage.url;
      blogData.featuredImagePublicId = uploadedImage.public_id || '';
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message,
    });
  }
});

// @desc    Get all blogs with filters and pagination
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Only return published blogs for public requests
    if (!req.user || req.user.role !== 'admin') {
      reqQuery.status = 'published';
    }

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resources
    let query = Blog.find(JSON.parse(queryStr)).populate({
      path: 'author',
      select: 'name email'
    });

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Blog.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const blogs = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination,
      data: blogs
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error retrieving blogs',
      error: error.message
    });
  }
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public (published) / Private (drafts)
exports.getBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: 'author',
      select: 'name email'
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if blog is published or user is author/admin
    if (blog.status === 'draft') {
      if (!req.user || (req.user._id.toString() !== blog.author._id.toString() && req.user.role !== 'admin')) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this blog'
        });
      }
    }

    // Increment view count for published blogs
    if (blog.status === 'published') {
      blog.viewCount += 1;
      await blog.save();
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error retrieving blog',
      error: error.message
    });
  }
});

// @desc    Get blogs by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public (published) / Private (drafts)
exports.getBlogBySlug = asyncHandler(async (req, res) => {
  try {
    const slug = req.params.slug;


    // First try to find by exact slug match
    let blog = await Blog.findOne({ slug }).populate({
      path: 'author',
      select: 'name email'
    });

    // If not found and slug is numeric, try to find by ID-like matching
    if (!blog && /^\d+$/.test(slug)) {


      // Try to find blogs with titles containing the number or other matching criteria
      // Note: MongoDB's $regex doesn't work directly with ObjectId fields
      blog = await Blog.findOne({
        $or: [
          { title: { $regex: slug, $options: 'i' } } // If title contains the number
        ],
        status: 'published' // Only published blogs for security
      }).populate({
        path: 'author',
        select: 'name email'
      });

      // If still not found, try a direct ID match if the number happens to be a valid ID
      if (!blog) {
        try {
          // Check if this is somehow a valid ObjectId
          if (mongoose.Types.ObjectId.isValid(slug)) {

            blog = await Blog.findById(slug).populate({
              path: 'author',
              select: 'name email'
            });
          }
        } catch (idErr) {

        }
      }
    }

    if (!blog) {

      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }



    // Check if blog is published or user is author/admin
    if (blog.status === 'draft') {
      if (!req.user || (req.user._id.toString() !== blog.author._id.toString() && req.user.role !== 'admin')) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this blog'
        });
      }
    }

    // Increment view count for published blogs
    if (blog.status === 'published') {
      blog.viewCount += 1;
      await blog.save();
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error retrieving blog',
      error: error.message
    });
  }
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = asyncHandler(async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Make sure user is blog author or admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    const updatePayload = buildBlogUpdatePayload(req.body);
    let shouldDeletePreviousImage = false;

    // Handle featured image if uploaded
    if (req.files && req.files.featuredImage) {
      const file = getUploadedFile(req.files.featuredImage);

      // Make sure the image is a photo
      if (!validateImageFile(file, res)) {
        return;
      }

      const uploadedImage = await uploadImage(file);
      updatePayload.featuredImage = uploadedImage.url;
      updatePayload.featuredImagePublicId = uploadedImage.public_id || '';
      shouldDeletePreviousImage = Boolean(blog.featuredImagePublicId);
    }

    const previousBlog = blog;

    blog = await Blog.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
      runValidators: true
    });

    if (shouldDeletePreviousImage) {
      await deleteStoredImage(previousBlog);
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);

    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
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
        message: 'Blog not found'
      });
    }

    // Make sure user is blog author or admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await deleteStoredImage(blog);
    await blog.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
});

// @desc    Get blogs by user
// @route   GET /api/blogs/user/:userId
// @access  Private
exports.getUserBlogs = asyncHandler(async (req, res) => {
  try {
    let query;

    // Check if requesting own blogs or admin requesting other's blogs
    if (req.params.userId === 'me') {
      query = { author: req.user._id };
    } else if (req.user.role === 'admin' || req.params.userId === req.user._id.toString()) {
      query = { author: req.params.userId };
    } else {
      query = {
        author: req.params.userId,
        status: 'published'
      };
    }

    const blogs = await Blog.find(query)
      .populate({
        path: 'author',
        select: 'name email'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error retrieving user blogs',
      error: error.message
    });
  }
});
