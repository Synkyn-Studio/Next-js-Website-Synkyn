import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

/* Web app manifest: name, colours and icons for Android / "Add to Home Screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Synkyn",
    description: "AI film studio and creative production in Bengaluru.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      { src: "/images/icon-192.png?v=2", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/icon-512.png?v=2", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
