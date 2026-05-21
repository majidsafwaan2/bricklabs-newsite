import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  typedRoutes: false,
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
