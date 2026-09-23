export default function GalleryControls() {
  return (
    <div className="pf-controls" id="pf-work">
      <div className="pf-controls__inner">
        <div className="pf-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input id="pf-search-input" type="search" inputMode="search" autoComplete="off" placeholder="Search projects, categories…" aria-label="Search projects" />
          <button type="button" className="pf-search__clear" id="pf-search-clear" aria-label="Clear search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="pf-filters" id="pf-filters" role="tablist" aria-label="Filter projects by category" />
      </div>
    </div>
  );
}
