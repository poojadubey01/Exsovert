import { site } from "@/content/site";
import { ArrowUpRight, Button, Index, SectionHead, SlashHeading } from "@/components/ui/kit";
import { ScrollLink } from "@/components/ui/ScrollLink";

const COLS = ["S01", "S02", "S03", "S04", "S05", "S06"];

export function Products() {
  return (
    <section id="products" className="container-x pt-28 md:pt-40">
      <SectionHead n={4} label="AI products" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SlashHeading lines={["Six AI products.", "Deployed, not subscribed."]} />
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-5">
          <p className="max-w-md text-lg leading-snug tracking-[-0.02em] text-ink-3">
            Each product is a family of capabilities we engineer into your business — combined as needed, owned by you.
          </p>
          <Button href="#examples" className="self-start">
            See examples
          </Button>
        </div>
      </div>

      <div className="mt-14 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
        {site.products.map((p, i) => {
          const primary = COLS[site.matrix[p.id].indexOf("PRIMARY")];
          const svc = site.services.find((s) => s.id === primary)!;
          return (
            <article
              key={p.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 0.08}s` } as React.CSSProperties}
              className="group flex flex-col border-b border-r border-line"
            >
              <div className="bg-dots relative flex h-44 items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-blue group-hover:[background-image:none]">
                <span className="font-pixel text-[5.5rem] leading-none text-ink/15 transition-all duration-500 group-hover:scale-110 group-hover:text-white">
                  {p.id}
                </span>
                <span className="mono-label absolute left-4 top-4 bg-white px-1.5 py-0.5 text-[0.6875rem] text-ink">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-medium tracking-[-0.04em]">{p.name}</h3>
                  <Index no={p.id.slice(1)} className="text-muted" />
                </div>
                <p className="mono-label mt-1 text-[0.6875rem] text-blue">{p.kicker}</p>
                <p className="mt-4 text-[0.9375rem] leading-snug text-muted">{p.body}</p>
                <ul className="mt-5 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[0.9375rem] text-ink-3">
                      <span className="text-blue">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <ScrollLink
                  href="#ownership"
                  className="mono-label mt-auto flex items-center justify-between border-b border-ink pb-2 pt-8 text-[0.8125rem]"
                >
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
                    Primary: {svc.id} {svc.short}
                  </span>
                  <span>View</span>
                </ScrollLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
