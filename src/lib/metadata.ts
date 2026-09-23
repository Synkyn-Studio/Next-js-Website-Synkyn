/*
  Builds Next.js Metadata / Viewport objects from the per-page values that were
  hard-coded in each static page's <head> (src/data/seo-meta.ts).
*/

import type { Metadata, Viewport } from "next";
import { PAGE_META, type PageKey } from "@/data/seo-meta";

/** Meta names mapped to typed Metadata fields (everything else goes to `other`). */
const HANDLED = new Set([
  "__title", "__canonical", "title", "description", "author", "publisher", "robots", "viewport",
  "theme-color", "google-site-verification", "msvalidate.01", "format-detection", "application-name",
  "og:type", "og:url", "og:site_name", "og:title", "og:description", "og:locale", "og:image",
  "og:image:secure_url", "og:image:type", "og:image:width", "og:image:height", "og:image:alt",
  "twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt",
  "X-UA-Compatible",
]);

export function pageMetadata(key: PageKey): Metadata {
  const m = PAGE_META[key];
  const other: Record<string, string> = {};
  // The static pages repeated the title as <meta name="title">.
  if (m.title) other.title = m.title;
  for (const [name, value] of Object.entries(m)) {
    if (HANDLED.has(name)) continue;
    other[name] = value.replace(/^\.\//, "/").replace(/(["'(])\.\/(images)\//g, "$1/$2/");
  }

  const ogImage = {
    url: m["og:image"],
    ...(m["og:image:secure_url"] ? { secureUrl: m["og:image:secure_url"] } : {}),
    ...(m["og:image:type"] ? { type: m["og:image:type"] } : {}),
    width: Number(m["og:image:width"]),
    height: Number(m["og:image:height"]),
    alt: m["og:image:alt"],
  };

  return {
    title: { absolute: m.__title },
    description: m.description,
    authors: m.author ? [{ name: m.author }] : undefined,
    publisher: m.publisher,
    applicationName: m["application-name"],
    robots: m.robots,
    alternates: {
      canonical: m.__canonical || undefined,
      ...(key === "home" ? { languages: { "x-default": m.__canonical, en: m.__canonical } } : {}),
    },
    ...(m["format-detection"] === "telephone=no" ? { formatDetection: { telephone: false } } : {}),
    verification: {
      google: m["google-site-verification"],
      other: { "msvalidate.01": m["msvalidate.01"] },
    },
    openGraph: {
      type: "website",
      url: m["og:url"],
      siteName: m["og:site_name"],
      title: m["og:title"],
      description: m["og:description"],
      ...(m["og:locale"] ? { locale: m["og:locale"] } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: m["twitter:title"],
      description: m["twitter:description"],
      images: [{ url: m["twitter:image"], ...(m["twitter:image:alt"] ? { alt: m["twitter:image:alt"] } : {}) }],
    },
    other,
  };
}

export function pageViewport(key: PageKey): Viewport {
  const m = PAGE_META[key];
  const parts = Object.fromEntries(
    (m.viewport || "").split(",").map((p) => p.split("=").map((s) => s.trim())).filter((kv) => kv.length === 2),
  ) as Record<string, string>;
  return {
    width: parts.width || "device-width",
    initialScale: parts["initial-scale"] ? Number(parts["initial-scale"]) : 1,
    ...(parts["maximum-scale"] ? { maximumScale: Number(parts["maximum-scale"]) } : {}),
    ...(parts["user-scalable"] ? { userScalable: parts["user-scalable"] !== "no" } : {}),
    ...(parts["viewport-fit"] ? { viewportFit: parts["viewport-fit"] as Viewport["viewportFit"] } : {}),
    themeColor: m["theme-color"],
  };
}
