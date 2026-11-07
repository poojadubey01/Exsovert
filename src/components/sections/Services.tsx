"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { Chip, SectionHead, SlashHeading } from "@/components/ui/kit";
import { PixelIcon } from "@/components/ui/art";
import { prefersReducedMotion } from "@/lib/motion";

const CYCLE_MS = 6000;
const STACK = [
  "GPU compute", "Private LLMs", "Cloud", "On-prem", "REST APIs", "Webhooks", "CRM", "Email",
  "Vector search", "Voice models", "Video models", "Dashboards", "Data warehouse", "Messaging",
];

export function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % site.services.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused, visible]);

  const s = site.services[active];
  const col = active; // matrix column index matches service order
  const owned = site.products
    .map((p) => ({ p, role: site.matrix[p.id][col] }))
    .filter((x) => x.role);

  return (
    <section id="services" ref={section} className="bg-ink-2 py-28 text-white md:py-36">
      <div className="container-x">
        <SectionHead n={3} label="Services" dark />

        <div className="grid border-b border-line-dark lg:grid-cols-2">
          {/* tab list */}
          <div
            className="min-w-0 pb-12 pt-14 lg:pr-12"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <ul role="tablist" aria-label="Services" className="flex flex-col gap-7">
              {site.services.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.id}>
                    {on && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {item.points.map((p) => (
                          <Chip key={p} tone="blue">
                            {p}
                          </Chip>
                        ))}
                      </div>
                    )}
                    <button
                      role="tab"
                      aria-selected={on}
                      aria-controls="service-panel"
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-4 text-left"
                    >
                      {on && <span className="size-2 shrink-0 bg-blue" />}
                      <span
                        className={clsx(
                          "text-[clamp(1.25rem,2vw,1.5rem)] tracking-[-0.04em] transition-colors",
                          on ? "text-white" : "text-[#6b6b6b] group-hover:text-muted-2",
                        )}
                      >
                        {item.name}
                      </span>
                      <span className="dash-line flex-1 text-line-dark" />
                      <span className="shrink-0 text-[#8a8a8a]">{"// "}{item.id}</span>
                    </button>
                    {on && (
                      <>
                        <p className="mt-3 max-w-md text-[0.9375rem] leading-snug text-muted-2">{item.body}</p>
                        {!paused && visible && (
                          <span className="mt-4 block h-px w-full bg-line-dark">
                            <span
                              key={active}
                              className="block h-px origin-left bg-blue"
                              style={{ animation: `grow ${CYCLE_MS}ms linear forwards` }}
                            />
                          </span>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* live panel */}
          <div
            id="service-panel"
            role="tabpanel"
            className="bg-dots-dark relative flex min-h-[30rem] min-w-0 items-center justify-center border-line-dark p-6 lg:border-l lg:p-10"
          >
            <div key={s.id} className="panel-in grid w-full max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
              <div className="border border-line-dark bg-ink-2 p-4">
                <p className="mono-label text-[0.6875rem] text-[#8a8a8a]">Capabilities</p>
                <ul className="mt-3 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="border-b border-line-dark pb-2 text-[0.875rem] text-muted-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="relative h-10 w-px bg-line-dark">
                  <span className="pulse-down absolute left-0 top-0 h-4 w-px bg-blue" />
                </span>
                <div className="grid size-14 place-items-center border border-line-dark bg-black font-pixel text-lg text-white sm:size-20 sm:text-2xl">
                  {s.id}
                </div>
                <span className="relative h-10 w-px bg-line-dark">
                  <span className="pulse-down absolute left-0 top-0 h-4 w-px bg-blue" />
                </span>
              </div>

              <div className="border border-line-dark bg-ink-2 p-4">
                <p className="mono-label text-[0.6875rem] text-[#8a8a8a]">Products</p>
                <ul className="mt-3 space-y-2">
                  {owned.map(({ p, role }) => (
                    <li key={p.id} className="flex items-center justify-between gap-2 border-b border-line-dark pb-2 text-[0.875rem]">
                      <span className="text-muted-2">{p.name.replace("Exsovert ", "")}</span>
                      <span
                        className={clsx(
                          "mono-label text-[0.625rem]",
                          role === "PRIMARY" ? "text-blue" : role === "ALL" ? "text-white" : "text-[#8a8a8a]",
                        )}
                      >
                        {role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-3 mt-4 flex items-center justify-center gap-3 border border-line-dark bg-ink-2 p-3">
                <span className="mono-label mr-2 text-[0.6875rem] text-[#8a8a8a]">{s.tag}</span>
                {["discover", "engineer", "operate"].map((ic) => (
                  <span key={ic} className="grid size-10 place-items-center border border-line-dark text-muted-2">
                    <PixelIcon name={ic} className="size-5" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="py-16 lg:pr-12">
            <SlashHeading lines={["Six services.", "One delivery team."]} dark />
          </div>
        </div>

        {/* bottom row */}
        <div className="grid border border-line-dark md:grid-cols-[2fr_1fr_1fr]">
          <div className="overflow-hidden border-line-dark p-6 md:border-r">
            <h3 className="text-2xl tracking-[-0.04em]">Works with your stack</h3>
            <p className="mt-3 max-w-sm text-[0.9375rem] text-muted-2">
              We integrate with the hardware, models, data sources and tools you already run.
            </p>
            <p className="sr-only">Integrations include: {STACK.join(", ")}.</p>
            <div aria-hidden className="mask-x mt-10 space-y-2">
              {[0, 1].map((row) => (
                <div key={row} className={clsx("marquee gap-2", row && "marquee-reverse")} style={{ "--marquee-duration": "36s" } as React.CSSProperties}>
                  {[...STACK, ...STACK].map((_, i) => (
                    <span
                      key={i}
                      className="mono-label shrink-0 border border-line-dark px-4 py-3 text-[0.75rem] text-muted-2"
                    >
                      {(row ? [...STACK].reverse() : STACK)[i % STACK.length]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col border-t border-line-dark p-6 md:border-t-0 md:border-r">
            <h3 className="text-2xl tracking-[-0.04em]">One owner per product</h3>
            <p className="mt-3 text-[0.9375rem] text-muted-2">Every product has one primary service accountable for delivery.</p>
            <PixelIcon name="square" className="mt-auto ml-auto size-14 pt-8 text-muted-2" />
          </div>
          <div className="flex flex-col border-t border-line-dark p-6 md:border-t-0">
            <h3 className="text-2xl tracking-[-0.04em]">Built to keep running</h3>
            <p className="mt-3 text-[0.9375rem] text-muted-2">Managed operations keep each system monitored and improving.</p>
            <PixelIcon name="stack" className="mt-auto ml-auto size-14 pt-8 text-muted-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
