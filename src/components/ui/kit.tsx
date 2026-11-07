import clsx from "clsx";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { Scramble } from "@/components/motion/Scramble";

export const TOTAL_SECTIONS = 10;

/** `[N.01/10] —— > LABEL ————————` */
export function SectionHead({
  n,
  label,
  dark = false,
  className,
}: {
  n: number;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mono-label flex items-center gap-3",
        dark ? "text-muted-2" : "text-muted",
        className,
      )}
    >
      <span className="shrink-0">
        [N.<span className={dark ? "text-white" : "text-ink"}>{String(n).padStart(2, "0")}</span>/
        <span className="text-muted-2">{TOTAL_SECTIONS}</span>]
      </span>
      <span className={clsx("h-px w-6 shrink-0", dark ? "bg-line-dark" : "bg-line")} />
      <span className="shrink-0">&gt; {label}</span>
      <span className={clsx("h-px flex-1", dark ? "bg-line-dark" : "bg-line")} />
    </div>
  );
}

/** Two-line heading wrapped in pixel slashes; the second line scrambles in. */
export function SlashHeading({
  lines,
  dark = false,
  className,
  as: Tag = "h2",
}: {
  lines: [string, string];
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  const slash = clsx("font-pixel select-none", dark ? "text-[#555]" : "text-[#cfcfcf]");
  return (
    <Tag
      className={clsx(
        "h-display text-[clamp(2.25rem,4.4vw,3.5rem)]",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      <span aria-hidden className={clsx(slash, "mr-2")}>/</span>
      {lines[0]}
      <br />
      <Scramble text={lines[1]} />
      <span aria-hidden className={clsx(slash, "ml-2")}>/</span>
    </Tag>
  );
}

/** Solid ink button with a white pixel square on the left. */
export function Button({
  href,
  children,
  variant = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "blue";
  className?: string;
}) {
  const external = !href.startsWith("#");
  const cls = clsx(
    "group/btn mono-label relative inline-flex h-12 min-w-44 items-center justify-between gap-8 overflow-hidden px-4 text-[0.9375rem] font-medium tracking-normal",
    variant === "dark" && "bg-ink text-white",
    variant === "light" && "bg-white text-ink",
    variant === "blue" && "bg-blue text-white",
    className,
  );
  const inner = (
    <>
      {/* fill wipe on hover */}
      <span
        aria-hidden
        className={clsx(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover/btn:scale-x-100",
          variant === "blue" ? "bg-ink" : "bg-blue",
        )}
      />
      <span
        aria-hidden
        className={clsx(
          "relative size-2 transition-transform duration-500 ease-out-expo group-hover/btn:rotate-90",
          variant === "light" ? "bg-ink group-hover/btn:bg-white" : "bg-white",
        )}
      />
      <span className={clsx("relative", variant === "light" && "group-hover/btn:text-white")}>{children}</span>
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <ScrollLink href={href} className={cls}>
      {inner}
    </ScrollLink>
  );
}

/** Small mono chip, e.g. `LESS WORK, MORE OUTPUT` */
export function Chip({
  children,
  tone = "grey",
  className,
}: {
  children: React.ReactNode;
  tone?: "grey" | "blue" | "dark";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "mono-label inline-block px-1 py-0.5 text-[0.75rem] leading-none",
        tone === "grey" && "bg-[#efefef] text-ink",
        tone === "blue" && "bg-blue text-white",
        tone === "dark" && "bg-ink-3 text-muted-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** `//001` index marker */
export function Index({ no, className }: { no: string; className?: string }) {
  return (
    <span className={clsx("text-[1.0625rem] tracking-tight", className)}>
      <span className="opacity-40">{"//"}</span>
      {no}
    </span>
  );
}

/** Wordmark: blue pixel tile with "E" + name. */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <span className="grid size-7 place-items-center bg-blue font-pixel text-lg leading-none text-white">E</span>
      <span className={clsx("text-xl font-medium tracking-[-0.04em]", dark ? "text-white" : "text-ink")}>
        Exsovert
      </span>
    </span>
  );
}

/** Corner-dot frame used around featured cards and code windows. */
export function CornerDots({ className = "bg-ink" }: { className?: string }) {
  const d = clsx("absolute size-1.5", className);
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={clsx(d, "-left-[3px] -top-[3px]")} />
      <span className={clsx(d, "-right-[3px] -top-[3px]")} />
      <span className={clsx(d, "-bottom-[3px] -left-[3px]")} />
      <span className={clsx(d, "-bottom-[3px] -right-[3px]")} />
    </span>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={clsx("size-3.5", className)} aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
