"use client";

/*
  <img> that hides itself if it fails to load — the static site's
  `onerror="this.style.display='none'"`. Also covers images that already
  failed before hydration (React would not see that error event).
*/

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

export default function SafeImg(props: ComponentPropsWithoutRef<"img">) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && img.getAttribute("src")) img.style.display = "none";
  }, []);
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img ref={ref} {...props} onError={(e) => { e.currentTarget.style.display = "none"; }} />;
}
