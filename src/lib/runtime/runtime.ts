/*
  Runtime bootstrap: vendor libraries + the shared Lenis instance.

  `whenRuntimeReady()` replaces the "deferred scripts + DOMContentLoaded"
  ordering of the static pages: behaviours that needed GSAP/Lenis wait on it,
  behaviours that ran inline during parsing run immediately.
*/

import { APPLE_TUNED_ROUTES, normalisePath } from "@/lib/site";
import { initSmoothScroll } from "./smooth-scroll";
import { loadVendorExtras, loadVendors } from "./vendors";

let ready: Promise<void> | null = null;

export function whenRuntimeReady(): Promise<void> {
  if (!ready) {
    ready = loadVendors().then(() => {
      const path = normalisePath(window.location.pathname);
      initSmoothScroll(APPLE_TUNED_ROUTES.has(path) ? "apple" : "standard");
      loadVendorExtras();
    });
    ready.catch((err) => console.error("[synkyn] vendor bootstrap failed", err));
  }
  return ready;
}

export function isRuntimeReady() {
  return typeof window !== "undefined" && !!window.gsap && !!window.lenis;
}
