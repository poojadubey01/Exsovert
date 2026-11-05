import { site } from "@/content/site";
import { WordScrub } from "@/components/motion/WordScrub";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Statement() {
  return (
    <section className="grid grid-cols-12 gap-x-4 px-gutter py-[18vh]">
      <div className="col-span-12 mb-10 md:col-span-3 md:mb-0">
        <SectionLabel index="01">Approach</SectionLabel>
      </div>
      <WordScrub className="col-span-12 text-[clamp(1.75rem,4.2vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] md:col-span-9 [text-indent:12%]">
        {site.statement}
      </WordScrub>
    </section>
  );
}
