import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Avoids fs errors when using some Node packages client-side
    };
    return config;
  },
  // Optional: include custom env vars if you want them accessible on the client
  // Be cautious exposing secrets in env
  env: {
    NEXT_PUBLIC_APP_NAME: 'Beth AI Assistant', // safe public vars
  },
};

export default nextConfig;
