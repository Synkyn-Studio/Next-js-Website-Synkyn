/*
  About page team grid: pointer-following chroma reveal, founder modal and the
  grayscale spotlight veil. Ported from main.js (P() / F()).
*/

import type { Scope } from "@/lib/runtime/scope";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** main.js P() — `.js-chroma-grid` pointer light + optional founder modal. */
export function chromaGrid(scope: Scope) {
  const gsap: any = (globalThis as any).gsap;
  const grids = document.querySelectorAll<HTMLElement>(".js-chroma-grid");
  if (!grids.length || !gsap) return;

  grids.forEach((grid) => {
    const fade = grid.querySelector(".chroma-fade");
    const radius = Number(grid.dataset.radius || 300);
    const columns = Number(grid.dataset.columns || 3);
    const damping = Number(grid.dataset.damping || 0.45);
    const fadeOut = Number(grid.dataset.fadeOut || 0.6);
    const ease = grid.dataset.ease || "power3.out";
    grid.style.setProperty("--r", `${radius}px`);
    grid.style.setProperty("--cols", `${columns}`);
    const setX = gsap.quickSetter(grid, "--x", "px");
    const setY = gsap.quickSetter(grid, "--y", "px");
    const pos = { x: 0, y: 0 };
    const rect = grid.getBoundingClientRect();
    pos.x = rect.width / 2; pos.y = rect.height / 2;
    setX(pos.x); setY(pos.y);

    const founderCards = Array.from(grid.querySelectorAll<HTMLElement>(".js-founder-card"));
    let active: HTMLElement | null = null;
    let open = false;

    const modal = document.createElement("div");
    modal.className = "chroma-founder-modal js-chroma-founder-modal";
    modal.setAttribute("aria-hidden", "true");
    const dialog = document.createElement("div");
    dialog.className = "chroma-founder-modal__dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "Founder profile");
    const closeBtn = document.createElement("button");
    closeBtn.className = "chroma-founder-modal__close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close founder profile");
    closeBtn.textContent = "Close";
    const content = document.createElement("div");
    content.className = "chroma-founder-modal__content";
    dialog.append(closeBtn, content);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    scope.add(() => modal.remove());

    const close = () => {
      if (!open) return;
      open = false;
      if (active) { active.classList.remove("is-expanded"); active.setAttribute("aria-expanded", "false"); active = null; }
      gsap.to(modal, { opacity: 0, duration: 0.28, ease: "power2.out", overwrite: true, onComplete: () => { if (!open) modal.setAttribute("aria-hidden", "true"); } });
      gsap.to(dialog, { y: 24, scale: 0.96, opacity: 0, duration: 0.28, ease: "power2.out", overwrite: true });
    };
    const openCard = (card: HTMLElement) => {
      if (active === card && open) { close(); return; }
      if (active && active !== card) { active.classList.remove("is-expanded"); active.setAttribute("aria-expanded", "false"); }
      active = card;
      card.classList.add("is-expanded");
      card.setAttribute("aria-expanded", "true");
      const img = card.querySelector(".chroma-img-wrapper");
      const info = card.querySelector(".chroma-info");
      if (img && info) {
        const imgClone = img.cloneNode(true) as HTMLElement;
        const infoClone = info.cloneNode(true) as HTMLElement;
        infoClone.querySelector(".chroma-card-hint")?.remove();
        content.innerHTML = "";
        content.append(imgClone, infoClone);
      }
      modal.setAttribute("aria-hidden", "false");
      open = true;
      gsap.killTweensOf([modal, dialog]);
      gsap.set(modal, { opacity: 0 });
      gsap.set(dialog, { y: 28, scale: 0.94, opacity: 0 });
      gsap.to(modal, { opacity: 1, duration: 0.32, ease: "power2.out", overwrite: true });
      gsap.to(dialog, { y: 0, scale: 1, opacity: 1, duration: 0.44, ease: "power3.out", overwrite: true });
    };

    scope.on(grid, "pointermove", (e: PointerEvent) => {
      const r = grid.getBoundingClientRect();
      gsap.to(pos, { x: e.clientX - r.left, y: e.clientY - r.top, duration: damping, ease, overwrite: true, onUpdate: () => { setX(pos.x); setY(pos.y); } });
      if (fade) gsap.to(fade, { opacity: 0, duration: 0.25, overwrite: true });
    });
    scope.on(grid, "pointerleave", () => { if (fade) gsap.to(fade, { opacity: 1, duration: fadeOut, overwrite: true }); });
    scope.on(closeBtn, "click", close);
    scope.on(modal, "click", (e: MouseEvent) => { if (e.target === modal) close(); });
    scope.on(document, "keydown", (e: KeyboardEvent) => { if (e.key === "Escape") close(); });
    founderCards.forEach((card) => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-expanded", "false");
      scope.on(card, "click", (e: MouseEvent) => { if (!(e.target as Element).closest("a,button")) openCard(card); });
      scope.on(card, "keydown", (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCard(card); } });
    });
  });
}

