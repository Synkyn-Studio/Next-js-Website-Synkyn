export default function HeroSection() {
  return (
    <section aria-label="Hero" className="flex flex-col flex-none place-content-center items-center w-full overflow-hidden relative" id="hero" style={{ padding: "0" }}>
      <div className="relative w-full h-full p-0">
        <div className="relative overflow-hidden mx-auto w-full h-full hero-inner" style={{ backgroundColor: "#000" }}>
          <div className="absolute inset-0 -z-0 overflow-hidden hero-video-bg" aria-hidden="true">
            <img className="hero-video-poster" src="/images/hero-poster.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
            <iframe className="hero-bg-iframe" src="https://player.vimeo.com/video/1208143871?background=1&autoplay=1&autopause=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1&h=54d20a4071&quality=720p" data-src="https://player.vimeo.com/video/1208143871?background=1&autoplay=1&autopause=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1&h=54d20a4071&quality=720p" title="Synkyn Studios background" tabIndex={-1} frameBorder="0" loading="eager" fetchPriority="high" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" />
          </div>
          {/* `hero-content` is the handle the GSAP intro and scroll-out use. */}
          <div className="hero-content relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-12 lg:px-24 pb-6 sm:pb-8 md:pb-10 pt-[100px] sm:pt-24 md:pt-28" style={{ placeContent: "center flex-start" }}>
            <div className="flex-1 flex flex-col max-w-8xl mx-auto w-full justify-between">
              <div className="hero-top-layout pt-[5px] sm:pt-0 flex flex-row items-start justify-between gap-4 sm:gap-8 lg:gap-16 mb-3 sm:mb-5 lg:mb-6">
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-col items-start min-w-0">
                    <div className="flex items-baseline flex-nowrap w-full min-w-0">
                      <div className="hero-brand font-semibold tracking-[-0.02em] leading-none text-white/80 whitespace-nowrap text-left items-start text-[clamp(0.85rem,3.8vw,1.2rem)] sm:text-[clamp(2.2rem,min(13vw,12dvh),8.75rem)] md:text-[clamp(2.8rem,min(12vw,11dvh),9.75rem)] lg:text-[clamp(1.28rem,min(12.4vw,11.5dvh),12rem)] xl:text-[clamp(1.35rem,min(13vw,13dvh),15.5rem)] reveal-text hover-text-effect flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                        <span>Less Syn</span>
                        <span>More Kyn</span>
                      </div>
                    </div>
                    <span className="font-semibold tracking-[-0.06em] text-white/80 self-end hero-studio -mt-8 sm:-mt-14" />
                  </div>
                </div>
                <div className="hero-services-list flex flex-col gap-1 sm:gap-2 lg:gap-3 shrink-0 pt-1 sm:pt-3 lg:pt-6 justify-end items-end text-right">
                  <span className="font-semibold tracking-[-0.04em] text-white hero-services reveal-text hover-text-effect delay-100">Films</span>
                  <span className="font-semibold tracking-[-0.04em] text-white hero-services reveal-text hover-text-effect delay-200">Brand Advertising</span>
                  <span className="font-semibold tracking-[-0.04em] text-white hero-services reveal-text hover-text-effect delay-300">Print and Digital Campaigns</span>
                  <span className="font-semibold tracking-[-0.04em] text-white hero-services reveal-text hover-text-effect delay-400">Film Previz</span>
                  <span className="font-semibold tracking-[-0.04em] text-white hero-services reveal-text hover-text-effect delay-400">AI VFX</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 lg:gap-8 mt-auto hero-bottom-content mb-1 sm:mb-2 md:mb-2 pb-0">
                <div id="hero-tagline-block" className="flex flex-col gap-1.5 flex-1 max-w-2xl lg:max-w-3xl xl:max-w-4xl min-w-0 self-end items-start text-left">
                  <h1 className="text-left text-[13px] sm:text-base md:text-lg lg:text-[19px] xl:text-[20px] tracking-[-0.02em] leading-[1.32] text-white hero-tagline reveal-wipe hover-text-effect delay-500">
                    {"Synkyn Studios is an AI film studio and creative production studio in Bengaluru creating "}
                    <span className="text-white/70">commercials, product films, CGI visuals, and social content</span>
                    {" "}
                    <span>with cinematic quality for modern brands.</span>
                  </h1>
                  <p className="font-medium tracking-[-0.04em] text-white/60 hero-copyright reveal-text delay-700 hidden md:block text-xs sm:text-sm mt-0.5">
                    © 2026 Synkyn Studios
                  </p>
                </div>
                <div id="hero-showreel-wrap" className="shrink-0 flex justify-center md:justify-end w-full md:w-auto my-2 md:my-0">
                  <button aria-label="Watch SHOWREEL 2026" className="relative block overflow-hidden group active:scale-[0.97] transition-transform bg-black border-4 sm:border-6 border-accent dark:border-secondary rounded-2xl cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 dark:focus-visible:ring-accent/30 mx-auto md:mx-0" id="hero-how-it-works-btn" type="button" style={{ aspectRatio: "16 / 9" }}>
                    <img className="absolute inset-0 w-full h-full object-cover pointer-events-none" src="/images/showreel-poster.webp" alt="" aria-hidden="true" width={640} height={360} decoding="async" />
                    <iframe className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 group-hover:blur-sm" id="hero-thumbnail-video" fetchPriority="low" data-src="https://player.vimeo.com/video/1210886734?background=1&autoplay=1&autopause=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1&quality=360p" title="Synkyn Studios SHOWREEL 2026 preview" tabIndex={-1} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 bg-black/60 z-10">
                      <img src="/images/logo.webp" width={680} height={222} alt="Synkyn Studios" className="w-20 sm:w-24 h-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="absolute bottom-0 right-0 flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-tl-2xl border-t border-l z-10 overflow-hidden" style={{ background: "linear-gradient(135deg, #ffe08a 0%, #f2d400 100%)", borderColor: "rgba(255, 255, 255, 0.35)", boxShadow: "0 -2px 18px rgba(242, 212, 0, 0.35)" }}>
                      <span className="micra-badge inline-block text-[11px] sm:text-[13px]" style={{ color: "#0a0a0a", fontWeight: "800", letterSpacing: ".02em" }}>
                        SHOWREEL 2026
                      </span>
                    </div>
                  </button>
                </div>
                <p id="hero-mobile-copyright" className="font-medium tracking-[-0.04em] text-white/60 hero-copyright reveal-text delay-700 block md:hidden text-center w-full mt-1 text-xs sm:text-sm">
                  © 2026 Synkyn Studios
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="video-modal" className="fixed inset-0 hidden flex-col items-center justify-center p-0 sm:p-6" style={{ zIndex: "2147483647" }} role="dialog" aria-modal="true" aria-labelledby="v-title">
          <div id="modal-backdrop" className="absolute inset-0 cinematic-backdrop transition-opacity duration-500 cursor-pointer" style={{ opacity: "0" }} aria-hidden="true" />
          <div id="v-title" className="v-header-title hidden-ui">SHOWREEL 2026</div>
          <div id="modal-content" className="relative bg-black overflow-hidden ring-1 ring-white/10 flex flex-col pointer-events-auto modal-card" style={{ transformOrigin: "center", willChange: "transform, opacity, border-radius", backfaceVisibility: "hidden", transform: "translateZ(0)" }}>
            <button type="button" id="modal-close-btn" className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/60 hover:text-white transition-all backdrop-blur-md border border-white/10 group cursor-pointer" style={{ opacity: "0" }} aria-label="Close modal">
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#ffffff" d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="v-stage">
              <iframe id="modal-video" className="v-iframe" loading="lazy" data-src="https://player.vimeo.com/video/1210886734?autoplay=0&loop=1&title=0&byline=0&portrait=0&badge=0&controls=0&dnt=1&transparent=0" title="Synkyn Studios SHOWREEL 2026" frameBorder="0" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" />
              <button id="v-click" className="v-click" type="button" aria-label="Play or pause" />
              <div id="v-controls" className="v-controls" role="group" aria-label="Video controls">
                <button id="v-play" className="v-btn" type="button" aria-label="Play" />
                <div id="v-progress" className="v-progress" role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} tabIndex={0}>
                  <div className="v-track">
                    <div id="v-buffered" className="v-buffered" />
                    <div id="v-played" className="v-played" />
                  </div>
                  <div id="v-thumb" className="v-thumb" />
                </div>
                <span id="v-time" className="v-time">{"0:00 / 0:00"}</span>
                <button id="v-mute" className="v-btn" type="button" aria-label="Mute" />
                <button id="v-fs" className="v-btn" type="button" aria-label="Fullscreen" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
