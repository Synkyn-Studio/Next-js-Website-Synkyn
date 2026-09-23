import Link from "next/link";

export default function MediaModal() {
  return (
    <div id="media-modal" className="media-modal" data-lenis-prevent="" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="media-modal__card" id="modal-content-wrapper">
        <button type="button" id="close-modal" className="media-modal__close" aria-label="Close">
          <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>
        <div className="media-modal__media-wrapper">
          <div id="modal-media-container" className="media-modal__media" />
          <button type="button" id="modal-prev-btn" className="media-modal__nav-btn media-modal__nav-btn--prev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" id="modal-next-btn" className="media-modal__nav-btn media-modal__nav-btn--next" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div id="modal-dots-container" className="media-modal__dots" />
        </div>
        <aside className="media-modal__detail">
          <p id="modal-subtitle" className="media-modal__eyebrow">Category</p>
          <h3 id="modal-title" className="media-modal__title">Project Title</h3>
          <span className="media-modal__rule" aria-hidden="true" />
          <div id="modal-description" className="media-modal__desc" />
          <Link href="/contact" className="media-modal__cta">
            <span>Start a project like this</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </aside>
      </div>
    </div>
  );
}
