const express = require('express');
const router = express.Router();
const { 
  createBlog, 
  getBlogs, 
  getBlog, 
  updateBlog, 
  deleteBlog, 
  getUserBlogs,
  getBlogBySlug
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Protected routes
router.use(protect); // Apply protection for all routes below
router.post('/', authorize('admin', 'super_admin'), createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/user/:userId', getUserBlogs);

// This route needs to be after specific routes to avoid conflicts
router.get('/:id', getBlog);

module.exports = router; 