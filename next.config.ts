import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Removed basePath and assetPrefix because we are now on a custom root domain
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
