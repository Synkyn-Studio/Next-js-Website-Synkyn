/*
  Vendor bundles from /public/vendor, loaded exactly once.

  What the pages actually animate with: the GSAP core, ScrollTrigger, Lenis and
  Springer. These are rendered as deferred tags in the document so the scroll
  and reveal engines are ready as early as possible. (SplitText, DrawSVG and
  MotionPath came with the original template but nothing here uses them, so
  they are no longer shipped.)

  Lenis carries its version in the file name: /vendor is cached for a day, and
  a new name guarantees nobody runs new code against a stale Lenis.
*/
export const VENDOR_SCRIPTS = [
  "/vendor/gsap.min.js",
  "/vendor/scroll-trigger.min.js",
  "/vendor/lenis-1.3.26.min.js",
  "/vendor/springer.min.js",
] as const;

export const VIMEO_PLAYER_API = "https://player.vimeo.com/api/player.js";

const pending = new Map<string, Promise<void>>();

/** Inject a classic script once; resolves when it has executed. */
export function loadScript(src: string, id?: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const existing = pending.get(src);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    let tagged = id ? (document.getElementById(id) as HTMLScriptElement | null) : null;
    if (tagged && tagged.dataset.loaded === "true") return resolve();
    // A tag started early (the home loader starts the Vimeo API) that failed: retry fresh.
    if (tagged && tagged.dataset.failed === "true") { tagged.remove(); tagged = null; }
    const el = tagged ?? document.createElement("script");
    el.src = src;
    el.async = false; // preserve insertion order, like `defer`
    if (id) el.id = id;
    el.addEventListener("load", () => {
      el.dataset.loaded = "true";
      resolve();
    }, { once: true });
    el.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
    if (!tagged) document.head.appendChild(el);
  });
  pending.set(src, promise);
  return promise;
}

let vendorsPromise: Promise<void> | null = null;

const vendorsReady = () => !!(window.gsap && window.ScrollTrigger && window.Lenis && window.Springer);

/**
 * Resolves once GSAP, its plugins, Lenis and Springer are available globally.
 *
 * The root layout renders these as deferred <script> tags, so the browser's
 * preload scanner starts them with the document and they execute before
 * hydration — the same timing the static pages had. This waits for that;
 * if the tags are missing it falls back to injecting them.
 */
export function loadVendors(): Promise<void> {
  if (!vendorsPromise) {
    const inject = () => Promise.all(VENDOR_SCRIPTS.map((src) => loadScript(src))).then(() => undefined);
    vendorsPromise = new Promise<void>((resolve, reject) => {
      if (vendorsReady()) return resolve();
      if (!document.querySelector('script[data-vendor="synkyn"]')) return inject().then(resolve, reject);
      const start = performance.now();
      const check = () => {
        if (vendorsReady()) return resolve();
        // A blocked or failed tag should not stall animations forever.
        if (performance.now() - start > 8000) return inject().then(resolve, reject);
        requestAnimationFrame(check);
      };
      check();
    });
  }
  return vendorsPromise;
}

/** The Vimeo Player API (used by the home hero and the Library modal). */
export function loadVimeoApi(): Promise<void> {
  if (typeof window !== "undefined" && window.Vimeo && window.Vimeo.Player) return Promise.resolve();
  return loadScript(VIMEO_PLAYER_API, "vimeo-api-js");
}
