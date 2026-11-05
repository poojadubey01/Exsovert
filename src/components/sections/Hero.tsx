"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { SplitText } from "@/components/motion/SplitText";
import { useFitText } from "@/components/ui/FitText";
import { HeroCanvas } from "@/components/webgl/HeroCanvas";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const wordmark = useFitText<HTMLHeadingElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".hero-char", {
        yPercent: 105,
        duration: 1.6,
        stagger: 0.06,
        delay: 0.25,
        ease: "expo.out",
      });
      gsap.from(".hero-meta", { opacity: 0, y: 12, duration: 1, stagger: 0.1, delay: 1 });

      // scroll-out: wordmark drifts up, canvas sinks and dims
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(".hero-wordmark", { yPercent: -35, ease: "none" }, 0)
        .to(".hero-canvas", { yPercent: 25, opacity: 0.25, ease: "none" }, 0)
        .to(".hero-top", { yPercent: -60, opacity: 0, ease: "none" }, 0);
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative flex h-svh min-h-[560px] flex-col justify-between overflow-hidden px-gutter pb-gutter pt-28"
    >
      <div className="hero-canvas absolute inset-0">
        <HeroCanvas />
      </div>

      <div className="hero-top relative grid grid-cols-12 gap-x-4">
        <p className="hero-meta col-span-6 font-mono text-[11px] uppercase tracking-wider text-paper/60 md:col-span-3">
          ({site.hero.eyebrow})
        </p>
        <p className="hero-meta col-span-6 font-mono text-[11px] uppercase tracking-wider text-paper/60 md:col-span-2">
          Est. {site.founded}
        </p>
        <SplitText
          as="p"
          trigger="load"
          delay={0.9}
          className="col-span-12 mt-10 max-w-md text-xl leading-snug text-paper md:col-span-5 md:col-start-8 md:mt-0 md:text-2xl"
        >
          {site.hero.lede}
        </SplitText>
      </div>

      <div className="relative">
        <div className="hero-meta mb-4 flex items-end justify-between font-mono text-[11px] uppercase tracking-wider text-paper/60">
          <span className="flex items-center gap-3">
            <span className="relative block h-px w-10 overflow-hidden bg-paper/20">
              <span className="absolute inset-0 animate-[scrollcue_2.4s_var(--ease-in-out-quart)_infinite] bg-paper" />
            </span>
            Scroll
          </span>
          <span>Design / Code / Motion</span>
        </div>

        <h1
          ref={wordmark}
          aria-label={site.name}
          className="hero-wordmark font-display w-max whitespace-nowrap text-paper"
        >
          {site.name.split("").map((char, i) => (
            <span key={i} aria-hidden className="inline-block overflow-clip pb-[0.04em] align-bottom">
              <span className="hero-char inline-block">{char}</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
