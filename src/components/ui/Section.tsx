import type { ReactNode } from "react";

/** Standard page width and gutters. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-medium tracking-[0.08em] text-walnut uppercase">{children}</p>;
}

/** Section heading block: eyebrow, serif title, optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 font-serif text-[clamp(2rem,4.2vw,3rem)] leading-[1.08] font-normal tracking-[-0.02em]">
        {title}
      </h2>
      {lede && <p className="mt-4 text-[17px] leading-relaxed text-umber">{lede}</p>}
    </div>
  );
}

/** Interior page header: title + intro on a quiet oat band. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="bg-weave border-b border-sand bg-oat/60 pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.025em]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">{intro}</p>}
      </Container>
    </header>
  );
}
