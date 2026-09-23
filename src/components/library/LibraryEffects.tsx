"use client";

import { heroParticles, libraryWorks, pfReveals } from "@/behaviors/library/library";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";
import { loadVimeoApi } from "@/lib/runtime/vendors";

/** Library page behaviours (library.html DOMContentLoaded script). */
export default function LibraryEffects() {
  // library.html included the Vimeo Player API up front.
  useImmediateBehavior("vimeo-api", () => { loadVimeoApi().catch(() => undefined); });
  useBehavior("library-works", libraryWorks);
  useBehavior("library-particles", heroParticles);
  useBehavior("library-reveals", (scope) => pfReveals(scope));
  return null;
}
