import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
     domains: ['res.cloudinary.com', "www.pexels.com", "images.pexels.com"],
  }
};

export default nextConfig;
