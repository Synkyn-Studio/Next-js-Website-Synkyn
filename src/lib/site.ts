/* Site-wide constants shared by metadata, routing and components. */

export const SITE_URL = "https://www.synkynstudios.com";
export const SITE_NAME = "Synkyn Studios";
export const CONTACT_EMAIL = "contact@synkynstudios.com";
export const GTM_ID = "GTM-KLBKS7TM";
export const GA_ID = "G-PST0K7RG3R";

/** Cache-busting query for the unprocessed files in /public/assets. Bump when they change. */
export const ASSET_VERSION = "1";

/** <body> classes used by every page except 404. */
export const DEFAULT_BODY_CLASS = "bg-background-3 dark:bg-helix-blue-dark-2";

export const ROUTES = {
  home: "/",
  about: "/about-us",
  team: "/about-us#team",
  library: "/library",
  contact: "/contact",
  printAlbum: "/printalbum",
  terms: "/terms",
} as const;

export type RoutePath = (typeof ROUTES)[Exclude<keyof typeof ROUTES, "team">];

/** Pages that used the Apple-tuned Lenis configuration on the static site. */
export const APPLE_TUNED_ROUTES = new Set<string>([ROUTES.home, ROUTES.library, ROUTES.printAlbum]);

/** Canonical URL for a route (clean URLs, no .html). */
export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** Normalises a pathname the way navbar.js did ("/index.html" === "/", no trailing slash). */
export function normalisePath(pathname: string) {
  let p = pathname.replace(/\/index\.html?$/i, "/").replace(/\.html$/i, "").replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}
