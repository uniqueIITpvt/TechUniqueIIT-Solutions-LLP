const asyncHandler = require('express-async-handler');
const { uploadImage: uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
exports.uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }

        const file = req.files.image;

        // Check if file is an image
        if (!file.mimetype.startsWith('image')) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image file'
            });
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: 'Image size should be less than 5MB'
            });
        }

        // Upload to cloudinary
        const result = await uploadToCloudinary(file);

        res.status(200).json({
            success: true,
            url: result.url
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
}); 