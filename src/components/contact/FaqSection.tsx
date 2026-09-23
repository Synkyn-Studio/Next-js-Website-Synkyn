export default function FaqSection() {
  return (
    <section className="sk-c-section" aria-labelledby="sk-c-faq-heading">
      <div className="sk-c-head">
        <span className="sk-c-eyebrow">Good To Know</span>
        <h2 id="sk-c-faq-heading">Answers before you ask.</h2>
        <p>A few quick things people usually want to know before getting in touch.</p>
      </div>
      <div className="sk-c-faq">
        <details className="sk-c-faq__item" open>
          <summary className="sk-c-faq__q">
            Why is there no contact form?
            <svg className="sk-c-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="sk-c-faq__a">
            Forms add friction and delay. A direct email opens a real conversation instantly — pre-filled and ready — so nothing gets lost in a queue.
          </div>
        </details>
        <details className="sk-c-faq__item">
          <summary className="sk-c-faq__q">
            What kind of projects do you take on?
            <svg className="sk-c-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="sk-c-faq__a">
            {"Brand films, ad campaigns, generative image and video, key art, motion posters and more — cinematic, AI-first creative directed with a filmmaker's eye."}
          </div>
        </details>
        <details className="sk-c-faq__item">
          <summary className="sk-c-faq__q">
            How quickly will I hear back?
            <svg className="sk-c-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="sk-c-faq__a">{"We usually reply within one business day. Include your timeline in the email and we'll prioritise accordingly."}</div>
        </details>
        <details className="sk-c-faq__item">
          <summary className="sk-c-faq__q">
            Do you work with clients outside India?
            <svg className="sk-c-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="sk-c-faq__a">{"Yes. We're based in Bengaluru and collaborate with brands and filmmakers remotely, from here to everywhere."}</div>
        </details>
      </div>
    </section>
  );
}
