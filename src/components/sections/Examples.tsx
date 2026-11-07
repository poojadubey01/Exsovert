"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { Button, CornerDots, SectionHead, SlashHeading } from "@/components/ui/kit";
import { prefersReducedMotion } from "@/lib/motion";

const STEP_MS = 1400;

export function Examples() {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const ex = site.examples[tab];

  // walk the highlight down the pipeline, then loop
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % (ex.steps.length + 1)), STEP_MS);
    return () => clearInterval(t);
  }, [ex.steps.length]);

  const pick = (i: number) => {
    setTab(i);
    setStep(0);
  };

  return (
    <section id="examples" className="container-x pt-28 md:pt-40">
      <SectionHead n={7} label="Solution examples" />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* terminal */}
        <div className="bg-dots order-2 flex items-center justify-center p-4 sm:p-10 lg:order-1">
          <div className="relative w-full border border-line bg-white p-3">
            <CornerDots />
            <div className="bg-ink-2 text-[#e6e6e6]">
              <div className="flex items-center justify-between border-b border-[#333] px-4 py-3">
                <span className="mono-label text-[0.875rem]">{ex.product}</span>
                <span className="font-mono text-[0.6875rem] text-muted">pipeline.yml</span>
              </div>
              <pre key={ex.id} className="panel-in whitespace-pre-wrap break-words p-4 font-mono text-[0.75rem] leading-[1.7] sm:text-[0.8125rem]">
                <code>
                  <span className="text-[#8a8a8a]"># {ex.title.toLowerCase()}</span>
                  {"\n"}
                  <span className="text-[#7ab0ff]">client_requirement</span>:{" "}
                  <span className="text-[#c5e478]">&quot;{ex.requirement}&quot;</span>
                  {"\n\n"}
                  <span className="text-[#7ab0ff]">steps</span>:
                  {ex.steps.map((s, i) => {
                    const on = i === step;
                    const done = i < step;
                    return (
                      <span
                        key={s.label}
                        className={clsx(
                          "block border-l-2 pl-2 transition-colors duration-300",
                          on ? "border-blue bg-blue/15" : "border-transparent",
                        )}
                      >
                        {"  "}- <span className="text-[#f7a35c]">{String(i + 1).padStart(2, "0")}</span>{" "}
                        <span className={on ? "text-white" : "text-[#7ab0ff]"}>{s.label}</span>:{" "}
                        <span className="text-[#c5e478]">{s.owner}</span>
                        <span className="text-[#8a8a8a]">
                          {"  "}# {on ? "running…" : done ? "✓ done" : "queued"}
                        </span>
                        {on && (
                          <span className="block text-[#a0a0a0]">
                            {s.items.map((it) => `      · ${it}`).join("\n")}
                          </span>
                        )}
                      </span>
                    );
                  })}
                  {"\n"}
                  <span className="text-[#7ab0ff]">deliverable</span>:{" "}
                  <span className="text-[#c5e478]">&quot;{ex.deliverable}&quot;</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* copy + tabs */}
        <div className="order-1 flex flex-col lg:order-2">
          <SlashHeading lines={["Real systems.", "Real client workflows."]} />
          <Button href={`mailto:${site.email}`} className="mt-8 self-start">
            Discuss yours
          </Button>

          <div role="tablist" aria-label="Examples" className="relative mt-12 flex flex-col gap-6 pl-8 lg:mt-16">
            <span className="absolute bottom-1 left-0 top-1 w-px border-l border-dashed border-muted-2" />
            <span
              className="absolute left-[-3px] w-[7px] bg-blue transition-all duration-500 ease-out-expo"
              style={{ top: tab === 0 ? 0 : "50%", height: "50%" }}
            />
            {site.examples.map((e, i) => (
              <button
                key={e.id}
                role="tab"
                aria-selected={tab === i}
                onClick={() => pick(i)}
                className="text-left"
              >
                <span className={clsx("mono-label text-[0.6875rem]", tab === i ? "text-blue" : "text-muted-2")}>
                  {e.product}
                </span>
                <span
                  className={clsx(
                    "block text-2xl tracking-[-0.04em] transition-colors",
                    tab === i ? "text-ink" : "text-muted-2 hover:text-muted",
                  )}
                >
                  {e.title}
                </span>
                {tab === i && (
                  <span className="panel-in mt-2 block max-w-md text-[0.9375rem] leading-snug text-muted">
                    {e.summary}
                    <span className="mt-3 block border-l-2 border-ink pl-3 text-[0.8125rem] text-ink-3">{e.backbone}</span>
                    <span className="mt-3 block text-[0.8125rem] text-muted">{e.note}</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
