"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Sizes a single line of text so it exactly fills its container width.
 * Measures once at a reference size, then scales on resize.
 */
export function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = "100px";
      const ratio = parent.clientWidth / el.scrollWidth;
      el.style.fontSize = `${100 * ratio}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return ref;
}
