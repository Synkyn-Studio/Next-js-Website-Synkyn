"use client";

import { contactCardTilt } from "@/behaviors/contact/card-tilt";
import { useImmediateBehavior } from "@/lib/runtime/use-behavior";

/** Contact page behaviours (the one-click email CTA is handled site-wide). */
export default function ContactEffects() {
  useImmediateBehavior("contact-card-tilt", contactCardTilt);
  return null;
}
