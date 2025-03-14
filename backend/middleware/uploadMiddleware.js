const { uploadImage } = require('../utils/cloudinary');

const handleImageUpload = async (req, res, next) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const file = req.files.image;

        // Validate file type
        if (!file.mimetype.startsWith('image')) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image file"
            });
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "Image size should be less than 5MB"
            });
        }

        // Upload to Cloudinary
        const result = await uploadImage(file);
        
        // Add the upload result to the request object
        req.uploadedImage = result;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        });
    }
};

module.exports = { handleImageUpload }; 