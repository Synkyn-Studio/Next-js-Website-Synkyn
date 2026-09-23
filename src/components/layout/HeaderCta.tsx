"use client";

/*
  Header "Connect" button. Every page linked to Contact, except the Contact
  page itself, whose header used a one-click mail CTA (Connect → Mail on hover).
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_EMAIL, ROUTES, normalisePath } from "@/lib/site";

export default function HeaderCta() {
  const pathname = normalisePath(usePathname() || "/");
  if (pathname === ROUTES.contact) {
    return (
      <a className="btn btn-md btn-primary nav-connect-mail js-email-cta" href={`mailto:${CONTACT_EMAIL}`}>
        <span className="btn-text-default">Connect</span>
        <span className="btn-text-hover">Mail</span>
      </a>
    );
  }
  return (
    <Link className="btn btn-md btn-primary" href={ROUTES.contact}>
      <span>Connect</span>
    </Link>
  );
}
