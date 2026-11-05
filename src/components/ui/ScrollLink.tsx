"use client";

import { useLenis } from "@/components/motion/SmoothScroll";

/** In-page anchor that scrolls through Lenis instead of jumping. */
export function ScrollLink({
  href,
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!lenis || !href.startsWith("#")) return;
        e.preventDefault();
        lenis.scrollTo(href === "#" ? 0 : href, { duration: 1.6 });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
