"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LocalTime } from "@/components/ui/LocalTime";
import { RollText } from "@/components/ui/RollLink";
import { ScrollLink } from "@/components/ui/ScrollLink";

export function Header() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current!.children, { y: -30, opacity: 0, stagger: 0.08, delay: 1.2 });

      // hide on scroll down, show on scroll up
      const show = gsap
        .from(ref.current, { yPercent: -110, paused: true, duration: 0.6, ease: "power3.out" })
        .progress(1);
      ScrollTrigger.create({
        start: "top -120",
        onUpdate: (self) => (self.direction === -1 ? show.play() : show.reverse()),
      });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-gutter py-5 text-paper mix-blend-difference"
    >
      <ScrollLink href="#" className="text-lg font-semibold tracking-tight" data-cursor="Top">
        {site.name}
        <sup className="ml-0.5 font-mono text-[10px] font-normal">©</sup>
      </ScrollLink>

      <div className="hidden font-mono text-[11px] uppercase leading-tight tracking-wider md:block">
        <p>{site.location}</p>
        <p className="text-paper/60">
          <LocalTime timeZone={site.timezone} /> {site.timezoneLabel}
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="flex gap-6 text-sm">
          {site.nav.map((item) => (
            <li key={item.href}>
              <ScrollLink href={item.href}>
                <RollText>{item.label}</RollText>
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
