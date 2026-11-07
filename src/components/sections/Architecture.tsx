"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { site, type ProductId, type ServiceId } from "@/content/site";
import { Button, SectionHead, SlashHeading } from "@/components/ui/kit";

const COLS: ServiceId[] = ["S01", "S02", "S03", "S04", "S05", "S06"];
const ENGINEERING: ServiceId[] = ["S04", "S02", "S03", "S05"];

/** product → its primary service, derived from the ownership matrix */
const PRIMARY = Object.fromEntries(
  (Object.entries(site.matrix) as [ProductId, (typeof site.matrix)[ProductId]][]).map(([p, roles]) => [
    p,
    COLS[roles.indexOf("PRIMARY")],
  ]),
) as Record<ProductId, ServiceId>;

const svc = (id: ServiceId) => site.services.find((s) => s.id === id)!;

type Path = { d: string; from: string; to: string; kind: "primary" | "ops" | "flagship" };

const STATS = [
  { k: "01", v: "Flagship", l: "S01 leads every build" },
  { k: "04", v: "Services", l: "Engineering teams own delivery" },
  { k: "06", v: "Products", l: "Deployable AI systems" },
  { k: "01", v: "Monthly", l: "Managed AI Operations" },
];

export function Architecture() {
  const wrap = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<string | null>(null);

  const measure = useCallback(() => {
    const w = wrap.current;
    if (!w) return;
    const box = w.getBoundingClientRect();
    const rect = (id: string) => {
      const el = w.querySelector<HTMLElement>(`[data-node="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cy: r.top - box.top + r.height / 2 };
    };
    const out: Path[] = [];

    // S01 spine → each engineering service
    const flag = rect("S01");
    ENGINEERING.forEach((s) => {
      const a = rect(s);
      if (!flag || !a) return;
      const x = a.l - 18;
      out.push({ d: `M${x},${flag.b} V${a.cy} H${a.l}`, from: "S01", to: s, kind: "flagship" });
    });

    // service → its primary products
    (Object.keys(PRIMARY) as ProductId[]).forEach((p) => {
      const a = rect(PRIMARY[p]);
      const b = rect(p);
      if (!a || !b) return;
      const mx = a.r + (b.l - a.r) / 2;
      out.push({ d: `M${a.r},${a.cy} H${mx} V${b.cy} H${b.l}`, from: PRIMARY[p], to: p, kind: "primary" });
    });

    // products → S06
    const ops = rect("S06");
    site.products.forEach((p) => {
      const b = rect(p.id);
      if (!ops || !b) return;
      const mx = b.r + (ops.l - b.r) / 2;
      out.push({ d: `M${b.r},${b.cy} H${mx} V${ops.cy} H${ops.l}`, from: p.id, to: "S06", kind: "ops" });
    });

    setSize({ w: box.width, h: box.height });
    setPaths(out);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // which nodes are lit while hovering
  const lit = (id: string) => {
    if (!hover) return true;
    if (hover === id) return true;
    if (hover === "S01" || hover === "S06") return true;
    if (hover.startsWith("S")) return PRIMARY[id as ProductId] === hover;
    return PRIMARY[hover as ProductId] === id;
  };
  const pathLit = (p: Path) => {
    if (!hover) return true;
    if (hover === "S01") return p.kind === "flagship";
    if (hover === "S06") return p.kind === "ops";
    return p.from === hover || p.to === hover;
  };

  const node = (id: string) => ({
    "data-node": id,
    onPointerEnter: () => setHover(id),
    onPointerLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    tabIndex: 0,
  });

  return (
    <section id="architecture" className="container-x pt-28 md:pt-40">
      <SectionHead n={2} label="Connected architecture" />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="pt-8 lg:col-span-7">
          <SlashHeading lines={["One flagship. Six products.", "Everything connected."]} />
          <p className="mt-6 max-w-md text-[0.9375rem] leading-snug text-muted">
            S01 oversees implementation, engineering services own delivery of each product family, and Managed AI
            Operations runs them all month after month. Hover any block to trace its connections.
          </p>
          <Button href="#ownership" className="mt-8">
            See ownership
          </Button>
        </div>
        <dl className="grid grid-cols-2 self-start border-l border-t border-line lg:col-span-5">
          {STATS.map((s) => (
            <div key={s.v} className="border-b border-r border-line p-6">
              <dt className="text-[2rem] font-normal tracking-[-0.05em]">
                <span className="font-pixel text-blue">{s.k}</span> {s.v}
              </dt>
              <dd className="mt-2 text-[0.9375rem] text-muted">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* diagram */}
      <div ref={wrap} className="relative mt-16 select-none">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
        >
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke={p.kind === "primary" ? "var(--blue)" : p.kind === "ops" ? "#1a1a1a" : "#adadad"}
              strokeWidth={p.kind === "primary" ? 2 : 1.25}
              strokeDasharray={p.kind === "ops" ? "4 4" : undefined}
              className="transition-opacity duration-300"
              style={{ opacity: pathLit(p) ? 1 : 0.12 }}
            />
          ))}
        </svg>

        {/* flagship bar */}
        <div
          {...node("S01")}
          className={clsx(
            "relative flex flex-col gap-2 border border-ink bg-ink p-5 text-white outline-none transition-opacity md:flex-row md:items-center md:gap-10",
            !lit("S01") && "opacity-30",
          )}
        >
          <span className="mono-label border border-line-dark px-2 py-1 text-[0.75rem] text-blue-soft">S01 / Flagship</span>
          <div>
            <p className="text-xl font-medium tracking-[-0.04em]">{svc("S01").name}</p>
            <p className="mono-label mt-1 text-[0.75rem] text-muted-2">Discover the problem / Design the system / Build and deploy it</p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr_0.62fr] lg:gap-16 lg:pl-9">
          {/* engineering services */}
          <div>
            <p className="mono-label mb-4 text-[0.75rem] text-muted">Engineering services</p>
            <div className="flex flex-col gap-4 lg:h-[calc(100%-2rem)] lg:justify-around">
              {ENGINEERING.map((id) => {
                const s = svc(id);
                return (
                  <div
                    key={id}
                    {...node(id)}
                    className={clsx(
                      "relative border border-line bg-white p-4 outline-none transition-all duration-300 hover:border-blue focus-visible:border-blue",
                      !lit(id) && "opacity-30",
                    )}
                  >
                    <span className="mono-label flex items-center gap-2 text-[0.6875rem] text-blue">
                      <span className="h-3 w-0.5 bg-blue" />
                      {s.id} / {s.tag}
                    </span>
                    <p className="mt-1.5 text-[1.0625rem] font-medium tracking-[-0.03em]">{s.name}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{s.points.join(", ")}.</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* products */}
          <div>
            <p className="mono-label mb-4 text-[0.75rem] text-muted">Deployable AI products</p>
            <div className="flex flex-col gap-3">
              {site.products.map((p) => (
                <div
                  key={p.id}
                  {...node(p.id)}
                  className={clsx(
                    "relative border border-line bg-bg-2 px-4 py-3 outline-none transition-all duration-300 hover:border-blue hover:bg-white focus-visible:border-blue",
                    !lit(p.id) && "opacity-30",
                  )}
                >
                  <span className="mono-label text-[0.6875rem] text-muted">
                    {p.id} / {p.tag}
                  </span>
                  <p className="text-[1.0625rem] font-medium tracking-[-0.03em]">{p.name}</p>
                  <p className="text-[0.8125rem] text-muted">{p.kicker}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ongoing */}
          <div className="flex flex-col">
            <p className="mono-label mb-4 text-[0.75rem] text-muted">Ongoing</p>
            <div className="flex flex-1 items-center">
              <div
                {...node("S06")}
                className={clsx(
                  "relative w-full border border-dashed border-ink bg-white p-5 outline-none transition-opacity hover:border-solid focus-visible:border-solid",
                  !lit("S06") && "opacity-30",
                )}
              >
                <span className="mono-label text-[0.6875rem] text-blue">S06 / Monthly</span>
                <p className="mt-1.5 text-xl font-medium leading-tight tracking-[-0.04em]">Managed AI Operations</p>
                <p className="mt-2 text-[0.8125rem] text-muted">Monitor, maintain, update and improve.</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="mono-label mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[0.75rem] text-muted">
          <li className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-blue" /> Primary service
          </li>
          <li className="flex items-center gap-3">
            <span className="w-10 border-t border-dashed border-ink" /> Recurring management
          </li>
          <li className="flex items-center gap-3">
            <span className="h-px w-10 bg-muted-2" /> S01 oversees implementation
          </li>
        </ul>
      </div>
    </section>
  );
}
