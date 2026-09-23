import { TEAM } from "@/data/team";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  return (
    <section className="chroma-spotlight-section js-chroma-spotlight-section overflow-x-clip py-12 md:py-14 lg:py-16 xl:py-[50px] max-md:py-12" data-spotlight-damping="0.18" data-spotlight-ease="power3.out" data-spotlight-radius="400" data-spotlight-scroll-end="top 18%" data-spotlight-scroll-exit-from="0.72" data-spotlight-scroll-exit-to="0.50" data-spotlight-scroll-start="top 48%" id="team">
      <div className="main-container">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start border-b border-black/10 dark:border-white/10 pb-8 sm:pb-10 md:pb-12 lg:items-end">
          <div className="col-span-12 lg:col-span-7 space-y-4 sm:space-y-5">
            <span className="badge badge-gradient-helix" data-delay="0.1" data-ns-animate="">Leadership Team</span>
            <h2 className="max-w-[760px] text-balance max-md:text-[38px] max-md:leading-[1.1]" data-delay="0.2" data-ns-animate="">
              Founders with cinematic vision and creative scale-up execution.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-paragraph dark:text-accent/70 leading-relaxed lg:max-w-[420px] max-lg:max-w-[52ch]" data-delay="0.3" data-ns-animate="">
              A bold creative future needs both artistic vision and commercial momentum. Synkyn Studios is led by creators who have built both.
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4 sm:mt-8 md:mt-6 md:space-y-4">
          <div className="relative min-h-0 w-full min-w-0">
            <div className="chroma-grid js-chroma-grid relative mx-auto grid w-full min-w-0 max-w-[min(100%,1400px)] grid-cols-1 items-stretch justify-items-center gap-3 px-0 sm:gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:justify-items-stretch lg:px-0" data-columns="4" data-damping="0.45" data-ease="power3.out" data-fade-out="0.6" data-radius="240">
              {TEAM.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
