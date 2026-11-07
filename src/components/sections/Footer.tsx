import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/kit";
import { ScrollLink } from "@/components/ui/ScrollLink";

const PAGES = [
  { label: "Home", href: "#top" },
  { label: "Architecture", href: "#architecture" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Ownership", href: "#ownership" },
  { label: "Process", href: "#process" },
  { label: "Examples", href: "#examples" },
  { label: "Model", href: "#model" },
  { label: "Principles", href: "#principles" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="container-x">
      <div className="grid border-x border-line lg:grid-cols-2">
        {/* left: pitch + big wordmark */}
        <div className="flex flex-col border-b border-line p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="text-2xl tracking-[-0.04em]">
            <span className="text-blue">@</span> Start with a workflow audit.
          </p>
          <p className="mt-3 max-w-md text-[1.0625rem] leading-snug text-muted">{site.footer.blurb}</p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-8 flex max-w-md items-center justify-between border border-line bg-bg-2 p-1 pl-5"
          >
            <span className="text-muted">{site.email}</span>
            <span className="mono-label bg-ink px-4 py-3 text-white transition-colors group-hover:bg-blue">Email</span>
          </a>
          <div aria-hidden className="mt-16 flex items-end gap-4 lg:mt-auto lg:pt-20">
            <span className="grid aspect-square w-[22%] max-w-36 place-items-center bg-blue font-pixel text-[clamp(3rem,8vw,6.5rem)] leading-none text-white">
              E
            </span>
            <span className="text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.8] tracking-[-0.07em]">
              Exsovert
            </span>
          </div>
        </div>

        {/* right: links */}
        <div className="grid sm:grid-cols-2">
          <div className="border-b border-line p-8 sm:border-r lg:p-10">
            <p className="text-[0.9375rem] font-medium">SECTIONS</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <ScrollLink href={p.href} className="text-[1.0625rem] text-ink-3 hover:text-blue">
                    {p.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-line p-8 lg:p-10">
            <p className="text-[0.9375rem] font-medium">FOLLOW US</p>
            <ul className="mt-5 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="group flex items-center gap-3 text-[1.0625rem] text-ink-3 hover:text-blue">
                    <span className="dash-line flex-1 text-line" />
                    {s.label}
                    <ArrowUpRight className="transition-transform group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 sm:col-span-2 lg:p-10">
            <p className="text-[0.9375rem] font-medium">GET IN TOUCH</p>
            <ul className="mt-5 space-y-2 text-[1.0625rem] text-ink-3">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-blue">
                  {site.email}
                </a>
              </li>
              <li>{site.location}</li>
              <li className="mono-label pt-4 text-[0.75rem] text-muted">
                {site.tagline} · S01 → S06 · P01 → P06
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-line py-10 text-[0.875rem] text-muted md:flex-row">
        <p>© {site.name} 2026 · All rights reserved</p>
        <p className="mono-label text-[0.75rem]">E / Exsovert — AI systems / architecture blueprint</p>
      </div>
    </footer>
  );
}
