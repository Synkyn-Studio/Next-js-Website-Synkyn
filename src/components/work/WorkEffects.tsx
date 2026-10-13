"use client";

import { workPlayers } from "@/behaviors/work";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";
import { loadVimeoApi } from "@/lib/runtime/vendors";

/** /work/<slug> behaviours: custom Vimeo controls. */
export default function WorkEffects() {
  useImmediateBehavior("vimeo-api", () => { loadVimeoApi().catch(() => undefined); });
  useBehavior("work-players", workPlayers);
  return null;
}
