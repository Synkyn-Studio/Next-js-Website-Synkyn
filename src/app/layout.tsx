import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { BackToTopButton, GtmNoScript, ScrollProgressBar, StickyBlurBar } from "@/components/layout/SiteChrome";
import SiteRuntime from "@/components/runtime/SiteRuntime";
import { ASSET_VERSION, DEFAULT_BODY_CLASS, GA_ID, GTM_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import { VENDOR_SCRIPTS } from "@/lib/runtime/vendors";

/*
  Global stylesheets, in the order every static page linked them. They are
  served byte-for-byte from /public/assets rather than through the CSS
  pipeline: minification merges navbar.css's duplicate `.header-two` rules and
  drops its `translate: none !important` reset, which double-shifts the header.
*/
const GLOBAL_STYLESHEETS = ["/assets/main.css", "/assets/navbar.css", "/assets/footer.css"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/*
  Runs before first paint:
  - theme: main.js applied the saved `color-theme` (default dark) at startup;
    `dark` is now rendered on <html>, a saved "light" is honoured here.
  - loader: index.html always started with html.show-loader.
*/
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(localStorage.getItem('color-theme')==='light'){d.classList.remove('dark');d.classList.add('light');}}catch(e){}var p=location.pathname;if(p==='/'||p==='/index.html'){d.classList.add('show-loader');d.classList.remove('hide-loader');setTimeout(function(){if(!window.__synkynLoader){d.classList.remove('show-loader','loader-open');d.classList.add('hide-loader');}},5000);}})();`;

/*
  Home's loader markup and CSS arrive in the page body, after the header, so a
  browser that paints mid-stream could show the navbar for a frame first. This
  cover is in <head>, so from the very first paint of Home everything except
  the loader (which sits above it) is behind loader-coloured ink. It drops the
  moment the panels start to split (`loader-open`). A pseudo-element rather
  than hiding <body>: hidden iframes can hold back the hero video's autoplay.
  The 5s timeout above only fires if the loader script never ran at all.

  It is `body::before`, not `html::after`: ambient-fx sets `isolation: isolate`
  on <body>, which makes body a stacking context. A cover outside body then
  paints over *everything* in it — the loader included, blacking out the logo,
  bar and counter for the whole load. Inside body it shares the loader's
  stacking context and sits just beneath it (9999998 < 9999999), above the
  header (99999–100005).
*/
const LOADER_COVER_CSS = `html.show-loader{background:#080808}html.show-loader:not(.loader-open) body::before{content:"";position:fixed;inset:0;z-index:9999998;background:#080808;pointer-events:all}`;

const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const GTAG_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;

/*
  Route cross-fade for <PageTransition> (components/layout/PageTransition.tsx):
  the old page fades out quickly, the new one fades up 12px. Only opacity and
  transform, so it is composited. The overlay lets clicks through, the
  unnamed root (header, fixed chrome) is not animated at all, and reduced
  motion turns it off.

  Arriving on Home, the loader is already up when the new page is captured
  (HomeLoader raises it in a layout effect). The incoming snapshot is drawn in
  the transition overlay, above the loader, so it would flash the hero for the
  length of the fade-in; it is not drawn at all while the loader is showing.
*/
const PAGE_TRANSITION_CSS = `::view-transition{pointer-events:none}::view-transition-group(root){animation:none}::view-transition-old(root){display:none}::view-transition-new(root){animation:none}::view-transition-old(.page-out){animation:160ms cubic-bezier(.4,0,1,1) both synkyn-page-out}::view-transition-new(.page-in){animation:320ms cubic-bezier(.16,1,.3,1) 90ms both synkyn-page-in}html.show-loader::view-transition-new(.page-in){display:none}@keyframes synkyn-page-out{to{opacity:0}}@keyframes synkyn-page-in{from{opacity:0;transform:translate3d(0,12px,0)}}@media (prefers-reduced-motion:reduce){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: LOADER_COVER_CSS }} />
        <style dangerouslySetInnerHTML={{ __html: PAGE_TRANSITION_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GTAG_SCRIPT }} />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="" href="/fonts/inter-tight-latin-normal.woff2" />
        {/*
          main.css starts with `@import 'cursors.css'`, a render-blocking sheet
          the browser only discovers once main.css has arrived — one more round
          trip before the first paint (the loading screen). Fetch it alongside.
        */}
        <link rel="preload" as="style" href="/assets/cursors.css" />
        {GLOBAL_STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={`${href}?v=${ASSET_VERSION}`} />
        ))}
        {/*
          Animation libraries, in the order the static pages loaded them.
          Deferred tags in the document (rather than scripts injected after
          hydration) let the preload scanner fetch them with the page, so
          GSAP and Lenis are ready as soon as the first behaviour runs.
        */}
        {VENDOR_SCRIPTS.map((src) => (
          <script key={src} src={src} defer data-vendor="synkyn" />
        ))}
      </head>
      <body className={DEFAULT_BODY_CLASS} suppressHydrationWarning>
        <GtmNoScript />
        <ScrollProgressBar />
        <BackToTopButton />
        <Header />
        {children}
        <StickyBlurBar />
        <SiteRuntime />
      </body>
    </html>
  );
}
