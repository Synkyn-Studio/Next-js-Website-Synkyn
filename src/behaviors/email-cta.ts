
import type { Scope } from "@/lib/runtime/scope";
import { CONTACT_EMAIL } from "@/lib/site";
import { copyText, toast } from "@/lib/toast";

type Gtag = (...args: unknown[]) => void;

function track(method: string, url: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", "contact_click", { method, link_url: url });
}

async function copyEmail() {
  if (await copyText(CONTACT_EMAIL)) toast(`Email copied: ${CONTACT_EMAIL}`);
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
