export default function OurStorySection() {
  return (
    <section aria-labelledby="sk3d-core-heading" className="sk3d-core-section" id="our-story">
      <div className="main-container">
        <div className="sk3d-core-grid">
          <div className="sk3d-core-copy">
            <span className="sk3d-eyebrow">Our Story</span>
            <h2 className="sk3d-core-title" id="sk3d-core-heading">Synkyn Studios</h2>
            <p className="sk3d-core-lead">
              <strong>Synkyn Studios</strong>
              {" is a "}
              <span className="sk3d-accent">cinematic, AI-first creative studio</span>
              {" based in Bengaluru, India, designed for brands that want to look premium without the constraints of traditional production."}
            </p>
            <p className="sk3d-core-lead">
              {"Where old-school filmmaking is slow, costly, and hard to scale, Synkyn directs generative image and video with a "}
              <em>{"filmmaker's eye"}</em>
              {" producing commercials, product films, CGI visuals, and social content at a speed that simply wasn't possible before. "}
              <strong>The promise is simple: turn an idea into a high-end AI film, fast, with nothing compromised.</strong>
            </p>
            <p className="sk3d-core-lead">
              The work spans the full creative range, from single campaigns to complete brand identities, each project treated as a piece of craft rather than an output.
            </p>
            <p className="sk3d-core-lead">
              {"That blend of artistic vision and commercial momentum has earned the trust of brands like "}
              <strong>TATA, RedBus, and Skroman</strong>
              {", alongside agencies and production houses such as "}
              <em>Leo, Minikin, Mytri, Ogilvy, and Vriddhi</em>
              {" which is a proof that "}
              <strong>cinematic quality and AI speed can live in the same frame.</strong>
            </p>
          </div>
          <div className="sk3d-stage">
            <div className="sk3d-stage__glow" aria-hidden="true" />
            <figure className="sk3d-logo-plate">
              <img alt="Synkyn Studios creative spark emblem" src="/images/spark.png" width={283} height={377} loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
