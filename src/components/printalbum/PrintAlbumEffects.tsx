"use client";

import { printAlbum } from "@/behaviors/printalbum/print-album";
import { useImmediateBehavior } from "@/lib/runtime/use-behavior";

/** Print Album gallery controller (ran inline while the page parsed). */
export default function PrintAlbumEffects() {
  useImmediateBehavior("print-album", printAlbum);
  return null;
}
