export default function ContactHero() {
  return (
    <section className="w-full min-h-[100svh] bg-transparent flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(760px,90vw)] aspect-square bg-[radial-gradient(circle,rgba(242,196,0,0.12),transparent_60%)] blur-[40px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="w-full max-w-[860px] mx-auto text-center relative z-10 pointer-events-none">
        <span className="inline-block badge badge-gradient-helix mb-6 pointer-events-auto" data-delay="0.1" data-ns-animate="">Get In Touch</span>
        <h1 className="text-white pointer-events-auto w-fit max-w-full mx-auto text-[32px] leading-[1.2] sm:text-[40px] md:text-[56px] md:leading-[1.1] lg:text-[64px] font-bold tracking-tight mb-6" data-delay="0.2" data-ns-animate="">
          {"Let's Build Something"}
          <br className="max-sm:hidden" />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #ffffff, #f2c200)" }}>Extraordinary.</span>
        </h1>
        <p className="text-accent/60 pointer-events-auto w-fit text-sm sm:text-base md:max-w-[620px] max-w-full mx-auto md:text-xl leading-relaxed mb-10" data-delay="0.3" data-ns-animate="">
          One click — your email client opens, pre-filled and ready. No forms. No waiting. Just a direct conversation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto" data-delay="0.4" data-ns-animate="">
          <a href="mailto:contact@synkynstudios.com" className="btn btn-primary btn-xl rounded-full px-8 flex items-center gap-3 bg-[#f2c200] text-black hover:bg-white transition-colors duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="font-semibold text-base sm:text-lg">Email us — one click</span>
          </a>
          <a href="https://www.instagram.com/synkyn_studios/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl rounded-full px-8 flex items-center gap-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors duration-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="font-semibold text-base sm:text-lg">Connect on Instagram</span>
          </a>
          <a href="https://www.linkedin.com/company/synkynstudios" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl rounded-full px-8 flex items-center gap-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors duration-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="font-semibold text-base sm:text-lg">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
