"use client";

import { chromaGrid, chromaSpotlight } from "@/behaviors/about/chroma";
import { useBehavior } from "@/lib/runtime/use-behavior";

/** About page behaviours (main.js chroma grid + spotlight). */
export default function AboutEffects() {
  useBehavior("chroma-grid", chromaGrid);
  useBehavior("chroma-spotlight", chromaSpotlight);
  return null;
}
