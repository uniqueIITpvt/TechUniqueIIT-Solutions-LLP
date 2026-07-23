const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const path = require('path');

const isCloudinaryConfigured = () => {
    return (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
};

if (isCloudinaryConfigured()) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary configured successfully');
} else {
    console.warn('Cloudinary not configured. Image and resume uploads are disabled.');
}

const buildUploadOptions = (originalName) => ({
    folder: 'blog-images',
    resource_type: 'image',
    use_filename: true,
    unique_filename: false,
    filename_override: Date.now() + '-' + originalName.replace(/\s+/g, '-'),
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
        throw new Error('Error uploading image: ' + error.message);
    }
};

const deleteImage = async (public_id) => {
    try {
        if (!isCloudinaryConfigured()) {
            throw new Error('Cloudinary configuration is required for image deletion');
        }

        await cloudinary.uploader.destroy(public_id);
        return { message: 'Image deleted successfully from Cloudinary' };
    } catch (error) {
        console.error('Image deletion error:', error);
        throw new Error('Error deleting image: ' + error.message);
    }
};

const getSafeResumeName = (originalName) => {
    const extension = path.extname(originalName).toLowerCase();
    const baseName = path
        .basename(originalName, extension)
        .replace(/[^a-z0-9_-]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'resume';

    return {
        format: extension.replace(/^\./, ''),
        publicId:
            'job-resumes/' +
            Date.now() +
            '-' +
            crypto.randomBytes(6).toString('hex') +
            '-' +
            baseName +
            extension,
    };
};

const uploadPrivateResume = async (file) => {
    if (!isCloudinaryConfigured()) {
        throw new Error('Cloudinary configuration is required for resume uploads');
    }

    if (!file || !Buffer.isBuffer(file.data) || file.data.length === 0) {
        throw new Error('Uploaded resume data is empty');
    }

    const { format, publicId } = getSafeResumeName(file.name);

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: 'raw',
                type: 'authenticated',
                use_filename: false,
                unique_filename: false,
            },
            (error, uploadResult) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(uploadResult);
            }
        );

        stream.end(file.data);
    });

    if (!result?.public_id) {
        throw new Error('Cloudinary did not return a resume identifier');
    }

    return {
        public_id: result.public_id,
        format: result.format || format,
    };
};

const deleteResume = async (publicId) => {
    if (!isCloudinaryConfigured()) {
        throw new Error('Cloudinary configuration is required for resume deletion');
    }

    return cloudinary.uploader.destroy(publicId, {
        resource_type: 'raw',
        type: 'authenticated',
        invalidate: true,
    });
};

const createResumeDownloadUrl = ({ publicId, format }) => {
    if (!isCloudinaryConfigured()) {
        throw new Error('Cloudinary configuration is required for resume downloads');
    }

    const normalizedFormat = String(format || path.extname(publicId) || '')
        .replace(/^\./, '')
        .toLowerCase();

    return cloudinary.utils.private_download_url(
        publicId,
        normalizedFormat,
        {
            resource_type: 'raw',
            type: 'authenticated',
            attachment: true,
            expires_at: Math.floor(Date.now() / 1000) + 5 * 60,
        }
    );
};

module.exports = {
    uploadImage,
    uploadFilePathToCloudinary,
    uploadBufferToCloudinary,
    deleteImage,
    uploadPrivateResume,
    deleteResume,
    createResumeDownloadUrl,
    isCloudinaryConfigured,
};
