import type { NextConfig } from "next";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        missing: [{ type: "header", key: "accept", value: ".*text/html.*" }],
        destination: `${BACKEND}/`,
      },
      { source: "/health", destination: `${BACKEND}/health` },
      { source: "/docs", destination: `${BACKEND}/docs` },
      { source: "/docs-json", destination: `${BACKEND}/docs-json` },
      { source: "/api/:path*", destination: `${BACKEND}/api/:path*` },
      { source: "/uploads/:path*", destination: `${BACKEND}/uploads/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
