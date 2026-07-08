const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Check Cloudinary configuration
const isCloudinaryConfigured = () => {
    return (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
};

// Configure Cloudinary only if all required environment variables are present
if (isCloudinaryConfigured()) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary configured successfully');
} else {
    console.warn('Cloudinary not configured. File uploads will use local storage fallback if available.');
}

// Local upload fallback function
const uploadToLocal = async (file) => {
    try {
        // Create a unique filename
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        
        // Ensure the uploads directory exists
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // The path where the file will be saved
        const filePath = path.join(uploadDir, fileName);
        
        // Move the file from temp location to uploads directory
        await fs.promises.copyFile(file.tempFilePath, filePath);
        
        // Clean up the temp file
        await fs.promises.unlink(file.tempFilePath);
        
        // Return the local URL and path
        return {
            url: `/uploads/${fileName}`,
            public_id: fileName,
            local_path: filePath
        };
    } catch (error) {
        console.error('Local upload error:', error);
        throw new Error(`Error uploading to local storage: ${error.message}`);
    }
};

const uploadFilePathToCloudinary = async (filePath, originalName) => {
    if (!isCloudinaryConfigured()) {
        throw new Error('Cloudinary is not configured');
    }

    const fileName = `${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
    const result = await cloudinary.uploader.upload(filePath, {
        use_filename: true,
        unique_filename: false,
        folder: 'blog-images',
        filename_override: fileName,
    });

    return {
        url: result.secure_url,
        public_id: result.public_id,
    };
};

// Upload image
const uploadImage = async (file) => {
    if (!file) {
        throw new Error('No file provided for upload');
    }
    
    try {
        // Check if Cloudinary is configured
        if (!isCloudinaryConfigured()) {
            if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
                throw new Error('Cloudinary is required for image uploads in production');
            }

            console.warn('Cloudinary not configured, using local storage fallback');
            return await uploadToLocal(file);
        }

        return await uploadFilePathToCloudinary(file.tempFilePath, file.name);
    } catch (error) {
        console.error('Image upload error:', error);
        throw new Error(`Error uploading image: ${error.message}`);
    }
};

// Delete image
const deleteImage = async (public_id) => {
    try {
        // Check if Cloudinary is configured
        if (!isCloudinaryConfigured()) {
            // If it's a local file, try to delete from local storage
            if (public_id && !public_id.includes('/')) {
                const filePath = path.join(__dirname, '../uploads', public_id);
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                    return { message: "Image deleted successfully from local storage" };
                }
            }
            return { message: "Image not found or couldn't be deleted" };
        }

        await cloudinary.uploader.destroy(public_id);
        return { message: "Image deleted successfully from Cloudinary" };
    } catch (error) {
        console.error('Image deletion error:', error);
        throw new Error(`Error deleting image: ${error.message}`);
    }
};

module.exports = {
    uploadImage,
    uploadFilePathToCloudinary,
    deleteImage,
    isCloudinaryConfigured,
};
