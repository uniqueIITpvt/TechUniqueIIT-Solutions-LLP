const express = require('express');
const router = express.Router();
const {
  createCaseStudy,
  getCaseStudies,
  getCaseStudy,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
  getFeaturedCaseStudies,
  getCaseStudyStats,
  getMyCaseStudies,
} = require('../controllers/caseStudyController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCaseStudies);
router.get('/featured', getFeaturedCaseStudies);
router.get('/slug/:slug', getCaseStudyBySlug);
router.get('/public', getCaseStudies);

// Protected routes (require authentication)
router.get('/my-case-studies', protect, getMyCaseStudies);
router.post('/', protect, createCaseStudy);
router.put('/:id', protect, updateCaseStudy);
router.delete('/:id', protect, deleteCaseStudy);

// Admin only routes
router.get('/admin/stats', protect, authorize('admin'), getCaseStudyStats);

// This route must come after all other GET routes with specific paths
router.get('/:id', getCaseStudy);

// Add a debug route to check if the endpoint is accessible
router.get('/debug/routes', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Routes are accessible',
    availableRoutes: [
      'GET /',
      'GET /featured',
      'GET /slug/:slug',
      'GET /public',
      'GET /my-case-studies',
      'GET /admin/stats',
      'GET /:id',
      'GET /debug/routes',
    ],
  });
});

module.exports = router;
