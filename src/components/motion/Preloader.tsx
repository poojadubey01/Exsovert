"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const COLS = 12;
const ROWS = 8;

/**
 * Full-screen field of blue pixel tiles that dissolves tile by tile
 * in a random order once the page is ready.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tiles = el.querySelectorAll(".pl-tile");
    const label = el.querySelector(".pl-label");
    const tl = gsap.timeline({ delay: 0.5, onComplete: () => setDone(true) });
    tl.to(label, { opacity: 0, duration: 0.25, ease: "none" })
      .to(
        tiles,
        {
          opacity: 0,
          duration: 0.05,
          ease: "none",
          stagger: { each: 0.008, from: "random" },
        },
        "<0.1",
      );
    if (prefersReducedMotion()) tl.progress(1);
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      id="preloader"
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <span key={i} className="pl-tile block bg-blue" style={{ marginRight: -1, marginBottom: -1 }} />
      ))}
      <div className="pl-label absolute inset-0 flex items-center justify-center font-pixel text-2xl text-white">
        [ E / EXSOVERT ]
      </div>
    </div>
  );
}
