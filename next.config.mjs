/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Ensure Turbopack resolves modules from the project folder when multiple lockfiles exist
  turbopack: {
    root: './'
  },
  env: {
    NEXT_PUBLIC_CDN_BASE: 'https://cdn.jsdelivr.net/gh/ConnorKnoetze/connorknoetze.com@main/public/images/'
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};
export default nextConfig;
