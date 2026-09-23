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
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

export const metadata = pageMetadata("library");
export const viewport = pageViewport("library");

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
      <main>
        <LibraryHero />
        <LibraryWorks />
        <MediaModal />
        <Footer currentPath={ROUTES.library} active="library" />
      </main>
      <LibraryEffects />
      <PageRuntime profile="apple" />
    </>
  );
}
