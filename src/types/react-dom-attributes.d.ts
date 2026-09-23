/*
  Type additions for markup carried over verbatim from the static pages:
  - CSS custom properties in inline styles (style={{ "--top": "12%" }})
  - `fetchPriority` on <iframe> (valid HTML; React renders it as `fetchpriority`)
*/

import "react";

declare module "react" {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined;
  }
  interface IframeHTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto";
  }
}
