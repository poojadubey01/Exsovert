"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";
import { TypeLoop } from "@/components/motion/TypeLoop";
import { Scramble } from "@/components/motion/Scramble";
import { Button, Logo } from "@/components/ui/kit";
import { ScrollLink } from "@/components/ui/ScrollLink";

const CELL = 48;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const cell = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // pointer-snapped highlight cell on the grid band
      const b = band.current;
      const c = cell.current;
      let cleanup = () => {};
      if (b && c && isFinePointer() && !prefersReducedMotion()) {
        const x = gsap.quickTo(c, "x", { duration: 0.25, ease: "power3.out" });
        const y = gsap.quickTo(c, "y", { duration: 0.25, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = b.getBoundingClientRect();
          x(Math.floor((e.clientX - r.left) / CELL) * CELL);
          y(Math.floor((e.clientY - r.top) / CELL) * CELL);
          gsap.to(c, { opacity: 1, duration: 0.2 });
        };
        const leave = () => gsap.to(c, { opacity: 0, duration: 0.4 });
        b.addEventListener("pointermove", move);
        b.addEventListener("pointerleave", leave);
        cleanup = () => {
          b.removeEventListener("pointermove", move);
          b.removeEventListener("pointerleave", leave);
        };
      }

      if (!prefersReducedMotion()) {
        gsap.from(".hero-in", { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, delay: 1.3 });
        gsap.from(".hero-cell", { opacity: 0, y: 16, duration: 0.9, stagger: 0.05, delay: 1.7 });
      }
      return cleanup;
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative">
      {/* dark grid band */}
      <div ref={band} className="bg-grid-dark relative h-[clamp(240px,40vh,360px)] overflow-hidden">
        <div
          ref={cell}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bg-blue opacity-0"
          style={{ width: CELL + 1, height: CELL + 1 }}
        />
        <div className="container-x relative flex h-full items-center justify-between">
          <div className="hero-in flex items-center gap-3">
            <Logo dark />
            <span className="mono-label bg-[#3a3a3a] px-1.5 py-0.5 text-[0.75rem] text-muted-2">{site.hero.tag}</span>
          </div>
          <ScrollLink href="#value" className="hero-in mono-label hidden items-center gap-2 text-[0.75rem] text-muted-2 hover:text-white sm:flex">
            Scroll for more
            <span className="inline-block animate-bounce">↓</span>
          </ScrollLink>
        </div>
      </div>

      {/* headline */}
      <div className="container-x grid gap-10 pt-14 md:pt-16 lg:grid-cols-12 lg:gap-6">
        <h1 className="hero-in h-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.08] lg:col-span-7">
          {site.hero.headlineTop}
          <br />
          <span className="font-pixel tracking-normal text-blue">
            [ <TypeLoop words={site.hero.typed} /> ]
          </span>
          <br />
          {site.hero.headlineBottom}
        </h1>

        <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:pl-6">
          <div className="hero-in flex flex-wrap items-center gap-3 text-[0.9375rem] text-muted">
            <span className="flex" aria-hidden>
              {["P01", "P02", "P03"].map((p, i) => (
                <span
                  key={p}
                  className="grid size-6 place-items-center border border-white bg-ink font-pixel text-[0.6rem] text-white"
                  style={{ marginLeft: i ? -6 : 0, background: i === 2 ? "var(--blue)" : undefined }}
                >
                  {p.slice(2)}
                </span>
              ))}
            </span>
            <span>
              <b className="font-medium text-ink">{site.hero.proof.value}</b> {site.hero.proof.label}
            </span>
            <span className="h-4 w-px bg-line" />
            <span>
              <b className="font-medium text-ink">{site.hero.proof.value2}</b> {site.hero.proof.label2}
            </span>
          </div>

          <p className="hero-in max-w-md text-lg leading-[1.4] tracking-[-0.02em] text-ink-3">{site.hero.lede}</p>

          <div className="hero-in grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button href={`mailto:${site.email}`}>Book discovery</Button>
            <ScrollLink
              href="#architecture"
              className="group mono-label flex h-12 items-center justify-between border-b border-ink px-1 text-[0.9375rem] font-medium"
            >
              <span aria-hidden className="text-lg transition-transform duration-300 group-hover:translate-x-1">▷</span>
              See the blueprint
            </ScrollLink>
          </div>
        </div>
      </div>

      {/* product strip */}
      <div className="container-x mt-16">
        <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {site.products.map((p) => (
            <li key={p.id} className="hero-cell border-b border-r border-line">
              <ScrollLink
                href="#products"
                className="group flex h-28 flex-col justify-between p-4 transition-colors duration-300 hover:bg-blue md:h-32"
              >
                <span className="mono-label text-[0.6875rem] text-muted group-hover:text-blue-soft">
                  {p.id} / {p.tag}
                </span>
                <span className="text-lg font-medium leading-tight tracking-[-0.04em] text-ink group-hover:text-white">
                  {p.name.replace("Exsovert ", "")}
                </span>
              </ScrollLink>
            </li>
          ))}
        </ul>
        <div className="bg-dots flex min-h-36 items-center justify-center px-4 py-10">
          <p className="mono-label flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[clamp(1rem,2.2vw,1.875rem)] text-blue">
            <span className="text-ink">&gt;</span>
            <Scramble text="FORWARD-DEPLOYED" speed={45} />
            <span className="text-ink">→</span>
            <Scramble text="INTELLIGENCE LAYER FOR" speed={45} delay={0.6} />
            <span aria-hidden className="font-pixel text-ink">▢▢</span>
            <Scramble text="YOUR BUSINESS_" speed={45} delay={1.4} />
            <span className="text-ink">&lt;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
