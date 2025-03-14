const mongoose = require('mongoose');
const slugify = require('slugify');

const StatSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Please add a stat label'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Please add a stat value'],
    trim: true,
  },
});

const CaseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Web Development',
        'Mobile Apps',
        'UI/UX Design',
        'E-commerce',
        'Cloud Solutions',
        'AI & ML',
        'DevOps',
        'Cybersecurity',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please add detailed content'],
    },
    image: {
      type: String,
      required: [true, 'Please add a case study image'],
    },
    stats: [StatSchema],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    client: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Please add project duration'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Please add project year'],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
CaseStudySchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }

  // Ensure tags is always an array
  if (this.tags && !Array.isArray(this.tags)) {
    this.tags = [this.tags];
  }

  next();
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
