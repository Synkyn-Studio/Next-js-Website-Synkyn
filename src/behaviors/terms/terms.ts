/* Terms page: reveals, TOC scroll-spy and the responsive / floating TOC (terms.html). */

import type { Scope } from "@/lib/runtime/scope";

export function termsReveals(scope: Scope) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".tc-reveal"));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const isMobile = window.innerWidth <= 680;
  const io = scope.observe(new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
  }, { threshold: isMobile ? 0.05 : 0.12, rootMargin: isMobile ? "0px 0px -4% 0px" : "0px 0px -8% 0px" }));
  els.forEach((el, i) => {
    el.style.transitionDelay = isMobile ? Math.min(i * 20, 160) + "ms" : Math.min(i * 40, 260) + "ms";
    io.observe(el);
  });
}

export function termsTocSpy(scope: Scope) {
  const listEl = document.querySelector<HTMLElement>(".tc-toc__list");
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".tc-toc__list a"));
  const map = new Map<Element, HTMLAnchorElement>();
  links.forEach((a) => {
    const target = document.getElementById((a.getAttribute("href") || "").slice(1));
    if (target) map.set(target, a);
  });
  if (!map.size || !("IntersectionObserver" in window)) return;
  const keepInView = (active: HTMLElement) => {
    if (!listEl) return;
    const lr = listEl.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    if (ar.top < lr.top) listEl.scrollTop -= lr.top - ar.top + 14;
    else if (ar.bottom > lr.bottom) listEl.scrollTop += ar.bottom - lr.bottom + 14;
  };
  const spy = scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.remove("is-active"));
      const active = map.get(e.target);
      if (active) { active.classList.add("is-active"); keepInView(active); }
    });
  }, { rootMargin: "-120px 0px -70% 0px", threshold: 0 }));
  map.forEach((_, target) => spy.observe(target));
}

export function termsResponsiveToc(scope: Scope) {
  const toc = document.querySelector<HTMLDetailsElement>(".tc-toc");
  if (!toc) return;
  const mq = window.matchMedia("(max-width: 680px)");
  let userTouched = false;
  const apply = () => { if (!userTouched) toc.open = !mq.matches; };
  apply();
  scope.on(mq, "change", apply);
  scope.on(toc, "toggle", () => { if (mq.matches) userTouched = true; });
  toc.querySelectorAll<HTMLAnchorElement>(".tc-toc__list a").forEach((a) => {
    scope.on(a, "click", () => {
      if (mq.matches) {
        scope.timeout(() => { toc.open = false; }, 220);
        userTouched = false;
      }
    });
  });
  const floatToc = document.getElementById("tc-floating-toc");
  if (floatToc) {
    scope.on(window, "scroll", () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      floatToc.classList.toggle("is-visible", y > 450 && mq.matches);
    }, { passive: true });
    scope.on(floatToc, "click", (e: MouseEvent) => {
      e.preventDefault();
      toc.open = true;
      if (window.lenis) window.lenis.scrollTo(toc, { offset: -80, duration: 0.9 });
      else toc.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
