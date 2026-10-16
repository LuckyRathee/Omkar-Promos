import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "outline" | "text";

const styles: Record<Variant, string> = {
  solid: "bg-walnut text-linen hover:bg-walnut-deep",
  outline: "border border-umber/30 text-espresso hover:border-walnut hover:bg-oat",
  text: "px-0 text-walnut underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut",
};

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-soft)] active:scale-[0.98]";

type Props = ComponentProps<typeof Link> & { variant?: Variant };

/** Quiet pill link. One accent (walnut) for the primary action, outline for the rest. */
export function Button({ variant = "solid", className = "", children, ...rest }: Props) {
  return (
    <Link className={`${base} ${variant === "text" ? "h-auto" : ""} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
