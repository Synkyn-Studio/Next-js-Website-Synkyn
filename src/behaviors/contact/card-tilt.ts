/* Contact page — card tilt + glare that follows the pointer (contact.html). */

import type { Scope } from "@/lib/runtime/scope";

export function contactCardTilt(scope: Scope) {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const MAX = 8;
  document.querySelectorAll<HTMLElement>(".sk-c-card").forEach((card) => {
    const reset = () => { card.style.transform = ""; };
    scope.on(card, "pointermove", (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = "rotateX(" + ((0.5 - py) * MAX).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * MAX).toFixed(2) + "deg)";
      card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
    scope.on(card, "pointerleave", reset);
    scope.on(card, "blur", reset);
  });
}
