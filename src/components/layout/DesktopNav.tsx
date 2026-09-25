/*
  Desktop navigation with the Work / Company mega menus.
  Markup of assets/desktop-navbar.js (previously injected at runtime) rendered
  on the server; hover behaviour lives in src/behaviors/site-chrome.ts.
*/

import Link from "next/link";
import type { ReactNode } from "react";
import SafeImg from "@/components/ui/SafeImg";

const NAV_LINK =
  "hover:text-accent hover:border-accent dark:hover:border-stroke-7 text-tagline-1 text-accent/60 dark:text-accent/60 dark:hover:text-accent group flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200";
const MENU_PANEL =
  "dropdown-menu dark:bg-helix-blue-dark border-stroke-1 pointer-events-none fixed top-full left-1/2 z-50 mt-2 flex w-full -translate-x-1/2 items-stretch gap-y-6 rounded-[20px] border bg-white p-4 opacity-0 transition-all duration-300 md:gap-x-6 lg:w-[946px] dark:border-white/10";
const MENU_BRIDGE =
  "dropdown-menu-bridge pointer-events-none fixed top-full left-1/2 z-40 h-3 w-full -translate-x-1/2 bg-transparent opacity-0 lg:w-[946px]";
const COLUMN_TITLE = "text-tagline-2 text-secondary/60 dark:text-accent/60 px-2 pb-2.5 pt-1 font-semibold uppercase tracking-wide";
const ARROW_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M13 6l6 6-6 6'/%3E%3C/svg%3E";

function MegaMenuItem({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <li className="nav-item relative cursor-pointer py-2.5" data-menu={id}>
      <a className={NAV_LINK} href="#" data-noop-link="">
        <span>{label}</span>
        <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
          <svg className="stroke-accent/60 group-hover:stroke-accent size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
      <div>
        <div className={MENU_BRIDGE} />
        <div className={MENU_PANEL} id={id}>
          {children}
        </div>
      </div>
    </li>
  );
}

function ExploreCard({ href, title, subtitle, icon }: { href: string; title: string; subtitle: string; icon: ReactNode }) {
  return (
    <li>
      <Link className="group relative flex items-center justify-between rounded-[14px] border border-transparent dark:border-white/5 bg-[#1a1a1a] p-4 transition-all duration-300 hover:border-white/10 hover:bg-[#252525]" href={href}>
        <div className="flex items-center gap-4">
          <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#2a2a2a] transition-colors duration-300 group-hover:bg-[#333]">
            {icon}
          </div>
          <div className="flex flex-col text-left">
            <p className="text-[15px] font-medium text-white leading-tight">{title}</p>
            <p className="text-[12px] text-white/60 font-normal mt-0.5">{subtitle}</p>
          </div>
        </div>
        <svg className="size-4 stroke-white transition-all duration-300 group-hover:translate-x-1" fill="none" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </li>
  );
}

