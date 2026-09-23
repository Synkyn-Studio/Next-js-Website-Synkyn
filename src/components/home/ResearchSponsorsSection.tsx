type Logo = { name: string; file: number; label: string };

const LOGO_BASE = "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Logos";
/*
  The originals are ~110–155 KB full-size JPEGs shown at ≤116px. ImageKit
  resizes to 240px (covers 2x/3x screens) and serves WebP/AVIF: ~2 KB each.
*/
const logoSrc = (file: number) => `${LOGO_BASE}/${file}.png?tr=w-240,h-240,q-85,f-auto`;

const BRANDS: Logo[] = [
  { name: "TATA", file: 8, label: "brand partner" },
  { name: "RedBus", file: 3, label: "brand partner" },
  { name: "SKROMAN", file: 7, label: "brand partner" },
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
    <div className={`logo-carousel-row logo-carousel-row--${direction} mx-auto w-full min-w-0`} role="region" aria-label={ariaLabel}>
      <div aria-hidden="true" className="logo-carousel-fade logo-carousel-fade--left" />
      <div aria-hidden="true" className="logo-carousel-fade logo-carousel-fade--right" />
      <div className="logo-carousel-track-wrap">
        <div className="logo-carousel-track">
          {primary.map((logo, i) => (
            <figure key={`p${i}`} className="logo-carousel-item" tabIndex={0} aria-label={`${logo.name} ${logo.label}`}>
              <img alt={`${logo.name} logo`} className="logo-carousel-item-img" src={logoSrc(logo.file)} width={240} height={240} loading="eager" decoding="async" draggable={false} />
            </figure>
          ))}
          {primary.map((logo, i) => (
            <figure key={`d${i}`} className="logo-carousel-item" aria-hidden="true">
              <img alt="" className="logo-carousel-item-img" src={logoSrc(logo.file)} width={240} height={240} loading="eager" decoding="async" draggable={false} />
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
        <div className="showcase-header" data-delay="0.2" data-ns-animate="">
          <div className="showcase-badge">
            <span className="showcase-badge-dot" aria-hidden="true" />
            Trusted Collaborations
          </div>
          <h2 id="showcase-heading" className="showcase-title">
            {"Trusted by "}
            <span className="showcase-title-gold">Visionary Brands</span>
            {" & Studios"}
          </h2>
          <p className="showcase-subtitle">Collaborating with forward-thinking enterprises, iconic brands, and creative powerhouses worldwide.</p>
        </div>
        {/* Carousel rows are animated by sponsorShowcase (behaviors/home/sections.ts). */}
        <div className="mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-6 sm:gap-8 md:gap-10">
          {/* Row 1: Brands */}
          <div className="w-full min-w-0">
            <div className="showcase-category-label" data-delay="0.3" data-ns-animate="">
              <span className="showcase-category-tag">Brands</span>
            </div>
            <LogoCarousel logos={BRANDS} repeat={4} direction="left" ariaLabel="Partner Brands Carousel" />
          </div>
          {/* Row 2: Agencies & Production Houses */}
          <div className="w-full min-w-0">
            <div className="showcase-category-label" data-delay="0.4" data-ns-animate="">
              <span className="showcase-category-tag">{"Agencies & Production Houses"}</span>
            </div>
            <LogoCarousel logos={AGENCIES} repeat={3} direction="right" ariaLabel="Agency Partners Carousel" />
          </div>
        </div>
      </div>
    </section>
  );
}
