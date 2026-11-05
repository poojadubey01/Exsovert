"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export { useLenis };

/** Keeps ScrollTrigger in step with every Lenis scroll event. */
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

/**
 * Lenis drives the scroll; GSAP's ticker drives Lenis, so ScrollTrigger
 * and smooth scroll share one RAF and never drift out of sync.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<LenisRef>(null);

  useEffect(() => {
    const tick = (time: number) => lenis.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);

  const reduced = prefersReducedMotion();

  return (
    <ReactLenis
      root
      ref={lenis}
      options={{
        autoRaf: false,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.9,
        smoothWheel: !reduced,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
