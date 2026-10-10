/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local SVG placeholders are served as-is (see SmartImage). When you swap in
    // real photos, put them in /public/images (JPG/WebP) and they get optimised.
    // If you prefer hosted photos, add the host below, e.g. images.unsplash.com.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
export default nextConfig;
