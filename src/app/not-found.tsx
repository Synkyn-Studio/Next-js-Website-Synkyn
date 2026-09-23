import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import NotFoundEffects from "@/components/not-found/NotFoundEffects";
import NotFoundStage from "@/components/not-found/NotFoundStage";
import PageRuntime from "@/components/runtime/PageRuntime";
import RouteAttributes from "@/components/runtime/RouteAttributes";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";

export const metadata = pageMetadata("notFound");
export const viewport = pageViewport("notFound");

/** Custom 404 (was 404.html, served by vercel.json's catch-all route). */
export default function NotFound() {
  return (
    <>
      <RouteAttributes bodyClassName="bg-black text-white" bodyBackground="#000000" headerClassName="header-home" />
      <PageStyle
        id="not-found"
        files={[
          "pages/not-found/theme.css",
          "shared/enhanced-responsive.css",
          "pages/not-found/smooth-scroll.css",
          "pages/not-found/s404.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.notFound.map((data, i) => <JsonLd key={i} data={data} />)}
      <main className="s404-main" id="s404Main">
        <NotFoundStage />
        <NotFoundEffects />
      </main>
      <Footer currentPath="" motto="— Turn Your Idea Into a High-End AI Film." />
      <PageRuntime profile="standard" markVisited={false} />
    </>
  );
}
