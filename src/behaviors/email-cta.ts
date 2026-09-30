/*
  One-click email CTA (Home + Contact inline script): `.js-email-cta` opens the
  native mail client on mobile and Gmail compose on desktop. Delegated so it
  covers the persistent header CTA and page content alike.

  Neither route is guaranteed to reach a working mail app (no default client,
  signed out of Gmail, a different webmail…), so the address is also copied to
  the clipboard and a short toast says so: the visitor always leaves the click
  holding the address.

  Contact clicks (email, Instagram, LinkedIn) are reported to GA4 as
  `contact_click` so leads show up in Analytics.
*/

import type { Scope } from "@/lib/runtime/scope";
import { CONTACT_EMAIL } from "@/lib/site";

type Gtag = (...args: unknown[]) => void;

function track(method: string, url: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", "contact_click", { method, link_url: url });
}

let toastTimer: number | undefined;
function toast(message: string) {
  let el = document.getElementById("sk-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "sk-toast";
    el.className = "sk-toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = message;
  // Restart the entrance if a second click lands while it is still showing.
  el.classList.remove("is-visible");
  void el.offsetWidth;
  el.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el?.classList.remove("is-visible"), 2600);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    toast(`Email copied: ${CONTACT_EMAIL}`);
  } catch {
    /* clipboard blocked (insecure context / permissions): the mail app still opens */
  }
}

export function emailCta(scope: Scope) {
  scope.on(document, "click", (e: MouseEvent) => {
    const target = e.target as Element | null;
    const el = target?.closest?.(".js-email-cta");
    if (!el) {
      const link = target?.closest?.<HTMLAnchorElement>("a[href]");
      const href = link?.href || "";
      if (/instagram\.com/i.test(href)) track("instagram", href);
      else if (/linkedin\.com\/company/i.test(href)) track("linkedin", href);
      else if (href.startsWith("mailto:")) track("email", href);
      return;
    }
    e.preventDefault();
    track("email", `mailto:${CONTACT_EMAIL}`);
    void copyEmail();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) window.location.href = `mailto:${CONTACT_EMAIL}`;
    else window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`, "_blank");
  });
}
