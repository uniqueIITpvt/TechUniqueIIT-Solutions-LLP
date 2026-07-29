const express = require('express');
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('super_admin'));
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.patch('/:id/role', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
