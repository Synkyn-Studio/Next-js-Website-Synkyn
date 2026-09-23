/*
  Home hero — GSAP intro timeline and scrubbed scroll-out.

  The hero's reveal used to be pure CSS keyframes (see the "HERO REVEAL" block
  in pages/home/home.css) so that it painted without waiting for 272 KB of
  vendor script. That stays as the fallback: this behaviour only runs once GSAP
  is actually loaded, and it adds `hero-armed` to <html> in the same task in
  which it writes the start state. Until that class lands the CSS owns the
  reveal, after it GSAP does, and there is no frame in between where the hero is
  hidden with nothing animating it.

  The timeline is held until the loader's panels open (`synkyn:loaderdone`), so
  the intro plays into a visible hero instead of behind an opaque overlay.
*/

import type { Scope } from "@/lib/runtime/scope";

/* eslint-disable @typescript-eslint/no-explicit-any */

/*
  How long the hero waits for the loader before playing anyway. It has to clear
  the loader's own worst case, or the failsafe fires first and the intro plays
  behind the panels: MAX_MS (3800) + the 1% backstop walking the counter up to
  100 (~1600) + the complete/open delays (260 + 950).
*/
const LOADER_WAIT_MS = 7200;

/*
  Resting scale of the background layer. It stays slightly over 1 so the scroll
  parallax below has somewhere to travel: at 1.08 the layer overhangs its box by
  4% on each side, which covers the 3% drift without exposing an edge.
*/
const BG_REST = 1.08;
const BG_DRIFT = 3;

export function heroIntro(scope: Scope) {
  const { gsap, ScrollTrigger } = window;
  if (!gsap) return;
  const hero = document.getElementById("hero");
  if (!hero) return;

  // The CSS reveal has its own prefers-reduced-motion branch; leave it to it.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const q = gsap.utils.selector(hero);
  const brand = q(".hero-brand");
  const lines = q(".hero-brand > span");
  const services = q(".hero-services");
  const tagline = q(".hero-tagline");
  const meta = q(".hero-copyright, #hero-showreel-wrap");
  const bg = hero.querySelector<HTMLElement>(".hero-video-bg");
  const content = hero.querySelector<HTMLElement>(".hero-content");
  /*
    What the scroll-out fades. These are the blocks *around* the text, chosen so
    that no element is written by both the intro and the scrub: the intro tweens
    the services, the tagline and the copyright themselves, and a reader who
    scrolls during the intro would otherwise have two tweens fighting over one
    opacity. `.hero-brand` is only `set` by the intro, never tweened, so it can
    be faded directly. None of them contains an iframe — fading the whole
    content wrapper would drag the showreel player into a repaint every frame.
  */
  const columns = q(".hero-brand, .hero-services-list, #hero-tagline-block");
  if (!lines.length && !tagline.length) return;

  /*
    Arming and the start state have to happen together. `hero-armed` stops the
    CSS keyframes, which would otherwise outrank GSAP's inline styles (a
    `forwards` animation wins over inline declarations in the cascade), and
    `gsap.set` supplies the start state the keyframes were providing.
  */
  root.classList.add("hero-armed");
  /*
    `fx-failsafe` is the "no animation engine arrived" backstop. GSAP has
    arrived, and that class pins `transform: none !important` on the hero, which
    would freeze the timeline mid-flight — on a slow connection it can already
    have fired by the time the vendors land. The timeline's own LOADER_WAIT_MS
    backstop covers the hero from here.
  */
  root.classList.remove("fx-failsafe");
  scope.add(() => root.classList.remove("hero-armed"));

  gsap.set([...lines, ...services, ...tagline, ...meta], { willChange: "transform, opacity" });
  // main.css holds `.reveal-text { opacity: 0 }` on the brand block itself; the
  // lines inside it are what the timeline moves, so the block is opened here.
  gsap.set(brand, { opacity: 1 });
  gsap.set(lines, { opacity: 0, yPercent: 45 });
  gsap.set(tagline, { opacity: 1, clipPath: "inset(0 100% 0 0)" });
  gsap.set(services, { opacity: 0, y: 16 });
  gsap.set(meta, { opacity: 0, y: 14 });
  if (bg) gsap.set(bg, { scale: BG_REST + 0.07, transformOrigin: "50% 50%" });

  const tl = gsap.timeline({ paused: true, defaults: { force3D: true } });
  if (bg) tl.to(bg, { scale: BG_REST, duration: 2.1, ease: "power2.out" }, 0);
  tl.to(lines, { opacity: 1, yPercent: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.04)
    .to(tagline, { clipPath: "inset(0 0% 0 0)", duration: 1.15, ease: "power3.inOut" }, 0.34)
    .to(services, { opacity: 1, y: 0, duration: 0.85, stagger: 0.075, ease: "power3.out" }, 0.4)
    .to(meta, { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out" }, 0.62)
    // Hinting a layer for the whole session costs memory for nothing once the
    // intro has landed; the scroll-out keeps its own hint on the background.
    .set([...lines, ...services, ...tagline, ...meta], { clearProps: "willChange" });

  /*
    Scroll-out. Two tweens rather than one so the lift stays linear against the
    wheel while the fade holds the text readable through the first third.
    `scrub: true` ties it 1:1 to the scroll position — Lenis already smooths the
    input, and adding a second smoothing pass here is what makes a hero feel
    like it is dragging behind the page.
  */
  const buildScrollOut = () => {
    if (!ScrollTrigger || !content) return;
    gsap.registerPlugin(ScrollTrigger);
    const out = gsap.timeline({
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      defaults: { force3D: true },
    });
    // The lift is one transform on the whole layer, so the showreel iframe
    // travels with it as a composited layer rather than being repainted.
    out.to(content, { yPercent: -8, ease: "none" }, 0)
      .to(columns, { opacity: 0, ease: "power2.in" }, 0);
    // Only `yPercent` on the background: the intro owns `scale` on that same
    // element, and GSAP composes separate transform components independently,
    // so the two never overwrite each other.
    if (bg) out.to(bg, { yPercent: BG_DRIFT, ease: "none" }, 0);
  };

  /*
    While the loader is up `html, body { overflow: hidden }`, so ScrollTrigger
    would measure a page that cannot scroll. Everything below the fold is
    measured after the panels open.
  */
  const start = scope.wrap(() => {
    tl.play(0);
    buildScrollOut();
    if (ScrollTrigger) ScrollTrigger.refresh();
  });

  if (!root.classList.contains("show-loader")) { start(); return; }

  let fired = false;
  const once = () => { if (fired) return; fired = true; start(); };
  scope.on(document, "synkyn:loaderdone", once);
  // A loader that never reports done must not leave the hero blank.
  scope.timeout(once, LOADER_WAIT_MS);
}
