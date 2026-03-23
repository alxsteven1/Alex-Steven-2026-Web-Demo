import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Alex-Steven-2026-Web-Demo',
  assetPrefix: '/Alex-Steven-2026-Web-Demo',
  images: {
    unoptimized: true,
  },
  
  // 1. WEBPACK CONFIG: The standard engine for Next.js production builds
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source', // Native Webpack 5 method (no raw-loader needed)
    });
    return config;
  },

  // 2. TURBOPACK CONFIG: Just in case Next.js 16 forces it. 
  // (Note: Removed the "**/", Turbopack only wants the extension)
  experimental: {
    turbo: {
      rules: {
        "*.glsl": { loaders: ["raw-loader"], as: "*.js" },
        "*.vs": { loaders: ["raw-loader"], as: "*.js" },
        "*.fs": { loaders: ["raw-loader"], as: "*.js" },
        "*.vert": { loaders: ["raw-loader"], as: "*.js" },
        "*.frag": { loaders: ["raw-loader"], as: "*.js" },
      },
    },
  },
  
  reactCompiler: true,
};

export default nextConfig;
