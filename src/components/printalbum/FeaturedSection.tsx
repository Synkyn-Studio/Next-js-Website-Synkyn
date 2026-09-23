export default function FeaturedSection() {
  return (
    <section className="pf-section pf-section--overlap" id="pf-featured">
      <div className="pf-wrap">
        <div className="pf-head pf-reveal">
          <div>
            <p className="pf-head__eyebrow">Featured</p>
            <h2 className="pf-head__title">Signature projects</h2>
          </div>
          <p className="pf-head__note">A handful of works we’re especially proud of — tap any tile to open the full gallery.</p>
        </div>
        <div className="pf-feat pf-reveal" id="pf-featured-grid" />
      </div>
    </section>
  );
}
