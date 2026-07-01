const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const fallbackBlogImage = '/blogs/blogs-1.jpg';

/**
 * Formats image URLs to ensure they have the correct base URL.
 * Falls back to a local image when the backend/default image is missing.
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath || imagePath === 'default-blog.jpg') {
    return fallbackBlogImage;
  }

  if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  return `${apiUrl}/uploads/${imagePath}`;
};

export const applyBlogImageFallback = (image: HTMLImageElement) => {
  image.onerror = null;
  image.src = fallbackBlogImage;
};
