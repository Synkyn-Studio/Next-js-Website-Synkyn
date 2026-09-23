import Link from "next/link";

export default function NotFoundStage() {
  return (
    <div className="s404-container">
      {/* Perfectly Engineered Live Frequency Oscilloscope Module */}
      <div className="s404-freq-capsule" id="s404FreqCapsule" role="region" aria-label="Frequency visualizer">
        <div className="s404-freq-header">
          <span className="s404-freq-beacon" aria-hidden="true" />
          <span className="s404-freq-title">
            {"CARRIER FREQ // "}
            <span className="s404-freq-val">404.00 MHz</span>
          </span>
          <span className="s404-freq-tag">LOST BEACON</span>
        </div>
        <div className="s404-freq-display">
          <canvas id="s404FreqCanvas" width="320" height="40" aria-hidden="true" />
        </div>
        <div className="s404-freq-footer">
          <span>SECTOR // [ 04 : 04 ]</span>
          <span>ATTENUATION: -40.4 dB</span>
        </div>
      </div>
      {/* 3D Interactive Playable 404 Stage */}
      <div className="s404-stage" id="s404Stage" aria-label="Error 404: Playable Interactive Numerals">
        <div className="s404-aura" id="s404Aura" aria-hidden="true" />
        <div className="s404-numerals" id="s404Numerals">
          {/* Left Digit: '4' in Synkyn Theme Gold */}
          <div className="s404-char s404-char-1" id="s404Char1" data-index="0" data-depth="0.22">
            <span className="s404-char-shadow" aria-hidden="true">4</span>
            <span className="s404-char-core">4</span>
            <span className="s404-char-rgb" aria-hidden="true">4</span>
            <span className="s404-char-light" aria-hidden="true">4</span>
            <span className="s404-char-stroke" aria-hidden="true">4</span>
          </div>
          {/* Center Digit: '0' with Radiant Core Glow */}
          <div className="s404-char s404-char-2" id="s404Char2" data-index="1" data-depth="0.42">
            <div className="s404-zero-glow" aria-hidden="true" />
            <span className="s404-char-shadow" aria-hidden="true">0</span>
            <span className="s404-char-core">0</span>
            <span className="s404-char-rgb" aria-hidden="true">0</span>
            <span className="s404-char-light" aria-hidden="true">0</span>
            <span className="s404-char-stroke" aria-hidden="true">0</span>
          </div>
          {/* Right Digit: '4' in Synkyn Theme Gold */}
          <div className="s404-char s404-char-3" id="s404Char3" data-index="2" data-depth="0.28">
            <span className="s404-char-shadow" aria-hidden="true">4</span>
            <span className="s404-char-core">4</span>
            <span className="s404-char-rgb" aria-hidden="true">4</span>
            <span className="s404-char-light" aria-hidden="true">4</span>
            <span className="s404-char-stroke" aria-hidden="true">4</span>
          </div>
        </div>
      </div>
      {/* Descriptive Typography & Navigation Actions */}
      <div className="s404-details">
        <h1 className="s404-title">
          <span className="s404-title-gradient">Page Drifted Off Radar</span>
        </h1>
        <p className="s404-desc">The creative coordinates you requested have drifted out of orbit, were relocated, or dissolved into the digital ether.</p>
        <div className="s404-actions">
          <Link href="/" className="s404-btn-primary" id="s404HomeBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Return to Studio</span>
          </Link>
          <Link href="/library" className="s404-btn-ghost">
            <span>Explore Library</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
