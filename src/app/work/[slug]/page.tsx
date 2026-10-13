import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import Footer from "@/components/layout/Footer";
import PageStyle from "@/components/layout/PageStyle";
import PageTransition from "@/components/layout/PageTransition";
import PageRuntime from "@/components/runtime/PageRuntime";
import JsonLd from "@/components/seo/JsonLd";
import SafeImg from "@/components/ui/SafeImg";
import { getVimeoId, PROJECT_WORKS, type Work, type WorkSource } from "@/data/works";
import { IK_CARD, IK_FULL, ikImage, ikOgImage } from "@/lib/imagekit";
import { absoluteUrl, ROUTES, SITE_NAME } from "@/lib/site";

/*
  One page per Synkyn-hosted film (/work/<slug>), so each film has a permanent,
  shareable, indexable URL with the video in the server-rendered HTML. The
  Library cards link here; a plain click there still opens the quick-view modal.
  Visual language is the Library modal's (same card, eyebrow, title, rule, CTA).
*/

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_WORKS.map((w) => ({ slug: w.slug! }));
}

const bySlug = (slug: string) => PROJECT_WORKS.find((w) => w.slug === slug);
const plain = (html: string) => html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const summary = (w: Work) => {
  const text = plain(w.description);
  if (text.length <= 158) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};
const pageUrl = (w: Work) => absoluteUrl(`/work/${w.slug}`);
const label = (w: Work) => (w.spec ? `${w.category} · Independent concept` : w.category);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = bySlug(slug);
  if (!w) return {};
  const title = `${w.title} — ${w.category} | ${SITE_NAME}`;
  const description = summary(w);
  const image = { url: ikOgImage(w.thumbnail || ""), width: 1200, height: 630, alt: `${w.title} — ${SITE_NAME}` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pageUrl(w) },
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    openGraph: { type: "video.other", url: pageUrl(w), siteName: SITE_NAME, title, description, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

function Media({ src, title, ratio, primary }: { src: WorkSource; title: string; ratio: "9:16" | "16:9"; primary: boolean }) {
  const portrait = ratio === "9:16";
  if (src.type === "vimeo") {
    const id = getVimeoId(src.src);
    return (
      <div className={`work-media${portrait ? " work-media--portrait" : ""}`}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`}
          title={`${title} — video`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading={primary ? "eager" : "lazy"}
        />
      </div>
    );
  }
  if (src.type === "image") {
    return (
      <div className="work-media work-media--image">
        <SafeImg src={ikImage(src.src, IK_FULL)} alt={`${title} — still`} loading="lazy" decoding="async" />
      </div>
    );
  }
  return null;
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = bySlug(slug);
  if (!w) notFound();
  preconnect("https://player.vimeo.com");
  preconnect("https://i.vimeocdn.com", { crossOrigin: "anonymous" });
  preconnect("https://f.vimeocdn.com", { crossOrigin: "anonymous" });

  const ratio = w.ratio === "9:16" ? "9:16" : "16:9";
  const [first, ...rest] = w.sources.filter((s) => s.src && (s.type === "vimeo" || s.type === "image"));
  const others = PROJECT_WORKS.filter((o) => o.slug !== w.slug);
  const firstVimeo = w.sources.find((s) => s.type === "vimeo" && s.src);

  const videoLd = firstVimeo && w.published ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl(w)}#video`,
    name: `${w.title} — ${w.category}`,
    description: summary(w),
    thumbnailUrl: ikImage(w.thumbnail || "", 1280),
    uploadDate: w.published.uploadDate,
    duration: `PT${w.published.seconds}S`,
    embedUrl: `https://player.vimeo.com/video/${getVimeoId(firstVimeo.src)}`,
    url: pageUrl(w),
    publisher: { "@id": "https://www.synkynstudios.com/#organization" },
  } : null;
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(ROUTES.home) },
      { "@type": "ListItem", position: 2, name: "Library", item: absoluteUrl(ROUTES.library) },
      { "@type": "ListItem", position: 3, name: w.title, item: pageUrl(w) },
    ],
  };

  return (
    <>
      <PageStyle
        id="work"
        files={[
          "shared/theme.css",
          "shared/enhanced-responsive.css",
          "shared/smooth-scroll.css",
          "pages/library/works.css",
          "pages/work/work.css",
          "shared/sticky-bar-mobile.css",
        ]}
      />
      {videoLd && <JsonLd data={videoLd} />}
      <JsonLd data={crumbsLd} />
      <PageTransition>
        <main id="main-content" tabIndex={-1} className="work-page">
          <div className="work-wrap">
            <nav className="work-crumbs" aria-label="Breadcrumb">
              <Link href={ROUTES.library}>Library</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{w.title}</span>
            </nav>

            <article className="work-card">
              <div className="work-card__media">
                {first && <Media src={first} title={w.title} ratio={ratio} primary />}
              </div>
              <aside className="media-modal__detail work-card__detail">
                <p className="media-modal__eyebrow">{label(w)}</p>
                <h1 className="media-modal__title">{w.title}</h1>
                <span className="media-modal__rule" aria-hidden="true" />
                <div className="media-modal__desc" dangerouslySetInnerHTML={{ __html: w.description }} />
                <Link href={ROUTES.contact} className="media-modal__cta">
                  <span>Start a project like this</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </aside>
            </article>

            {rest.length > 0 && (
              <section className="work-more-media" aria-label={`More from ${w.title}`}>
                {rest.map((src, i) => <Media key={i} src={src} title={w.title} ratio={ratio} primary={false} />)}
              </section>
            )}

            {others.length > 0 && (
              <section className="work-others" aria-labelledby="work-others-heading">
                <h2 id="work-others-heading" className="work-others__title">More work</h2>
                <ul className="work-others__grid">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/work/${o.slug}`} className="work-others__card">
                        <span className="work-others__thumb">
                          <SafeImg src={ikImage(o.thumbnail || "", IK_CARD)} alt="" loading="lazy" decoding="async" />
                        </span>
                        <span className="work-others__meta">
                          <span className="work-others__cat">{label(o)}</span>
                          <span className="work-others__name">{o.title}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={ROUTES.library} className="work-others__all">See the full Library →</Link>
              </section>
            )}
          </div>
          <Footer currentPath={`/work/${w.slug}`} />
        </main>
      </PageTransition>
      <PageRuntime profile="apple" />
    </>
  );
}
