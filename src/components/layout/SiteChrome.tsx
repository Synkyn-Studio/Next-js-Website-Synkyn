/* Small fixed UI shared by every page. */

import { GTM_ID } from "@/lib/site";

/** Global smooth-scroll UX: reading progress bar. */
export function ScrollProgressBar() {
  return <div id="scroll-progress-bar" className="scroll-progress-bar" aria-hidden="true" />;
}

export function BackToTopButton() {
  return (
    <button type="button" id="back-to-top-btn" className="back-to-top-btn" aria-label="Back to top">
      <svg className="back-to-top-icon" width="20" height="20" viewBox="0 0 52 52" fill="currentColor" aria-hidden="true">
        <path d="M41.4,21c0.8-0.8,0.8-1.9,0-2.7l-15-14.7c-0.8-0.8-2-0.8-2.8,0L8.6,18.3c-0.8,0.8-0.8,1.9,0,2.7l2.8,2.7 c0.8,0.8,2,0.8,2.8,0l4.7-4.6c0.8-0.8,2.2-0.2,2.2,0.9v27c0,1,0.9,2,2,2h4c1.1,0,2-1.1,2-2V20c0-1.2,1.4-1.7,2.2-0.9l4.7,4.6 c0.8,0.8,2,0.8,2.8,0L41.4,21z" />
      </svg>
    </button>
  );
}

/** Gradual blur bar at the bottom of the viewport (built by behaviors/gradual-blur.ts). */
export function StickyBlurBar() {
  return (
    <div
      data-curve="bezier"
      data-div-count="5"
      data-duration="0.3s"
      data-easing="ease-out"
      data-exponential="true"
      data-gradual-blur=""
      data-height="7rem"
      data-opacity="1"
      data-position="bottom"
      data-show-on-scroll="50"
      data-strength="2"
      data-target="page"
      data-z-index="50"
      id="sticky-bar"
    />
  );
}

/** Google Tag Manager (noscript). */
export function GtmNoScript() {
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
    </noscript>
  );
}
