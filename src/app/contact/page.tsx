import type { Metadata } from "next";
import { Arrow, Button } from "@/components/ui/Button";
import { Container, PageHeader } from "@/components/ui/Section";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email info@omkarpromos.com or visit 1008 Harlan Drive, San Jose, CA 95129.",
};

export default function ContactPage() {
  const { address } = company;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here around the clock"
        intro="Email us your questions or artwork any time. For a price, the quote form is the fastest route."
      />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-3">
          <Card title="Email">
            <a href={`mailto:${company.email}`} className="font-serif text-[24px] break-all text-espresso underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut">
              {company.email}
            </a>
            <p className="mt-3 text-[15px] text-umber">Send artwork as a high-resolution JPG, with the garment, fabric and size.</p>
          </Card>
          <Card title="Studio">
            <address className="font-serif text-[22px] leading-snug not-italic">
              {address.street}
              <br />
              {address.city}, {address.region} {address.postcode}
              <br />
              {address.country}
            </address>
          </Card>
          <Card title="Follow us">
            <ul className="space-y-2 font-serif text-[22px]">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
        <Container className="mt-12">
          <Button href="/quote">
            Get a free quote <Arrow />
          </Button>
        </Container>
      </section>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-sand bg-linen p-7">
      <h2 className="mb-4 text-[13px] font-medium tracking-[0.08em] text-taupe uppercase">{title}</h2>
      {children}
    </div>
  );
}
