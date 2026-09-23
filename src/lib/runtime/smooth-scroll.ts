/*
  Lenis smooth scrolling, ported from the inline `initSmoothScroll` blocks.

  The static pages each created their own Lenis instance with one of two
  configurations: an Apple-tuned profile (Home, Library) and a standard one
  (every other page). With client-side navigation one instance is kept alive
  for the whole session and the active page's profile is applied to it.
*/

export type LenisProfile = "apple" | "standard";

const EXPO = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function platform() {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return { isMac, isIOS };
}

const prefersReducedMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

function profileOptions(profile: LenisProfile) {
  // Reduced motion: native, un-eased wheel scrolling (Lenis still drives
  // ScrollTrigger and anchor links, it just stops animating the wheel).
  if (prefersReducedMotion()) return { lerp: 1, duration: 0, wheelMultiplier: 1.0, smoothWheel: false, lag: 33 };
  if (profile === "apple") {
    const { isMac, isIOS } = platform();
    return {
      lerp: isMac ? 0.16 : 0.12,
      duration: isMac ? 0.7 : 0.9,
      wheelMultiplier: isMac ? 0.95 : 1.0,
      smoothWheel: !isIOS,
      lag: isMac || isIOS ? 16 : 33,
    };
  }
  return { lerp: 0.12, duration: 0.9, wheelMultiplier: 1.0, smoothWheel: true, lag: 33 };
}

let progressEnabled = true;
let activeProfile: LenisProfile = "standard";

/** Pages that commented the progress-bar hook out (About) disable it. */
export function setProgressBarEnabled(enabled: boolean) {
  progressEnabled = enabled;
  const bar = document.getElementById("scroll-progress-bar");
  if (!bar) return;
  if (!enabled) bar.style.transform = "";
  else updateChrome(window.lenis);
}

function updateChrome(e: { scroll?: number; limit?: number } | undefined) {
  try {
    const scrollY = (e && e.scroll) || window.scrollY || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, (e && e.limit) || document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    const bar = document.getElementById("scroll-progress-bar");
    if (bar && progressEnabled) bar.style.transform = `scaleX(${progress})`;
    const btn = document.getElementById("back-to-top-btn");
    if (btn) btn.classList.toggle("is-visible", scrollY > 450);
  } catch {
    /* never let one frame break scrolling */
  }
}

/** Creates the global Lenis instance (once) and wires it to GSAP's ticker. */
export function initSmoothScroll(profile: LenisProfile) {
  if (window.lenis || typeof window.Lenis === "undefined") return window.lenis;
  const opts = profileOptions(profile);
  activeProfile = profile;
  const lenis = new window.Lenis({
    lerp: opts.lerp,
    duration: opts.duration,
    wheelMultiplier: opts.wheelMultiplier,
    touchMultiplier: 1.0,
    smoothWheel: opts.smoothWheel,
    smoothTouch: false,
    orientation: "vertical",
    gestureOrientation: "vertical",
    infinite: false,
    prevent: (node: HTMLElement) => node.classList?.contains("scroll-bar") || node.hasAttribute?.("data-lenis-prevent"),
  });
  window.lenis = lenis;

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.config({ ignoreMobileResize: true });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(500, opts.lag);
  } else {
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  lenis.on("scroll", updateChrome);
  return lenis;
}

/** Applies a page's Lenis profile to the shared instance. */
export function applyLenisProfile(profile: LenisProfile) {
  const lenis = window.lenis;
  if (!lenis || profile === activeProfile) return;
  activeProfile = profile;
  const opts = profileOptions(profile);
  Object.assign(lenis.options, { lerp: opts.lerp, duration: opts.duration, smoothWheel: opts.smoothWheel, wheelMultiplier: opts.wheelMultiplier });
  lenis.isSmooth = opts.smoothWheel || lenis.options.smoothTouch;
  if (lenis.virtualScroll && lenis.virtualScroll.options) lenis.virtualScroll.options.wheelMultiplier = opts.wheelMultiplier;
  if (window.gsap) window.gsap.ticker.lagSmoothing(500, opts.lag);
}

/** Native-scroll fallback for the chrome (the navbar.js "BACK-TO-TOP — NATIVE FALLBACK"). */
export function refreshScrollChrome() {
  updateChrome(window.lenis);
}

export function smoothScrollTo(target: number | string | Element, options: Record<string, unknown> = {}) {
  const lenis = window.lenis;
  if (lenis && typeof lenis.scrollTo === "function") { lenis.scrollTo(target, options); return; }
  if (typeof target === "number") {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  const offset = typeof options.offset === "number" ? options.offset : 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset + offset, behavior: "smooth" });
}

export { EXPO as expoEase };
