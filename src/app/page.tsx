import { preconnect, prefetchDNS } from "react-dom";
import ActuallySection from "@/components/home/ActuallySection";
import FinalTalkCtaSection from "@/components/home/FinalTalkCtaSection";
import HeroSection from "@/components/home/HeroSection";
import HomeEffects from "@/components/home/HomeEffects";
import HomeLoader from "@/components/home/HomeLoader";
import PipelineSection from "@/components/home/PipelineSection";
import ResearchSponsorsSection from "@/components/home/ResearchSponsorsSection";
import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = pageMetadata("home");
export const viewport = pageViewport("home");

export default function HomePage() {
  preconnect("https://ik.imagekit.io", { crossOrigin: "anonymous" });
  // Plain <img> requests (sponsor logos) use a separate, credentialed connection.
  preconnect("https://ik.imagekit.io");
  preconnect("https://player.vimeo.com");
  prefetchDNS("https://vod-progressive.akamaized.net");
  prefetchDNS("https://vod-adaptive-ak.vimeocdn.com");
  preconnect("https://i.vimeocdn.com", { crossOrigin: "anonymous" });
  preconnect("https://f.vimeocdn.com", { crossOrigin: "anonymous" });

  return (
    <>
      <PageStyle
        id="home"
        files={[
          "pages/home/loader-critical.css",
          "pages/home/home-theme.css",
          "pages/home/home.css",
          "pages/home/logo-showcase.css",
          "pages/home/cursor-dot.css",
          "pages/home/offscreen-pause.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.home.map((data, i) => <JsonLd key={i} data={data} />)}
      <HomeLoader />
      <PageTransition>
        <main>
          <HeroSection />
          <ActuallySection />
          <PipelineSection />
          <ResearchSponsorsSection />
          <FinalTalkCtaSection />
          <Footer currentPath={ROUTES.home} />
        </main>
      </PageTransition>
      <HomeEffects />
      <PageRuntime profile="apple" markVisited={false} />
    </>
  );
}
