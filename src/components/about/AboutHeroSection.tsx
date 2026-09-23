import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <div className="about-hero-origin-stack" data-particles-obstacle-root="">
      <div className="about-hero-origin-stack__sticky-bg">
        <div className="particle-effect-container cursor-crosshair pointer-events-auto" data-particles-follow-scroll="" data-particles-origin-halo="" data-particles-orion="" data-particles-viewport-pinned="" id="particle-effect-container">
          <canvas className="block h-full w-full" height="1" id="particle-effect-canvas" width="1" />
        </div>
      </div>
      <div className="about-hero-origin-stack__scroll" data-about-origin-snap="" data-particles-scroll-root="">
        <section className="hero-section w-full min-h-[100svh] bg-transparent flex flex-col justify-center items-center px-4 py-20 lg:py-0">
          <div className="w-full max-w-none bg-transparent pt-0 pb-0 rounded-none relative">
            <div className="space-y-6 text-center relative z-10 pointer-events-none">
              <span className="inline-block badge badge-gradient-helix pointer-events-auto" data-delay="0.1" data-ns-animate="" data-orion-obstacle="">About Us</span>
              <div className="md:space-y-5 space-y-4 max-w-[90vw] md:max-w-[800px] mx-auto pointer-events-none">
                <h1 className="text-accent pointer-events-auto w-fit max-w-full mx-auto text-[32px] leading-[1.2] sm:text-[40px] md:text-[56px] md:leading-[1.1] lg:text-[64px]" data-delay="0.2" data-ns-animate="" data-orion-obstacle="">
                  {"Technology designed for "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-300">Imagination.</span>
                  <br />
                  {"Destined for "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-helix-blue">Brands</span>
                </h1>
                <p className="text-accent/60 pointer-events-auto w-fit text-sm sm:text-base md:w-[700px] max-w-full mx-auto md:text-xl leading-relaxed" data-delay="0.3" data-ns-animate="" data-orion-obstacle="">
                  {"Meet Synkyn Studios, a cinematic, AI-first creative studio from Bengaluru. Discover our story, our founding team, and the brands we've helped grow."}
                </p>
              </div>
            </div>
            <ul className="flex items-center text-center sm:flex-row flex-col gap-4 justify-center md:mt-12 mt-8 md:mb-[40px] sm:mb-16 mb-10 pointer-events-none relative z-10">
              <li className="w-full sm:w-auto pointer-events-auto" data-delay="0.7" data-direction="up" data-ns-animate="" data-offset="30" data-orion-obstacle="">
                <Link className="btn btn-secondary hover:btn-white dark:btn-accent btn-xl dark:hover:btn-white-dark sm:w-auto w-[85%]" href="/contact">
                  <span>Connect with us</span>
                </Link>
              </li>
            </ul>
            <div className="relative z-10 pointer-events-none" />
          </div>
        </section>
      </div>
    </div>
  );
}
