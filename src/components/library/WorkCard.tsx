/*
  Library bento card — the markup library.html built at runtime in
  createBentoItem(). Click / keyboard / hover-preview behaviour is attached by
  behaviors/library/library.ts using the card's data-id.
*/

import type { ReactNode } from "react";
import SafeImg from "@/components/ui/SafeImg";
import { getYouTubeId, getYouTubeThumbnail, type Work } from "@/data/works";

const FILL_STYLE = { objectFit: "cover", objectPosition: "center", display: "block" } as const;
const INSTAGRAM_FALLBACK = "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/skorman_web.png";

function FillThumb({ src, alt }: { src: string; alt: string }) {
  return <SafeImg src={src} alt={alt} className="absolute inset-0 w-full h-full" style={FILL_STYLE} loading="lazy" />;
}
const InstagramShade = () => <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />;

function media(work: Work): { badge: string; node: ReactNode } {
  const first = work.sources[0];
  const thumb = work.thumbnail || (first && first.thumbnail);
  if (thumb) {
    const badge = work.tag || (first.type === "youtube" ? "YouTube" : first.type === "instagram" ? "Instagram" : first.type === "video" || first.type === "vimeo" ? "Video" : "Photo");
    return { badge, node: <><FillThumb src={thumb} alt={work.title} />{first.type === "instagram" && <InstagramShade />}</> };
  }
  if (!first) return { badge: "", node: null };
  switch (first.type) {
    case "youtube": {
      const id = getYouTubeId(first.src);
      return {
        badge: work.tag || "YouTube",
        node: id ? <FillThumb src={getYouTubeThumbnail(id)} alt={work.title} /> : <div className="absolute inset-0 w-full h-full" style={{ background: "linear-gradient(135deg,#ff0000 0%,#8b0000 100%)" }} />,
      };
    }
    case "instagram":
      return { badge: work.tag || "Instagram", node: <><FillThumb src={INSTAGRAM_FALLBACK} alt={work.title} /><InstagramShade /></> };
    case "vimeo":
      return { badge: work.tag || "Video", node: <div className="absolute inset-0 w-full h-full" style={{ background: "linear-gradient(135deg,#101010 0%,#000 100%)" }} /> };
    case "video":
      return { badge: work.tag || "Video", node: <video src={first.src} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" /> };
    default:
      return { badge: work.tag || "Photo", node: <FillThumb src={first.src} alt={work.title} /> };
  }
}

export default function WorkCard({ work }: { work: Work }) {
  const ar = (work.ratio || "16:9") === "9:16" ? "portrait" : "landscape";
  const { badge, node } = media(work);
  const label = work.sources.length > 1 ? `${badge} (1/${work.sources.length})` : badge;
  return (
    <div className={`relative bg-white dark:bg-background-8 group bento-item bento-ar--${ar}`} data-id={work.id} role="button" tabIndex={0} aria-label={`${work.title} — ${work.category}`}>
      {node}
      <span className="bento-item__badge absolute top-3 left-3 z-20 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.72)", color: "#fff" }}>
        {label}
      </span>
      <div className="bento-item__overlay absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 md:p-6">
        <p className="text-[#ffd84d] uppercase text-[10px] md:text-xs tracking-wider font-bold mb-1 drop-shadow-md">{work.category}</p>
        <h4 className="text-white text-base md:text-xl font-bold drop-shadow-md leading-tight">{work.title}</h4>
      </div>
    </div>
  );
}
