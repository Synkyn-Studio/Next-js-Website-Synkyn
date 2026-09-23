export default function PipelineSection() {
  return (
    <section className="pipeline-section bg-transparent relative overflow-hidden" id="pipeline-section">
      <svg className="flecks" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" />
      <header className="hero">
        <p className="hero-eyebrow">The Pipeline</p>
        <h2 className="hero-title">
          <span className="hero-white">WHAT DO WE DO?</span>
        </h2>
      </header>
      <section className="journey" aria-label="Studio services timeline">
        <div className="mobile-timeline-track" aria-hidden="true" style={{ display: "none" }}>
          <div className="mobile-timeline-bar" />
        </div>
        <div className="mobile-rocket" aria-hidden="true" style={{ display: "none" }}>
          <svg viewBox="-70 -200 140 360" overflow="visible" style={{ width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id="m-g-node" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd77e" stopOpacity=".7" />
                <stop offset="60%" stopColor="#ffb03a" stopOpacity=".3" />
                <stop offset="100%" stopColor="#ff9000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="m-g-flame-core" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fff3cf" />
                <stop offset="75%" stopColor="#ffd166" stopOpacity=".95" />
                <stop offset="100%" stopColor="#ffb340" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="m-g-flame-outer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffdf9a" stopOpacity=".95" />
                <stop offset="45%" stopColor="#ffab3d" stopOpacity=".85" />
                <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
              </linearGradient>
              <filter id="m-f-flame-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="rotate(180)">
              <circle className="rt-glow" r="48" fill="url(#m-g-node)" />
              <g className="rt-assembly-mobile">
                <g className="rt-flame-wrap" style={{ transform: "translate(0px, 48px) scale(1.6)", transformOrigin: "0px 0px" }}>
                  <path className="rt-flame-outer" d="M0 -2 C -10 20 -12 52 0 104 C 12 52 10 20 0 -2 Z" fill="url(#m-g-flame-outer)" opacity="0.85" filter="url(#m-f-flame-glow)" />
                  <path className="rt-flame-outer" d="M0 -1 C -7 16 -8 44 0 82 C 8 44 7 16 0 -1 Z" fill="url(#m-g-flame-outer)" opacity="0.95" />
                  <path className="rt-flame-core" d="M0 0 C -3.6 12 -4 32 0 58 C 4 32 3.6 12 0 0 Z" fill="url(#m-g-flame-core)" />
                </g>
                <g className="rt-rocket" transform="scale(.86) translate(-32 -88)">
                  <svg x="-24.3" y="8" width="112.5" height="150" viewBox="81 40 668 891" preserveAspectRatio="xMidYMid meet" overflow="visible">
                    <svg x="0" y="0" width="810" height="1012" viewBox="0 0 810 1012.49997" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <filter x="0%" y="0%" width="100%" height="100%" id="m-rk-a17fd91e32">
                          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" colorInterpolationFilters="sRGB" />
                        </filter>
                        <filter x="0%" y="0%" width="100%" height="100%" id="m-rk-90b4ea4963">
                          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0" colorInterpolationFilters="sRGB" />
                        </filter>
                        <clipPath id="m-rk-7a2d7c256d">
                          <path d="M 56.132812 9 L 754 9 L 754 1003.46875 L 56.132812 1003.46875 Z M 56.132812 9 " clipRule="nonzero" />
                        </clipPath>
                        <mask id="m-rk-6d93964a99">
                          <g filter="url(#m-rk-a17fd91e32)">
                            <g filter="url(#m-rk-90b4ea4963)" transform="matrix(0.731557, 0, 0, 0.731098, 56.132819, 8.708131)">
                              <image x="0" y="0" width="954" xlinkHref="./images/rocket-mask.webp" height="2063" preserveAspectRatio="xMidYMid meet" />
                            </g>
                          </g>
                        </mask>
                      </defs>
                      <g clipPath="url(#m-rk-7a2d7c256d)">
                        <g mask="url(#m-rk-6d93964a99)">
                          <g transform="matrix(0.731557, 0, 0, 0.731098, 56.132819, 8.708131)">
                            <image x="0" y="0" width="954" xlinkHref="./images/rocket.webp" height="2063" preserveAspectRatio="xMidYMid meet" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </svg>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <svg className="journey-svg" viewBox="0 0 1200 3760" preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="g-trail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff4d6" />
              <stop offset="30%" stopColor="#ffd98a" />
              <stop offset="70%" stopColor="#f0b452" />
              <stop offset="100%" stopColor="#c98b2e" />
            </linearGradient>
            <radialGradient id="g-node" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd77e" stopOpacity=".55" />
              <stop offset="100%" stopColor="#ffb03a" stopOpacity="0" />
            </radialGradient>
            <filter id="f-soft" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="f-wide" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <linearGradient id="g-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="2.5%" stopColor="#fff" stopOpacity="1" />
              <stop offset="94%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="m-fade">
              <rect x="-200" y="0" width="1600" height="3760" fill="url(#g-fade)" />
            </mask>
            <linearGradient id="g-cloud-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="90%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="m-cloud-fade">
              <rect x="-300" y="-200" width="1800" height="4800" fill="url(#g-cloud-fade)" />
            </mask>
            <radialGradient id="g-cloud-deep" cx="50%" cy="42%" r="70%">
              <stop offset="0%" stopColor="#222b40" />
              <stop offset="55%" stopColor="#131826" />
              <stop offset="100%" stopColor="#0a0d14" stopOpacity=".1" />
            </radialGradient>
            <radialGradient id="g-cloud-mid" cx="47%" cy="32%" r="74%">
              <stop offset="0%" stopColor="#4a5570" />
              <stop offset="52%" stopColor="#262f42" />
              <stop offset="100%" stopColor="#141a26" stopOpacity=".1" />
            </radialGradient>
            <radialGradient id="g-cloud-lit" cx="50%" cy="20%" r="78%">
              <stop offset="0%" stopColor="#aab2c6" />
              <stop offset="28%" stopColor="#6b7590" />
              <stop offset="65%" stopColor="#303950" />
              <stop offset="100%" stopColor="#171d2c" stopOpacity=".06" />
            </radialGradient>
            <radialGradient id="g-cloud-wisp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-gold-rim" cx="50%" cy="28%" r="62%">
              <stop offset="0%" stopColor="#ffedc4" stopOpacity=".98" />
              <stop offset="38%" stopColor="#f8c56e" stopOpacity=".5" />
              <stop offset="100%" stopColor="#c47c2a" stopOpacity="0" />
            </radialGradient>
            <filter id="f-cloud-back" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.007 0.011" numOctaves="3" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="85" />
              <feGaussianBlur stdDeviation="15" />
            </filter>
            <filter id="f-cloud-mid" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.017" numOctaves="4" seed="11" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="62" />
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="f-cloud-front" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.019 0.027" numOctaves="4" seed="4" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="44" />
              <feGaussianBlur stdDeviation="3.6" />
            </filter>
            <filter id="f-cloud-wisp" x="-60%" y="-60%" width="220%" height="220%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.07" numOctaves="2" seed="21" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="18" />
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
            <filter id="f-rim" x="-60%" y="-60%" width="220%" height="220%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018 0.026" numOctaves="3" seed="9" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="34" />
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="f-blur-s">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
            <filter id="f-blur-m" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter id="f-flame-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="g-rocket" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#454b57" />
              <stop offset="28%" stopColor="#8b93a1" />
              <stop offset="52%" stopColor="#eef2f8" />
              <stop offset="74%" stopColor="#9aa2ae" />
              <stop offset="100%" stopColor="#3b414c" />
            </linearGradient>
            <linearGradient id="g-fin-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#333944" />
              <stop offset="100%" stopColor="#6a7280" />
            </linearGradient>
            <linearGradient id="g-fin-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5d6472" />
              <stop offset="100%" stopColor="#272c35" />
            </linearGradient>
            <linearGradient id="g-nozzle" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#14171d" />
              <stop offset="100%" stopColor="#3a4049" />
            </linearGradient>
            <linearGradient id="g-flame-core" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fff3cf" />
              <stop offset="75%" stopColor="#ffd166" stopOpacity=".85" />
              <stop offset="100%" stopColor="#ffb340" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="g-flame-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffdf9a" stopOpacity=".95" />
              <stop offset="45%" stopColor="#ffab3d" stopOpacity=".6" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
            </linearGradient>
            <symbol id="s-cloud" viewBox="0 0 600 360" overflow="visible">
              <image href="https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/vecteezy_a-dark-cumulus-cloud-contrasts-sharply-against-a-bright_57176514.png" width="600" height="360" preserveAspectRatio="xMidYMid contain" />
            </symbol>
            <symbol id="s-rocket-up" viewBox="0 0 64 170" overflow="visible">
              <svg x="-24.3" y="8" width="112.5" height="150" viewBox="81 40 668 891" preserveAspectRatio="xMidYMid meet" overflow="visible">
                <svg x="0" y="0" width="810" height="1012" viewBox="0 0 810 1012.49997" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter x="0%" y="0%" width="100%" height="100%" id="d-rk-a17fd91e32">
                      <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" colorInterpolationFilters="sRGB" />
                    </filter>
                    <filter x="0%" y="0%" width="100%" height="100%" id="d-rk-90b4ea4963">
                      <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0" colorInterpolationFilters="sRGB" />
                    </filter>
                    <clipPath id="d-rk-7a2d7c256d">
                      <path d="M 56.132812 9 L 754 9 L 754 1003.46875 L 56.132812 1003.46875 Z M 56.132812 9 " clipRule="nonzero" />
                    </clipPath>
                    <mask id="d-rk-6d93964a99">
                      <g filter="url(#d-rk-a17fd91e32)">
                        <g filter="url(#d-rk-90b4ea4963)" transform="matrix(0.731557, 0, 0, 0.731098, 56.132819, 8.708131)">
                          <image x="0" y="0" width="954" xlinkHref="./images/rocket-mask.webp" height="2063" preserveAspectRatio="xMidYMid meet" />
                        </g>
                      </g>
                    </mask>
                  </defs>
                  <g clipPath="url(#d-rk-7a2d7c256d)">
                    <g mask="url(#d-rk-6d93964a99)">
                      <g transform="matrix(0.731557, 0, 0, 0.731098, 56.132819, 8.708131)">
                        <image x="0" y="0" width="954" xlinkHref="./images/rocket.webp" height="2063" preserveAspectRatio="xMidYMid meet" />
                      </g>
                    </g>
                  </g>
                </svg>
              </svg>
            </symbol>
            <symbol id="s-flame-down" viewBox="-20 -4 40 114" overflow="visible">
              <path className="rt-flame-outer" d="M0 -2 C -10 20 -12 52 0 104 C 12 52 10 20 0 -2 Z" fill="url(#g-flame-outer)" filter="url(#f-blur-m)" />
              <path className="rt-flame-outer" d="M0 -1 C -7 16 -8 44 0 82 C 8 44 7 16 0 -1 Z" fill="url(#g-flame-outer)" filter="url(#f-flame-glow)" />
              <path className="rt-flame-core" d="M0 0 C -3.6 12 -4 32 0 58 C 4 32 3.6 12 0 0 Z" fill="url(#g-flame-core)" filter="url(#f-blur-s)" />
            </symbol>
          </defs>
          <g className="clouds" mask="url(#m-cloud-fade)">
            <use href="#s-cloud" className="cloud drift-a" x="-240" y="-80" width="750" height="450" opacity=".5" />
            <use href="#s-cloud" className="cloud drift-b" x="620" y="60" width="580" height="348" opacity=".75" />
            <use href="#s-cloud" className="cloud drift-c" x="80" y="220" width="460" height="276" opacity=".35" />
            <use href="#s-cloud" className="cloud drift-b" x="660" y="580" width="700" height="420" opacity=".55" />
            <use href="#s-cloud" className="cloud drift-a" x="-180" y="760" width="620" height="372" opacity=".8" />
            <use href="#s-cloud" className="cloud drift-c" x="380" y="940" width="480" height="288" opacity=".45" />
            <use href="#s-cloud" className="cloud drift-a" x="-280" y="1320" width="800" height="480" opacity=".48" />
            <use href="#s-cloud" className="cloud drift-b" x="640" y="1500" width="560" height="336" opacity=".85" />
            <use href="#s-cloud" className="cloud drift-c" x="140" y="1720" width="500" height="300" opacity=".4" />
            <use href="#s-cloud" className="cloud drift-b" x="680" y="2050" width="720" height="432" opacity=".55" />
            <use href="#s-cloud" className="cloud drift-a" x="-160" y="2220" width="640" height="384" opacity=".82" />
            <use href="#s-cloud" className="cloud drift-c" x="460" y="2440" width="480" height="288" opacity=".5" />
            <use href="#s-cloud" className="cloud drift-a" x="-250" y="2780" width="780" height="468" opacity=".58" />
            <use href="#s-cloud" className="cloud drift-b" x="600" y="2960" width="600" height="360" opacity=".85" />
            <use href="#s-cloud" className="cloud drift-c" x="100" y="3180" width="520" height="312" opacity=".45" />
            <use href="#s-cloud" className="cloud drift-b" x="660" y="3500" width="700" height="420" opacity=".65" />
            <use href="#s-cloud" className="cloud drift-a" x="-180" y="3700" width="660" height="396" opacity=".88" />
            <g className="node-clouds" />
          </g>
          <g mask="url(#m-cloud-fade)">
            <path id="trail-geo" className="trail-geo" fill="none" d={"\n                            M 600 -40\n                            C 930 130, 930 490, 600 640\n                            C 270 790, 270 1150, 600 1320\n                            C 930 1490, 930 1850, 600 2000\n                            C 270 2150, 270 2510, 600 2680\n                            C 930 2850, 930 3210, 600 3360\n                            C 440 3430, 340 3340, 370 3230\n                            C 400 3120, 540 3170, 560 3280\n                            C 570 3350, 510 3430, 420 3720"} />
            <use href="#trail-geo" className="trail-dim" />
            <use href="#trail-geo" className="trail-halo" filter="url(#f-wide)" />
            <use href="#trail-geo" className="trail-glow" filter="url(#f-soft)" />
            <use href="#trail-geo" className="trail-core" />
          </g>
          <g className="nodes" />
          <g className="rocket-traveler" opacity="0">
            <circle className="rt-glow" r="46" fill="url(#g-node)" />
            <g className="rt-assembly">
              <g style={{ transform: "translate(0px, 48px) scale(1.6)", transformOrigin: "0px 0px" }}>
                <use className="rt-flame" href="#s-flame-down" x="-17" y="-4" width="34" height="97" />
              </g>
              <g className="rt-rocket" transform="scale(.86) translate(-32 -88)">
                <use href="#s-rocket-up" width="64" height="170" />
              </g>
            </g>
          </g>
          <g className="clouds fg-clouds" mask="url(#m-cloud-fade)" />
        </svg>
        <article className="stop left" data-stop="0" style={{ "--top": "8.0%" }}>
          <span className="num">01</span>
          <h2 className="title">Films</h2>
          <span className="eyebrow">2.39:1 · Film</span>
          <p className="desc">Full sequences, set extensions, and period-accurate worlds, previs to final pixel, built shot by shot with cinematic continuity.</p>
        </article>
        <article className="stop right" data-stop="1" style={{ "--top": "26.0%" }}>
          <span className="num">02</span>
          <h2 className="title">{"Brand & Advertising"}</h2>
          <span className="eyebrow">16:9 · 9:16 · Commercial</span>
          <p className="desc">Agency-polish product films, automotive and FMCG spots, and platform-native cutdowns delivered in days, not production quarters.</p>
        </article>
        <article className="stop left" data-stop="2" style={{ "--top": "44.1%" }}>
          <span className="num">03</span>
          <h2 className="title">{"Digital & Print Campaigns"}</h2>
          <span className="eyebrow">4:5 | 16:9</span>
          <p className="desc">
            Cohesive campaign visuals across every surface, from platform-native social cutdowns to print-ready posters and one-sheets, palette-locked and pixel-perfect end to end.
          </p>
        </article>
        <article className="stop right" data-stop="3" style={{ "--top": "62.3%" }}>
          <span className="num">04</span>
          <h2 className="title">{"Storyboards & Previs"}</h2>
          <span className="eyebrow">Boards · Previs</span>
          <p className="desc">Director ready boards and animatics that lock blocking, lensing, and tone before a single crew call is made.</p>
        </article>
        <article className="stop left" data-stop="4" style={{ "--top": "80.3%" }}>
          <span className="num">05</span>
          <h2 className="title">{"AI VFX & Set Extension"}</h2>
          <span className="eyebrow">Plates · Comp</span>
          <p className="desc">Generative plates, crowd and environment extension, cleanup, and style-consistent fixes that cut into live-action invisibly.</p>
        </article>
      </section>
    </section>
  );
}
