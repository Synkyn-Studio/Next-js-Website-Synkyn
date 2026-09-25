/*
  Synkyn Studios — Loading Controller (assets/loader.js).

  Runs a fixed 3s timeline: a 01% → 100% counter, a short hold on 100%, then
  the panels split open. Home is never uncovered before the bar is full.

  `loaderBootstrap` is deliberately self-contained: it is imported by the React
  component (client-side navigation back to Home) *and* serialised into an
  inline <script> for the first document load, so the counter starts while the
  page is still parsing instead of waiting for hydration.
*/

export interface LoaderHandle {
  /**
   * The element this run drives. React re-creates it on a client-side
   * navigation back to Home but keeps it across a remount of the same page, so
   * it identifies whether a live run belongs to the loader now on screen.
   */
  el: HTMLElement | null;
  /** True once the panels have opened and the page has been released. */
  finished(): boolean;
  stop(): void;
}

export function loaderBootstrap(): LoaderHandle {
  const root = document.documentElement;
  const loader = document.getElementById("synkynLoader");
  const timeouts: number[] = [];
  const frames: number[] = [];
  const offs: Array<() => void> = [];
  let stopped = false;
  let finished = false;

  const on = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts);
    offs.push(() => target.removeEventListener(type, fn, opts));
  };
  const later = (fn: () => void, ms: number) => { const id = window.setTimeout(fn, ms); timeouts.push(id); return id; };
  const frame = (fn: FrameRequestCallback) => { const id = requestAnimationFrame(fn); frames.push(id); return id; };

  const kill = () => {
    finished = true;
    root.classList.remove("show-loader", "loader-open");
    root.classList.add("hide-loader");
    if (loader) { loader.classList.add("is-hidden"); loader.hidden = true; }
    try { document.dispatchEvent(new CustomEvent("synkyn:loaderdone")); } catch (e) { /* noop */ }
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    timeouts.forEach((id) => clearTimeout(id));
    frames.forEach((id) => cancelAnimationFrame(id));
    offs.forEach((off) => off());
  };

  const handle: LoaderHandle = { el: loader, finished: () => finished, stop };

  if (!loader) { kill(); return handle; }

  /*
    Start the Vimeo Player API now, while the page is still parsing: the hero
    reveals on its first `playing` event. `loadScript("vimeo-api-js")` in
    vendors.ts adopts this tag. (A preload hint in the page would also be
    applied on every other page that merely prefetches Home.)
  */
  if (!document.getElementById("vimeo-api-js") && !(window as { Vimeo?: unknown }).Vimeo) {
    const api = document.createElement("script");
    api.id = "vimeo-api-js";
    api.async = true;
    api.onload = () => { api.dataset.loaded = "true"; };
    api.onerror = () => { api.dataset.failed = "true"; };
    api.src = "https://player.vimeo.com/api/player.js";
    document.head.appendChild(api);
  }

  root.classList.add("show-loader");
  root.classList.remove("hide-loader", "loader-open");
  loader.hidden = false;
  loader.classList.remove("is-hidden", "open", "is-complete");

  const pctEl = loader.querySelector(".loader-pct") as HTMLElement | null;
  const barEl = loader.querySelector(".loader-bar") as HTMLElement | null;
  /*
    Fixed timeline: the loader always covers the page for exactly 3s.
    The counter runs 01% → 100% over FILL_MS, holds on 100% for HOLD_MS, and
    only then do the panels split to reveal Home (OPEN_MS). It does not wait
    for, or cut short on, any loading signal — the page never shows before the
    bar has reached 100%.
    2700 + 300 = 3.0s on screen, then the 820ms split.
  */
  const FILL_MS = 2700;  // 01% → 100%
  const HOLD_MS = 300;   // "100%" beat; also lets the bar's CSS glide land
  const OPEN_MS = 820;   // panel split: 40ms delay + 760ms (loader-critical.css)

  /*
    The counter resumes from whatever is already painted on this element rather
    than resetting. A controller that starts against a bar which is part-way
    along is a re-entry, not a new visit, and a re-entry that dropped back to
    01% is what made the progress bar appear to load twice.
  */
  const painted = parseFloat(loader.style.getPropertyValue("--loader-progress")) || 0;
  const resumeFrom = Math.max(0, Math.min(1, painted));
  const startTime = performance.now() - resumeFrom * FILL_MS;
  let displayedPct = Math.max(1, Math.floor(resumeFrom * 100));
  // Bar and number are written from the same value in the same frame, so the
  // text can never read 100% before the bar is full (or the other way round).
  const paint = (v: number) => {
    loader.style.setProperty("--loader-progress", v.toFixed(4));
    displayedPct = Math.max(displayedPct, Math.max(1, Math.min(100, Math.floor(v * 100 + 1e-6))));
    const pctStr = (displayedPct < 10 ? "0" : "") + displayedPct + "%";
    if (pctEl && pctEl.textContent !== pctStr) pctEl.textContent = pctStr;
    if (barEl) barEl.setAttribute("aria-valuenow", String(displayedPct));
  };
  // Progress is a pure function of elapsed time, so a stalled main thread
  // (parsing, hydration) catches up on the next frame instead of drifting.
  const progressAt = (now: number) => Math.max(0.01, Math.min(1, (now - startTime) / FILL_MS));
  paint(progressAt(performance.now()));

  const open = () => {
    if (stopped) return;
    loader.classList.add("open");
    root.classList.add("loader-open"); // lifts the first-paint cover (layout.tsx)
    // The hero starts its intro now, so it is already animating in as the
    // panels part — not after they have gone (hero-intro.ts).
    try { document.dispatchEvent(new CustomEvent("synkyn:loaderopen")); } catch (e) { /* noop */ }
    later(kill, OPEN_MS);
  };

  const complete = () => {
    if (finished || stopped) return;
    finished = true;
    paint(1);
    loader.classList.add("is-complete");
    later(open, HOLD_MS);
  };

  const step = (now: number) => {
    if (finished || stopped) return;
    const v = progressAt(now);
    paint(v);
    if (v >= 1) { complete(); return; }
    frame(step);
  };
  frame(step);

  // Timers keep the schedule when animation frames are throttled or paused
  // (a background tab), so the reveal still lands at 3s.
  later(complete, Math.max(0, startTime + FILL_MS - performance.now()));

  /* Ambient gold particles */
  const canvas = loader.querySelector(".loader-canvas") as HTMLCanvasElement | null;
  const ctx = canvas ? canvas.getContext("2d") : null;
  if (canvas && ctx) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, running = true;
    let flakes: { x: number; y: number; s: number; vx: number; vy: number; a: number; rot: number; vr: number; w: number; vw: number }[] = [];
    const COUNT = Math.min(60, Math.round(window.innerWidth / 18));
    const resize = () => {
      W = window.innerWidth * dpr; H = window.innerHeight * dpr;
      canvas.width = W; canvas.height = H;
      canvas.style.width = window.innerWidth + "px"; canvas.style.height = window.innerHeight + "px";
    };
    const make = () => {
      flakes = [];
      for (let i = 0; i < COUNT; i++) {
        flakes.push({
          x: Math.random() * W, y: Math.random() * H, s: (Math.random() * 2.8 + 1.2) * dpr,
          vx: (Math.random() * 1.0 + 0.3) * dpr, vy: (-Math.random() * 0.8 - 0.2) * dpr,
          a: Math.random() * 0.28 + 0.08, rot: Math.random() * Math.PI * 2, vr: Math.random() * 0.04 - 0.02,
          w: Math.random() * Math.PI * 2, vw: Math.random() * 0.04 + 0.01,
        });
      }
    };
    const tri = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha; ctx.fillStyle = "#f2d400";
      ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s, s); ctx.lineTo(-s, s); ctx.closePath(); ctx.fill(); ctx.restore();
    };
    const loop = () => {
      if (!running || stopped || loader.hidden || finished) { running = false; return; }
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.w += f.vw; f.x += f.vx; f.y += f.vy + Math.sin(f.w) * 0.4 * dpr; f.rot += f.vr;
        if (f.x > W + 10) f.x = -10;
        if (f.y < -10) f.y = H + 10;
        tri(f.x, f.y, f.s, f.rot, f.a);
      }
      frame(loop);
    };
    resize(); make(); loop();
    let rt: number | null = null;
    on(window, "resize", () => { if (rt !== null) clearTimeout(rt); rt = later(() => { resize(); make(); }, 200); }, { passive: true });
    on(document, "visibilitychange", () => {
      running = !document.hidden && !finished && !stopped;
      if (running) frame(loop);
    });
  }

  // index.html: a bfcache restore of Home reloads so the loader shows again.
  on(window, "pageshow", ((e: PageTransitionEvent) => { if (e.persisted) window.location.reload(); }) as EventListener);

  return handle;
}

/**
 * The same controller, serialised for the first document load so the counter
 * runs while the page parses. Hydration would otherwise delay it by seconds.
 */
export const LOADER_INLINE_SCRIPT = `try{window.__synkynLoader=(${loaderBootstrap.toString()})()}catch(e){document.documentElement.classList.remove('show-loader')}`;
