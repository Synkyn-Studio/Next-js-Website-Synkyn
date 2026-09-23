import type { MetadataRoute } from "next";
import { absoluteUrl, ROUTES } from "@/lib/site";

const LAST_MODIFIED = "2026-09-07";

/* sitemap.xml — same pages, change frequencies and priorities as the static site. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, changeFrequency: "weekly" | "monthly" | "yearly", priority: number) => ({
    url: absoluteUrl(path),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  });
  return [
    entry(ROUTES.home, "weekly", 1.0),
    entry(ROUTES.about, "monthly", 0.8),
    entry(ROUTES.library, "weekly", 0.9),
    entry(ROUTES.contact, "monthly", 0.7),
    entry(ROUTES.printAlbum, "monthly", 0.8),
    entry(ROUTES.terms, "yearly", 0.5),
  ];
}
