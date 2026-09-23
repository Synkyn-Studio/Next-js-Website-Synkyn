/*
  Mobile slide-in panel content. On the static site navbar.js replaced the
  sidebar's markup with this at runtime; it is now rendered directly.
  Open/close and active-link state are handled in src/behaviors/site-chrome.ts.
*/

import Link from "next/link";
import { CONTACT_EMAIL, ROUTES } from "@/lib/site";

export const MOBILE_LINKS = [
  { href: ROUTES.home, label: "Home", path: "index.html" },
  { href: ROUTES.about, label: "About Us", path: "about-us.html" },
  { href: ROUTES.library, label: "Library", path: "library.html" },
  { href: ROUTES.printAlbum, label: "Print Album", path: "printalbum.html" },
  { href: ROUTES.team, label: "Our Team", path: "about-us.html#team" },
  { href: ROUTES.contact, label: "Contact", path: "contact.html" },
] as const;

export default function MobileMenu() {
  return (
    <div className="mobile-menu-inner">
      <div className="mobile-menu-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Synkyn Studios" className="mobile-menu-logo" />
        <button className="mobile-menu-close" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="mobile-menu-links">
        {MOBILE_LINKS.map((l) => (
          <Link key={l.path} href={l.href} className="mobile-menu-link" data-path={l.path}>{l.label}</Link>
        ))}
      </nav>

      <div className="mobile-menu-divider" />

      <div className="mobile-menu-footer-block">
        <div className="mobile-menu-label">{"Let's Talk"}</div>
        <a href={`mailto:${CONTACT_EMAIL}`} className="mobile-menu-email">
          {CONTACT_EMAIL}
          <span className="plus-icon">+</span>
        </a>
        <div className="mobile-menu-location">
          Bengaluru (IN)
          <span className="time-placeholder" />
        </div>
      </div>

      <div className="mobile-menu-footer-block">
        <div className="mobile-menu-label">Socials</div>
        <div className="mobile-menu-socials">
          <a href="https://www.instagram.com/synkyn_studios/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/synkynstudios/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mobile-menu-bottom-bar">
        <div className="bottom-links">
          <Link href={ROUTES.terms} data-path="terms.html">{"Terms & Conditions ↗"}</Link>
        </div>
        <div className="bottom-copyright">© 2026 Synkyn® All rights reserved.</div>
      </div>
    </div>
  );
}
