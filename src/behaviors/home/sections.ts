/* Home page section behaviours (index.html inline scripts + main.js). */

import type { Scope } from "@/lib/runtime/scope";

/** index.html — adds `is-in-view` to .actually-area once it enters the viewport. */
export function actuallyInView(scope: Scope) {
  const el = document.querySelector(".actually-area");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    el.classList.add("is-in-view");
    return;
  }
  const io = scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { el.classList.add("is-in-view"); io.unobserve(el); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }));
  io.observe(el);
}

/** index.html — pinned, scrubbed gold sweep + zoom-through of the "actually" statement. */
export function actuallyPinnedZoom() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const section = document.querySelector(".actually-area");
  const text = document.getElementById("space-earth-text");
  if (!section || !text) return;
  section.classList.add("is-in-view");
  const isMobile = window.innerWidth < 768;
  /*
    `.actually-area` carries `transition: opacity/transform .85s` for its
    entry reveal, and `is-in-view` above has just finished it. `is-pinned`
    drops the transition so nothing on the section is interpolated while the
    zoom-through scrubs.
  */
  section.classList.add("is-pinned");
  /*
    The section is held on screen by `position: sticky` inside
    `.actually-track` (home.css), not by a ScrollTrigger pin: a fixed pin was
    reported as a full-screen layout shift on every pass (CLS ≈ 1.5–2 on Home,
    where "good" is < 0.1), a transform pin trails the finger on native touch
    scrolling, and `anticipatePin` snapped it to the top 50–90px early. The
    timeline just scrubs across the track's extra 170vh.

    `scrub: true` rather than a smoothed `scrub: 0.6`. Lenis is already easing
    the scroll position, so a second easing pass here means the timeline keeps
    creeping toward its target after the wheel stops — and at the end of this
    timeline the heading is scaled up 28×, where a progress change too small to
    see becomes a large change in pixels. That creep is the shimmer.
  */
  const track = section.closest(".actually-track") || section;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: track, scrub: true, start: "top top", end: "bottom bottom", fastScrollEnd: true, invalidateOnRefresh: true },
  });
  tl.to(text, { backgroundPosition: "0% 0", ease: "none", duration: 0.35 });
  tl.to(text, { scale: isMobile ? 18 : 28, opacity: 0, ease: "power2.inOut", duration: 0.4 }, "+=0.05");
  tl.set(text, { visibility: "hidden" });
  tl.to({}, { duration: 0.35 });
}

/*
  main.js's `scroll-highlighted` module is deliberately not ported. It measured
  `.actually-area` on every scroll event and toggled that class on the section
  and its title — but no stylesheet on this site, here or in main.css, defines
  a single `.scroll-highlighted` rule. So it read layout on every scroll frame,
  inside the pinned section that can least afford it, and changed nothing.
*/

