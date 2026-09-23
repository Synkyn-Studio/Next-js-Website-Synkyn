export default function Lightbox() {
  return (
    <div className="pf-lb" id="pf-lb" data-lenis-prevent="" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Project gallery">
      <button className="pf-lb__close" id="pf-lb-close" aria-label="Close gallery">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="pf-lb__layout">
        <div className="pf-lb__stage" id="pf-lb-stage">
          <div className="pf-lb__counter" id="pf-lb-counter">1 / 1</div>
          <div className="pf-lb__imgwrap" id="pf-lb-imgwrap">
            <img className="pf-lb__img" id="pf-lb-img" alt="Synkyn Studios Print Gallery Preview" draggable="false" />
          </div>
          <button className="pf-lb__nav pf-lb__nav--prev" id="pf-lb-prev" aria-label="Previous image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="pf-lb__nav pf-lb__nav--next" id="pf-lb-next" aria-label="Next image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <span className="pf-lb__zoomhint" id="pf-lb-zoomhint">Double-tap to zoom · swipe to browse</span>
          <div className="pf-lb__thumbs" id="pf-lb-thumbs" />
        </div>
        <aside className="pf-lb__panel">
          <p className="pf-lb__eyebrow" id="pf-lb-cat">Category</p>
          <h3 className="pf-lb__title" id="pf-lb-title">Project title</h3>
          <p className="pf-lb__desc" id="pf-lb-desc">Description</p>
          <div className="pf-lb__stats">
            <div className="pf-lb__stat">
              <div className="k">Viewing</div>
              <div className="v" id="pf-lb-current">
                <b>1</b>
                / 1
              </div>
            </div>
            <div className="pf-lb__stat">
              <div className="k">Images</div>
              <div className="v" id="pf-lb-total">1</div>
            </div>
          </div>
          <div className="pf-lb__actions">
            <button className="pf-lb__act pf-lb__act--primary" id="pf-lb-share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          <div className="pf-lb__projnav">
            <button className="pf-lb__projbtn prev" id="pf-lb-prevproj">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span className="lbl">
                <small>Previous</small>
                <span id="pf-lb-prevproj-name">—</span>
              </span>
            </button>
            <button className="pf-lb__projbtn next" id="pf-lb-nextproj">
              <span className="lbl">
                <small>Next</small>
                <span id="pf-lb-nextproj-name">—</span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
