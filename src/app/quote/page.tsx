import type { Metadata } from "next";
import { ProcessSteps } from "@/components/blocks";
import { Container, PageHeader } from "@/components/ui/Section";
import { company } from "@/content/site";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a free quote",
  description: "Upload your artwork for a free embroidery digitizing or vector art quote. $1.50 per 1,000 stitches, 24–48 hour turnaround.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Free quote"
        title="Tell us about your design"
        intro={`Upload your artwork and a few details, and we'll reply with a price before any work starts. You can also email ${company.email}.`}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <QuoteForm />
        </Container>
      </section>
      <section aria-labelledby="next" className="border-t border-sand bg-oat/50 py-16 sm:py-20">
        <Container>
          <h2 id="next" className="mb-10 font-serif text-[30px]">
            What happens next
          </h2>
          <ProcessSteps />
        </Container>
      </section>
    </>
  );
}
