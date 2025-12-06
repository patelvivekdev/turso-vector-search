import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // ppr: true,
    authInterrupts: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
