"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#_$%&@01";

/**
 * Types text in left to right with a short tail of random glyphs,
 * the first time it enters the viewport. Server render and
 * screen readers always get the final string.
 */
export function Scramble({
  text,
  className,
  speed = 28,
  tail = 3,
  delay = 0,
  trigger = "view",
}: {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** how many scrambled glyphs trail the cursor */
  tail?: number;
  delay?: number;
  trigger?: "view" | "load";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now() + delay * 1000;
      const frame = (now: number) => {
        const n = Math.max(0, Math.floor((now - t0) / speed));
        if (n >= text.length + tail) {
          setOut(text);
          return;
        }
        let s = text.slice(0, Math.min(n, text.length));
        for (let i = 0; i < tail && n + i < text.length; i++) {
          const ch = text[n + i];
          s += ch === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    // hide until it plays (keeps layout: invisible chars still take width)
    const blank = requestAnimationFrame(() => {
      if (!started) setOut("");
    });

    if (trigger === "load") {
      run();
      return () => {
        cancelAnimationFrame(raf);
        cancelAnimationFrame(blank);
      };
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(blank);
    };
  }, [text, speed, tail, delay, trigger]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative inline-block">
        {/* ghost keeps the final width so lines don't reflow while typing */}
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 whitespace-pre-wrap">{out}</span>
      </span>
    </span>
  );
}
