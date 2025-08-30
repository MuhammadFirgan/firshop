import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', 
        port: '', 
        pathname: '**', 
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
        port: '', 
        pathname: '**', 
      },
      {
        protocol: 'https',
        hostname: 'atvoriopgkwfdwpqreik.supabase.co', 
        port: '', 
        pathname: '**', 
      },
    ],
  },
};

export default nextConfig;
