import Image from "next/image";
import Link from "next/link";
import { FaqList, Gallery, ProcessSteps, QuoteBand } from "@/components/blocks";
import { Hero } from "@/components/hero/Hero";
import { Arrow, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { company, faqs, gallery, home, pricing, promises, vectorArt } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Promises */}
      <section aria-labelledby="promises" className="border-y border-sand bg-oat/50 py-16 sm:py-20">
        <Container>
          <h2 id="promises" className="sr-only">
            Why embroiderers use us
          </h2>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {promises.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06}>
                  <h3 className="font-serif text-[22px] leading-snug">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-umber">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="services"
            eyebrow="What we do"
            title="Two crafts, done carefully"
            lede="We're a one-stop shop for embroidery digitizing and vector artwork, trusted by suppliers and distributors in the promotional products industry."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <ServiceCard
                href="/embroidery-digitizing"
                title="Embroidery digitizing"
                body="Your logo, converted into a clean machine file with the right underlay, stitch angles and density for the fabric it's going on."
                facts={[`$${pricing.perThousand.toFixed(2)} per 1,000 stitches`, pricing.turnaround, "Any of 29 formats"]}
                image={gallery.embroidery[0]}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ServiceCard
                href="/vector-art"
                title="Vector art"
                body="Blurry logos and sketches redrawn as crisp, scalable vector art in Illustrator, Photoshop or CorelDRAW, ready for print."
                facts={vectorArt.services.slice(0, 3)}
                image={gallery.vector[0]}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Samples */}
      <section aria-labelledby="samples" className="border-t border-sand py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="samples" eyebrow="Samples" title="Recent stitch-outs" />
            <Button href="/embroidery-digitizing#samples" variant="text">
              View all samples <Arrow />
            </Button>
          </div>
          <Reveal className="mt-12">
            <Gallery items={gallery.embroidery} limit={8} />
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="bg-oat/50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="process"
            eyebrow="How it works"
            title="Pay only once you've seen the proof"
            lede="Every order comes back with a PDF image of the finished design, so you can check spelling and size first."
          />
          <Reveal className="mt-12">
            <ProcessSteps />
          </Reveal>
        </Container>
      </section>

      {/* About + volume */}
      <section aria-labelledby="about" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading id="about" eyebrow="About us" title="Every job taken as a challenge" />
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-umber">
            {home.welcome.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="border-l-2 border-sage pl-5 text-espresso">
              {home.volumeNote}{" "}
              <a href={`mailto:${company.email}`} className="underline decoration-walnut/40 underline-offset-4 hover:decoration-walnut">
                {company.email}
              </a>
            </p>
            <Button href="/about" variant="text">
              More about us <Arrow />
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="faq" className="border-t border-sand py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading id="faq" eyebrow="Questions" title="Good to know" />
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-walnut underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut">
              All questions <Arrow />
            </Link>
          </div>
          <FaqList items={[faqs[3], faqs[2], faqs[7]]} />
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}

function ServiceCard({
  href,
  title,
  body,
  facts,
  image,
}: {
  href: string;
  title: string;
  body: string;
  facts: string[];
  image: { src: string; alt: string };
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-8 rounded-[24px] border border-sand bg-linen p-7 transition-[border-color,box-shadow] duration-500 hover:border-walnut/40 hover:shadow-[0_24px_40px_-28px_rgb(59_46_36/0.5)] sm:flex-row sm:p-8"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-serif text-[30px] leading-tight tracking-[-0.01em]">{title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-umber">{body}</p>
        <ul className="mt-6 space-y-2 text-[15px] text-espresso">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className="size-1 rounded-full bg-walnut" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-medium text-walnut">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Arrow />
          </span>
        </span>
      </div>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-sand bg-oat sm:w-44 sm:self-start">
        <Image src={image.src} alt="" fill sizes="(min-width: 640px) 176px, 90vw" className="scale-[1.13] object-cover" />
      </div>
    </Link>
  );
}
