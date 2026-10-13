import { isPublished, WORKS, WORKS_ROW } from "@/data/works";

const GRID = WORKS.filter(isPublished);
const ROW = WORKS_ROW.filter(isPublished);
import WorkCard from "./WorkCard";

export default function LibraryWorks() {
  return (
    <section className="pf-works max-[1920px]:px-5 py-14 md:py-24 lg:py-32 xl:py-40 pt-16 md:pt-24 lg:pt-28 xl:pt-32">
      <div className="mx-auto max-w-[1880px] md:px-5 xl:pb-16">
        <div className="main-container 2xl:!max-w-[1440px]">
          <h2 className="sr-only">Selected work</h2>
          <div id="bento-grid-container">
            {GRID.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
          {/* Three 16:9 videos under the grid — edit WORKS_ROW in data/works.ts. */}
          {ROW.length > 0 && (
            <div id="bento-row-3">
              {ROW.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
