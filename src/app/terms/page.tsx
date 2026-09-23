import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import FloatingTocButton from "@/components/terms/FloatingTocButton";
import TermsDocument from "@/components/terms/TermsDocument";
import TermsEffects from "@/components/terms/TermsEffects";
import TermsHero from "@/components/terms/TermsHero";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = pageMetadata("terms");
export const viewport = pageViewport("terms");

export default function TermsPage() {
  return (
    <>
      <PageStyle
        id="terms"
        files={[
          "shared/theme.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
          "pages/terms/terms.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.terms.map((data, i) => <JsonLd key={i} data={data} />)}
      <FloatingTocButton />
      <PageTransition>
        <main>
          <TermsHero />
          <TermsDocument />
          <Footer currentPath={ROUTES.terms} active="terms" logoAlt="Synkyn Studios Logo" />
        </main>
      </PageTransition>
      <TermsEffects />
      <PageRuntime profile="standard" />
    </>
  );
}
