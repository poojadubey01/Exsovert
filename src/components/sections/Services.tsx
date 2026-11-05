import { site } from "@/content/site";
import { SplitText } from "@/components/motion/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Services() {
  return (
    <section id="services" className="px-gutter py-[16vh]">
      <div className="mb-16 grid grid-cols-12 gap-x-4">
        <div className="col-span-12 mb-8 md:col-span-3 md:mb-0">
          <SectionLabel index="03">Services</SectionLabel>
        </div>
        <SplitText
          as="h2"
          className="col-span-12 font-display text-balance text-[clamp(3rem,8vw,9rem)] md:col-span-9"
        >
          What we do, end to end
        </SplitText>
      </div>

      <ol className="border-t border-paper/15">
        {site.services.map((service, i) => (
          <li
            key={service.title}
            className="group relative grid grid-cols-12 gap-x-4 overflow-hidden border-b border-paper/15 py-8 md:py-10"
          >
            {/* accent wipe from below on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
            />
            <span className="relative col-span-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-500 group-hover:text-ink md:col-span-1 md:pt-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative col-span-10 text-[clamp(2rem,4.5vw,4.5rem)] font-medium leading-none tracking-[-0.03em] transition-[color,translate] duration-700 ease-out-expo group-hover:translate-x-4 group-hover:text-ink md:col-span-5">
              {service.title}
            </h3>
            <p className="relative col-span-10 col-start-3 mt-4 max-w-sm text-[15px] leading-relaxed text-paper/70 transition-colors duration-500 group-hover:text-ink md:col-span-4 md:col-start-auto md:mt-2">
              {service.body}
            </p>
            <ul className="relative col-span-10 col-start-3 mt-4 flex flex-wrap gap-2 md:col-span-2 md:col-start-auto md:mt-2 md:justify-end">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/60 transition-colors duration-500 group-hover:border-ink/30 group-hover:text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
