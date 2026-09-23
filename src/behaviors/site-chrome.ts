/*
  Persistent site chrome behaviours (header, mega menus, mobile panel,
  back-to-top, same-page link guard, hash scrolling, current-link marking).

  Ported from assets/navbar.js and the header/menu modules of assets/main.js.
  These are mounted once by <SiteRuntime> and survive client-side navigation.
*/

import type { Scope } from "@/lib/runtime/scope";
import { expoEase, refreshScrollChrome, smoothScrollTo } from "@/lib/runtime/smooth-scroll";
import { normalisePath } from "@/lib/site";

const lenis = () => (typeof window !== "undefined" && window.lenis ? window.lenis : null);
const readScroll = () => {
  const l = lenis();
  if (l && typeof l.scroll === "number") return l.scroll;
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

/* ------------------------------------------------------------------ *
 * main.js — headerTwo(): condensed header once scrolled past 150px.
 * ------------------------------------------------------------------ */
export function headerScrollState(scope: Scope) {
  const header = document.querySelector<HTMLElement>(".header-two");
  if (!header) return;
  /*
    main.js rewrote the transition, the offset and the class on every single
    scroll event, from a non-passive listener. There are only two states, so the
    writes happen when the state actually flips; the rest of the time scrolling
    does not touch the header at all. This matters most over the pinned section,
    where every avoidable write in the scroll path shows up as jitter.
  */
  let scrolled: boolean | null = null;
  let ticking = false;
  const apply = () => {
    ticking = false;
    const next = window.scrollY > 150;
    if (next === scrolled) return;
    scrolled = next;
    if (next) {
      header.style.transition = "top 0.5s ease-in-out, background-color 0.5s ease-in-out";
      header.style.top = "20px";
      header.classList.add("header-two-scroll");
    } else {
      header.classList.remove("header-two-scroll");
      header.style.top = "50px";
    }
  };
  scope.on(window, "scroll", () => { if (!ticking) { ticking = true; scope.raf(apply); } }, { passive: true });
}

/* ------------------------------------------------------------------ *
 * main.js — desktop mega-menu hover controller (class Y).
 * ------------------------------------------------------------------ */
export function megaMenus(scope: Scope) {
  let menuTimeout: number | null = null;
  let isMouseInHeader = false;
  let isMouseInMenu = false;
  const MENU_SEL = ".mega-menu, .dropdown-menu";
  const BRIDGE_SEL = ".mega-menu-bridge, .dropdown-menu-bridge";
  const ANY_MENU_SEL = ".mega-menu, .dropdown-menu, .mega-menu-bridge, .dropdown-menu-bridge";

  const dispatch = (name: string, detail: unknown) => document.dispatchEvent(new CustomEvent(name, { detail }));
  const cancelHide = () => { if (menuTimeout) { scope.clearTimeout(menuTimeout); menuTimeout = null; } };
  const hideMenu = (menu: HTMLElement) => {
    const navItem = document.querySelector<HTMLElement>(`[data-menu="${menu.id}"]`);
    menu.classList.remove("active");
    if (navItem) {
      navItem.classList.remove("active", "menu-active");
      const bridge = navItem.querySelector<HTMLElement>(BRIDGE_SEL);
      if (bridge) { bridge.style.opacity = "0"; bridge.style.pointerEvents = "none"; }
    }
    dispatch("menu:hide", { navItem, menu });
  };
  const hideAll = () => {
    document.querySelectorAll<HTMLElement>(MENU_SEL).forEach(hideMenu);
    document.querySelectorAll(".nav-item[data-menu]").forEach((n) => n.classList.remove("active", "menu-active"));
  };
  const scheduleHide = () => {
    cancelHide();
    menuTimeout = scope.timeout(() => { if (!isMouseInHeader && !isMouseInMenu) hideAll(); }, 200);
  };
  const showMenu = (navItem: HTMLElement, menu: HTMLElement) => {
    cancelHide();
    hideAll();
    navItem.classList.add("active");
    menu.classList.add("active");
    navItem.classList.add("menu-active");
    const bridge = navItem.querySelector<HTMLElement>(BRIDGE_SEL);
    if (bridge) { bridge.style.opacity = "1"; bridge.style.pointerEvents = "auto"; }
    dispatch("menu:show", { navItem, menu });
  };

  document.querySelectorAll<HTMLElement>(".nav-item[data-menu]").forEach((navItem) => {
    const menu = document.getElementById(navItem.getAttribute("data-menu") || "");
    if (!menu) return;
    scope.on(navItem, "mouseenter", () => showMenu(navItem, menu));
    scope.on(navItem, "mouseleave", (e: MouseEvent) => {
      const to = e.relatedTarget as Node | null;
      if (!(to && menu.contains(to))) scheduleHide();
    });
    scope.on(menu, "mouseenter", () => { cancelHide(); showMenu(navItem, menu); });
    scope.on(menu, "mouseleave", (e: MouseEvent) => {
      const to = e.relatedTarget as Node | null;
      if (!(to && navItem.contains(to))) scheduleHide();
    });
  });
  scope.on(document, "click", (e: MouseEvent) => {
    const t = e.target as Element | null;
    if (t && typeof t.closest === "function" && !t.closest(".nav-item") && !t.closest(MENU_SEL)) hideAll();
  });
  const header = document.querySelector("header");
  if (header) {
    scope.on(header, "mouseenter", () => { isMouseInHeader = true; cancelHide(); });
    scope.on(header, "mouseleave", (e: MouseEvent) => {
      isMouseInHeader = false;
      const t = e.relatedTarget as Element | null;
      if (!(t && (t.closest(".mega-menu") || t.closest(".dropdown-menu")))) scheduleHide();
    });
  }
  scope.on(document, "mouseenter", (e: Event) => {
    const t = e.target as Element | null;
    if (t && typeof t.closest === "function" && t.closest(ANY_MENU_SEL)) { isMouseInMenu = true; cancelHide(); }
  }, true);
  scope.on(document, "mouseleave", (e: MouseEvent) => {
    const t = e.target as Element | null;
    if (t && typeof t.closest === "function" && t.closest(ANY_MENU_SEL)) {
      isMouseInMenu = false;
      const to = e.relatedTarget as Element | null;
      if (!(to && typeof to.closest === "function" && (to.closest("header") || to.closest(".mega-menu") || to.closest(".dropdown-menu") || to.closest(".mega-menu-bridge") || to.closest(".dropdown-menu-bridge")))) scheduleHide();
    }
  }, true);
  scope.on(document, "mouseleave", () => hideAll());

  return { hideAll };
}

/* ------------------------------------------------------------------ *
 * navbar.js — mobile panel open/close, scroll lock, hide-on-scroll.
 * ------------------------------------------------------------------ */
export interface MobileNavApi {
  close(): void;
  isOpen(): boolean;
  rearmGrace(): void;
}

export function mobileNavigation(scope: Scope): MobileNavApi | null {
  const navbar = document.querySelector<HTMLElement>(".header-two");
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  if (!navbar) return null;

  let overlay = document.querySelector<HTMLElement>(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
    const created = overlay;
    scope.add(() => created.remove());
  }
  const ov = overlay;

  const lockScroll = () => {
    document.body.classList.add("overflow-hidden", "mobile-menu-active");
    const l = lenis(); if (l && typeof l.stop === "function") l.stop();
  };
  const unlockScroll = () => {
    document.body.classList.remove("overflow-hidden", "mobile-menu-active");
    const l = lenis(); if (l && typeof l.start === "function") l.start();
  };
  const hamburger = navbar.querySelector<HTMLElement>(".nav-hamburger");
  const isOpen = () => !!sidebar && sidebar.classList.contains("show-sidebar");
  /*
    The closed panel is only translated off-screen, so without `inert` its
    links stay in the tab order and screen readers read a menu nobody can see.
  */
  const setExpanded = (open: boolean) => {
    if (sidebar) sidebar.inert = !open;
    if (hamburger) hamburger.setAttribute("aria-expanded", String(open));
  };
  setExpanded(isOpen());
  scope.add(() => { if (sidebar) sidebar.inert = false; });
  const openMenu = () => {
    if (!sidebar) return;
    navbar.classList.remove("nav-hidden");
    sidebar.classList.add("show-sidebar");
    ov.classList.add("show-overlay");
    lockScroll();
    setExpanded(true);
    // The panel transitions `visibility` from hidden, and a hidden element
    // refuses focus — move focus in once the transition has started.
    scope.raf(() => scope.raf(() => {
      if (isOpen()) sidebar.querySelector<HTMLElement>(".mobile-menu-close, a[href]")?.focus({ preventScroll: true });
    }));
  };
  const closeMenu = () => {
    if (!sidebar) return;
    const hadFocus = sidebar.contains(document.activeElement);
    sidebar.classList.remove("show-sidebar");
    ov.classList.remove("show-overlay");
    unlockScroll();
    setExpanded(false);
    if (hadFocus) hamburger?.focus({ preventScroll: true });
  };
  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  if (hamburger) {
    scope.on(hamburger, "click", (e: MouseEvent) => {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      toggleMenu();
    }, { capture: true });
  }
  scope.on(ov, "click", closeMenu);
  const closeBtn = sidebar ? sidebar.querySelector<HTMLElement>(".mobile-menu-close") : null;
  if (closeBtn) scope.on(closeBtn, "click", closeMenu);
  if (sidebar) scope.on(sidebar, "click", (e: MouseEvent) => { if ((e.target as Element).closest("a")) closeMenu(); });
  scope.on(window, "keydown", (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen()) closeMenu(); });
  scope.on(window, "resize", () => {
    if (window.innerWidth >= 1280 && isOpen()) closeMenu();
    navbar.classList.remove("nav-hidden");
  }, { passive: true });

  // Scroll-aware hide / reveal
  let lastY = readScroll();
  let ticking = false;
  const DELTA = 8;
  const TOP_BAND = 80;
  let readyForHide = false;
  let graceTimer: number | null = null;
  const rearmGrace = () => {
    readyForHide = false;
    navbar.classList.remove("nav-hidden");
    lastY = readScroll();
    scope.clearTimeout(graceTimer);
    graceTimer = scope.timeout(() => {
      readyForHide = true;
      lastY = readScroll();
      navbar.classList.remove("nav-hidden");
    }, 2200);
  };

  const update = () => {
    ticking = false;
    let y = readScroll();
    if (y < 0) y = 0;
    if (isOpen()) { lastY = y; return; }
    if (!readyForHide) { navbar.classList.remove("nav-hidden"); lastY = y; return; }
    if (y <= TOP_BAND) { navbar.classList.remove("nav-hidden"); lastY = y; return; }
    const docH = document.documentElement.scrollHeight;
    const winH = window.innerHeight;
    if (y + winH >= docH - 8) { lastY = y; return; }
    const delta = y - lastY;
    if (Math.abs(delta) < DELTA) return;
    if (delta > 0) navbar.classList.add("nav-hidden");
    else navbar.classList.remove("nav-hidden");
    lastY = y;
  };
  const onScroll = () => { if (!ticking) { scope.raf(update); ticking = true; } };

  rearmGrace();
  scope.on(window, "scroll", onScroll, { passive: true });
  scope.lenisOn("scroll", onScroll);
  scope.on(window, "pageshow", () => { navbar.classList.remove("nav-hidden"); lastY = readScroll(); });
  update();

  return { close: closeMenu, isOpen, rearmGrace };
}

