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
import VimeoStage from "@/components/work/VimeoStage";
import WorkEffects from "@/components/work/WorkEffects";
import { ALL_WORKS, getVimeoId, getYouTubeId, PROJECT_WORKS, type Work, type WorkSource } from "@/data/works";
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
const cardThumb = (w: Work) => {
  if (w.thumbnail) return ikImage(w.thumbnail, IK_CARD);
  const yt = w.sources.find((x) => x.type === "youtube");
  const id = yt ? getYouTubeId(yt.src) : null;
  // 16:9 frame without the letterbox bars of the default (4:3) thumbnail.
  return id ? `https://i.ytimg.com/vi/${id}/hq720.jpg` : "";
};
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
    return (
      <div className={`work-media${portrait ? " work-media--portrait" : ""}`}>
        <VimeoStage id={getVimeoId(src.src) || ""} title={title} eager={primary} />
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
  const media = w.sources.filter((s) => s.src && (s.type === "vimeo" || s.type === "image"));
  // "More work": the other project pages first, then Library films, four in all.
  const others = [
    ...PROJECT_WORKS.filter((o) => o.slug !== w.slug),
    ...ALL_WORKS.filter((o) => !o.slug),
  ].slice(0, 4);
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
                {/*
                  Every clip lives in this one player: only the selected clip is
                  shown (the others stay in the HTML, lazy, for crawlers) and
                  switching pauses the previous one — never two films at once.
                */}
                <div className="work-player">
                  {media.map((src, i) => (
                    <div key={i} className="work-slide" id={`clip-${i + 1}`} role={media.length > 1 ? "tabpanel" : undefined} aria-label={media.length > 1 ? `Clip ${i + 1} of ${media.length}` : undefined} hidden={i > 0}>
                      <Media src={src} title={media.length > 1 ? `${w.title} — clip ${i + 1}` : w.title} ratio={ratio} primary={i === 0} />
                    </div>
                  ))}
                </div>
                {media.length > 1 && (
                  <div className="work-clips" role="tablist" aria-label={`${w.title} clips`}>
                    {media.map((src, i) => (
                      <button key={i} type="button" role="tab" className="work-clip" aria-selected={i === 0} aria-controls={`clip-${i + 1}`} data-clip={i} tabIndex={i === 0 ? 0 : -1}>
                        <span className="work-clip__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="work-clip__kind">{src.type === "image" ? "Still" : "Film"}</span>
                      </button>
                    ))}
                    <span className="work-clips__count" aria-hidden="true">{media.length} clips</span>
                  </div>
                )}
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


            {others.length > 0 && (
              <section className="work-others" aria-labelledby="work-others-heading">
                <div className="work-others__head">
                  <div>
                    <p className="media-modal__eyebrow">Keep exploring</p>
                    <h2 id="work-others-heading" className="work-others__title">More work</h2>
                  </div>
                  <Link href={ROUTES.library} className="work-others__all">
                    <span>See the full Library</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </div>
                <ul className="work-others__grid">
                  {others.map((o) => (
                    <li key={o.id} className={o.ratio === "9:16" ? "is-portrait" : undefined}>
                      <Link href={o.slug ? `/work/${o.slug}` : `${ROUTES.library}#${o.id}`} className="work-others__card">
                        {/* Whole thumbnail, never cropped: fitted inside a 16:9 frame over a blurred fill of itself. */}
                        <span className="work-others__media">
                          <SafeImg src={cardThumb(o)} alt="" loading="lazy" decoding="async" className="work-others__fill" />
                          <SafeImg src={cardThumb(o)} alt="" loading="lazy" decoding="async" className="work-others__img" />
                          {o.tag && <span className="work-others__badge">{o.tag}</span>}
                        </span>
                        <span className="work-others__meta">
                          <span className="work-others__cat">{label(o)}</span>
                          <span className="work-others__name">{o.title}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <Footer currentPath={`/work/${w.slug}`} />
        </main>
      </PageTransition>
      <WorkEffects />
      <PageRuntime profile="apple" />
    </>
  );
}
