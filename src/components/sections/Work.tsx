"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { SplitText } from "@/components/motion/SplitText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // inner parallax on each card's media, tied to the horizontal tween
        gsap.utils.toArray<HTMLElement>(".work-media-inner").forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: media.parentElement,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section id="work" ref={section} className="relative overflow-hidden bg-paper text-ink">
      <div
        ref={track}
        className="flex flex-col gap-10 px-gutter py-20 md:h-svh md:w-max md:flex-row md:items-center md:gap-[4vw] md:py-0"
      >
        <div className="flex shrink-0 flex-col justify-between md:h-[70vh] md:w-[34vw]">
          <SectionLabel index="02">Selected work</SectionLabel>
          <SplitText
            as="h2"
            by="lines"
            className="font-display mt-8 text-[clamp(3.5rem,9vw,10rem)] md:mt-0"
          >
            Recent projects
          </SplitText>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/60 md:mt-0">
            A few things we shipped lately. Full case studies on request.
          </p>
        </div>

        {site.work.map((project, i) => (
          <a
            key={project.title}
            href="#"
            data-cursor="View"
            className="group block shrink-0 md:w-[min(46vw,720px)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/3]">
              <div
                className="work-media-inner absolute inset-[-12%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                style={{ backgroundColor: project.tone }}
              >
                {project.image ? (
                  <Image src={project.image} alt="" fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                ) : (
                  <span className="font-display absolute bottom-[14%] right-[14%] text-[18vw] leading-none text-ink/10 mix-blend-multiply md:text-[12vw]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-3">
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{project.title}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
                {project.discipline} — {project.year}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
