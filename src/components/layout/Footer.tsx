/*
  Site footer. The static pages each carried a copy with small differences
  (which link had the `active` class, the logo alt text, the motto spacing on
  404); those are props now. Links to the page being viewed are rendered the
  way assets/footer.js left them: no href, default cursor, half opacity, and
  marked current (navbar.js markCurrent) when the link has no hash.
*/

import Link from "next/link";
import SafeImg from "@/components/ui/SafeImg";
import { InstagramGlyph, LinkedInGlyph } from "@/components/ui/icons";
import { ROUTES } from "@/lib/site";
import FooterEffects from "./FooterEffects";

type FooterKey = "team" | "contact" | "library" | "printAlbum" | "terms";

const COLUMNS: { title: string; links: { key: FooterKey; href: string; label: string }[] }[] = [
  { title: "Company", links: [{ key: "team", href: ROUTES.team, label: "Our Team" }, { key: "contact", href: ROUTES.contact, label: "Contact Us" }] },
  { title: "Discover", links: [{ key: "library", href: ROUTES.library, label: "Library" }, { key: "printAlbum", href: ROUTES.printAlbum, label: "Print Album" }] },
  { title: "Legal Policies", links: [{ key: "terms", href: ROUTES.terms, label: "Terms & Conditions" }] },
];

export interface FooterProps {
  /** Pathname of the page rendering the footer ("" for the 404 page). */
  currentPath: string;
  /** Link that carried the `active` class in that page's markup. */
  active?: FooterKey;
  logoAlt?: string;
  motto?: string;
}

export default function Footer({
  currentPath,
  active,
  logoAlt = "Synkyn Studios Logo - AI Film Studio Bengaluru",
  motto = "—Turn Your Idea Into a High-End AI Film.",
}: FooterProps) {
  return (
    <footer className="site-footer">
      <figure className="footer-blob footer-blob--right" aria-hidden="true">
        <div className="footer-gradient-blob" />
      </figure>
      <figure className="footer-blob footer-blob--left" aria-hidden="true">
        <div className="footer-gradient-blob footer-gradient-blob--left" />
      </figure>
      <div className="main-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <SafeImg src="/images/logo.webp" width={680} height={222} alt={logoAlt} className="footer-logo" />
            <p className="footer-brand-title">About the studio</p>
            <p className="footer-tagline">
              Synkyn creates AI-powered commercials, product films, CGI visuals, and social media content for brands that want to look premium without slow production delays.
            </p>
            <p className="footer-tagline footer-tagline--motto">{motto}</p>
            <ul className="footer-social-list" role="list">
              <li className="footer-social-item">
                <a href="https://www.instagram.com/synkyn_studios/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <InstagramGlyph fill="currentColor" />
                  <span>Instagram</span>
                </a>
              </li>
              <li className="footer-social-separator" />
              <li className="footer-social-item">
                <a href="https://www.linkedin.com/company/synkynstudios/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                  <LinkedInGlyph fill="currentColor" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links-grid">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="footer-col-title">{col.title}</p>
                <ul className="footer-nav" role="list">
                  {col.links.map((link) => {
                    const className = link.key === active ? "footer-link active" : "footer-link";
                    const [path, hash] = link.href.split("#");
                    if (path === currentPath) {
                      // footer.js removed the href of links to the current page.
                      const current = !hash;
                      return (
                        <li key={link.key}>
                          <a className={current ? `${className} is-current` : className} aria-current={current ? "page" : undefined} style={{ cursor: "default", opacity: "0.5" }}>
                            {link.label}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={link.key}>
                        <Link href={link.href} className={className}>{link.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-divider" aria-hidden="true" />
          <p className="footer-copy footer-copy--location">© 2026 Synkyn Studios.</p>
          <p className="footer-copy">All Rights Reserved.</p>
        </div>
      </div>
      <FooterEffects />
    </footer>
  );
}
