export default function TermsHero() {
  return (
    <section className="tc-hero" id="tc-top">
      <div className="tc-hero__inner">
        <span className="inline-block badge badge-gradient-helix tc-reveal">Legal</span>
        <div className="md:space-y-4 space-y-2 mx-auto mt-5">
          <h1 className="text-accent w-fit max-w-full mx-auto max-md:text-[38px] max-md:leading-[1.1] tc-reveal">
            {"Terms & "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-helix-blue">Conditions</span>
          </h1>
          <p className="text-accent/60 w-fit text-base md:w-[640px] max-w-full mx-auto md:text-lg tc-reveal">
            Please read these terms carefully. They govern your use of the Synkyn Studios website and the AI-powered production services we provide.
          </p>
        </div>
        <div className="tc-reveal">
          <p className="tc-updated">
            <span className="dot" aria-hidden="true" />
            Last updated: 19 July 2026
          </p>
        </div>
      </div>
    </section>
  );
}
