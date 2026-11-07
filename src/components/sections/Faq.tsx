"use client";

import { useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { SectionHead, SlashHeading } from "@/components/ui/kit";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container-x pt-28 md:pt-40">
      <SectionHead n={10} label="FAQs" />
      <div className="mt-8">
        <SlashHeading lines={["Have a question?", "We've got answers."]} />
      </div>

      <ul className="mt-14 border-t border-line">
        {site.faqs.map((f, i) => {
          const on = open === i;
          const id = `faq-${i}`;
          return (
            <li key={f.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={id}
                  onClick={() => setOpen(on ? null : i)}
                  className="group flex w-full items-center gap-4 py-4 text-left sm:gap-6 sm:px-8"
                >
                  <span className="hidden shrink-0 text-[1.0625rem] sm:block">
                    <span className="opacity-40">{"//"}</span>
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="dash-line hidden w-14 shrink-0 text-line sm:block" />
                  <span
                    className={clsx(
                      "flex-1 text-[clamp(1.125rem,1.8vw,1.5rem)] tracking-[-0.03em] transition-colors",
                      on ? "text-blue" : "text-ink group-hover:text-blue",
                    )}
                  >
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={clsx(
                      "relative grid size-8 shrink-0 place-items-center transition-colors duration-300",
                      on ? "bg-blue" : "bg-ink",
                    )}
                  >
                    <span className="absolute h-px w-3 bg-white" />
                    <span
                      className={clsx(
                        "absolute h-3 w-px bg-white transition-transform duration-300",
                        on && "scale-y-0",
                      )}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={id}
                role="region"
                className={clsx(
                  "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                  on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-muted sm:pl-[11.5rem]">{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
