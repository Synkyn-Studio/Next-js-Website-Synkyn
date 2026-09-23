export default function FinalTalkCtaSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 text-center" id="final-talk-cta" aria-labelledby="cta-heading-index">
      <div className="main-container max-w-[840px] mx-auto px-4 sm:px-6">
        <span className="cta-eyebrow">Ready When You Are</span>
        <h2 id="cta-heading-index" className="cta-heading">{"Have something in mind? Let's talk."}</h2>
        <p className="cta-desc">{"One email is all it takes to start. We'll take it from there."}</p>
        <div>
          <a href="mailto:contact@synkynstudios.com" className="synkyn-final-cta-btn js-email-cta" aria-label="Start the conversation via email">
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