/** index.html — the rocket "pipeline" journey (flecks, clouds, nodes, path draw). */
export function pipelineJourney(scope: Scope) {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobileDevice = () => window.innerWidth < 768;

  const section = document.getElementById("pipeline-section");
  if (!section) return;
  const journey = section.querySelector<HTMLElement>(".journey");
  const stops = Array.from(section.querySelectorAll<HTMLElement>(".stop"));
  const mobileTimelineBar = section.querySelector<HTMLElement>(".mobile-timeline-bar");
  const mobileRocket = section.querySelector<HTMLElement>(".mobile-rocket");

  // Everything below is generated into empty SVG groups; clear it on teardown
  // so a remount (e.g. navigating back to Home) starts from the same markup.
  const generated: Element[] = [];
  scope.add(() => generated.forEach((n) => n.remove()));

  const fleckLayer = section.querySelector(".flecks");
  if (fleckLayer && !isMobileDevice()) {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 64; i++) {
      const isTri = Math.random() < 0.6;
      let el: SVGElement;
      if (isTri) {
        el = document.createElementNS(SVG_NS, "path");
        const s = rand(3, 8);
        el.setAttribute("d", `M0 0 L${s} ${s * 0.36} L${s * 0.2} ${s} Z`);
      } else {
        el = document.createElementNS(SVG_NS, "circle");
        el.setAttribute("r", rand(0.6, 1.6).toFixed(2));
      }
      const x = rand(0, 1600).toFixed(1);
      const y = rand(0, 900).toFixed(1);
      if (isTri) el.setAttribute("transform", `translate(${x} ${y}) rotate(${rand(0, 360).toFixed(0)})`);
      else { el.setAttribute("cx", x); el.setAttribute("cy", y); }
      el.setAttribute("class", "fleck" + (Math.random() < 0.35 ? " dust" : ""));
      el.style.setProperty("--fd", `${rand(10, 22).toFixed(1)}s`);
      el.style.setProperty("--ff", `${rand(3.5, 8).toFixed(1)}s`);
      el.style.setProperty("--fo", rand(0.18, 0.5).toFixed(2));
      el.style.setProperty("--dx", `${rand(-16, 16).toFixed(1)}px`);
      el.style.setProperty("--dy", `${rand(-22, -6).toFixed(1)}px`);
      el.style.setProperty("--rot", `${rand(-40, 40).toFixed(0)}deg`);
      el.style.animationDelay = `${rand(0, 8).toFixed(2)}s, ${rand(0, 5).toFixed(2)}s`;
      if (reduceMotion) el.style.opacity = "0.25";
      frag.appendChild(el);
      generated.push(el);
    }
    fleckLayer.appendChild(frag);
  }

  const geo = document.getElementById("trail-geo") as SVGGeometryElement | null;
  const layers = ["trail-halo", "trail-glow", "trail-core"].map((cls) => section.querySelector<SVGElement>(`.${cls}`));
  const rocketTraveler = section.querySelector(".rocket-traveler");
  const rocketAssembly = section.querySelector(".rt-assembly");
  const nodeLayer = section.querySelector(".nodes");
  const nodeCloudLayer = section.querySelector(".node-clouds");
  const fgCloudLayer = section.querySelector(".fg-clouds");

  let L = 0;
  let pathLUT: { x: number; y: number; rot: number }[] | null = null;
  /*
    Sampling the trail is by far the most expensive work on this page:
    getPointAtLength costs ~0.3ms on this path. The original took three
    samples per step (the point plus a ±36px chord for the rocket's angle)
    at 3000 steps — about 3s of blocked main thread on load.

    The same result comes from one sample per step: the chord endpoints are
    points on the path we already sample, so the angle is read from the table
    itself. At 1200 steps the spacing is ~4.6px, well under a rocket length,
    and the build is time-sliced across idle frames (see buildPathTable).
  */
  const NUM_SAMPLES = 1200;
  const CHORD_PX = 36;
  let nodes: { el: SVGGElement; len: number; stop: HTMLElement | null; lit: boolean; inState: boolean }[] = [];

  const createAestheticCloud = (parent: Element | null, cx: number, cy: number, w: number, h: number, tilt: number, flipX: boolean, op: number, cls: string, delay: number | string) => {
    if (!parent) return;
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("transform", `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${tilt}) scale(${flipX ? -1 : 1}, 1)`);
    const cloud = document.createElementNS(SVG_NS, "use");
    cloud.setAttribute("href", "#s-cloud");
    cloud.setAttribute("x", (-w / 2).toFixed(1));
    cloud.setAttribute("y", (-h / 2).toFixed(1));
    cloud.setAttribute("width", String(w));
    cloud.setAttribute("height", String(h));
    cloud.setAttribute("opacity", String(op));
    cloud.setAttribute("class", `cloud ${cls}`);
    cloud.style.animationDelay = `${delay}s`;
    group.appendChild(cloud);
    parent.appendChild(group);
    generated.push(group);
  };

  /** Samples the trail into `points`, at most `budgetMs` of work per call. */
  let points: { x: number; y: number }[] | null = null;
  let sampleIndex = 0;
  let buildQueued = false;
  const samplePoints = (budgetMs: number) => {
    if (!geo) return false;
    if (!points) {
      L = geo.getTotalLength();
      layers.forEach((el) => { if (el) { el.style.strokeDasharray = `${L}`; el.style.strokeDashoffset = `${L}`; } });
      points = new Array(NUM_SAMPLES + 1);
      sampleIndex = 0;
    }
    const started = performance.now();
    while (sampleIndex <= NUM_SAMPLES) {
      const pt = geo.getPointAtLength((sampleIndex / NUM_SAMPLES) * L);
      points[sampleIndex] = { x: pt.x, y: pt.y };
      sampleIndex++;
      if (budgetMs > 0 && (sampleIndex & 7) === 0 && performance.now() - started > budgetMs) return false;
    }
    return true;
  };

  const initDesktopPath = (budgetMs = 0) => {
    if (pathLUT || !geo) return;
    if (!samplePoints(budgetMs)) {
      // Not finished within this frame's budget — continue when idle.
      if (!buildQueued) {
        buildQueued = true;
        const resume = () => { buildQueued = false; initDesktopPath(6); };
        const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) ric(resume, { timeout: 400 }); else scope.timeout(resume, 32);
      }
      return;
    }
    const pts = points!;
    // Rotation from a ±CHORD_PX chord, read out of the table we just built.
    const step = Math.max(1, Math.round(CHORD_PX / (L / NUM_SAMPLES)));
    pathLUT = new Array(NUM_SAMPLES + 1);
    let prevRot = 0;
    for (let i = 0; i <= NUM_SAMPLES; i++) {
      const a = pts[Math.max(0, i - step)];
      const b = pts[Math.min(NUM_SAMPLES, i + step)];
      let rot = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI) + 90;
      if (i === 0) prevRot = rot;
      else {
        let diff = rot - prevRot;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        rot = prevRot + diff;
        prevRot = rot;
      }
      pathLUT[i] = { x: pts[i].x, y: pts[i].y, rot };
    }
    if (fgCloudLayer && !fgCloudLayer.hasChildNodes()) {
      createAestheticCloud(fgCloudLayer, 680, 220, 680, 408, 6, false, 0.82, "drift-a", 0.5);
      createAestheticCloud(fgCloudLayer, 600, 1340, 720, 432, -8, true, 0.85, "drift-b", 1.8);
      createAestheticCloud(fgCloudLayer, 600, 2660, 700, 420, 10, false, 0.84, "drift-c", 3.2);
    }
    // Binary search the sampled table instead of re-walking the path.
    const sampleAtY = (targetY: number) => {
      let lo = 0, hi = NUM_SAMPLES;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (pts[mid].y < targetY) lo = mid + 1; else hi = mid;
      }
      return lo;
    };
    const APEX_Y = [300, 980, 1660, 2340, 3020, 3700];
    if (nodes.length === 0) {
      nodes = APEX_Y.map((y, i) => {
        const index = sampleAtY(y);
        const len = (index / NUM_SAMPLES) * L;
        const pt = pts[index];
        const isRightBend = i % 2 === 0;
        const tilt1 = i % 3 === 0 ? 7 : -9;
        const tilt2 = i % 2 === 0 ? -6 : 10;
        const tiltFg = i % 2 === 0 ? 8 : -7;
        if (nodeCloudLayer && !nodeCloudLayer.hasChildNodes()) {
          if (isRightBend) {
            createAestheticCloud(nodeCloudLayer, pt.x - 180, pt.y - 100, 680, 408, tilt1, false, 0.78, "drift-a", (i * 1.2).toFixed(1));
            createAestheticCloud(nodeCloudLayer, pt.x + 160, pt.y + 80, 600, 360, tilt2, true, 0.6, "drift-c", (i * 1.2 + 2.1).toFixed(1));
            createAestheticCloud(fgCloudLayer, pt.x + 10, pt.y - 20, 680, 408, tiltFg, true, 0.84, "drift-b", (i * 0.9).toFixed(1));
          } else {
            createAestheticCloud(nodeCloudLayer, pt.x + 180, pt.y - 100, 680, 408, tilt1, true, 0.78, "drift-b", (i * 1.2).toFixed(1));
            createAestheticCloud(nodeCloudLayer, pt.x - 160, pt.y + 80, 600, 360, tilt2, false, 0.62, "drift-a", (i * 1.2 + 2.1).toFixed(1));
            createAestheticCloud(fgCloudLayer, pt.x - 10, pt.y + 20, 680, 408, tiltFg, false, 0.86, "drift-a", (i * 0.9).toFixed(1));
          }
        }
        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("class", "node");
        g.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
        const glow = document.createElementNS(SVG_NS, "circle");
        glow.setAttribute("r", "40"); glow.setAttribute("fill", "url(#g-node)"); glow.setAttribute("class", "node-glow");
        const ring = document.createElementNS(SVG_NS, "circle");
        ring.setAttribute("r", "9"); ring.setAttribute("class", "node-ring");
        const core = document.createElementNS(SVG_NS, "circle");
        core.setAttribute("r", "3.4"); core.setAttribute("class", "node-core");
        g.append(glow, ring, core);
        if (nodeLayer) { nodeLayer.appendChild(g); generated.push(g); }
        return { el: g, len, stop: stops[i] || null, lit: false, inState: false };
      });
    }
  };

  // Start sampling the trail in idle slices, well before the section scrolls in.
  if (geo && !isMobileDevice()) initDesktopPath(6);

  const samplePath = (len: number) => {
    if (!pathLUT) return { x: 0, y: 0, rot: 0 };
    const clamped = Math.min(Math.max(len, 0), L);
    const exact = (clamped / L) * NUM_SAMPLES;
    const idx = Math.min(NUM_SAMPLES - 1, Math.floor(exact));
    const t = exact - idx;
    const p1 = pathLUT[idx];
    const p2 = pathLUT[idx + 1] || p1;
    return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t, rot: p1.rot + (p2.rot - p1.rot) * t };
  };

  const setDesktopProgress = (p: number) => {
    if (!pathLUT) { initDesktopPath(); if (!pathLUT) return; }
    const drawn = L * p;
    const offset = (L - drawn).toFixed(1);
    layers.forEach((el) => { if (el) el.style.strokeDashoffset = offset; });
    const { x, y, rot } = samplePath(Math.min(Math.max(drawn, 0.5), L - 0.5));
    if (rocketTraveler) {
      rocketTraveler.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      const targetOp = p > 0.004 && p < 0.996 ? "1" : "0";
      if (rocketTraveler.getAttribute("opacity") !== targetOp) rocketTraveler.setAttribute("opacity", targetOp);
    }
    if (rocketAssembly) rocketAssembly.setAttribute("transform", `rotate(${rot.toFixed(2)})`);
    nodes.forEach((n) => {
      const lit = drawn >= n.len - 6;
      if (n.lit !== lit) { n.lit = lit; n.el.classList.toggle("lit", lit); }
      const inState = lit || drawn >= n.len - L * 0.055;
      if (n.inState !== inState) { n.inState = inState; if (n.stop) n.stop.classList.toggle("in", inState); }
    });
  };

  const setMobileProgress = (p: number) => {
    if (mobileRocket && journey) {
      const trackH = journey.offsetHeight - 40;
      const rY = Math.max(0, Math.min(trackH, p * trackH));
      mobileRocket.style.setProperty("--rocket-y", `${rY.toFixed(1)}px`);
      let rocketOpacity = 1;
      if (p < 0.03) rocketOpacity = Math.max(0, p / 0.03);
      else if (p > 0.8) rocketOpacity = Math.max(0, (1 - p) / 0.2);
      mobileRocket.style.opacity = rocketOpacity.toFixed(3);
      if (mobileTimelineBar) {
        const totalTrackH = Math.max(1, journey.offsetHeight - 40);
        const lineFillPx = Math.min(totalTrackH, rY + 48);
        mobileTimelineBar.style.transform = `scaleY(${(lineFillPx / totalTrackH).toFixed(4)})`;
        mobileTimelineBar.style.opacity = p > 0.88 ? Math.max(0, (1 - p) / 0.12).toFixed(3) : "1";
      }
    }
    const totalStops = stops.length;
    stops.forEach((stop, idx) => {
      const threshold = idx / Math.max(1, totalStops - 0.5);
      stop.classList.toggle("in", p >= threshold - 0.08);
    });
  };

  if (reduceMotion) {
    layers.forEach((el) => { if (el) el.style.strokeDashoffset = "0"; });
    if (rocketTraveler) rocketTraveler.setAttribute("opacity", "0");
    nodes.forEach((n) => { n.el.classList.add("lit"); if (n.stop) n.stop.classList.add("in"); });
    stops.forEach((stop) => stop.classList.add("in"));
    return;
  }

  let target = 0, current = -1, isVisible = false, settled = false;

  /*
    One clock for the journey.

    The progress used to be pushed from both `window.scroll` and
    `lenis.on("scroll")`, and each of those scheduled its own
    requestAnimationFrame to run the lerp below. So the trail, the rocket and the
    nodes were written a frame after the scroll position they had been measured
    against, from a callback on a different phase to the scrolling itself. That
    offset is the jitter: the rocket is drawn where the page was, not where it is.

    GSAP's ticker already drives `lenis.raf` (see runtime/smooth-scroll.ts) and
    runs its callbacks in the order they were added, so a callback added here
    runs after Lenis has applied this frame's scroll position. Measuring and
    writing then both happen against the position that is about to be painted.
  */
  const frameStep = () => {
    if (!isVisible || !journey) return;
    const isMobile = isMobileDevice();
    if (!isMobile && !pathLUT) initDesktopPath(6);
    const rect = journey.getBoundingClientRect();
    const raw = (window.innerHeight * 0.62 - rect.top) / (rect.height * 0.96);
    target = Math.max(0, Math.min(1, raw));
    const diff = target - current;
    if (Math.abs(diff) > 0.0005) {
      current += diff * (isMobile ? 0.35 : 0.38);
      settled = false;
    } else {
      if (settled) return; // parked: nothing left to write this frame
      current = target;
      settled = true;
    }
    if (isMobile) setMobileProgress(current); else setDesktopProgress(current);
  };

  /*
    This behaviour runs at inline-script timing, so GSAP may still be in flight.
    Wait briefly for the ticker, and fall back to a plain frame loop if the
    vendor bundle never arrives at all — the journey still has to work.
  */
  const attachDriver = (tries: number) => {
    const ticker = window.gsap && window.gsap.ticker;
    if (ticker) {
      ticker.add(frameStep);
      // The ticker is global and outlives this page, so give the callback back.
      scope.add(() => ticker.remove(frameStep));
      return;
    }
    if (tries > 0) { scope.timeout(() => attachDriver(tries - 1), 50); return; }
    const rafDriver = () => { frameStep(); scope.raf(rafDriver); };
    scope.raf(rafDriver);
  };
  attachDriver(60);

  if ("IntersectionObserver" in window) {
    scope.observe(new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isMobileDevice() && !pathLUT) initDesktopPath(6);
      });
    }, { rootMargin: "250px 0px" })).observe(section);
  } else isVisible = true;

  // A resize changes the track geometry; unpark so the next frame rewrites it.
  scope.on(window, "resize", () => {
    if (!isMobileDevice() && !pathLUT) initDesktopPath(6);
    current = -1;
    settled = false;
  }, { passive: true });
}

