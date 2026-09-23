"use client";

import { termsResponsiveToc, termsReveals, termsTocSpy } from "@/behaviors/terms/terms";
import { useBehavior } from "@/lib/runtime/use-behavior";

/** Terms page behaviours (terms.html DOMContentLoaded script). */
export default function TermsEffects() {
  useBehavior("terms-reveals", termsReveals);
  useBehavior("terms-toc-spy", termsTocSpy);
  useBehavior("terms-toc", termsResponsiveToc);
  return null;
}