/* ------------------------------------------------------------------ *
 * navbar.js — BACK-TO-TOP native fallback + click (with/without Lenis).
 * ------------------------------------------------------------------ */
export function backToTop(scope: Scope) {
  const btn = document.getElementById("back-to-top-btn");
  if (!btn) return;
  let ticking = false;
  const update = () => { ticking = false; refreshScrollChrome(); };
  const onScroll = () => { if (!ticking) { ticking = true; scope.raf(update); } };
  scope.on(window, "scroll", onScroll, { passive: true });
  scope.on(window, "resize", onScroll, { passive: true });
  scope.on(window, "pageshow", update);
  update();
  scope.on(btn, "click", (e: MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(0, { duration: 1.2, easing: expoEase });
  });
}

/* ------------------------------------------------------------------ *
 * Hash scrolling (navbar.js) + in-page anchors (inline Lenis script).
 * ------------------------------------------------------------------ */
export function scrollToHash(hash: string) {
  if (!hash) return;
  try {
    const target = document.querySelector(hash);
    if (target) smoothScrollTo(target, { offset: -100 });
  } catch { /* invalid selector */ }
}

/**
 * Same-page link guard (navbar.js) adapted for client-side routing.
 * Runs in the capture phase on window so it can veto a Next <Link>
 * navigation (Link skips when the event is already defaultPrevented).
 */
