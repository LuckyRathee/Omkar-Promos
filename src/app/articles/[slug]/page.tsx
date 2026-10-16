import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteBand } from "@/components/blocks";
import { Container, Eyebrow } from "@/components/ui/Section";
import { articles } from "@/content/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <article className="pb-8 pt-32 sm:pt-40">
        <Container className="max-w-3xl">
          <Link href="/articles" className="text-[14px] text-taupe hover:text-espresso">
            ← All articles
          </Link>
          <div className="mt-8">
            <Eyebrow>Article</Eyebrow>
          </div>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.025em]">{article.title}</h1>
          <div className="stitch-rule mt-10" aria-hidden />
          <div className="mt-10 space-y-6 text-[18px] leading-[1.75] text-umber">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </article>
      <QuoteBand />
    </>
  );
}
