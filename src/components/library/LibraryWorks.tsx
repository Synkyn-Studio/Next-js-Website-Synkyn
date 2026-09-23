import { WORKS } from "@/data/works";
import WorkCard from "./WorkCard";

export default function LibraryWorks() {
  return (
    <section className="pf-works max-[1920px]:px-5 py-14 md:py-24 lg:py-32 xl:py-40 pt-16 md:pt-24 lg:pt-28 xl:pt-32">
      <div className="mx-auto max-w-[1880px] md:px-5 xl:pb-16">
        <div className="main-container 2xl:!max-w-[1440px]">
          <div id="bento-grid-container">
            {WORKS.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
