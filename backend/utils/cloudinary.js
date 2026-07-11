const cloudinary = require('cloudinary').v2;

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
    console.warn('Cloudinary not configured. Image uploads are disabled.');
}

const buildUploadOptions = (originalName) => ({
    folder: 'blog-images',
    resource_type: 'image',
    use_filename: true,
    unique_filename: false,
    filename_override: `${Date.now()}-${originalName.replace(/\s+/g, '-')}`,
});

const formatUploadResult = (result) => {
    if (!result?.secure_url || !result?.public_id) {
        throw new Error('Cloudinary did not return a secure image URL');
    }

    return {
        url: result.secure_url,
        public_id: result.public_id,
    };
};

const uploadBufferToCloudinary = (buffer, originalName) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            buildUploadOptions(originalName),
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                try {
                    resolve(formatUploadResult(result));
                } catch (resultError) {
                    reject(resultError);
                }
            }
        );

        stream.end(buffer);
    });

const uploadFilePathToCloudinary = async (filePath, originalName) => {
    if (!isCloudinaryConfigured()) {
        throw new Error('Cloudinary is not configured');
    }

    const result = await cloudinary.uploader.upload(
        filePath,
        buildUploadOptions(originalName)
    );

    return formatUploadResult(result);
};

// Upload image
const uploadImage = async (file) => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    try {
        if (!isCloudinaryConfigured()) {
            throw new Error('Cloudinary configuration is required for image uploads');
        }

        if (!Buffer.isBuffer(file.data) || file.data.length === 0) {
            throw new Error('Uploaded image data is empty');
        }

        return await uploadBufferToCloudinary(file.data, file.name);
    } catch (error) {
        console.error('Image upload error:', error);
        throw new Error(`Error uploading image: ${error.message}`);
    }
};

// Delete image
const deleteImage = async (public_id) => {
    try {
        if (!isCloudinaryConfigured()) {
            throw new Error('Cloudinary configuration is required for image deletion');
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
    uploadBufferToCloudinary,
    deleteImage,
    isCloudinaryConfigured,
};
