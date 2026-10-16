import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Container, PageHeader } from "@/components/ui/Section";
import { articles } from "@/content/site";

export const metadata: Metadata = {
  title: "Articles",
  description: "Notes on embroidery digitizing for customers in the USA, UK and Canada.",
};

export default function ArticlesPage() {
  return (
    <>
      <PageHeader eyebrow="Articles" title="Notes on digitizing" />
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <ul className="divide-y divide-sand border-y border-sand">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`} className="group flex items-start justify-between gap-6 py-8">
                  <div>
                    <h2 className="font-serif text-[26px] leading-snug transition-colors group-hover:text-walnut">{a.title}</h2>
                    <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-umber">{a.excerpt}</p>
                  </div>
                  <span className="mt-2 text-walnut transition-transform duration-300 group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
