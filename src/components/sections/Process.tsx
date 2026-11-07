import { site } from "@/content/site";
import { Button, SectionHead, SlashHeading } from "@/components/ui/kit";
import { PixelIcon } from "@/components/ui/art";

const ICON = ["discover", "design", "engineer", "deploy", "operate"];

export function Process() {
  return (
    <section id="process" className="container-x pt-28 md:pt-40">
      <SectionHead n={6} label="How it works" />
      <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <SlashHeading lines={["Discover to operate.", "Five steps, one team."]} />
        <Button href={`mailto:${site.email}`} className="shrink-0">
          Contact us
        </Button>
      </div>

      <ol className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {site.process.map((s, i) => {
          const last = i === site.process.length - 1;
          return (
            <li
              key={s.no}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
              className="group flex flex-col border border-line"
            >
              <div className="flex min-h-44 flex-col p-4">
                <span className="text-[1.0625rem] text-blue">{"// "}{s.no}</span>
                <p className="mt-auto text-[0.9375rem] leading-snug text-ink-3">{s.body}</p>
              </div>
              <span className="relative block h-2 bg-[repeating-linear-gradient(90deg,#ececec_0_4px,transparent_4px_6px)]">
                <span
                  className="bar-fill absolute inset-0 origin-left bg-blue"
                  style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
                />
              </span>
              <div className={`flex min-h-36 items-end justify-between gap-2 p-4 ${last ? "bg-bg-2" : ""}`}>
                <h3 className="self-start text-2xl tracking-[-0.04em] text-blue">{s.title}</h3>
                <PixelIcon
                  name={ICON[i]}
                  className="size-14 shrink-0 text-blue transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                  accent="var(--ink)"
                />
              </div>
              {last && (
                <span className="mono-label border-t border-line bg-bg-2 px-4 py-2 text-[0.6875rem] text-muted">
                  Monthly · S06
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
