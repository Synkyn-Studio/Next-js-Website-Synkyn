import SponsorEffects from "@/components/home/SponsorEffects";

/** `file`: number of a logo in the Logos folder, or a full ImageKit URL. */
type Logo = { name: string; file: number | string; label: string };

const LOGO_BASE = "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Logos";
/*
  The originals are ~110–155 KB full-size JPEGs shown at ≤116px. ImageKit
  resizes to 240px (covers 2x/3x screens) and serves WebP/AVIF: ~2 KB each.
*/
const LOGO_TR = "tr=w-240,h-240,q-85,f-auto";
const logoSrc = (file: number | string) =>
  typeof file === "number" ? `${LOGO_BASE}/${file}.png?${LOGO_TR}` : `${file}${file.includes("?") ? "&" : "?"}${LOGO_TR}`;

const BRANDS: Logo[] = [
  { name: "TATA", file: 8, label: "brand partner" },
  { name: "RedBus", file: 3, label: "brand partner" },
  { name: "SKROMAN", file: 7, label: "brand partner" },
  { name: "BLCK", file: "https://ik.imagekit.io/mkzeqs9lt/13-10-26/11.png?updatedAt=1791890163565", label: "brand partner" },
  { name: "The Reserve Club", file: "https://ik.imagekit.io/mkzeqs9lt/13-10-26/12.png?updatedAt=1791890163748", label: "brand partner" },
];

const AGENCIES: Logo[] = [
  { name: "Leo Burnett", file: 6, label: "agency collaborator" },
  { name: "Ogilvy", file: 4, label: "agency collaborator" },
  { name: "Minikin", file: 5, label: "agency collaborator" },
  { name: "Vriddhi", file: 1, label: "agency collaborator" },
  { name: "Mythri Movie Makers", file: 2, label: "collaborator" },
];

function LogoCarousel({ logos, repeat, direction, ariaLabel }: { logos: Logo[]; repeat: number; direction: "left" | "right"; ariaLabel: string }) {
  // The track is the primary set followed by an identical copy, so a -50% shift loops seamlessly.
  const primary = Array.from({ length: repeat }, () => logos).flat();
  return (
    <div className={`logo-carousel-row logo-carousel-row--${direction} mx-auto w-full min-w-0`} data-sp-in="" role="region" aria-label={ariaLabel}>
      <div aria-hidden="true" className="logo-carousel-fade logo-carousel-fade--left" />
      <div aria-hidden="true" className="logo-carousel-fade logo-carousel-fade--right" />
      <div className="logo-carousel-track-wrap">
        <div className="logo-carousel-track" data-set={logos.length}>
          {/*
            Each logo is announced once: the repeats that fill the track and the
            looping copy are decorative (hidden from assistive tech, not focusable).
            Lazy: the section is far below the fold, and every copy shares one URL.
          */}
          {primary.map((logo, i) => (
            <figure key={`p${i}`} className="logo-carousel-item" aria-hidden={i >= logos.length || undefined}>
              <img alt={i < logos.length ? `${logo.name} logo` : ""} className="logo-carousel-item-img" src={logoSrc(logo.file)} width={240} height={240} loading="lazy" decoding="async" draggable={false} />
            </figure>
          ))}
          {primary.map((logo, i) => (
            <figure key={`d${i}`} className="logo-carousel-item" aria-hidden="true">
              <img alt="" className="logo-carousel-item-img" src={logoSrc(logo.file)} width={240} height={240} loading="lazy" decoding="async" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResearchSponsorsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" id="research-sponsors" aria-labelledby="showcase-heading">
      <div className="main-container w-full min-w-0 max-w-full">
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge" data-sp-in="">
            <span className="showcase-badge-dot" aria-hidden="true" />
            Trusted Collaborations
          </div>
          <h2 id="showcase-heading" className="showcase-title" data-sp-in="">
            {"Trusted by "}
            <span className="showcase-title-gold">Visionary Brands</span>
            {" & Studios"}
          </h2>
          <p className="showcase-subtitle" data-sp-in="">Collaborating with forward-thinking enterprises, iconic brands, and creative powerhouses worldwide.</p>
        </div>
        {/* Entrance and loop motion: SponsorEffects (behaviors/home/sections.ts). */}
        <div className="mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-6 sm:gap-8 md:gap-10">
          {/* Row 1: Brands */}
          <div className="w-full min-w-0">
            <div className="showcase-category-label" data-sp-in="">
              <span className="showcase-category-tag">Brands</span>
            </div>
            <LogoCarousel logos={BRANDS} repeat={4} direction="left" ariaLabel="Partner Brands Carousel" />
          </div>
          {/* Row 2: Agencies & Production Houses */}
          <div className="w-full min-w-0">
            <div className="showcase-category-label" data-sp-in="">
              <span className="showcase-category-tag">{"Agencies & Production Houses"}</span>
            </div>
            <LogoCarousel logos={AGENCIES} repeat={4} direction="right" ariaLabel="Agency Partners Carousel" />
          </div>
        </div>
      </div>
      <SponsorEffects />
    </section>
  );
}