/**
 * Pauses the decorative CSS animations of a section while it is off-screen
 * (see styles/pages/home/offscreen-pause.css). They keep the compositor busy
 * otherwise, which costs frames everywhere else on the page.
 */
export function pauseOffscreenDecor(scope: Scope) {
  if (!("IntersectionObserver" in window)) return;
  const sections = ["#pipeline-section", "#research-sponsors"]
    .map((sel) => document.querySelector(sel))
    .filter((el): el is Element => !!el);
  if (!sections.length) return;
  const io = scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-offscreen", !entry.isIntersecting));
  }, { rootMargin: "200px 0px" }));
  sections.forEach((el) => io.observe(el));
  scope.add(() => sections.forEach((el) => el.classList.remove("is-offscreen")));
}

/**
 * index.html — GSAP sponsor marquee. Takes the loop over from the CSS keyframes
 * (fallback before GSAP loads) at the same position, then adds a staggered
 * card entrance, flywheel-style hover/touch inertia, a scroll-velocity boost,
 * and pauses the loops while the section is off-screen.
 */
export function sponsorShowcase(scope: Scope) {
  const { gsap, ScrollTrigger } = window;
  const section = document.getElementById("research-sponsors");
  if (!gsap || !ScrollTrigger || !section) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const rows = Array.from(section.querySelectorAll<HTMLElement>(".logo-carousel-row"));
  if (!rows.length) return;

  // Where the CSS keyframe loop currently is, so the hand-over doesn't jump.
  const cssProgress = (track: HTMLElement) => {
    const anim = typeof track.getAnimations === "function" ? track.getAnimations()[0] : undefined;
    const duration = Number(anim?.effect?.getTiming().duration) || 0;
    const time = Number(anim?.currentTime) || 0;
    return duration ? (time % duration) / duration : 0;
  };

  const loops = rows.flatMap((row) => {
    const track = row.querySelector<HTMLElement>(".logo-carousel-track");
    if (!track) return [];
    const reverse = row.classList.contains("logo-carousel-row--right");
    const progress = cssProgress(track);
    const tween = gsap.fromTo(track, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, duration: reverse ? 52 : 42, ease: "none", repeat: -1 });
    tween.progress(progress);
    return [{ row, tween, speed: { value: 1 } }];
  });
  section.classList.add("is-gsap");
  scope.add(() => section.classList.remove("is-gsap"));

  /*
    Hover / touch / focus coasts a row to a stop and back, like a flywheel.
    Stopping: "sine.out" on the speed responds the instant the cursor lands and
    lands softly at zero (no end jolt); the row drifts only ~30px while braking.
    Resuming: "sine.inOut" over a longer span so it gathers speed gradually.
    `overwrite` continues from the current speed, so quick in/out never snaps.
  */
  loops.forEach(({ row, speed }) => {
    const ease = (value: number) => gsap.to(speed, value
      ? { value, duration: 1.8, ease: "sine.inOut", overwrite: true }
      : { value, duration: 1.3, ease: "sine.out", overwrite: true });
    scope.on(row, "mouseenter", () => ease(0));
    scope.on(row, "mouseleave", () => ease(1));
    scope.on(row, "focusin", () => ease(0));
    scope.on(row, "focusout", () => ease(1));
    scope.on(row, "touchstart", () => ease(0), { passive: true });
    scope.on(row, "touchend", () => ease(1), { passive: true });
    scope.on(row, "touchcancel", () => ease(1), { passive: true });
  });

  // Scrolling past the section briefly speeds the logos up.
  const boost = { value: 1 };
  const tick = () => loops.forEach(({ tween, speed }) => tween.timeScale(speed.value * boost.value));
  gsap.ticker.add(tick);
  scope.add(() => gsap.ticker.remove(tick));
  const setPlaying = (on: boolean) => loops.forEach(({ tween }) => (on ? tween.resume() : tween.pause()));
  const visibility = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self: { isActive: boolean }) => setPlaying(self.isActive),
    onUpdate: (self: { getVelocity(): number }) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 900, 3);
      if (v < 0.05) return;
      gsap.to(boost, {
        value: 1 + v, duration: 0.25, ease: "power2.out", overwrite: true,
        onComplete: () => { gsap.to(boost, { value: 1, duration: 1.4, ease: "power3.out", overwrite: true }); },
      });
    },
  });
  if (!visibility.isActive) setPlaying(false);

  // Entrance — skipped if the section is already on screen (e.g. reload mid-page).
  if (section.getBoundingClientRect().top < window.innerHeight * 0.85) return;
  const imagesReady = (root: Element, cap: number) => Promise.race([
    Promise.all(Array.from(root.querySelectorAll("img")).map((img) => img.decode().catch(() => undefined))),
    new Promise((resolve) => { scope.timeout(resolve, cap); }),
  ]);
  rows.forEach((row) => {
    const cards = Array.from(row.querySelectorAll<HTMLElement>(".logo-carousel-item"));
    gsap.set(cards, { autoAlpha: 0, y: 34, scale: 0.82 });
    ScrollTrigger.create({
      trigger: row,
      start: "top 88%",
      once: true,
      onEnter: () => scope.then(imagesReady(row, 700), () => {
        // Sweep left-to-right across whatever is visible, wherever the loop is.
        const box = row.getBoundingClientRect();
        const at = (el: HTMLElement) => Math.max(0, Math.min(1, (el.getBoundingClientRect().left - box.left) / box.width));
        gsap.to(cards, {
          autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out",
          delay: (_: number, el: HTMLElement) => at(el) * 0.6,
          clearProps: "transform,opacity,visibility",
        });
      }),
    });
  });
}
