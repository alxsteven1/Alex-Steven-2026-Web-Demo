import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Matches your GitHub repo name exactly
  basePath: '/Alex-Steven-2026-Web-Demo',
  assetPrefix: '/Alex-Steven-2026-Web-Demo',
  images: {
    unoptimized: true,
  },
  // CHANGE THIS LINE: Renamed from 'turbopack' to 'turbo'
  turbo: { 
    rules: {
      "**/*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  reactCompiler: true,
};

export default nextConfig;
