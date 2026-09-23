import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* robots.txt — same rules as the static site, for the clean URLs. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/printalbum"],
      // Prevent indexing of 404 and unnecessary crawling of vendor assets and videos.
      disallow: ["/404", "/404.html", "/vendor/", "/video/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
