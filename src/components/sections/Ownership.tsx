import clsx from "clsx";
import { site, type Role } from "@/content/site";
import { SectionHead, SlashHeading } from "@/components/ui/kit";

function Badge({ role }: { role: Role }) {
  if (!role) return <span className="text-muted-2">—</span>;
  return (
    <span
      className={clsx(
        "mono-label inline-flex h-7 min-w-20 items-center justify-center px-2 text-[0.6875rem]",
        role === "PRIMARY" && "bg-blue text-white",
        role === "SUPPORT" && "border border-ink text-ink",
        role === "ALL" && "bg-ink text-white",
      )}
    >
      {role}
    </span>
  );
}

export function Ownership() {
  return (
    <section id="ownership" className="container-x pt-28 md:pt-40">
      <SectionHead n={5} label="Ownership & dependencies" />
      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SlashHeading lines={["What comes under what?", "Clear owners, every time."]} />
        <p className="max-w-sm text-[0.9375rem] leading-snug text-muted">
          Every product has one primary service, additional supporting capabilities, and two lifecycle-wide services.
        </p>
      </div>

      <div className="mt-14 overflow-x-auto border border-line" data-lenis-prevent-horizontal>
        <table className="w-full min-w-[820px] border-collapse text-left">
          <caption className="sr-only">Which service is primary, supporting or lifecycle-wide for each product</caption>
          <thead>
            <tr className="bg-ink text-white">
              <th scope="col" className="p-5 align-bottom font-normal">
                <span className="mono-label block text-[0.75rem] text-blue-soft">AI product</span>
                <span className="text-[0.8125rem] text-muted-2">Delivery responsibility</span>
              </th>
              {site.services.map((s) => (
                <th key={s.id} scope="col" className="p-5 text-center font-normal">
                  <span className="block font-pixel text-lg">{s.id}</span>
                  <span className="mono-label text-[0.6875rem] text-muted-2">{s.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {site.products.map((p) => (
              <tr key={p.id} className="group border-t border-line transition-colors hover:bg-bg-2">
                <th scope="row" className="p-5 font-normal">
                  <span className="block text-lg font-medium tracking-[-0.03em]">{p.name}</span>
                  <span className="text-[0.8125rem] text-muted">{p.kicker}</span>
                </th>
                {site.matrix[p.id].map((r, i) => (
                  <td key={i} className="p-3 text-center">
                    <Badge role={r} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-3">
        {site.roles.map((r) => (
          <div key={r.role} data-reveal className="border border-line p-6">
            <Badge role={r.role as Role} />
            <p className="mt-4 text-[0.9375rem] leading-snug text-muted">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
