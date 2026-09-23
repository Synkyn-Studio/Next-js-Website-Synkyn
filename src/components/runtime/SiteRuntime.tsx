"use client";

/*
  Layout-level runtime, mounted once for the whole session.

  Owns the behaviours that lived in every page's shared scripts (fx.js,
  navbar.js, the header/menu parts of main.js, the gradual blur bar and the
  one-click email CTA) and adapts the "every page is a fresh document"
  assumptions of those scripts to client-side navigation.
*/

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ambientCrystals, contentProtection } from "@/behaviors/ambient-fx";
import { emailCta } from "@/behaviors/email-cta";
import { gradualBlur } from "@/behaviors/gradual-blur";
import {
  backToTop,
  headerScrollState,
  markCurrentLinks,
  megaMenus,
  mobileNavigation,
  type MobileNavApi,
  samePageLinkGuard,
  scrollToHash,
} from "@/behaviors/site-chrome";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";

interface ChromeApi {
  hideMenus(): void;
  mobile: MobileNavApi | null;
}

/** navbar.js active-link logic for the mobile panel (file + hash match first). */
function markMobileActive(pathname: string) {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  const links = Array.from(sidebar.querySelectorAll<HTMLElement>("[data-path]"));
  links.forEach((l) => l.classList.remove("active"));
  const file = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}.html`;
  const hash = window.location.hash;
  let matched = false;
  if (hash) links.forEach((l) => { if (l.getAttribute("data-path") === file + hash) { l.classList.add("active"); matched = true; } });
  if (!matched) links.forEach((l) => { const dp = l.getAttribute("data-path") || ""; if (!dp.includes("#") && dp === file) l.classList.add("active"); });
}

// useLayoutEffect warns during SSR; this component only renders on the client tree anyway.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function SiteRuntime() {
  const pathname = usePathname() || "/";
  const api = useRef<ChromeApi | null>(null);
  const suppressMenusUntil = useRef(0);
  const isFirstRoute = useRef(true);
  const cameFromHistory = useRef(false);

  useImmediateBehavior("ambient-fx", ambientCrystals);
  useImmediateBehavior("content-protection", contentProtection);
  useImmediateBehavior("email-cta", emailCta);

  useImmediateBehavior("history-tracking", (scope) => {
    scope.on(window, "popstate", () => { cameFromHistory.current = true; });
  });

  useBehavior("site-chrome", (scope) => {
    headerScrollState(scope);
    const menus = megaMenus(scope);
    const mobile = mobileNavigation(scope);
    backToTop(scope);
    gradualBlur(scope);

    const closeMenus = () => {
      menus.hideAll();
      suppressMenusUntil.current = Date.now() + 700;
      if (mobile && mobile.isOpen()) mobile.close();
    };
    // navbar.js: main.js re-opens a menu while the pointer is still over it; veto briefly.
    scope.on(document, "menu:show", (e: Event) => {
      if (Date.now() > suppressMenusUntil.current) return;
      const d = (e as CustomEvent<{ menu?: HTMLElement; navItem?: HTMLElement }>).detail || {};
      if (d.menu) d.menu.classList.remove("active");
      if (d.navItem) d.navItem.classList.remove("active", "menu-active");
    });
    samePageLinkGuard(scope, closeMenus);
    scope.on(window, "hashchange", () => scrollToHash(window.location.hash));

    api.current = { hideMenus: closeMenus, mobile };
    scope.add(() => { api.current = null; });
  });

  // Route change: reset scroll like a fresh document load would. Back/forward
  // navigations keep the restored position, but Lenis still has to be told
  // about it or its next frame would animate back to the old offset.
  useIsoLayoutEffect(() => {
    if (isFirstRoute.current) return;
    const fromHistory = cameFromHistory.current;
    cameFromHistory.current = false;
    const lenis = window.lenis;
    const syncLenis = (to: number) => {
      if (!lenis) return;
      lenis.reset?.();
      lenis.scrollTo(to, { immediate: true, force: true });
    };
    if (fromHistory || window.location.hash) {
      // The browser restores the scroll position asynchronously and does not
      // always emit a scroll event for it, so re-sync over the next frames.
      const resync = () => syncLenis(window.scrollY || 0);
      requestAnimationFrame(() => requestAnimationFrame(resync));
      const t1 = window.setTimeout(resync, 300);
      const t2 = window.setTimeout(resync, 800);
      return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }
    syncLenis(0);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const first = isFirstRoute.current;
    isFirstRoute.current = false;
    markCurrentLinks();
    markMobileActive(pathname);

    let hashTimer: number | undefined;
    if (!first && api.current) {
      api.current.hideMenus();
      api.current.mobile?.rearmGrace();
    }
    if (window.location.hash) {
      const hash = window.location.hash;
      hashTimer = window.setTimeout(() => scrollToHash(hash), 500);
    }
    const frame = window.requestAnimationFrame(() => {
      if (!first && window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
    return () => {
      window.clearTimeout(hashTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
