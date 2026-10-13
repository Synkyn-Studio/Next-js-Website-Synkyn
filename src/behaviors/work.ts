/*
  /work/<slug> pages: the shared custom Vimeo controls on every clip, and the
  clip switcher. All clips share one player box; only the selected one is
  visible, and at most one film plays at a time.
*/

import { wireVimeoControls } from "@/behaviors/vimeo-controls";
import type { Scope } from "@/lib/runtime/scope";
import { loadVimeoApi } from "@/lib/runtime/vendors";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function workPlayers(scope: Scope) {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".work-page .work-slide"));
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".work-page .work-clip"));
  if (!slides.length) return;

  const players = new Map<HTMLElement, any>(); // slide -> Vimeo.Player
  const playing = new Set<any>();
  const pauseAll = (except?: any) => players.forEach((p) => { if (p !== except) p.pause().catch(() => undefined); });

  scope.then(loadVimeoApi(), () => {
    if (!(window.Vimeo && window.Vimeo.Player)) return;
    slides.forEach((slide) => {
      const stage = slide.querySelector<HTMLElement>(".vmo-stage");
      const iframe = stage?.querySelector(".vmo-frame");
      if (!stage || !iframe) return;
      const player = new window.Vimeo.Player(iframe);
      players.set(slide, player);
      player.on("play", () => playing.add(player));
      player.on("pause", () => playing.delete(player));
      player.on("ended", () => playing.delete(player));
      wireVimeoControls(stage, player, scope.on, scope, { onPlay: () => pauseAll(player) });
    });
    scope.add(() => players.forEach((p) => { try { p.destroy().catch(() => undefined); } catch { /* noop */ } }));
  });

  const select = (index: number, focus = false) => {
    if (index < 0 || index >= slides.length) return;
    const wasPlaying = playing.size > 0;
    pauseAll();
    slides.forEach((s, i) => { s.hidden = i !== index; });
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    // Keep watching: if a film was playing, the newly chosen one starts.
    const next = players.get(slides[index]);
    if (wasPlaying && next) next.play().catch(() => undefined);
  };

  tabs.forEach((tab, i) => {
    scope.on(tab, "click", () => select(i));
    scope.on(tab, "keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      else if (e.key === "Home") { e.preventDefault(); select(0, true); }
      else if (e.key === "End") { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });

  // Leaving the page or switching tabs pauses playback.
  scope.on(document, "visibilitychange", () => { if (document.hidden) pauseAll(); });
}
