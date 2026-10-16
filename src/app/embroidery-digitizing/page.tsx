import type { Metadata } from "next";
import { FormatsTable, Gallery, ProcessSteps, QuoteBand } from "@/components/blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { embroidery, gallery, pricing, promises } from "@/content/site";

export const metadata: Metadata = {
  title: "Embroidery Digitizing",
  description:
    "Embroidery digitizing for every logo and placement at $1.50 per 1,000 stitches. 24–48 hour turnaround, free rush, PDF proof, 29 machine formats including DST, PES, EXP and JEF.",
};

export default function EmbroideryPage() {
  return (
    <>
      <PageHeader eyebrow="Embroidery digitizing" title="Logos turned into clean, sewable files" intro={embroidery.intro} />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-5 text-[17px] leading-relaxed text-umber">
            {embroidery.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="!mt-10 rounded-2xl border border-sand bg-oat/60 p-6">
              <h2 className="font-serif text-[22px] text-espresso">{embroidery.punching.title}</h2>
              <p className="mt-2 text-[16px]">{embroidery.punching.body}</p>
            </div>
          </div>

          <aside aria-labelledby="pricing" className="h-fit rounded-[24px] border border-sand bg-linen p-7 sm:p-8">
            <h2 id="pricing" className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">
              Pricing
            </h2>
            <p className="mt-3 font-serif text-[52px] leading-none tracking-[-0.02em]">
              ${pricing.perThousand.toFixed(2)}
            </p>
            <p className="mt-2 text-umber">per 1,000 stitches</p>
            <p className="mt-5 text-[15px] leading-relaxed text-umber">
              Other digitizers charge ${pricing.marketLow.toFixed(2)}–${pricing.marketHigh.toFixed(2)} per thousand. Compare us, or send a test job and judge
              the result.
            </p>
            <ul className="mt-6 space-y-3 border-t border-sand pt-6 text-[15px]">
              {promises.slice(1).map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-walnut" aria-hidden />
                  {p.title}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="samples-title" id="samples" className="scroll-mt-24 border-t border-sand py-20 sm:py-24">
        <Container>
          <SectionHeading id="samples-title" eyebrow="Samples" title="Embroidery we've digitized" />
          <Reveal className="mt-12">
            <Gallery items={gallery.embroidery} />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="formats" className="bg-oat/50 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionHeading
            id="formats"
            eyebrow="Machine formats"
            title="Files for every machine"
            lede="Not sure which format you need? Ask your embroiderer, or start with DST, the most common. If you need another format later, we convert it free."
          />
          <FormatsTable />
        </Container>
      </section>

      <section aria-labelledby="process" className="py-20 sm:py-24">
        <Container>
          <SectionHeading id="process" eyebrow="How it works" title="From artwork to machine file" />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}
