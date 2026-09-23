"use client";

/*
  Route-specific attributes on <body> and the header, e.g. the 404 page's
  `class="bg-black text-white" style="background-color:#000 !important"`.

  The inline script applies them while the server HTML is still parsing (so
  the first paint is right); the layout effect applies them on client-side
  navigation and restores the layout defaults when the route unmounts.
*/

import { useLayoutEffect } from "react";
import { DEFAULT_BODY_CLASS } from "@/lib/site";

export interface RouteAttributesProps {
  bodyClassName: string;
  bodyBackground?: string;
  headerClassName?: string;
}

export default function RouteAttributes({ bodyClassName, bodyBackground, headerClassName }: RouteAttributesProps) {
  useLayoutEffect(() => {
    const body = document.body;
    body.className = bodyClassName;
    if (bodyBackground) body.style.setProperty("background-color", bodyBackground, "important");
    const header = headerClassName ? document.querySelector(".header-two") : null;
    if (header && headerClassName) header.classList.add(headerClassName);
    return () => {
      body.className = DEFAULT_BODY_CLASS;
      if (bodyBackground) body.style.removeProperty("background-color");
      if (header && headerClassName) header.classList.remove(headerClassName);
    };
  }, [bodyClassName, bodyBackground, headerClassName]);

  const script =
    `document.body.className=${JSON.stringify(bodyClassName)};` +
    (bodyBackground ? `document.body.style.setProperty("background-color",${JSON.stringify(bodyBackground)},"important");` : "");
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
