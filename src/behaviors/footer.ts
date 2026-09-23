/*
  Footer divider draw-in. Every page ran two animations on `.footer-divider`:
  the inline IntersectionObserver transition (0 → 100% width) and main.js's
  GSAP ScrollTrigger tween. Both are kept, in their original order.
*/

import type { Scope } from "@/lib/runtime/scope";

/** Inline page script (parse time). */
export function footerDividerTransition(scope: Scope) {
  const divider = document.querySelector<HTMLElement>(".footer-divider");
  if (!divider || !("IntersectionObserver" in window) || !divider.parentElement) return;
  divider.style.width = "0";
  divider.style.transition = "width 0.9s cubic-bezier(.22,.68,0,1.2)";
  const io = scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { divider.style.width = "100%"; io.disconnect(); }
    });
  }, { threshold: 0.2 }));
  io.observe(divider.parentElement);
}

/** main.js z.init() → R(.footer-divider). */
export function footerDividerTween() {
  const divider = document.querySelector(".footer-divider");
  if (!divider || !window.gsap) return;
  window.gsap.to(divider, {
    scrollTrigger: { trigger: divider, start: "top 100%", end: "top 50%", scrub: false, toggleActions: "play none none none" },
    width: "100%",
    duration: 1,
    delay: 0.7,
    ease: "power2.out",
  });
}
