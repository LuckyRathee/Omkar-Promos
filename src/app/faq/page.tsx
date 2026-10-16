import type { Metadata } from "next";
import { FaqList, QuoteBand } from "@/components/blocks";
import { Container, PageHeader } from "@/components/ui/Section";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Turnaround, payment, file formats, resizing, thread colors and why fabric matters: answers to common embroidery digitizing questions.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="FAQ"
        title="Questions we hear most"
        intro="Can't find your answer here? Email us any time and we'll reply as soon as we can."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <FaqList />
        </Container>
      </section>
      <QuoteBand />
    </>
  );
}
