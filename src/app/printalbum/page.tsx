import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import FeaturedSection from "@/components/printalbum/FeaturedSection";
import GalleryControls from "@/components/printalbum/GalleryControls";
import GallerySection from "@/components/printalbum/GallerySection";
import Lightbox from "@/components/printalbum/Lightbox";
import PrintAlbumEffects from "@/components/printalbum/PrintAlbumEffects";
import PrintHero from "@/components/printalbum/PrintHero";
import Toast from "@/components/printalbum/Toast";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

export const metadata = pageMetadata("printAlbum");
export const viewport = pageViewport("printAlbum");

export default function PrintAlbumPage() {
  return (
    <>
      <PageStyle
        id="printalbum"
        files={[
          "pages/printalbum/theme.css",
          "pages/printalbum/prints.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.printAlbum.map((data, i) => <JsonLd key={i} data={data} />)}
      <main className="pf-page">
        <PrintHero />
        <FeaturedSection />
        <GalleryControls />
        <GallerySection />
        <Lightbox />
        <Toast />
        <PrintAlbumEffects />
        <Footer currentPath={ROUTES.printAlbum} active="printAlbum" />
      </main>
      <PageRuntime profile="apple" />
    </>
  );
}
