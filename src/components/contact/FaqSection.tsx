import JsonLd from "@/components/seo/JsonLd";

/* One list feeds both the visible FAQ and its FAQPage structured data, so the two can't drift apart. */
const FAQS = [
  {
    q: "Why is there no contact form?",
    a: "Forms add friction and delay. A direct email opens a real conversation instantly — pre-filled and ready — so nothing gets lost in a queue.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Brand films, ad campaigns, generative image and video, key art, motion posters and more — cinematic, AI-first creative directed with a filmmaker's eye.",
  },
  {
    q: "How quickly will I hear back?",
    a: "We usually reply within one business day. Include your timeline in the email and we'll prioritise accordingly.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We're based in Bengaluru and collaborate with brands and filmmakers remotely, from here to everywhere.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.synkynstudios.com/contact#faq",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FaqSection() {
  return (
    <section className="sk-c-section" aria-labelledby="sk-c-faq-heading">
      <JsonLd data={FAQ_SCHEMA} />
      <div className="sk-c-head">
        <span className="sk-c-eyebrow">Good To Know</span>
        <h2 id="sk-c-faq-heading">Answers before you ask.</h2>
        <p>A few quick things people usually want to know before getting in touch.</p>
      </div>
      <div className="sk-c-faq">
        {FAQS.map(({ q, a }, i) => (
          <details key={q} className="sk-c-faq__item" open={i === 0}>
            <summary className="sk-c-faq__q">
              {q}
              <svg className="sk-c-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="sk-c-faq__a">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
