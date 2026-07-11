const asyncHandler = require('express-async-handler');
const { uploadImage: uploadToCloudinary } = require('../utils/cloudinary');

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const getUploadedFile = (fileOrFiles) => {
    return Array.isArray(fileOrFiles) ? fileOrFiles[0] : fileOrFiles;
};

// @desc    Upload image
// @route   POST /api/upload
// @access  Public
exports.uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }

        const file = getUploadedFile(req.files.image);

        // Check if file is an image
        if (!file || !ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a PNG, JPG, or WEBP image'
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
