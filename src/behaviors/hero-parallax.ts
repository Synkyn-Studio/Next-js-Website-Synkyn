import type { Scope } from "@/lib/runtime/scope";

export function heroParallax(scope: Scope) {
  const gsap = window.gsap;
  if (!gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const small = window.innerWidth < 768;
  document.querySelectorAll<HTMLElement>("[data-hero-parallax]").forEach((el) => {
    const hero = el.closest("section") || el.parentElement;
    if (!hero) return;
    gsap.to(el, {
      y: small ? 48 : 90,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  });
  scope.raf(() => window.ScrollTrigger.refresh());
}
