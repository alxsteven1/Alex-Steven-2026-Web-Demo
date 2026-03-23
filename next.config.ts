import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Change this to match your EXACT repository name on GitHub
  basePath: '/Alex-Steven-2026-Web-Demo', 
  assetPrefix: '/Alex-Steven-2026-Web-Demo',
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      // The "**/" is the magic fix for your subfolder shaders
      "**/*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  reactCompiler: true,
};

export default nextConfig;
