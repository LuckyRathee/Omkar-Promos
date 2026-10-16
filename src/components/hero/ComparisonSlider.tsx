"use client";

import { memo, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArtworkSVG, type ArtMode } from "./ArtworkSVG";

type AfterMode = Exclude<ArtMode, "raster">;

const AFTER_META: Record<AfterMode, { label: string; chip: string }> = {
  stitch: { label: "Stitched", chip: "Digitized · DST file" },
  vector: { label: "Vector", chip: "Redrawn · AI / EPS" },
};

const Layer = memo(function Layer({ mode }: { mode: ArtMode }) {
  return <ArtworkSVG mode={mode} className="h-full w-full" />;
});

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Before/after comparison: the customer's raster upload on the left, and
 * either the digitized stitch preview or the vector redraw on the right.
 *
 * Performance: the reveal is done with two opposing translateX transforms
 * (outer clips, inner counter-shifts) rather than clip-path or width, so the
 * drag stays on the compositor and never triggers layout. Slider position
 * lives in a MotionValue; ARIA attributes are written straight to the DOM to
 * avoid re-rendering the SVG tree on every pointer move.
 */
export function ComparisonSlider() {
  const [after, setAfter] = useState<AfterMode>("stitch");
  const reduce = useReducedMotion();

  const frameRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Where the handle is heading; keyboard steps chain from here, not the mid-spring value.
  const target = useRef(50);

  const pos = useMotionValue(reduce ? 50 : 84);
  const outerX = useTransform(pos, (v) => `${v}%`);
  const innerX = useTransform(pos, (v) => `${-v}%`);
  const beforeChip = useTransform(pos, [6, 26], [0, 1]);
  const afterChip = useTransform(pos, [74, 94], [1, 0]);

  useMotionValueEvent(pos, "change", (v) => {
    const el = handleRef.current;
    if (!el) return;
    const n = Math.round(v);
    el.setAttribute("aria-valuenow", String(n));
    el.setAttribute("aria-valuetext", `${n}% original artwork, ${100 - n}% ${AFTER_META[after].label.toLowerCase()}`);
  });

  // Intro sweep hints that the frame is draggable.
  useEffect(() => {
    if (reduce) return;
    const controls = animate(pos, 50, { delay: 1.1, type: "spring", stiffness: 60, damping: 14 });
    return () => controls.stop();
  }, [pos, reduce]);

  const setFromClientX = (clientX: number) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    pos.stop();
    target.current = clamp(((clientX - r.left) / r.width) * 100);
    pos.set(target.current);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
    handleRef.current?.focus({ preventScroll: true });
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const from = target.current;
    const map: Record<string, number> = {
      ArrowLeft: from - step,
      ArrowDown: from - step,
      ArrowRight: from + step,
      ArrowUp: from + step,
      PageDown: from - 10,
      PageUp: from + 10,
      Home: 0,
      End: 100,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    target.current = clamp(map[e.key]);
    if (reduce) pos.set(target.current);
    else animate(pos, target.current, { type: "spring", stiffness: 400, damping: 40 });
  };

  return (
    <figure className="flex w-full flex-col gap-3">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[22px] border border-sand bg-oat shadow-[0_30px_60px_-30px_rgb(59_46_36/0.35)]"
      >
        {/* Before: customer upload */}
        <div className="absolute inset-0">
          <Layer mode="raster" />
        </div>

        {/* After: clipped by translate pair */}
        <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ x: outerX }}>
          <motion.div className="absolute inset-0 will-change-transform" style={{ x: innerX }}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={after}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Layer mode={after} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Chips */}
        <motion.span
          style={{ opacity: beforeChip }}
          className="pointer-events-none absolute left-3 top-3 rounded-full bg-linen/90 px-3 py-1 text-[12px] text-umber shadow-sm sm:left-4 sm:top-4"
        >
          Your artwork
        </motion.span>
        <motion.span
          style={{ opacity: afterChip }}
          className="pointer-events-none absolute right-3 top-3 rounded-full bg-linen/90 px-3 py-1 text-[12px] text-walnut shadow-sm sm:right-4 sm:top-4"
        >
          {AFTER_META[after].chip}
        </motion.span>

        {/* Divider + handle */}
        <motion.div className="pointer-events-none absolute inset-0 will-change-transform" style={{ x: outerX }}>
          <div className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-linen" />
          <svg className="absolute inset-y-0 left-0 h-full w-2 -translate-x-1/2" aria-hidden>
            <line x1="4" y1="0" x2="4" y2="100%" stroke="var(--color-walnut)" strokeOpacity=".7" strokeWidth="1.5" strokeDasharray="6 5" />
          </svg>
          <div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-label="Compare original artwork with result"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            aria-valuetext="50% original artwork"
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-0 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border border-sand bg-linen text-walnut shadow-[0_6px_16px_-6px_rgb(59_46_36/0.4)] transition-transform duration-200 active:scale-95 active:cursor-grabbing"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M7 5 2 10l5 5M13 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Show result as" className="relative inline-flex rounded-full border border-sand bg-oat p-1">
          {(Object.keys(AFTER_META) as AfterMode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={after === m}
              onClick={() => setAfter(m)}
              className="relative rounded-full px-4 py-1.5 text-[14px] text-umber transition-colors aria-pressed:text-espresso"
            >
              {after === m && (
                <motion.span
                  layoutId="after-pill"
                  className="absolute inset-0 rounded-full bg-linen shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{AFTER_META[m].label}</span>
            </button>
          ))}
        </div>
        <p className="text-[13px] text-taupe">Drag to compare</p>
      </figcaption>
    </figure>
  );
}
