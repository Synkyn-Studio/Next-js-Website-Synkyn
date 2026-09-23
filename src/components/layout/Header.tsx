/* Fixed pill header + mobile slide-in panel (persistent across routes). */

import Link from "next/link";
import DesktopNav from "./DesktopNav";
import HeaderCta from "./HeaderCta";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header>
      <div className="header-two header-two-at-rest lp:!max-w-[1290px] fixed top-14 left-1/2 z-50 mx-auto flex w-full max-w-[350px] -translate-x-1/2 items-center justify-between rounded-full px-2.5 py-2.5 backdrop-blur-[25px] max-md:!top-8 min-[425px]:max-w-[380px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] xl:py-0">
        <div>
          <Link className="flex min-w-0 shrink-0 items-center gap-2" href="/">
            <figure className="m-0 hidden lg:block lg:max-w-[112px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="nav-brand-logo-desktop" alt="Synkyn Studios" className="w-[80px] h-auto object-contain" src="/images/logo.png" />
            </figure>
            <figure className="m-0 flex max-w-[52px] shrink-0 lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="nav-brand-logo-mobile" alt="Synkyn Studios" className="w-full h-auto object-contain" src="/images/logo.png" />
            </figure>
          </Link>
        </div>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="hidden items-center justify-center xl:flex">
            <HeaderCta />
          </div>
          <div className="flex xl:hidden">
            <button className="nav-hamburger bg-background-4 dark:bg-background-6 flex size-12 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full">
              <span className="sr-only">Menu</span>
              <span className="bg-stroke-9 dark:bg-stroke-1 block h-0.5 w-6" />
              <span className="bg-stroke-9 dark:bg-stroke-1 block h-0.5 w-6" />
              <span className="bg-stroke-9 dark:bg-stroke-1 block h-0.5 w-6" />
            </button>
          </div>
        </div>
      </div>
      <aside className="sidebar dark:bg-background-8 scroll-bar fixed top-0 right-0 z-[9999] h-screen w-full translate-x-full rounded-l-3xl bg-white transition-all duration-300 sm:w-1/2 xl:hidden">
        <MobileMenu />
      </aside>
    </header>
  );
}
