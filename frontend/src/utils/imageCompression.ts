const TARGET_BLOG_THUMBNAIL_BYTES = 80 * 1024;
const MAX_BLOG_THUMBNAIL_WIDTH = 1200;
const MIN_BLOG_THUMBNAIL_WIDTH = 640;
const INITIAL_WEBP_QUALITY = 0.78;
const MIN_WEBP_QUALITY = 0.48;

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read selected image'));
    };

    image.src = objectUrl;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error('Unable to compress selected image'));
      },
      type,
      quality
    );
  });

const getResizedDimensions = (width: number, height: number, maxWidth: number) => {
  if (width <= maxWidth) {
    return { width, height };
  }

  const ratio = maxWidth / width;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
};

const getCompressedName = (name: string) =>
  name.replace(/\.[a-z0-9]+$/i, '') + '-compressed.webp';

export const compressBlogThumbnail = async (file: File): Promise<File> => {
  if (file.size <= TARGET_BLOG_THUMBNAIL_BYTES && file.type === 'image/webp') {
    return file;
  }

  const image = await loadImage(file);
  let maxWidth = Math.min(MAX_BLOG_THUMBNAIL_WIDTH, image.naturalWidth || image.width);
  let bestBlob: Blob | null = null;

  while (maxWidth >= MIN_BLOG_THUMBNAIL_WIDTH) {
    const { width, height } = getResizedDimensions(
      image.naturalWidth || image.width,
      image.naturalHeight || image.height,
      maxWidth
    );

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Image compression is not supported in this browser');
    }

    context.drawImage(image, 0, 0, width, height);

    for (let quality = INITIAL_WEBP_QUALITY; quality >= MIN_WEBP_QUALITY; quality -= 0.08) {
      const blob = await canvasToBlob(canvas, 'image/webp', Number(quality.toFixed(2)));
      bestBlob = blob;

      if (blob.size <= TARGET_BLOG_THUMBNAIL_BYTES) {
        return new File([blob], getCompressedName(file.name), {
          type: 'image/webp',
          lastModified: Date.now(),
        });
      }
    }

    maxWidth = Math.floor(maxWidth * 0.86);
  }

  if (!bestBlob) {
    return file;
  }

  return new File([bestBlob], getCompressedName(file.name), {
    type: 'image/webp',
    lastModified: Date.now(),
  });
};

export const formatImageSize = (bytes: number) => `${Math.round(bytes / 1024)}KB`;
