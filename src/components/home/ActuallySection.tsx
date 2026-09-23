export default function ActuallySection() {
  return (
    <section className="actually-area overflow-hidden">
      <div className="actually-area-inner section-spacing">
        <div className="container">
          <div className="bg-area" />
          <div className="space-earth-container group cursor-pointer relative z-10">
            <h2 className="font-perfectgirl section-title text-heading-1 space-earth-title" id="space-earth-text" style={{ backgroundImage: "linear-gradient(to right, #facc15 0%, #eab308 20%, #ffffff 40%, #ffffff 100%)", backgroundSize: "300% 100%", backgroundPosition: "100% 0", color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
              AI Generated.
              <br />
              Human Directed.
            </h2>
            <div className="space-earth-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
