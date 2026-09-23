export default function PrintHero() {
  return (
    <section className="pf-hero" id="pf-top">
      <div className="pf-hero__inner">
        <div className="space-y-5 text-center relative z-10 pointer-events-none">
          <span className="inline-block badge badge-gradient-helix pointer-events-auto pf-reveal" data-delay="0.1" data-ns-animate="" data-orion-obstacle="">
            Print Album
          </span>
          <div className="md:space-y-4 space-y-2 lg:max-w-full md:max-w-[600px] sm:max-w-[550px] min-[500px]:max-w-[450px] max-w-[350px] mx-auto pointer-events-none">
            <h1 className="text-accent pointer-events-auto w-fit max-w-full mx-auto max-md:text-[38px] max-md:leading-[1.1] pf-reveal" data-delay="0.2" data-ns-animate="" data-orion-obstacle="">
              {"Our Prints & "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-helix-blue">Creative Works</span>
            </h1>
            <p className="text-accent/60 pointer-events-auto w-fit text-base md:w-[700px] max-w-full mx-auto md:text-lg pf-reveal" data-delay="0.3" data-ns-animate="" data-orion-obstacle="">
              A premium gallery of completed works, prints, and installations by Synkyn Studios. A curated exhibition of AI-crafted creative projects. Made in Bengaluru.
            </p>
          </div>
        </div>
        <ul className="flex items-center text-center sm:flex-row flex-col gap-4 justify-center md:mt-14 mt-8 pointer-events-none relative z-10">
          <li className="w-full sm:w-auto pointer-events-auto pf-reveal" data-delay="0.4" data-direction="left" data-ns-animate="" data-offset="50" data-orion-obstacle="">
            <a className="btn btn-secondary dark:btn-accent btn-explore-gallery btn-xl sm:w-auto w-[85%]" href="#pf-work">
              <span>Explore the gallery</span>
              {" "}
              <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="explore-svg1">
                <path className="explore-svg1-path" d="M2.5 14.166l7.5 3.334 7.5-3.334M2.5 9.166l7.5 3.334 7.5-3.334M10 2.5L2.5 5.833l7.5 3.334 7.5-3.334L10 2.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
