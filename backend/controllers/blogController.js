const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private
exports.createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, content, summary, category, tags, status } = req.body;
    
    // Create blog post
    const blog = await Blog.create({
      title,
      content,
      summary,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || 'draft',
      author: req.user._id,
    });

    // Handle featured image if uploaded
    if (req.files && req.files.featuredImage) {
      const file = req.files.featuredImage;
      
      // Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({
          success: false,
          message: 'Please upload an image file'
        });
      }

      // Create custom filename
      const filename = `blog_${blog._id}${path.parse(file.name).ext}`;
      
      // Move file to upload folder
      file.mv(`./uploads/${filename}`, async (err) => {
        if (err) {
           
          return res.status(500).json({
            success: false,
            message: 'Problem with file upload'
          });
        }

        // Update database
        await Blog.findByIdAndUpdate(blog._id, { featuredImage: filename });
      });
    }

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
     
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
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
    
    // Handle tags
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    
    // Handle featured image if uploaded
    if (req.files && req.files.featuredImage) {
      const file = req.files.featuredImage;
      
      // Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({
          success: false,
          message: 'Please upload an image file'
        });
      }
      
      // Delete old image if it's not the default
      if (blog.featuredImage !== 'default-blog.jpg') {
        const filePath = path.join(__dirname, '../uploads', blog.featuredImage);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      // Create custom filename
      const filename = `blog_${blog._id}${path.parse(file.name).ext}`;
      
      // Move file to upload folder
      file.mv(`./uploads/${filename}`, async (err) => {
        if (err) {
          
          return res.status(500).json({
            success: false,
            message: 'Problem with file upload'
          });
        }

        req.body.featuredImage = filename;
        
        // Update blog
        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        
        res.status(200).json({
          success: true,
          data: blog
        });
      });
    } else {
      // Update blog without changing image
      blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        success: true,
        data: blog
      });
    }
  } catch (error) {
    
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
    
    // Delete image if it's not the default
    if (blog.featuredImage !== 'default-blog.jpg') {
      const filePath = path.join(__dirname, '../uploads', blog.featuredImage);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
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