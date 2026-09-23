export default function GallerySection() {
  return (
    <section className="pf-section" id="pf-gallery" style={{ paddingTop: "clamp(28px,4vw,56px)" }}>
      <div className="pf-wrap">
        <div className="pf-head pf-reveal" style={{ marginBottom: "clamp(18px,3vw,34px)" }}>
          <div>
            <p className="pf-head__eyebrow">The collection</p>
            <h2 className="pf-head__title">All works</h2>
          </div>
        </div>
        <p className="pf-result-line" id="pf-result-line" />
        <div className="pf-grid" id="pf-grid" aria-live="polite" />
        <div className="pf-empty" id="pf-empty">
          <div className="pf-empty__icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>
          <h3>No matching works</h3>
          <p>Try a different category, or clear your search to see everything.</p>
        </div>
      </div>
    </section>
  );
}
