import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // For user/organization GitHub Pages (repo named <username>.github.io), DO NOT set basePath or assetPrefix
};
module.exports = nextConfig;

export default nextConfig;
