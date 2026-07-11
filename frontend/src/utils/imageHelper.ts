const apiUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
const fallbackBlogImage = '/blogs/blogs-1.jpg';
const productionBackendHost = 'tech-unique-iit-solutions-llp-updat.vercel.app';

const normalizeImageUrl = (url: string): string => {
  if (url.startsWith(`http://${productionBackendHost}`)) {
    return url.replace('http://', 'https://');
  }

  return url;
};

/**
 * Formats image URLs to ensure they have the correct base URL.
 * Falls back to a local image when the backend/default image is missing.
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  const normalizedPath = imagePath?.trim();

  if (!normalizedPath || normalizedPath === 'default-blog.jpg') {
    return fallbackBlogImage;
  }

  if (normalizedPath.startsWith('http') || normalizedPath.startsWith('https')) {
    return normalizeImageUrl(normalizedPath);
  }

  if (normalizedPath.startsWith('/')) {
    return normalizedPath;
  }

  return `${apiUrl}/uploads/${normalizedPath}`;
};

export const applyBlogImageFallback = (image: HTMLImageElement) => {
  image.onerror = null;
  image.src = fallbackBlogImage;
};
