import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Alex-Steven-2026-Web-Demo',
  assetPrefix: '/Alex-Steven-2026-Web-Demo',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