/** main.js F() — scroll-linked grayscale veil + pointer spotlight. */
export function chromaSpotlight(scope: Scope) {
  document.querySelectorAll<HTMLElement>(".js-chroma-spotlight-section").forEach((section) => {
    const w: any = globalThis;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.style.setProperty("--spot-grayscale-opacity", "1");
    } else {
      const startAt = section.dataset.spotlightScrollStart || "top 48%";
      const endAt = section.dataset.spotlightScrollEnd || "top 18%";
      const exitFrom = Number(section.dataset.spotlightScrollExitFrom ?? 0.42);
      const exitTo = Number(section.dataset.spotlightScrollExitTo ?? 0.08);
      const toPx = (value: string, vh: number) => {
        const m = String(value).trim().match(/^(top|center|bottom)\s+(\d+(?:\.\d+)?)%$/);
        if (!m) return 0.48 * vh;
        const f = Number(m[2]) / 100;
        return m[1] === "top" ? vh * f : m[1] === "bottom" ? vh * (1 - f) : 0.5 * vh;
      };
      const update = () => {
        const r = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const s = toPx(startAt, vh), e = toPx(endAt, vh);
        const span = Math.max(1, s - e);
        const enter = Math.max(0, Math.min(1, (s - r.top) / span));
        const from = vh * exitFrom, to = vh * exitTo;
        const exitSpan = Math.max(1e-6, from - to);
        let exit = 1;
        if (r.bottom < from) exit = Math.max(0, Math.min(1, (r.bottom - to) / exitSpan));
        section.style.setProperty("--spot-grayscale-opacity", String(enter * exit));
      };
      let frame: number | null = null;
      const schedule = () => { if (!frame) frame = scope.raf(() => { frame = null; update(); }); };
      scope.on(window, "scroll", schedule, { passive: true });
      scope.on(window, "resize", schedule);
      if (w.gsap && w.ScrollTrigger) {
        w.gsap.registerPlugin(w.ScrollTrigger);
        w.ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onUpdate: schedule });
      }
      update();
    }

    let veil = section.querySelector<HTMLElement>(".chroma-spotlight-veil");
    if (!veil) {
      veil = document.createElement("div");
      veil.className = "chroma-spotlight-veil";
      section.appendChild(veil);
      const created = veil;
      scope.add(() => created.remove());
    }
    const v = veil;
    const radius = Number(section.dataset.spotlightRadius || 520);
    const damping = Number(section.dataset.spotlightDamping || 0.28);
    const ease = section.dataset.spotlightEase || "power3.out";
    const OFF = -1200;
    v.style.setProperty("--spot-r", `min(${radius}px, 92vw)`);
    const gsap = w.gsap;
    const setX = gsap && typeof gsap.quickSetter === "function" ? gsap.quickSetter(v, "--spot-x", "px") : (x: number) => v.style.setProperty("--spot-x", `${x}px`);
    const setY = gsap && typeof gsap.quickSetter === "function" ? gsap.quickSetter(v, "--spot-y", "px") : (y: number) => v.style.setProperty("--spot-y", `${y}px`);
    const pos = { x: OFF, y: OFF };
    setX(pos.x); setY(pos.y);
    const moveTo = (x: number, y: number) => {
      if (!gsap) { v.style.setProperty("--spot-x", `${x}px`); v.style.setProperty("--spot-y", `${y}px`); return; }
      gsap.to(pos, { x, y, duration: damping, ease, overwrite: true, onUpdate: () => { setX(pos.x); setY(pos.y); } });
    };
    scope.on(section, "pointermove", (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = section.getBoundingClientRect();
      moveTo(e.clientX - r.left, e.clientY - r.top);
    }, { passive: true });
    scope.on(section, "pointerleave", () => moveTo(OFF, OFF), { passive: true });
  });
}
