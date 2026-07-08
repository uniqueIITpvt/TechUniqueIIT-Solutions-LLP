const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Blog = require('../models/blogModel');
const {
  uploadFilePathToCloudinary,
  isCloudinaryConfigured,
} = require('../utils/cloudinary');

const uploadsDir = path.join(__dirname, '../uploads');

const isRemoteImage = (value) => /^https?:\/\//i.test(value || '');

const migrateBlogImages = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary environment variables are required');
  }

  if (!fs.existsSync(uploadsDir)) {
    throw new Error(`Uploads directory not found: ${uploadsDir}`);
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const blogs = await Blog.find({
    featuredImage: { $exists: true, $nin: ['', 'default-blog.jpg'] },
    $or: [
      { featuredImagePublicId: { $exists: false } },
      { featuredImagePublicId: '' },
      { featuredImagePublicId: null },
    ],
  });

  let migrated = 0;
  let skipped = 0;

  for (const blog of blogs) {
    if (isRemoteImage(blog.featuredImage)) {
      skipped += 1;
      console.log(`Skipping remote image for blog ${blog._id}: ${blog.featuredImage}`);
      continue;
    }

    const filename = path.basename(blog.featuredImage);
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      skipped += 1;
      console.warn(`Missing local file for blog ${blog._id}: ${filePath}`);
      continue;
    }

    const result = await uploadFilePathToCloudinary(filePath, filename);

    blog.featuredImage = result.url;
    blog.featuredImagePublicId = result.public_id || '';
    await blog.save();

    migrated += 1;
    console.log(`Migrated blog ${blog._id}: ${filename} -> ${result.url}`);
  }

  console.log(`Migration complete. Migrated: ${migrated}. Skipped: ${skipped}.`);
};

migrateBlogImages()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
