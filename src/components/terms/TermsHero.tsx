export default function TermsHero() {
  return (
    <section className="tc-hero" id="tc-top" data-hero-reveal="">
      <div className="tc-hero__inner" data-hero-parallax="">
        <span className="inline-block badge badge-gradient-helix tc-reveal" data-delay="0.1">Legal</span>
        <div className="md:space-y-4 space-y-2 mx-auto mt-5">
          <h1 className="text-accent w-fit max-w-full mx-auto max-md:text-[38px] max-md:leading-[1.1] tc-reveal" data-delay="0.2">
            {"Terms & "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-helix-blue">Conditions</span>
          </h1>
          <p className="text-accent/60 w-fit text-base md:w-[640px] max-w-full mx-auto md:text-lg tc-reveal" data-delay="0.3">
            Please read these terms carefully. They govern your use of the Synkyn Studios website and the AI-powered production services we provide.
          </p>
        </div>
        <div className="tc-reveal" data-delay="0.4">
          <p className="tc-updated">
            <span className="dot" aria-hidden="true" />
            Last updated: 19 July 2026
          </p>
        </div>
      </div>
    </section>
  );
}
