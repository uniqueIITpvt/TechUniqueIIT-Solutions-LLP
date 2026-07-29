const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const manageableRoles = ['user', 'admin', 'super_admin'];
const creatableRoles = ['admin', 'super_admin'];
const selectSafeUserFields = 'name email role isActive createdAt updatedAt';

const getActiveSuperAdminCount = () =>
  User.countDocuments({ role: 'super_admin', isActive: { $ne: false } });

const canChangeProtectedSuperAdmin = async (targetUser, requestedUpdates, currentUserId) => {
  const isSelf = targetUser._id.toString() === currentUserId.toString();

  if (isSelf) {
    return {
      allowed: false,
      message: 'You cannot change or delete your own account',
    };
  }

  if (targetUser.role !== 'super_admin') {
    return { allowed: true };
  }

  const activeSuperAdmins = await getActiveSuperAdminCount();
  const removesSuperAdminAccess =
    requestedUpdates.deleteAccount ||
    requestedUpdates.role !== 'super_admin' ||
    requestedUpdates.isActive === false;

  if (activeSuperAdmins <= 1 && removesSuperAdminAccess) {
    return {
      allowed: false,
      message: 'At least one active super admin must remain',
    };
  }

  return { allowed: true };
};

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select(selectSafeUserFields)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'admin', isActive = true } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  if (!name || !normalizedEmail || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required',
    });
  }

  if (!creatableRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Only admin and super admin accounts can be created here',
    });
  }

  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
    });
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role,
    isActive: Boolean(isActive),
  });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const targetUser = await User.findById(req.params.id);

  if (!targetUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const updates = {};

  if (req.body.name !== undefined) {
    const name = req.body.name.trim();
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }
    updates.name = name;
  }

  if (req.body.role !== undefined) {
    if (!manageableRoles.includes(req.body.role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
      });
    }
    updates.role = req.body.role;
  }

  if (req.body.isActive !== undefined) {
    updates.isActive = Boolean(req.body.isActive);
  }

  const guard = await canChangeProtectedSuperAdmin(
    targetUser,
    {
      role: updates.role ?? targetUser.role,
      isActive: updates.isActive ?? targetUser.isActive,
    },
    req.user._id
  );

  if (!guard.allowed) {
    return res.status(400).json({
      success: false,
      message: guard.message,
    });
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).select(selectSafeUserFields);

  res.status(200).json({
    success: true,
    data: user,
  });
});


exports.deleteUser = asyncHandler(async (req, res) => {
  const targetUser = await User.findById(req.params.id);

  if (!targetUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const guard = await canChangeProtectedSuperAdmin(
    targetUser,
    {
      role: targetUser.role,
      isActive: targetUser.isActive,
      deleteAccount: true,
    },
    req.user._id
  );

  if (!guard.allowed) {
    return res.status(400).json({
      success: false,
      message: guard.message,
    });
  }

  await targetUser.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