export function samePageLinkGuard(scope: Scope, closeMenus: () => void) {
  scope.on(window, "click", (e: MouseEvent) => {
    const el = e.target as Element | null;
    const link = el && typeof el.closest === "function" ? el.closest<HTMLAnchorElement>("a[href]") : null;
    if (!link) return;

    // Links that were `javascript:void(0)` on the static site.
    if (link.hasAttribute("data-noop-link")) { e.preventDefault(); return; }

    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;
    const href = link.getAttribute("href") || "";
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;

    // In-page anchors ("#section"): smooth Lenis scroll + history entry.
    if (href.charAt(0) === "#") {
      if (href.length < 2) return;
      let target: Element | null = null;
      try { target = document.querySelector(href); } catch { return; }
      if (!target) return;
      e.preventDefault();
      history.pushState(history.state, "", href);
      smoothScrollTo(target, { offset: -80, duration: 1.2, easing: expoEase });
      return;
    }

    let url: URL;
    try { url = new URL(href, window.location.href); } catch { return; }
    if (url.origin !== window.location.origin) return;
    if (normalisePath(url.pathname) !== normalisePath(window.location.pathname)) return; // Next <Link> navigates

    // Same page with a different hash ("/about-us#team" while on /about-us).
    if (url.hash && url.hash !== window.location.hash) {
      e.preventDefault();
      history.pushState(history.state, "", url.hash);
      scrollToHash(url.hash);
      return;
    }

    // Same page, no new hash: stay put and glide to the top.
    e.preventDefault();
    closeMenus();
    smoothScrollTo(0, { duration: 1.1 });
  }, true);
}

