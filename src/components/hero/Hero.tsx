"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { pricing } from "@/content/site";
import { Arrow, Button } from "../ui/Button";
import { Container } from "../ui/Section";
import { ComparisonSlider } from "./ComparisonSlider";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.1 + i * 0.1 } }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  return (
    <section aria-labelledby="hero-title" className="bg-weave relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <motion.p
            variants={rise}
            initial={initial}
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-linen px-3.5 py-1.5 text-[13px] text-umber"
          >
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            Embroidery digitizing &amp; vector art · San Jose, CA
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={rise}
            initial={initial}
            animate="show"
            custom={1}
            className="mt-7 font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.02] font-normal tracking-[-0.03em]"
          >
            Your artwork, made <em className="text-walnut">ready to stitch.</em>
          </motion.h1>

          <motion.p variants={rise} initial={initial} animate="show" custom={2} className="mt-6 max-w-xl text-lg leading-relaxed text-umber">
            Send us any logo or sketch. We digitize it for your machine and your fabric, and send it back in{" "}
            {pricing.turnaround} with a PDF proof. Clean vector redraws next day.
          </motion.p>

          <motion.div variants={rise} initial={initial} animate="show" custom={3} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote">
              Get a free quote <Arrow />
            </Button>
            <Button href="/embroidery-digitizing#samples" variant="outline">
              See our work
            </Button>
          </motion.div>

          <motion.dl
            variants={rise}
            initial={initial}
            animate="show"
            custom={4}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-sand pt-6"
          >
            {[
              [`$${pricing.perThousand.toFixed(2)}`, "per 1,000 stitches"],
              ["$0", "rush surcharge"],
              ["29", "machine formats"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-serif text-[28px] leading-none tabular-nums">{value}</dd>
                <dt className="mt-2 text-[13px] leading-snug text-taupe">{label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="mx-auto w-full max-w-[500px]"
        >
          <ComparisonSlider />
        </motion.div>
      </Container>
    </section>
  );
}