/** "What's new" featured card (blurred media fill + frosted caption bar). */
function WhatsNewCard({ href, title, subtitle, media }: { href: string; title: string; subtitle: string; media: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <p className={COLUMN_TITLE}>What’s new</p>
      <Link href={href} className="group relative block flex-1 w-full overflow-hidden rounded-[24px] border border-stroke-1 dark:border-white/10 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 min-h-[220px] bg-[#1a1a1a] isolate" style={{ transform: "translateZ(0)", maskImage: "radial-gradient(white, black)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[24px] z-0">
          {media}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 rounded-[24px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-3">
          <div className="flex items-center justify-between bg-black/60 backdrop-blur-md p-2 pl-3 rounded-full border border-white/10 shadow-lg group-hover:bg-black/80 transition-colors">
            <div className="flex flex-col min-w-0 mr-2">
              <p className="text-[13px] text-white font-medium drop-shadow-lg leading-tight truncate">{title}</p>
              <p className="text-[10px] text-white/70 font-normal drop-shadow-md leading-tight truncate mt-0.5">{subtitle}</p>
            </div>
            <div className="group-hover:bg-helix-blue bg-white/20 relative flex h-7 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[40px] transition-all duration-500 ease-in-out">
              <figure className="relative size-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="new-arrow" className="absolute inset-0 size-full -translate-x-4 object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-1" src={ARROW_SRC} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="new-arrow" className="size-full object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-4" src={ARROW_SRC} />
              </figure>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CompanyLink({ href, title, subtitle, icon }: { href: string; title: string; subtitle: string; icon: ReactNode }) {
  return (
    <li>
      <Link className="group relative flex items-start gap-2 p-3" href={href}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background-3 dark:bg-background-7 opacity-0 group-hover:opacity-100 rounded-[10px] z-0 transition-all duration-400" />
        <div className="border-stroke-1 relative z-10 mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg border p-1 dark:border-white/10">
          {icon}
        </div>
        <div className="relative z-10">
          <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
          <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-normal">{subtitle}</p>
        </div>
      </Link>
    </li>
  );
}

/*
  Eager + low priority: the panels are hidden until hover, so lazy images only
  started downloading on the first hover and popped in. site-chrome.ts fades
  them in (.nav-media) once they have loaded.
*/
const BLURRED_MEDIA = "nav-media h-full w-full object-cover blur-sm scale-[1.20] transition-transform duration-[900ms] ease-out group-hover:scale-[1.25]";
const ICON_STROKE = "stroke-secondary dark:stroke-accent";

export default function DesktopNav() {
  return (
    <nav className="hidden items-center xl:flex" id="desktop-navbar">
      <ul className="flex items-center">
        <li className="nav-item relative cursor-pointer py-2.5">
          <Link className={NAV_LINK} href="/">
            <span>Home</span>
          </Link>
        </li>

        <MegaMenuItem id="works-mega-menu" label="Work">
          <div className="w-[320px] shrink-0 flex flex-col">
            <p className={COLUMN_TITLE}>Explore</p>
            <ul className="space-y-3 flex-1">
              <ExploreCard
                href="/library"
                title="Library"
                subtitle="Our Work"
                icon={
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <rect className="stroke-white" x="3" y="3" width="14" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path className="stroke-white" d="M3 14l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path className="stroke-white" d="M14 10l3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <circle className="stroke-white" cx="13" cy="7" r="1.5" strokeWidth="1.5" />
                  </svg>
                }
              />
              <ExploreCard
                href="/printalbum"
                title="Print Album"
                subtitle="Discover our creative prints"
                icon={
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <rect className="stroke-white" x="3" y="2.5" width="14" height="15" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <line className="stroke-white" x1="6.5" y1="2.5" x2="6.5" y2="17.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <circle className="stroke-white" cx="12" cy="7" r="1.3" strokeWidth="1.3" />
                    <path className="stroke-white" d="M9 13.5l2.5-2.5 2.5 2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                    <path className="stroke-white" d="M13 12.5l1.5-1.5 2.2 2.2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                  </svg>
                }
              />
            </ul>
          </div>
          <WhatsNewCard
            href="/printalbum#project-1"
            title="Grooming - Zlade"
            subtitle="Print Album"
            media={<SafeImg alt="Grooming - Zlade" className={BLURRED_MEDIA} decoding="async" loading="eager" fetchPriority="low" src="https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Zlade/11.png?updatedAt=1783513857260&tr=w-640,q-75" />}
          />
        </MegaMenuItem>

        <MegaMenuItem id="company-mega-menu-v2" label="Company">
          <div className="flex-1 flex flex-col">
            <p className={COLUMN_TITLE}>Company</p>
            <ul className="space-y-2">
              <CompanyLink
                href="/about-us"
                title="About Us"
                subtitle="Learn more about our company"
                icon={
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle className={ICON_STROKE} cx="10" cy="10" r="7.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <line className={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="10" x2="10" y1="9" y2="13.5" />
                    <circle className="fill-secondary dark:fill-accent" cx="10" cy="6.25" r="0.9" />
                  </svg>
                }
              />
              <CompanyLink
                href="/about-us#team"
                title="Our Team"
                subtitle="Meet the people behind Synkyn Studios."
                icon={
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path className={ICON_STROKE} d="M19.167 17.5V15.8333C19.1664 15.0948 18.9206 14.3773 18.4681 13.7936C18.0156 13.2099 17.3821 12.793 16.667 12.6083" strokeLinecap="round" strokeLinejoin="round" />
                    <path className={ICON_STROKE} d="M14.1663 17.5V15.8333C14.1663 14.9493 13.8152 14.1014 13.19 13.4763C12.5649 12.8512 11.7171 12.5 10.833 12.5H4.16634C3.28229 12.5 2.43444 12.8512 1.80932 13.4763C1.1842 14.1014 0.833008 14.9493 0.833008 15.8333V17.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path className={ICON_STROKE} d="M13.333 2.60834C14.05 2.79192 14.6855 3.20892 15.1394 3.7936C15.5932 4.37827 15.8395 5.09736 15.8395 5.8375C15.8395 6.57765 15.5932 7.29674 15.1394 7.88141C14.6855 8.46609 14.05 8.88309 13.333 9.06667" strokeLinecap="round" strokeLinejoin="round" />
                    <path className={ICON_STROKE} d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
            </ul>
          </div>
          <div className="flex-1 flex flex-col">
            <p className={COLUMN_TITLE}>Resources</p>
            <ul className="space-y-2">
              <CompanyLink
                href="/contact"
                title="Contact Us"
                subtitle="Get in touch with us"
                icon={
                  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path className={ICON_STROKE} d="M12.5415 4.16665C13.3555 4.32545 14.1035 4.72353 14.6899 5.30993C15.2763 5.89632 15.6744 6.64437 15.8332 7.45831M12.5415 0.833313C14.2326 1.02118 15.8095 1.77846 17.0134 2.98082C18.2173 4.18318 18.9765 5.75915 19.1665 7.44998M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2744C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.2599 16.7477 18.2875 16.5165 18.2666C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53432 2.04007 6.05914 1.76653 3.48331C1.7457 3.25287 1.77309 3.02061 1.84695 2.80133C1.9208 2.58205 2.03951 2.38055 2.1955 2.20966C2.3515 2.03877 2.54137 1.90224 2.75302 1.80875C2.96468 1.71526 3.19348 1.66686 3.42486 1.66665H5.92486C6.32929 1.66267 6.72136 1.80588 7.028 2.06959C7.33464 2.3333 7.53493 2.69952 7.59153 3.09998C7.69705 3.90003 7.89274 4.68559 8.17486 5.44165C8.28698 5.73992 8.31125 6.06408 8.24479 6.37571C8.17832 6.68735 8.02392 6.97341 7.79986 7.19998L6.74153 8.25831C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.9759 13.3125 11.8215 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4654 17.6744 12.6693 17.9386 12.9812C18.2029 13.2931 18.3433 13.6913 18.3332 14.1Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <CompanyLink
                href="/terms"
                title="Terms & Conditions"
                subtitle="Our usage terms and legal agreements"
                icon={
                  <svg className={ICON_STROKE} fill="none" height="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                }
              />
            </ul>
          </div>
          <WhatsNewCard
            href="/library#work-nbk111"
            title="NBK111 Glimpse"
            subtitle="#NBK111 Glimpse - Entry of an Era"
            media={
              <picture>
                <source srcSet="/images/ns-img-485.avif" type="image/avif" />
                <source srcSet="/images/ns-img-485.webp" type="image/webp" />
                <SafeImg alt="NBK111 Glimpse" className={BLURRED_MEDIA} decoding="async" loading="eager" fetchPriority="low" src="/images/ns-img-485.png" />
              </picture>
            }
          />
        </MegaMenuItem>
      </ul>
    </nav>
  );
}
