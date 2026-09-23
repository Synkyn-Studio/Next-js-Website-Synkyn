"use client";

/*
  Home page behaviours, registered in the order the static page ran them:
  inline scripts while parsing, then main.js, then DOMContentLoaded handlers.
*/

import { heroBackgroundVideo, heroInView, showreelModal } from "@/behaviors/home/hero";
import { heroIntro } from "@/behaviors/home/hero-intro";
import { actuallyInView, actuallyPinnedZoom, pauseOffscreenDecor, pipelineJourney, sponsorShowcase } from "@/behaviors/home/sections";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";

export default function HomeEffects() {
  // Inline scripts (ran during parsing, before any vendor library).
  useImmediateBehavior("actually-in-view", actuallyInView);
  useImmediateBehavior("pipeline-journey", pipelineJourney);
  useImmediateBehavior("offscreen-decor", pauseOffscreenDecor);

  // main.js + DOMContentLoaded handlers + deferred hero-video.js.
  // main.js's `scroll-highlighted` module is not registered here: see the note
  // in behaviors/home/sections.ts — the class it toggled has no styles.
  useBehavior("actually-pinned-zoom", actuallyPinnedZoom);
  useBehavior("sponsor-showcase", sponsorShowcase);
  useBehavior("showreel-modal", showreelModal);
  // Before hero-in-view: arming the hero stops the `.in-view` CSS reveal that
  // observer would otherwise start on top of the timeline.
  useBehavior("hero-intro", heroIntro);
  useBehavior("hero-in-view", heroInView);
  useBehavior("hero-background-video", heroBackgroundVideo);
  return null;
}
