export default function FloatingTocButton() {
  return (
    <button type="button" id="tc-floating-toc" className="tc-floating-toc" aria-label="Jump to Table of Contents">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="13" y2="18" />
      </svg>
      <span>Sections</span>
    </button>
  );
}
