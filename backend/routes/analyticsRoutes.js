const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/', getAnalytics);

module.exports = router;