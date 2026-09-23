/*
  One-click email CTA (Home + Contact inline script): `.js-email-cta` opens the
  native mail client on mobile and Gmail compose on desktop. Delegated so it
  covers the persistent header CTA and page content alike.
*/

import type { Scope } from "@/lib/runtime/scope";
import { CONTACT_EMAIL } from "@/lib/site";

export function emailCta(scope: Scope) {
  scope.on(document, "click", (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.(".js-email-cta");
    if (!el) return;
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) window.location.href = `mailto:${CONTACT_EMAIL}`;
    else window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`, "_blank");
  });
}
