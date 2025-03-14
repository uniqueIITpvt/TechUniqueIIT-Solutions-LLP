const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.get('/me', protect, getCurrentUser);

module.exports = router;
