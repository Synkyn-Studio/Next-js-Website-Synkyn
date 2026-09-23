/*
  Globals provided by the original vendor bundles in /public/vendor (GSAP 3.12.2
  core + ScrollTrigger/MotionPath, SplitText/DrawSVG 3.13, Lenis 1.0.11,
  Springer) and the Vimeo Player API. They are loaded as classic scripts, in the
  same order as the static site, by src/lib/runtime/vendors.ts.
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

export {};

declare global {
  // Vendor libraries are untyped UMD builds; they are intentionally `any`.
  const gsap: any;
  const ScrollTrigger: any;
  const SplitText: any;
  const MotionPathPlugin: any;
  const Lenis: any;
  const Vimeo: any;

  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    SplitText?: any;
    MotionPathPlugin?: any;
    Lenis?: any;
    Springer?: any;
    Vimeo?: any;
    lenis?: any;
    dataLayer?: unknown[];
    instgrm?: any;
    openVideoModal?: () => void;
    closeVideoModal?: () => void;
    __synkynFX?: boolean;
  }
}
