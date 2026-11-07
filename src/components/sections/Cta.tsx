import { site } from "@/content/site";
import { TypeLoop } from "@/components/motion/TypeLoop";
import { Button } from "@/components/ui/kit";

function Ticker({ reverse = false }: { reverse?: boolean }) {
  const [a, b] = site.cta.marquee;
  const unit = (
    <span className="mono-label flex shrink-0 items-center gap-6 pr-16 text-[0.9375rem] text-blue">
      <span>[{a}]</span>
      <span>&amp;</span>
      <span>[{b}]</span>
      <span className="pl-10">{"//"}</span>
    </span>
  );
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-white py-5">
      <div className={`marquee ${reverse ? "marquee-reverse" : ""}`} style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>{unit}</span>
        ))}
      </div>
    </div>
  );
}

export function Cta() {
  return (
    <section id="contact" className="mt-28 md:mt-40">
      <Ticker />
      <div className="bg-grid-dark py-16 md:py-20">
        <div className="container-x">
          <div className="relative flex flex-col items-center bg-white px-6 py-16 text-center md:py-20">
            {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
              <span key={pos} aria-hidden className={`absolute size-6 bg-ink ${pos}`} />
            ))}
            <span className="mono-label bg-[#efefef] px-1.5 py-0.5 text-[0.75rem] text-muted">{site.cta.eyebrow}</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1]">
              {site.cta.top}
              <br />
              <span className="font-pixel tracking-normal text-blue">
                [<TypeLoop words={[site.cta.typed]} startDelay={300} typeMs={110} />]
              </span>
              <br />
              {site.cta.bottom}
            </h2>
            <Button href={`mailto:${site.email}`} className="mt-12">
              {site.cta.button}
            </Button>
          </div>
        </div>
      </div>
      <Ticker reverse />
    </section>
  );
}
