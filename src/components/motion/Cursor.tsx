"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Small dot that follows the pointer. Any element with
 * data-cursor="Label" grows it into a labelled disc.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.18, autoAlpha: 0 });

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      gsap.to(el, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      x(e.clientX);
      y(e.clientY);

      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      const next = target?.dataset.cursor ?? "";
      setLabel(next);
      // swap to ink over accent surfaces so the cursor never disappears
      el.classList.toggle("is-inverted", !!(e.target as HTMLElement).closest("[data-cursor-invert]"));
      gsap.to(el, {
        scale: next ? 1 : target ? 0.45 : 0.18,
        duration: 0.5,
        ease: "expo.out",
        overwrite: "auto",
      });
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] grid size-24 place-items-center rounded-full bg-accent text-ink opacity-0 transition-colors duration-300 max-[1024px]:hidden [&.is-inverted]:bg-ink [&.is-inverted]:text-paper"
    >
      <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
    </div>
  );
}
