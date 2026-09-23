import ContactEffects from "@/components/contact/ContactEffects";
import ContactHero from "@/components/contact/ContactHero";
import FaqSection from "@/components/contact/FaqSection";
import FinalCtaBand from "@/components/contact/FinalCtaBand";
import StudioDetailsSection from "@/components/contact/StudioDetailsSection";
import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = pageMetadata("contact");
export const viewport = pageViewport("contact");

export default function ContactPage() {
  return (
    <>
      <PageStyle
        id="contact"
        files={[
          "pages/contact/theme.css",
          "pages/contact/contact.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
        ]}
      />
      {STRUCTURED_DATA.contact.map((data, i) => <JsonLd key={i} data={data} />)}
      <PageTransition>
        <main>
          <ContactHero />
          <StudioDetailsSection />
          <FaqSection />
          <FinalCtaBand />
        </main>
      </PageTransition>
      <Footer currentPath={ROUTES.contact} active="contact" />
      <ContactEffects />
      <PageRuntime profile="standard" />
    </>
  );
}
