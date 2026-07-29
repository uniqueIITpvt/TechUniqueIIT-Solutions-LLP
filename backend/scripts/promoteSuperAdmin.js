const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/userModel');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error('Usage: npm run promote-super-admin -- <email>');
  process.exit(1);
}

const promoteSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techuniqueIIT');

    const user = await User.findOneAndUpdate(
      { email },
      { role: 'super_admin' },
      { new: true, runValidators: true }
    ).select('name email role');

    if (!user) {
      console.error(`No user found for ${email}`);
      process.exitCode = 1;
      return;
    }

    console.log(`Promoted ${user.email} to ${user.role}`);
  } catch (error) {
    console.error('Failed to promote super admin:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

promoteSuperAdmin();
