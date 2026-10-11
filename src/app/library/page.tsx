import { preconnect } from "react-dom";
import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import LibraryEffects from "@/components/library/LibraryEffects";
import LibraryHero from "@/components/library/LibraryHero";
import LibraryWorks from "@/components/library/LibraryWorks";
import MediaModal from "@/components/library/MediaModal";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { ALL_WORKS } from "@/data/works";
import { ikImage } from "@/lib/imagekit";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { absoluteUrl, ROUTES } from "@/lib/site";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = pageMetadata("library");
export const viewport = pageViewport("library");

/* VideoObject per Vimeo-hosted film (Google Video results); dates and lengths come from Vimeo. */
const plain = (html: string) => html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const LIBRARY_VIDEOS = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(ROUTES.library)}#films`,
  name: "Synkyn Studios films",
  itemListElement: ALL_WORKS.filter((w) => w.published && w.thumbnail && w.sources[0]?.type === "vimeo").map((w, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: `${w.title} — ${w.category}`,
      description: plain(w.description).slice(0, 300) || `${w.title} by Synkyn Studios`,
      thumbnailUrl: ikImage(w.thumbnail!, 1200),
      uploadDate: w.published!.uploadDate,
      duration: `PT${w.published!.seconds}S`,
      embedUrl: w.sources[0].src,
      url: `${absoluteUrl(ROUTES.library)}#${w.id}`,
      publisher: { "@id": "https://www.synkynstudios.com/#organization" },
    },
  })),
};

export default function LibraryPage() {
  preconnect("https://player.vimeo.com");
  preconnect("https://i.vimeocdn.com", { crossOrigin: "anonymous" });
  preconnect("https://f.vimeocdn.com", { crossOrigin: "anonymous" });

  return (
    <>
      <PageStyle
        id="library"
        files={[
          "shared/theme.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
          "pages/library/hero.css",
          "pages/library/works.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.library.map((data, i) => <JsonLd key={i} data={data} />)}
      <JsonLd data={LIBRARY_VIDEOS} />
      <PageTransition>
        <main>
          <LibraryHero />
          <LibraryWorks />
          <MediaModal />
          <Footer currentPath={ROUTES.library} active="library" />
        </main>
      </PageTransition>
      <LibraryEffects />
      <PageRuntime profile="apple" />
    </>
  );
}
