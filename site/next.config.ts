import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hosted as static assets on Cloudflare Workers (see wrangler.jsonc), so the site is exported to `out/`.
  output: "export",
  images: {
    // The default image optimizer needs a server; assets are pre-optimized instead.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
