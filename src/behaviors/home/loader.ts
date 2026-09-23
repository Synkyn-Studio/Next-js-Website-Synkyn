/*
  Synkyn Studios — Loading Controller (assets/loader.js).

  Reads real loading signals (DOM, sub-resources, images, fonts, window load),
  eases a monotonic 01% → 100% counter toward them, then splits the panels
  open. MIN_MS stops it flashing past on a warm cache; MAX_MS is a hard ceiling.

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
    Whole visit budget is 3s. Until the page is ready (or MAX_MS) the counter
    eases toward the real loading signals, capped at 99%. Then it always sweeps
    the rest of the way in FILL_MS — the bar visibly completes, it never jumps —
    holds 100% for HOLD_MS, and the panels split over OPEN_MS.
    1700 + 260 + 220 + 820 = 3.0s worst case.
  */
  const MIN_MS = 900;    // minimum on-screen time, so the reveal still reads
  const MAX_MS = 1700;   // latest the final sweep starts, whatever fails to load
  const FILL_MS = 260;   // final sweep from wherever the bar is to 100%
  const HOLD_MS = 220;   // "100%" beat; also lets the bar's .2s CSS glide land
  const OPEN_MS = 820;   // panel split: 40ms delay + 760ms (loader-critical.css)
  const startTime = performance.now();
  let lastNow = startTime;

  const WEIGHT = { dom: 0.15, res: 0.2, img: 0.2, font: 0.1, vimeo: 0.2, load: 0.15 };
  const sig = { dom: 0, res: 0, img: 0, font: 0, vimeo: 0, load: 0 };

  /*
    The counter resumes from whatever is already painted on this element rather
    than resetting. A controller that starts against a bar which is part-way
    along is a re-entry, not a new visit, and a re-entry that dropped back to
    01% is what made the progress bar appear to load twice.
  */
  const painted = parseFloat(loader.style.getPropertyValue("--loader-progress")) || 0;
  let shown = Math.max(0.01, Math.min(1, painted));
  let displayedPct = Math.max(1, Math.floor(shown * 100));
  // Bar and number are written from the same value in the same frame, so the
  // text can never read 100% before the bar is full (or the other way round).
  const paint = (v: number) => {
    loader.style.setProperty("--loader-progress", v.toFixed(4));
    displayedPct = Math.max(displayedPct, Math.max(1, Math.min(100, Math.floor(v * 100 + 1e-6))));
    const pctStr = (displayedPct < 10 ? "0" : "") + displayedPct + "%";
    if (pctEl && pctEl.textContent !== pctStr) pctEl.textContent = pctStr;
    if (barEl) barEl.setAttribute("aria-valuenow", String(displayedPct));
  };
  paint(shown);

  const readDom = () => (document.readyState === "complete" ? 1 : document.readyState === "interactive" ? 0.85 : document.body ? 0.45 : 0.2);

  let resCount = 0;
  const RES_K = 18;
  if (window.PerformanceObserver) {
    try {
      const po = new PerformanceObserver((list) => { resCount += list.getEntries().length; });
      po.observe({ type: "resource", buffered: true });
      offs.push(() => po.disconnect());
    } catch (e) { /* unsupported */ }
  }
  if (!resCount && window.performance && performance.getEntriesByType) {
    try { resCount = performance.getEntriesByType("resource").length; } catch (e) { /* noop */ }
  }
  const readRes = () => (sig.load === 1 ? 1 : resCount / (resCount + RES_K));
  const readImg = () => {
    const imgs = document.images;
    const n = imgs.length;
    if (!n) return document.readyState === "loading" ? 0.2 : 1;
    let total = 0, done = 0;
    for (let i = 0; i < n; i++) {
      // Lazy images below the fold are not fetched yet and would never
      // report complete — they are not part of "the page is ready".
      if (imgs[i].loading === "lazy" && !imgs[i].complete) continue;
      total++;
      if (imgs[i].complete) done++;
    }
    return total ? done / total : 1;
  };

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sig.font = 1; }, () => { sig.font = 1; });
  else sig.font = 1;

  /*
    Hold the reveal for the hero video (within MAX_MS) so the page opens on
    moving footage rather than the poster. The hero behaviour marks the wrapper
    `is-playing` and fires `synkyn:vimeoready` on the first real frame. With
    reduced motion the video never plays, so there is nothing to wait for.
  */
  const reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const readVimeo = () => (reducedMotion || document.querySelector(".hero-video-bg.is-playing") ? 1 : 0);
  on(document, "synkyn:vimeoready", () => { sig.vimeo = 1; });

  if (document.readyState === "complete") sig.load = 1;
  else on(window, "load", () => { sig.load = 1; }, { once: true });

  const targetProgress = () => {
    sig.dom = Math.max(sig.dom, readDom());
    sig.res = Math.max(sig.res, readRes());
    sig.img = Math.max(sig.img, readImg());
    sig.vimeo = Math.max(sig.vimeo, readVimeo());
    const sum = sig.dom * WEIGHT.dom + sig.res * WEIGHT.res + sig.img * WEIGHT.img + sig.font * WEIGHT.font + sig.vimeo * WEIGHT.vimeo + sig.load * WEIGHT.load;
    return Math.max(0.01, Math.min(1.0, sum));
  };
  /*
    The hero's poster is what the panels open onto, so it has to be decoded —
    not just downloaded — or the first revealed frames are the hero's black
    backdrop. The poster is parsed after this script runs, so it is looked up
    lazily.
  */
  let posterReady = false;
  let posterAsked = false;
  const readPoster = () => {
    if (posterReady) return true;
    const po = document.querySelector(".hero-video-poster") as HTMLImageElement | null;
    if (!po) return document.readyState !== "loading"; // no poster on this page
    if (!posterAsked) {
      posterAsked = true;
      const done = () => { posterReady = true; };
      if (po.decode) po.decode().then(done, done); else if (po.complete) done(); else on(po, "load", done, { once: true });
    }
    return posterReady;
  };

  /*
    The page is ready for the reveal once the document is parsed, the fonts
    are in, the images have arrived, the poster is decoded and the hero video
    is playing. It does not wait for `load`, which also waits on the showreel
    iframe; MAX_MS caps the wait if the video is slow or blocked (the poster
    covers that case).
  */
  const isCriticalReady = () => {
    targetProgress();
    return document.readyState !== "loading" && sig.font === 1 && sig.img >= 0.9 && readPoster() && sig.vimeo === 1;
  };

  const open = () => {
    loader.classList.add("open");
    root.classList.add("loader-open"); // lifts the first-paint cover (layout.tsx)
    // The hero starts its intro now, so it is already animating in as the
    // panels part — not after they have gone (hero-intro.ts).
    try { document.dispatchEvent(new CustomEvent("synkyn:loaderopen")); } catch (e) { /* noop */ }
    later(kill, OPEN_MS);
  };

  const complete = () => {
    if (finished) return;
    finished = true;
    shown = 1;
    paint(1);
    loader.classList.add("is-complete");
    later(open, HOLD_MS);
  };

  // -1 until the final sweep starts; then the value it sweeps up from.
  let fillFrom = -1;
  let fillStart = 0;
  const step = (now: number) => {
    if (finished || stopped) return;
    const dt = Math.min(50, Math.max(8, now - lastNow));
    lastNow = now;
    const elapsed = now - startTime;
    if (fillFrom < 0) {
      /*
        Never let the bar sit still. The signals plateau while the page waits
        on the hero video (up to MAX_MS), which read as a counter stuck at ~58%;
        a time-based floor keeps it easing toward 92% by MAX_MS, and the real
        signals win whenever they are ahead of it.
      */
      const k = Math.min(1, elapsed / MAX_MS);
      const floor = 0.92 * (1 - (1 - k) * (1 - k));
      const t = Math.min(0.99, Math.max(targetProgress(), floor));
      const diff = t - shown;
      if (diff > 0) {
        const timeScale = dt / 16.67;
        shown += Math.max(0.002 * timeScale, Math.min(0.018 * timeScale, (diff * 0.09 + 0.0008) * timeScale));
        if (shown > 0.99) shown = 0.99;
      }
      if ((isCriticalReady() && elapsed >= MIN_MS - FILL_MS) || elapsed >= MAX_MS) { fillFrom = shown; fillStart = now; }
    } else {
      // Ease-out sweep to exactly 1 (quadratic: no long crawl through 99%).
      const k = Math.min(1, (now - fillStart) / FILL_MS);
      shown = fillFrom + (1 - fillFrom) * (1 - (1 - k) * (1 - k));
      if (k >= 1) { complete(); return; }
    }
    paint(shown);
    frame(step);
  };
  frame(step);

  // Absolute backstop so a visitor is never trapped when animation frames
  // are not running at all (a background tab); normally the sweep completes.
  later(() => { if (!finished) complete(); }, MAX_MS + FILL_MS + 600);

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
