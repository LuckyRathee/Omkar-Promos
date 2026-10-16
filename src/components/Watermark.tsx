export const WATERMARK = "@DigitalParton2026";

/** Site-wide watermark, fixed to the bottom-left corner. Non-interactive, never blocks content. */
export function Watermark() {
  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-[60] select-none text-[11px] tracking-[0.08em] text-umber/55 sm:bottom-5 sm:left-6"
      aria-hidden
    >
      {WATERMARK}
    </div>
  );
}
