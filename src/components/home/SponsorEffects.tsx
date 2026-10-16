"use client";
import { sponsorReveal, sponsorShowcase } from "@/behaviors/home/sections";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";

export default function SponsorEffects() {
  useImmediateBehavior("sponsor-reveal", sponsorReveal);
  useBehavior("sponsor-showcase", sponsorShowcase);
  return null;
}
