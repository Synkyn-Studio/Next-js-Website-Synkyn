/*
  [data-ns-animate] reveal engine — ported from main.js.
  Blur/fade/slide-in via gsap.from (or gsap.to with data-animation-type="to"),
  triggered by ScrollTrigger unless data-instant is set.
*/

import type { Scope } from "@/lib/runtime/scope";

export function revealOnScroll(scope: Scope) {
  const attrNum = (el: Element, name: string, fallback: number) => {
    const v = el.getAttribute(name);
    return v ? parseFloat(v) : fallback;
  };
  const springer = () => {
    const s = window.Springer;
    return s ? (typeof s === "function" ? s : s.default || null) : null;
  };

  const init = () => {
    const els = document.querySelectorAll<HTMLElement>("[data-ns-animate]:not([data-ns-animate-init])");
    if (!els.length) return;
    const Springer = springer();
    els.forEach((el) => {
      el.setAttribute("data-ns-animate-init", "true");
      const duration = attrNum(el, "data-duration", 0.6);
      const delay = attrNum(el, "data-delay", 0);
      const offset = attrNum(el, "data-offset", 60);
      const instant = el.hasAttribute("data-instant") && el.getAttribute("data-instant") !== "false";
      const start = el.getAttribute("data-start") || "top 90%";
      const end = el.getAttribute("data-end") || "top 50%";
      const direction = el.getAttribute("data-direction") || "down";
      const spring = el.hasAttribute("data-spring");
      const ease = spring && typeof Springer === "function" ? Springer(0.2, 0.8) : null;
      const rotation = attrNum(el, "data-rotation", 0);
      const type = el.getAttribute("data-animation-type") || "from";
      el.style.opacity = "1";
      el.style.filter = "blur(0)";
      const vars: Record<string, unknown> = type === "to"
        ? { opacity: 1, filter: "blur(0)", duration, delay, ease: spring ? ease : "power2.out" }
        : { opacity: 0, filter: "blur(16px)", duration, delay, ease: spring ? ease : "power2.out" };
      if (rotation !== 0) vars.rotation = rotation;
      if (!instant) vars.scrollTrigger = { trigger: el, start, end, scrub: false };
      switch (direction) {
        case "left": vars.x = -offset; break;
        case "right": vars.x = offset; break;
        case "down": vars.y = offset; break;
        default: vars.y = -offset;
      }
      if (type === "to") window.gsap.to(el, vars); else window.gsap.from(el, vars);
    });
    if (window.ScrollTrigger) scope.raf(() => window.ScrollTrigger.refresh());
  };

  // main.js debounced every call through a single animation frame.
  let pendingFrame: number | null = null;
  const schedule = () => {
    if (pendingFrame) return;
    pendingFrame = scope.raf(() => { pendingFrame = null; init(); });
  };

  schedule();
  if (document.readyState !== "complete") {
    // First document load: re-scan on `load` and for nodes added until then.
    scope.on(window, "load", schedule);
    if ("MutationObserver" in window) {
      const mo = scope.observe(new MutationObserver((records) => {
        for (const r of records) if (r.type === "childList" && r.addedNodes && r.addedNodes.length > 0) { schedule(); break; }
      }));
      mo.observe(document.documentElement, { childList: true, subtree: true });
      scope.on(window, "load", () => mo.disconnect(), { once: true });
    }
  }

  // Re-entering a page must animate again, as a fresh load would.
  scope.add(() => {
    document.querySelectorAll("[data-ns-animate-init]").forEach((el) => el.removeAttribute("data-ns-animate-init"));
  });
}

/**
 * index.html head failsafe: if the reveal engine has not taken over within
 * 2.5s, `fx-failsafe` makes the hero readable instead of a black screen.
 */
export function revealFailsafe(scope: Scope) {
  scope.timeout(() => {
    // `hero-armed` means GSAP arrived and the hero timeline is driving the
    // reveal. Forcing everything visible from CSS would freeze it mid-flight,
    // and the animation stack plainly did not fail.
    if (document.documentElement.classList.contains("hero-armed")) return;
    const el = document.querySelector("[data-ns-animate], .reveal-text");
    if (!el || !el.hasAttribute("data-ns-animate-init")) document.documentElement.classList.add("fx-failsafe");
  }, 2500);
  scope.add(() => document.documentElement.classList.remove("fx-failsafe"));
}
