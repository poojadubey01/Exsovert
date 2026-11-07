"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: any element with [data-reveal]
 * gets `.is-in` the first time it scrolls into view. Set the
 * stagger per element with style={{ "--reveal-delay": "0.1s" }}.
 */
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    observe();

    // pick up elements rendered later (tabs, accordions)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
