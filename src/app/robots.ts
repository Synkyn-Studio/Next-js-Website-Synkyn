import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/*
  robots.txt for the clean URLs.
  /vendor/ is deliberately NOT blocked: it holds the GSAP / Lenis scripts the
  pages render with, and crawlers that render JS need them to see the page.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the 404 page out of the index and skip crawling raw video files.
      disallow: ["/404", "/video/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
