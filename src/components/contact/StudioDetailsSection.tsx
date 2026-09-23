export default function StudioDetailsSection() {
  return (
    <section className="sk-c-section" aria-labelledby="sk-c-location-heading">
      <div className="sk-c-head">
        <span className="sk-c-eyebrow">Studio Presence</span>
        <h2 id="sk-c-location-heading">{"Our Studio & Channels"}</h2>
        <p>Based in the tech and creative capital of India, delivering world-class AI films globally.</p>
      </div>
      <div className="sk-c-cards">
        {/* Card 1: Studio Location */}
        <div className="sk-c-card" tabIndex={0}>
          <div className="sk-c-card__inner">
            <div className="sk-c-card__glare" />
            <div className="sk-c-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="sk-c-card__label">Studio Headquarters</p>
            <h3 className="sk-c-card__value">Bengaluru, India</h3>
            <p className="sk-c-card__copy">Karnataka 560001, India</p>
            <span className="sk-c-card__arrow">Creative Production Hub</span>
          </div>
        </div>
        {/* Card 2: Direct Email */}
        <a href="mailto:contact@synkynstudios.com" className="sk-c-card js-email-cta">
          <div className="sk-c-card__inner">
            <div className="sk-c-card__glare" />
            <div className="sk-c-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <p className="sk-c-card__label">Direct Inquiries</p>
            <h3 className="sk-c-card__value">contact@synkynstudios.com</h3>
            <p className="sk-c-card__copy">One-click direct email access for brand commissions, commercials, CGI visuals, and partnerships.</p>
            <span className="sk-c-card__arrow">
              Email our team
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
        {/* Card 3: Working Hours */}
        <div className="sk-c-card" tabIndex={0}>
          <div className="sk-c-card__inner">
            <div className="sk-c-card__glare" />
            <div className="sk-c-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="sk-c-card__label">Operating Hours</p>
            <h3 className="sk-c-card__value">Mon – Fri: 9:00 AM – 6:00 PM</h3>
            <p className="sk-c-card__copy">Indian Standard Time (IST · UTC+5:30). High-throughput generation pipelines operate 24/7.</p>
            <span className="sk-c-card__arrow">Always on schedule</span>
          </div>
        </div>
      </div>
    </section>
  );
}
