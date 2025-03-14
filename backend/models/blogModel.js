const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt'],
        maxlength: [500, 'Excerpt cannot be more than 500 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'Technology',
            'Programming',
            'Web Development',
            'Mobile Development',
            'AI & ML',
            'Cybersecurity',
            'Cloud Computing',
            'DevOps',
            'Other'
        ]
    },
    tags: [{
        type: String,
        trim: true
    }],
    featured: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        default: null
    },
    readTime: {
        type: Number,
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug from title before saving
BlogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true });
    }

    // Ensure tags is always an array
    if (this.tags && !Array.isArray(this.tags)) {
        this.tags = [this.tags];
    }

    next();
});

module.exports = mongoose.model('Blog', BlogSchema); 