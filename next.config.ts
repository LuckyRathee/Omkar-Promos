import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/site";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Sample thumbnails still live on the old site until high-res photos replace them.
    remotePatterns: [new URL("https://www.omkarpromos.com/graphics/thumbs/**")],
  },
  experimental: {
    serverActions: {
      // Quote form: up to 3 artwork files of 8 MB each, plus multipart overhead.
      bodySizeLimit: "25mb",
    },
  },
  redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
