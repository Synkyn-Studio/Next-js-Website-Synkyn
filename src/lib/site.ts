/* Site-wide constants shared by metadata, routing and components. */

export const SITE_URL = "https://www.synkynstudios.com";
export const SITE_NAME = "Synkyn Studios";
export const CONTACT_EMAIL = "contact@synkynstudios.com";
export const GTM_ID = "GTM-KLBKS7TM";
export const GA_ID = "G-PST0K7RG3R";

export const ASSET_VERSION = "3";

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

export const APPLE_TUNED_ROUTES = new Set<string>([ROUTES.home, ROUTES.library, ROUTES.printAlbum]);

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export function normalisePath(pathname: string) {
  let p = pathname.replace(/\/index\.html?$/i, "/").replace(/\.html$/i, "").replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}
