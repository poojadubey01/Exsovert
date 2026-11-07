"use client";

import { useLenis } from "@/components/motion/SmoothScroll";

/** In-page anchor that scrolls through Lenis instead of jumping. */
export function ScrollLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!lenis || !href.startsWith("#")) return;
        e.preventDefault();
        const top = href === "#" || href === "#top";
        lenis.scrollTo(top ? 0 : href, { duration: 1.6, offset: top ? 0 : -40 });
      }}
    >
      {children}
    </a>
  );
}
