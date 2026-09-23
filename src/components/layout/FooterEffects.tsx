"use client";

import { footerDividerTransition, footerDividerTween } from "@/behaviors/footer";
import { useBehavior, useImmediateBehavior } from "@/lib/runtime/use-behavior";

/** Footer divider animations (inline IO transition + main.js GSAP tween). */
export default function FooterEffects() {
  useImmediateBehavior("footer-divider", footerDividerTransition);
  useBehavior("footer-divider-tween", footerDividerTween);
  return null;
}
