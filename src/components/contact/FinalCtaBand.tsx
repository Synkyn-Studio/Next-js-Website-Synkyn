export default function FinalCtaBand() {
  return (
    <section className="sk-c-section" aria-labelledby="sk-c-band-heading">
      <div className="sk-c-band">
        <div className="sk-c-band__glow" aria-hidden="true" />
        <div className="sk-c-band__inner">
          <span className="sk-c-eyebrow">Ready When You Are</span>
          <h2 id="sk-c-band-heading">{"Have something in mind? Let's talk."}</h2>
          <p>{"One email is all it takes to start. We'll take it from there."}</p>
          <a href="mailto:contact@synkynstudios.com" className="sk-c-mailbtn js-email-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Start the conversation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
