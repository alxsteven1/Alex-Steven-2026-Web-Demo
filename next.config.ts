import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Alex-Steven-2026-Web-Demo',
  assetPrefix: '/Alex-Steven-2026-Web-Demo',
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {
      rules: {
        // We'll use individual rules to be 100% safe with the file paths
        "**/*.glsl": { loaders: ["raw-loader"], as: "*.js" },
        "**/*.vs": { loaders: ["raw-loader"], as: "*.js" },
        "**/*.fs": { loaders: ["raw-loader"], as: "*.js" },
        "**/*.vert": { loaders: ["raw-loader"], as: "*.js" },
        "**/*.frag": { loaders: ["raw-loader"], as: "*.js" },
      },
    },
  },
  reactCompiler: true,
};

export default nextConfig;
