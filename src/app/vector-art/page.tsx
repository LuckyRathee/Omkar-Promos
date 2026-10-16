import type { Metadata } from "next";
import { Gallery, QuoteBand } from "@/components/blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { gallery, vectorArt } from "@/content/site";

export const metadata: Metadata = {
  title: "Vector Art",
  description:
    "Vector art redraws, custom artwork, sketch to camera-ready art and logo design in Illustrator, Photoshop and CorelDRAW. Next-day service as standard.",
};

export default function VectorArtPage() {
  return (
    <>
      <PageHeader eyebrow="Vector art" title="Artwork that stays sharp at any size" intro={vectorArt.intro} />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-5 text-[17px] leading-relaxed text-umber">
            {vectorArt.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <List title="What we make" items={vectorArt.services} />
            <List title="What you can count on" items={vectorArt.strengths} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="samples" className="border-t border-sand py-20 sm:py-24">
        <Container>
          <SectionHeading id="samples" eyebrow="Samples" title="Vector work" />
          <Reveal className="mt-12">
            <Gallery items={gallery.vector} />
          </Reveal>
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[20px] border border-sand bg-linen p-6">
      <h2 className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[16px]">
        {items.map((s) => (
          <li key={s} className="flex gap-3">
            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-walnut" aria-hidden />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
