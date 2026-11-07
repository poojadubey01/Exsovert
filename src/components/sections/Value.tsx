import { site } from "@/content/site";
import { Button, Chip, Index, SectionHead, SlashHeading } from "@/components/ui/kit";
import { IsoArt } from "@/components/ui/art";

export function Value() {
  return (
    <section id="value" className="container-x pt-28 md:pt-36">
      <SectionHead n={1} label="Key value" />
      <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <SlashHeading lines={site.values.heading as [string, string]} />
        <Button href={`mailto:${site.email}`} className="shrink-0">
          Get started
        </Button>
      </div>

      <div className="mt-14 grid gap-2 md:grid-cols-3">
        {site.values.items.map((v, i) => (
          <article
            key={v.no}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
            className="group flex min-h-[26rem] flex-col border border-line p-6 transition-colors duration-500 hover:border-ink"
          >
            <div className="flex items-start justify-between">
              <IsoArt
                scene={v.art}
                className="w-40 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
              />
              <Index no={v.no} />
            </div>
            <h3 className="mt-auto text-[1.625rem] font-medium tracking-[-0.04em]">{v.title}</h3>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-snug text-muted">{v.body}</p>
            <div className="mt-8">
              <Chip>{v.tag}</Chip>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
