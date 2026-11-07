"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { ArrowUpRight } from "@/components/ui/kit";

const LINKS = [{ label: "Home", href: "#top" }, ...site.nav];

export function Header() {
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);

  // highlight whichever section is under the top third of the viewport
  useEffect(() => {
    const targets = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x flex items-start justify-between">
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="mono-label flex border border-t-0 border-ink bg-white text-[0.8125rem]">
            {LINKS.map((l) => {
              const on = active === l.href;
              return (
                <li key={l.href} className="border-r border-ink last:border-r-0">
                  <ScrollLink
                    href={l.href}
                    className={clsx(
                      "block px-2 transition-colors duration-200",
                      on ? "bg-blue py-2 text-white" : "py-1.5 text-ink hover:bg-ink hover:text-white",
                    )}
                    aria-current={on ? "true" : undefined}
                  >
                    {on ? `<${l.label}>` : l.label}
                  </ScrollLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* mobile: logo tile + menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="mono-label border border-t-0 border-ink bg-white px-3 py-2 text-ink md:hidden"
        >
          {open ? "[ Close ]" : "[ Menu ]"}
        </button>

        <a
          href={`mailto:${site.email}`}
          className="group mono-label flex items-center gap-3 border border-t-0 border-ink bg-white px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-blue hover:text-white"
        >
          <ArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
          Contact us
        </a>
      </div>

      {open && (
        <div id="mobile-menu" className="container-x md:hidden">
          <ul className="mono-label mt-2 border border-ink bg-white">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-line last:border-b-0">
                <ScrollLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx("block px-4 py-3", active === l.href ? "bg-blue text-white" : "text-ink")}
                >
                  {l.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
