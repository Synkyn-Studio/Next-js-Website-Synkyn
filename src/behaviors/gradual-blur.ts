/*
  Gradual blur bar (#sticky-bar, [data-gradual-blur]) — ported from main.js.
  Builds the stacked backdrop-filter layers and toggles visibility on scroll.
*/

import type { Scope } from "@/lib/runtime/scope";

const CURVES: Record<string, (t: number) => number> = {
  linear: (t) => t,
  bezier: (t) => t * t * (3 - 2 * t),
  "ease-in": (t) => t * t,
  "ease-out": (t) => 1 - Math.pow(1 - t, 2),
  "ease-in-out": (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
};
const num = (v: string | undefined, fallback: number) => {
  const n = Number.parseFloat(v as string);
  return Number.isFinite(n) ? n : fallback;
};

export function gradualBlur(scope: Scope) {
  document.querySelectorAll<HTMLElement>("[data-gradual-blur]").forEach((el) => {
    if (el.dataset.gradualBlurBound === "true") return;
    el.dataset.gradualBlurBound = "true";
    scope.add(() => { delete el.dataset.gradualBlurBound; });
    const d = el.dataset;
    const cfg = {
      position: d.position || "bottom",
      strength: num(d.strength, 2),
      height: d.height || "6rem",
      divCount: Math.max(1, Math.round(num(d.divCount, 5))),
      exponential: typeof d.exponential === "string" && d.exponential === "true",
      zIndex: Math.round(num(d.zIndex, 50)),
      opacity: num(d.opacity, 1),
      curve: d.curve || "linear",
      target: d.target || "page",
      duration: d.duration || "0.3s",
      easing: d.easing || "ease-out",
      showOnScroll: num(d.showOnScroll, 50),
    };

    const vertical = cfg.position === "top" || cfg.position === "bottom";
    el.classList.add("gradual-blur-wrapper");
    el.classList.toggle("gradual-blur-wrapper--fixed", cfg.target === "page");
    el.style.zIndex = String(cfg.zIndex);
    el.style.setProperty("--gb-duration", cfg.duration);
    el.style.setProperty("--gb-easing", cfg.easing);
    const s = el.style as unknown as Record<string, string>;
    if (vertical) {
      el.style.height = cfg.height; el.style.width = "100%"; el.style.left = "0"; el.style.right = "0"; el.style.top = ""; el.style.bottom = "";
    } else {
      el.style.width = cfg.height; el.style.height = "100%"; el.style.top = "0"; el.style.bottom = "0"; el.style.left = ""; el.style.right = "";
    }
    s[cfg.position] = "0";

    const inner = document.createElement("div");
    inner.className = "gradual-blur-inner";
    const dir = cfg.position === "top" ? "to top" : cfg.position === "left" ? "to left" : cfg.position === "right" ? "to right" : "to bottom";
    const curve = CURVES[cfg.curve] || CURVES.linear;
    const step = 100 / cfg.divCount;
    for (let i = 1; i <= cfg.divCount; i += 1) {
      const t = curve(i / cfg.divCount);
      const blur = cfg.exponential ? 0.0625 * Math.pow(2, 4 * t) * cfg.strength : 0.0625 * (t * cfg.divCount + 1) * cfg.strength;
      const a = Math.round(10 * (step * i - step)) / 10;
      const b = Math.round(step * i * 10) / 10;
      const c = Math.round(10 * (step * i + step)) / 10;
      const e = Math.round(10 * (step * i + 2 * step)) / 10;
      let stops = `transparent ${a}%, black ${b}%`;
      if (c <= 100) stops += `, black ${c}%`;
      if (e <= 100) stops += `, transparent ${e}%`;
      const layer = document.createElement("div");
      layer.className = "gradual-blur-layer";
      layer.style.maskImage = `linear-gradient(${dir}, ${stops})`;
      layer.style.webkitMaskImage = `linear-gradient(${dir}, ${stops})`;
      layer.style.backdropFilter = `blur(${blur.toFixed(3)}rem)`;
      (layer.style as unknown as Record<string, string>).webkitBackdropFilter = `blur(${blur.toFixed(3)}rem)`;
      layer.style.opacity = String(cfg.opacity);
      inner.appendChild(layer);
    }
    el.replaceChildren(inner);

    if (!Number.isFinite(cfg.showOnScroll)) { el.classList.add("is-visible"); return; }
    const toggle = () => {
      let visible = window.scrollY > cfg.showOnScroll;
      const suppress = document.querySelector("[data-gradual-blur-suppress-sticky]");
      if (visible && suppress) {
        const r = suppress.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) visible = false;
      }
      el.classList.toggle("is-visible", visible);
      el.classList.toggle("is-hidden", !visible);
    };
    scope.on(window, "scroll", toggle, { passive: true });
    scope.on(window, "resize", toggle, { passive: true });
    toggle();
  });
}
