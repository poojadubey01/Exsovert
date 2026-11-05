"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export function WordScrub({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = new SplitType(el, { types: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <p className={className}>
      <span className="sr-only">{children}</span>
      <span ref={ref} aria-hidden>
        {children}
      </span>
    </p>
  );
}
