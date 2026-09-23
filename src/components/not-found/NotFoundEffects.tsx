"use client";

import { zeroGravity404 } from "@/behaviors/not-found/zero-gravity";
import { useImmediateBehavior } from "@/lib/runtime/use-behavior";

/** 404 behaviours (inline script that ran while the page parsed). */
export default function NotFoundEffects() {
  useImmediateBehavior("zero-gravity-404", zeroGravity404);
  return null;
}
