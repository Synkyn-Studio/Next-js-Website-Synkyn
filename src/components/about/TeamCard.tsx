/* One founder card in the chroma grid (behaviour: behaviors/about/chroma.ts). */

import Image from "next/image";
import { LinkedInGlyph } from "@/components/ui/icons";
import type { TeamMember } from "@/data/team";

export default function TeamCard({ member }: { member: TeamMember }) {
  const { name, role, photo, alt, accent, profile } = member;
  return (
    <article
      className="chroma-card relative flex h-full min-h-0 w-full min-w-0 max-w-[400px] flex-col items-stretch overflow-visible rounded-[18px] border border-[#333] transition-colors duration-300 sm:rounded-[20px] [background:var(--card-gradient)] lg:max-w-none"
      style={{ "--card-border": accent, "--card-gradient": `linear-gradient(145deg, ${accent}, #000)` }}
    >
      <div className="chroma-img-wrapper relative z-[1] box-border shrink-0 bg-transparent p-2 sm:p-[10px]">
        <div className="relative h-[230px] w-full overflow-hidden rounded-[10px] sm:h-[270px] max-md:h-[300px] md:h-[200px] lg:h-[180px]">
          <Image
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            src={photo}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 400px"
          />
        </div>
      </div>
      <footer className="chroma-info z-[1] grid min-h-0 flex-1 grid-cols-1 content-start items-start gap-x-3 gap-y-1 p-3 text-white min-[480px]:grid-cols-[1fr_auto]">
        <h3 className="name m-0 text-base leading-5 text-white">{name}</h3>
        <span className="handle text-[14px] text-accent/60 font-medium">{role}</span>
        <div className="chroma-social">
          {profile.kind === "imdb" ? (
            <a className="chroma-social__link chroma-social__link--imdb" href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on IMDb`} title="IMDb">
              IMDb
            </a>
          ) : (
            <a className="chroma-social__link" href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} title="LinkedIn">
              <LinkedInGlyph />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}
