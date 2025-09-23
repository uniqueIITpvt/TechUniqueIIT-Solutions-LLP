const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      unique: true
    },
    content: {
      type: String,
      required: [true, 'Please add content']
    },
    summary: {
      type: String,
      required: [true, 'Please add a summary'],
      maxlength: [500, 'Summary cannot be more than 500 characters']
    },
    featuredImage: {
      type: String,
      default: 'default-blog.jpg'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Technology', 'Web Development', 'Mobile Development', 'AI/ML', 
             'Cloud Computing', 'UI/UX', 'Digital Marketing', 'Cyber Security', 'Other']
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    viewCount: {
      type: Number,
      default: 0
    },
    readTime: {
      type: Number,  // in minutes
      default: 5
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create blog slug from the title
blogSchema.pre('save', function(next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  
  // Add a random suffix to ensure uniqueness
  if (!this.isNew) {
    next();
    return;
  }
  
  this.slug = `${this.slug}-${Math.floor(Math.random() * 1000)}`;
  next();
});

// Calculate read time based on content length
blogSchema.pre('save', function(next) {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  next();
});

module.exports = mongoose.model('Blog', blogSchema); 