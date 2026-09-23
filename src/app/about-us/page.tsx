import AboutEffects from "@/components/about/AboutEffects";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import OurStorySection from "@/components/about/OurStorySection";
import TeamSection from "@/components/about/TeamSection";
import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

export const metadata = pageMetadata("about");
export const viewport = pageViewport("about");

export default function AboutPage() {
  return (
    <>
      <PageStyle
        id="about"
        files={[
          "pages/about/about-us.css",
          "pages/about/theme.css",
          "pages/about/sk3d.css",
          "shared/enhanced-responsive.css",
          "pages/about/smooth-scroll.css",
          "pages/about/timeline-mobile.css",
          "pages/about/spotlight-mobile.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.about.map((data, i) => <JsonLd key={i} data={data} />)}
      <main>
        <AboutHeroSection />
        <OurStorySection />
        <TeamSection />
        <Footer currentPath={ROUTES.about} />
      </main>
      <AboutEffects />
      <PageRuntime profile="standard" progressBar={false} />
    </>
  );
}
