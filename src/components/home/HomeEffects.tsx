"use client";
import { heroBackgroundVideo, heroInView, showreelModal } from "@/behaviors/home/hero";
import { heroIntro } from "@/behaviors/home/hero-intro";
import { actuallyInView, actuallyPinnedZoom, pauseOffscreenDecor, pipelineJourney } from "@/behaviors/home/sections";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";

export default function HomeEffects() {
  useImmediateBehavior("actually-in-view", actuallyInView);
  useImmediateBehavior("pipeline-journey", pipelineJourney);
  useImmediateBehavior("offscreen-decor", pauseOffscreenDecor);
  useBehavior("actually-pinned-zoom", actuallyPinnedZoom);
  useBehavior("showreel-modal", showreelModal);
  useBehavior("hero-intro", heroIntro);
  useBehavior("hero-in-view", heroInView);
  useBehavior("hero-background-video", heroBackgroundVideo);
  return null;
}
