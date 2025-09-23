const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Formats image URLs to ensure they have the correct base URL
 * Handles relative paths from the backend, placeholder images, and absolute URLs
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return '/images/placeholder-blog.jpg';
  }

  // If the image is already an absolute URL, return it as is
  if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
    return imagePath;
  }

  // If it's a local image from the public folder
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Otherwise, it's a backend image path, prepend the API URL
  return `${apiUrl}/uploads/${imagePath}`;
}; 