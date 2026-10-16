import type { Metadata } from "next";
import { QuoteBand } from "@/components/blocks";
import { Container, PageHeader } from "@/components/ui/Section";
import { company, embroidery, home, promises } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Omkar Promos is a San Jose embroidery digitizing and vector art studio serving the promotional products industry.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Digitizers, designers and artists, all under one roof"
        intro="We serve embroiderers, suppliers and distributors in the promotional products industry from San Jose, California."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="space-y-5 text-[17px] leading-relaxed text-umber">
            {home.welcome.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2 className="!mt-12 font-serif text-[28px] text-espresso">{embroidery.punching.title}</h2>
            <p>{embroidery.punching.body}</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-sand bg-linen p-7">
              <h2 className="text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">Our promise</h2>
              <ul className="mt-5 space-y-5">
                {promises.map((p) => (
                  <li key={p.title}>
                    <p className="font-serif text-[19px]">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-umber">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-sand bg-oat/60 p-7">
              <h2 className="font-serif text-[21px]">High-volume orders</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-umber">
                {home.volumeNote}{" "}
                <a href={`mailto:${company.email}`} className="text-espresso underline decoration-walnut/40 underline-offset-4">
                  {company.email}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}
