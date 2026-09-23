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
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(localStorage.getItem('color-theme')==='light'){d.classList.remove('dark');d.classList.add('light');}}catch(e){}var p=location.pathname;if(p==='/'||p==='/index.html'){d.classList.add('show-loader');d.classList.remove('hide-loader');}})();`;

const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const GTAG_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GTAG_SCRIPT }} />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="" href="/fonts/inter-tight-latin-normal.woff2" />
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
