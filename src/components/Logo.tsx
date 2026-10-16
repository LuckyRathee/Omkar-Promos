/** Wordmark: a hoop ring crossed by a running stitch, set beside the serif name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="shrink-0">
        <circle cx="13" cy="13" r="11" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="13" cy="13" r="8" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" />
        <path d="M4 15.5 C 9 9, 17 9, 22 15.5" fill="none" stroke="var(--color-walnut)" strokeWidth="1.5" strokeDasharray="2.6 2" strokeLinecap="round" />
      </svg>
      <span className="whitespace-nowrap font-serif text-[19px] leading-none tracking-[-0.01em] sm:text-[21px]">Omkar Promos</span>
    </span>
  );
}
