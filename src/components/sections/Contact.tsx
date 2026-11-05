"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/motion/Magnetic";
import { LocalTime } from "@/components/ui/LocalTime";
import { RollText } from "@/components/ui/RollLink";
import { ScrollLink } from "@/components/ui/ScrollLink";

export function Contact() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // the footer rises out from under the previous section
      gsap.from(".contact-inner", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      // endless marquee
      gsap.to(".marquee-track", { xPercent: -50, repeat: -1, duration: 28, ease: "none" });
    },
    { scope: section },
  );

  const phrase = "Let's build something worth remembering — ";

  return (
    <section id="contact" ref={section} data-cursor-invert className="relative overflow-hidden bg-accent text-ink">
      <div className="contact-inner flex min-h-svh flex-col justify-between pb-gutter pt-[14vh]">
        <div className="overflow-hidden" aria-hidden>
          <div className="marquee-track flex w-max whitespace-nowrap">
            {[0, 1].map((n) => (
              <span key={n} className="font-display pr-[0.25em] text-[clamp(5rem,14vw,16rem)]">
                {phrase}
                {phrase}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-12 px-gutter pt-16">
          <div className="col-span-12 md:col-span-7">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink/60">
              New business
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Write"
              className="text-[clamp(2rem,5vw,5rem)] font-medium leading-none tracking-[-0.03em] underline decoration-1 underline-offset-[0.15em] transition-[text-decoration-color] duration-500 hover:decoration-transparent"
            >
              {site.email}
            </a>
          </div>

          <div className="col-span-12 flex md:col-span-5 md:justify-end">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="grid size-40 place-items-center rounded-full bg-ink text-sm text-paper transition-transform duration-500 ease-out-expo hover:scale-105 md:size-48"
              >
                Start a project
              </a>
            </Magnetic>
          </div>

          <footer className="col-span-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink/20 pt-5 font-mono text-[11px] uppercase tracking-wider">
            <ul className="flex gap-6">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href}>
                    <RollText>{s.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Local time <LocalTime timeZone={site.timezone} /> {site.timezoneLabel}
            </p>
            <p>
              © {site.founded} {site.name}
            </p>
            <ScrollLink href="#">
              <RollText>Back to top ↑</RollText>
            </ScrollLink>
          </footer>
        </div>
      </div>
    </section>
  );
}
