"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** What gets animated. Lines are always masked. */
  by?: "lines" | "words" | "chars";
  /** "scroll" waits for the element to enter view, "load" plays immediately. */
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Masked text reveal. Screen readers get the plain string; the split,
 * animated copy is aria-hidden. Re-splits when the width changes so
 * line breaks stay correct on resize.
 */
export function SplitText({
  children,
  as: Tag = "p",
  className,
  by = "lines",
  trigger = "scroll",
  delay = 0,
  stagger,
  duration = 1.3,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = el.offsetWidth;
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      if (Math.abs(w - last) > 1) {
        last = w;
        setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.dataset.splitReady = "";
        return;
      }

      const types = by === "chars" ? "lines,words,chars" : "lines,words";
      const split = new SplitType(el, { types });

      // wrap each line in a clipping mask
      split.lines?.forEach((line) => {
        const mask = document.createElement("span");
        mask.className = "split-line block";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
      });

      const targets = by === "chars" ? split.chars : by === "words" ? split.words : split.lines;
      if (!targets?.length) return;

      gsap.set(targets, { yPercent: 115, rotate: by === "lines" ? 2 : 0 });
      el.dataset.splitReady = "";

      gsap.to(targets, {
        yPercent: 0,
        rotate: 0,
        duration,
        delay,
        stagger: stagger ?? (by === "chars" ? 0.025 : by === "words" ? 0.04 : 0.09),
        ease: "expo.out",
        scrollTrigger:
          trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [width, children], revertOnUpdate: true },
  );

  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <span ref={ref} aria-hidden data-split className="block">
        {children}
      </span>
    </Tag>
  );
}