/* ------------------------------------------------------------------ *
 * Current-page marking (navbar.js markCurrent + main.js aria-current).
 * ------------------------------------------------------------------ */
export function markCurrentLinks() {
  const here = normalisePath(window.location.pathname);
  const pathOf = (href: string) => { try { return normalisePath(new URL(href, window.location.href).pathname); } catch { return null; } };
  const hasHash = (href: string) => { try { return !!new URL(href, window.location.href).hash; } catch { return true; } };

  // Clear marks left on persistent chrome by the previous route.
  document.querySelectorAll(".header-two a.is-current, .sidebar a.is-current").forEach((a) => a.classList.remove("is-current"));
  document.querySelectorAll(".header-two a[aria-current], .sidebar a[aria-current]").forEach((a) => a.removeAttribute("aria-current"));

  // main.js: desktop nav links whose pathname matches (hash links included).
  document.querySelectorAll<HTMLAnchorElement>(".header-two nav a[href]").forEach((a) => {
    const h = a.getAttribute("href") || "";
    if (/^(mailto:|tel:|javascript:|#)/i.test(h)) return;
    if (pathOf(h) === here) a.setAttribute("aria-current", "page");
  });
  // navbar.js: header / desktop nav / sidebar / footer links without a hash.
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
    if (!a.closest(".header-two, #desktop-navbar, .sidebar, footer")) return;
    const h = a.getAttribute("href") || "";
    if (!h || h.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(h) || a.hasAttribute("data-noop-link")) return;
    if (hasHash(h)) return;
    if (pathOf(h) === here) { a.classList.add("is-current"); a.setAttribute("aria-current", "page"); }
  });
}
