import { site } from "@/content/site";
import { Button, SectionHead, SlashHeading } from "@/components/ui/kit";
import { PixelIcon } from "@/components/ui/art";

export function Principles() {
  return (
    <section id="principles" className="container-x pt-28 md:pt-40">
      <SectionHead n={9} label="Operating principles" />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col pt-8 lg:pr-12">
          <SlashHeading lines={["Built responsibly.", "Limits stated upfront."]} />
          <div className="mt-10 lg:mt-auto">
            <Button href="#faq">Read the FAQ</Button>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-snug text-muted">
              Automation that touches customers, people&apos;s likeness or your brand needs guardrails. These are built
              into every Exsovert deployment.
            </p>
          </div>
        </div>

        <ol className="relative lg:border-l lg:border-line">
          {site.principles.map((p, i) => (
            <li
              key={p.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              className="grid grid-cols-[auto_1fr] gap-x-5 py-8 sm:grid-cols-[7rem_auto_1fr] lg:pl-8"
            >
              <span className="mono-label hidden self-start bg-bg-2 px-1 pt-0.5 text-[0.75rem] text-muted sm:block">
                {p.label}
              </span>
              <span className="grid size-9 place-items-center self-start border border-line bg-white text-ink">
                <PixelIcon name={p.icon} className="size-4" />
              </span>
              <div>
                <h3 className="border-b border-dashed border-line pb-3 text-2xl tracking-[-0.04em]">{p.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-snug text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
