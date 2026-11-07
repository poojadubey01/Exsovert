import clsx from "clsx";
import { site } from "@/content/site";
import { Button, Chip, CornerDots, SectionHead, SlashHeading } from "@/components/ui/kit";

export function Model() {
  const { oneTime, recurring, client, exsovert } = site.model;
  const plans = [
    { ...oneTime, price: "Once", unit: "/ engagement", featured: false, cta: "Scope a build" },
    { ...recurring, price: "Monthly", unit: "/ retainer", featured: true, cta: "Add operations" },
  ];

  return (
    <section id="model" className="container-x pt-28 md:pt-40">
      <SectionHead n={8} label="Business model" />
      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SlashHeading lines={["One-time engineering.", "Monthly management."]} />
        <p className="max-w-sm text-[0.9375rem] leading-snug text-muted">
          Exsovert sells working, client-specific AI capabilities rather than only access to generic AI tools.
        </p>
      </div>

      <div className="mt-14 grid gap-2 md:grid-cols-2">
        {plans.map((p) => (
          <article
            key={p.title}
            data-reveal
            className={clsx("relative flex flex-col border", p.featured ? "border-blue" : "border-line")}
          >
            {p.featured && <CornerDots className="bg-blue" />}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="mono-label text-[0.75rem] text-muted">{p.label}</span>
                {p.featured && <Chip tone="blue">Recommended</Chip>}
              </div>
              <h3 className="mt-6 text-[1.75rem] font-medium tracking-[-0.04em]">{p.title}</h3>
              <p className="text-[0.9375rem] text-muted">{p.for}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className={clsx("font-pixel text-[3.5rem] leading-none", p.featured ? "text-blue" : "text-ink")}>
                  {p.price}
                </span>
                <span className="text-muted">{p.unit}</span>
              </p>
              <Button href={`mailto:${site.email}`} variant={p.featured ? "blue" : "dark"} className="mt-8 w-full">
                {p.cta}
              </Button>
            </div>
            <div className="border-t border-line p-6 md:p-8">
              <p className="text-[0.9375rem] font-medium">Includes:</p>
              <ul className="mt-3 space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.9375rem] text-ink-3">
                    <span className={p.featured ? "text-blue" : "text-muted"}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-2">
        {[client, exsovert].map((r, i) => (
          <div key={r.title} data-reveal className="flex flex-col border border-line bg-bg-2 p-6 md:p-8">
            <span className={clsx("mono-label text-[0.75rem]", i ? "text-blue" : "text-ink")}>{r.title}</span>
            <p className="mt-4 text-[0.9375rem] leading-snug text-ink-3">{r.body}</p>
            <p className="mt-6 border-t border-line pt-4 text-[0.875rem] font-medium">{r.foot}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
