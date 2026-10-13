/*
  Custom Vimeo controls (play/pause, seek with buffer + keyboard, time, mute,
  fullscreen, auto-hide). Shared by the Library modal and the /work pages, both
  of which render `.vmo-stage` markup around a `controls=0` Vimeo iframe.
  Styles: .vmo-* in styles/pages/library/works.css.
*/

/* eslint-disable @typescript-eslint/no-explicit-any */

export const VIC = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4.2" height="15" rx="1"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1"/></svg>',
  vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
  fs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
  fsExit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3a1 1 0 0 0 1-1V4M20 8h-3a1 1 0 0 1-1-1V4M4 16h3a1 1 0 0 1 1 1v3M20 16h-3a1 1 0 0 0-1 1v3"/></svg>',
};

export const fmtTime = (t: number) => { if (!isFinite(t) || t < 0) t = 0; const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ":" + (s < 10 ? "0" + s : s); };
export const fsElement = () => document.fullscreenElement || (document as any).webkitFullscreenElement;

type On = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => void;
type Timers = { timeout(fn: () => void, ms?: number): number; clearTimeout(id: number | undefined | null): void };

export interface VimeoControlOptions {
  /** Element to put in fullscreen (defaults to the stage). */
  fsTarget?: () => Element | null;
  /** Start muted (pages without a click to start playback). */
  muted?: boolean;
  /** Called when this player starts, e.g. to pause the others. */
  onPlay?: () => void;
}

/** Wires the controls inside `root` to a Vimeo.Player. Listeners go through `on` so the caller owns teardown. */
export function wireVimeoControls(root: HTMLElement, player: any, on: On, timers: Timers, opts: VimeoControlOptions = {}) {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s) as T | null;
  const stage = q(".vmo-stage") || root, playBtn = q(".vmo-play"), muteBtn = q(".vmo-mute"), fsBtn = q(".vmo-fs");
  const progress = q(".vmo-progress"), playedEl = q(".vmo-played"), bufferEl = q(".vmo-buffered"), thumbEl = q(".vmo-thumb");
  const timeEl = q(".vmo-time"), clickL = q(".vmo-click"), controls = q(".vmo-controls");
  let duration = 0, isPlaying = false, isMuted = !!opts.muted, scrubbing = false, hideT: number | null = null;
  const renderTime = (cur: number) => { if (timeEl) timeEl.innerHTML = fmtTime(cur) + "&nbsp;/&nbsp;" + fmtTime(duration); };
  const setPlayed = (f: number) => {
    f = Math.max(0, Math.min(1, f || 0));
    if (playedEl) playedEl.style.width = f * 100 + "%";
    if (thumbEl) thumbEl.style.left = f * 100 + "%";
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(f * 100)));
  };
  const setPlayIcon = () => { if (playBtn) { playBtn.innerHTML = isPlaying ? VIC.pause : VIC.play; playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play"); } stage.classList.toggle("is-playing", isPlaying); };
  const setMuteIcon = () => { if (muteBtn) { muteBtn.innerHTML = isMuted ? VIC.mute : VIC.vol; muteBtn.setAttribute("aria-label", isMuted ? "Unmute" : "Mute"); } };
  const setFsIcon = () => { if (fsBtn) fsBtn.innerHTML = fsElement() ? VIC.fsExit : VIC.fs; };
  const showControls = () => {
    if (controls) controls.classList.remove("vmo-hidden");
    timers.clearTimeout(hideT);
    hideT = timers.timeout(() => { if (isPlaying && !scrubbing && controls) controls.classList.add("vmo-hidden"); }, 2800);
  };
  setPlayIcon(); setMuteIcon(); setFsIcon(); renderTime(0);
  player.setLoop(true).catch(() => undefined);
  player.setMuted(isMuted).catch(() => undefined);
  player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined);
  player.on("loaded", () => { player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined); });
  player.on("timeupdate", (data: any) => { if (scrubbing) return; duration = data.duration || duration; setPlayed(data.percent); renderTime(data.seconds); });
  player.on("progress", (data: any) => { if (bufferEl) bufferEl.style.width = (data.percent || 0) * 100 + "%"; });
  player.on("play", () => { isPlaying = true; setPlayIcon(); showControls(); opts.onPlay?.(); });
  player.on("pause", () => { isPlaying = false; setPlayIcon(); showControls(); });
  player.on("ended", () => { isPlaying = false; setPlayIcon(); });
  const togglePlay = () => { if (isPlaying) player.pause().catch(() => undefined); else player.play().catch(() => undefined); };
  if (playBtn) on(playBtn, "click", (e) => { e.stopPropagation(); togglePlay(); });
  if (clickL) on(clickL, "click", (e) => { e.stopPropagation(); togglePlay(); });
  if (muteBtn) on(muteBtn, "click", (e) => {
    e.stopPropagation();
    isMuted = !isMuted;
    player.setMuted(isMuted).catch(() => undefined);
    if (!isMuted) player.setVolume(1).catch(() => undefined);
    setMuteIcon();
  });
  const seekFromEvent = (e: any) => {
    if (!progress) return;
    const rect = progress.getBoundingClientRect();
    const cx = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    const f = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
    setPlayed(f); renderTime(f * duration);
    if (duration) player.setCurrentTime(f * duration).catch(() => undefined);
  };
  if (progress) {
    on(progress, "pointerdown", (e) => { scrubbing = true; progress.classList.add("vmo-scrubbing"); try { progress.setPointerCapture((e as PointerEvent).pointerId); } catch { /* noop */ } seekFromEvent(e); });
    on(progress, "pointermove", (e) => { if (scrubbing) seekFromEvent(e); });
    on(progress, "pointerup", (e) => { if (scrubbing) seekFromEvent(e); scrubbing = false; progress.classList.remove("vmo-scrubbing"); });
    on(progress, "pointercancel", () => { scrubbing = false; progress.classList.remove("vmo-scrubbing"); });
    on(progress, "keydown", (e) => {
      if (!duration) return;
      const key = (e as KeyboardEvent).key;
      player.getCurrentTime().then((cur: number) => {
        if (key === "ArrowRight") { player.setCurrentTime(Math.min(duration, cur + 5)); e.preventDefault(); }
        else if (key === "ArrowLeft") { player.setCurrentTime(Math.max(0, cur - 5)); e.preventDefault(); }
      }).catch(() => undefined);
    });
  }
  const toggleFS = () => {
    if (fsElement()) { (document.exitFullscreen || (document as any).webkitExitFullscreen || (() => undefined)).call(document); return; }
    const target: any = (opts.fsTarget && opts.fsTarget()) || stage;
    if (target && target.requestFullscreen) target.requestFullscreen().catch(() => undefined);
    else if (target && target.webkitRequestFullscreen) target.webkitRequestFullscreen();
  };
  if (fsBtn) on(fsBtn, "click", (e) => { e.stopPropagation(); toggleFS(); });
  on(document, "fullscreenchange", setFsIcon);
  on(document, "webkitfullscreenchange", setFsIcon);
  ["mousemove", "pointerdown", "touchstart"].forEach((ev) => on(stage, ev, showControls, { passive: true }));
  return { pause: () => player.pause().catch(() => undefined) };
}
