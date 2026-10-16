import Image from "next/image";
import { company, faqs as allFaqs, formats, process } from "@/content/site";
import { Arrow, Button } from "./ui/Button";
import { Container } from "./ui/Section";

/** Sample-work grid. Thumbnails are small originals, so they sit in matted frames rather than full-bleed. */
export function Gallery({ items, limit }: { items: { src: string; alt: string }[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {shown.map((img) => (
        <li
          key={img.src}
          className="group rounded-2xl border border-sand bg-linen p-2.5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-20px_rgb(59_46_36/0.45)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-oat">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
              // The legacy thumbnails have a gold frame baked in; a slight zoom crops it off.
              className="scale-[1.13] object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Native details/summary accordion; height animates via CSS where supported. */
export function FaqList({ items = allFaqs }: { items?: typeof allFaqs }) {
  return (
    <div className="divide-y divide-sand border-y border-sand">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-[21px] leading-snug">{f.q}</span>
            <span
              aria-hidden
              className="mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border border-sand text-walnut transition-transform duration-300 group-open:rotate-45"
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-7 pr-10 text-[16px] leading-relaxed text-umber">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FormatsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-sand bg-linen">
      <table className="w-full min-w-[30rem] text-left text-[15px]">
        <caption className="sr-only">Embroidery file formats by machine brand</caption>
        <thead>
          <tr className="border-b border-sand bg-oat/70 text-[12px] tracking-[0.08em] text-taupe uppercase">
            <th scope="col" className="px-5 py-3 font-medium">Machine</th>
            <th scope="col" className="px-5 py-3 font-medium">File formats</th>
          </tr>
        </thead>
        <tbody>
          {formats.map((row) => (
            <tr key={row.brand} className="border-b border-sand/70 last:border-0">
              <th scope="row" className="px-5 py-3.5 font-normal text-espresso">{row.brand}</th>
              <td className="px-5 py-3.5">
                <ul className="flex flex-wrap gap-1.5">
                  {row.ext.map((e) => (
                    <li key={e} className="rounded-md bg-oat px-2 py-0.5 text-[13px] tracking-wide text-umber">
                      .{e}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
      {process.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-3 bg-linen p-6 sm:p-7">
          <span className="font-serif text-[15px] text-walnut italic">Step {i + 1}</span>
          <h3 className="font-serif text-[22px] leading-tight">{step.title}</h3>
          <p className="text-[15px] leading-relaxed text-umber">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function QuoteBand() {
  return (
    <section aria-labelledby="quote-band" className="py-20 sm:py-28">
      <Container>
        <div className="bg-weave relative overflow-hidden rounded-[28px] border border-sand bg-oat px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 id="quote-band" className="mx-auto max-w-2xl font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
            Send us your artwork. We&rsquo;ll send back a free quote.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-umber">
            Tell us the garment, fabric and size. Or email a high-resolution JPG to{" "}
            <a href={`mailto:${company.email}`} className="text-espresso underline decoration-walnut/40 underline-offset-4 hover:decoration-walnut">
              {company.email}
            </a>
            .
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/quote">
              Get a free quote <Arrow />
            </Button>
            <Button href="/faq" variant="outline">
              Read the FAQ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
