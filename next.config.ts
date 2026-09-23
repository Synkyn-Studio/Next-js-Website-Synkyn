import path from "node:path";
import type { NextConfig } from "next";

const LEGACY_PAGES = ["about-us", "library", "contact", "printalbum", "terms"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  turbopack: { root: path.resolve(".") },

  // Page CSS is read from src/styles at build time (see components/layout/PageStyle.tsx).
  outputFileTracingIncludes: { "/**": ["./src/styles/**/*.css"] },

  // Old .html URLs (links, bookmarks, search results) keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...LEGACY_PAGES.map((page) => ({ source: `/${page}.html`, destination: `/${page}`, permanent: true })),
    ];
  },

  // Cache policy carried over from the static site's vercel.json.
  async headers() {
    return [
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|mp4|webm|woff|woff2|ttf|otf|eot)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:dir(vendor|assets)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
