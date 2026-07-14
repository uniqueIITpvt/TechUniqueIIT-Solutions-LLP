const express = require('express');
const {
  createContactQuery,
  getContactQueries,
  getContactQuery,
  replyToContactQuery,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createContactQuery);

router.use(protect, authorize('admin'));
router.get('/', getContactQueries);
router.get('/:id', getContactQuery);
router.post('/:id/reply', replyToContactQuery);

module.exports = router;
