const express = require('express');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    toggleLike,
    getBlogStats,
    getMyBlogs
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Place specific routes before parameterized routes
router.get('/my-blogs', protect, getMyBlogs);
router.get('/stats', protect, getBlogStats);

router
    .route('/')
    .get(getBlogs)
    .post(protect, authorize('admin', 'user'), createBlog);

router
    .route('/:id')
    .get(getBlog)
    .put(protect, authorize('admin', 'user'), updateBlog)
    .delete(protect, authorize('admin', 'user'), deleteBlog);

router.put('/:id/like', protect, toggleLike);

module.exports = router; 