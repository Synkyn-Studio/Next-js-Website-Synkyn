"use client";

/*
  Per-page runtime, rendered last on every page so it runs after the page's
  own behaviours (as main.js ran after each page's inline scripts):
  - applies the page's Lenis profile and progress-bar setting,
  - starts the [data-ns-animate] reveal engine for the page's content.
*/

import { revealOnScroll } from "@/behaviors/reveal";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";
import { applyLenisProfile, type LenisProfile, setProgressBarEnabled } from "@/lib/runtime/smooth-scroll";

export interface PageRuntimeProps {
  /** Lenis configuration the static page used. */
  profile?: LenisProfile;
  /** About disabled the scroll progress bar hook. */
  progressBar?: boolean;
  /** Pages that set the `synkyn_visited` session flag. */
  markVisited?: boolean;
}

export default function PageRuntime({ profile = "standard", progressBar = true, markVisited = true }: PageRuntimeProps) {
  useImmediateBehavior("visited-flag", () => {
    if (!markVisited) return;
    try { sessionStorage.setItem("synkyn_visited", "true"); } catch { /* storage unavailable */ }
  }, [markVisited]);

  useBehavior("page-profile", () => {
    applyLenisProfile(profile);
    setProgressBarEnabled(progressBar);
  }, [profile, progressBar]);

  useBehavior("reveal", revealOnScroll);
  return null;
}
