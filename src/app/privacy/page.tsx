import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageTransition from "@/components/layout/PageTransition";
import PrivacyDocument, { PrivacyHero } from "@/components/privacy/PrivacyDocument";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import TermsEffects from "@/components/terms/TermsEffects";
import { STRUCTURED_DATA } from "@/data/structured-data";
import { pageMetadata, pageViewport } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

export const metadata = pageMetadata("privacy");
export const viewport = pageViewport("privacy");

/* Same layout and styles as the Terms page. */
export default function PrivacyPage() {
  return (
    <>
      <PageStyle
        id="privacy"
        files={[
          "shared/theme.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
          "pages/terms/terms.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {STRUCTURED_DATA.privacy.map((data, i) => <JsonLd key={i} data={data} />)}
      <PageTransition>
        <main id="main-content" tabIndex={-1}>
          <PrivacyHero />
          <PrivacyDocument />
          <Footer currentPath={ROUTES.privacy} active="privacy" logoAlt="Synkyn Studios Logo" />
        </main>
      </PageTransition>
      <TermsEffects />
      <PageRuntime profile="standard" />
    </>
  );
}
