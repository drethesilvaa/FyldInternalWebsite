/**
 * Optimizes an image URL with quality 75 and max Full HD dimensions (1920x1080)
 * Handles both local images and Strapi URLs
 * @param imageUrl - The image URL to optimize
 * @param quality - Image quality (default: 75)
 * @param maxWidth - Maximum width in pixels (default: 1920)
 * @param maxHeight - Maximum height in pixels (default: 1080)
 * @returns Optimized image URL
 */
export function optimizeImage(
  imageUrl: string,
  quality: number = 75,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): string {
  if (!imageUrl) return "";

  // Check if it's a local image path
  if (imageUrl.startsWith("/")) {
    // Use the API route to optimize local images
    const params = new URLSearchParams({
      path: imageUrl,
      quality: quality.toString(),
      width: maxWidth.toString(),
      height: maxHeight.toString(),
    });

    return `/api/optimize-image?${params.toString()}`;
  }

  // Check if it's a Strapi uploads URL
  if (imageUrl.includes("/uploads/")) {
    // Use Strapi's image transformation format
    const params = new URLSearchParams({
      quality: quality.toString(),
      width: maxWidth.toString(),
      height: maxHeight.toString(),
      fit: "inside", // Maintains aspect ratio
    });

    return `${imageUrl}?${params.toString()}`;
  }

  // For external CDN URLs (Cloudinary, etc.), return as-is
  return imageUrl;
}

/**
 * Alternative version using Strapi's transform API
 * @param imagePath - Path to the image (e.g., '/uploads/image.jpg')
 * @param quality - Image quality (default: 75)
 * @param maxWidth - Maximum width in pixels (default: 1920)
 * @param maxHeight - Maximum height in pixels (default: 1080)
 * @returns Optimized image URL
 */
export function optimizeStrapiImage(
  imagePath: string,
  quality: number = 75,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): string {
  if (!imagePath) return "";

  const { strapiUrl } = require("@/data/strapiUrl");

  const params = new URLSearchParams({
    quality: quality.toString(),
    width: maxWidth.toString(),
    height: maxHeight.toString(),
    fit: "inside",
  });

  return `${strapiUrl}${imagePath}?${params.toString()}`;
}
