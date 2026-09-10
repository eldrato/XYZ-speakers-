"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

type Align = "left" | "right" | "center";

interface StoryBeatProps {
  scrollYProgress: MotionValue<number>;
  /** [start, end] of the 0-1 scroll range this beat owns */
  range: [number, number];
  align: Align;
  eyebrow?: string;
  headline: string;
  body: ReactNode;
  gradientHeadline?: boolean;
}

const alignClasses: Record<Align, string> = {
  left: "items-start text-left pl-6 md:pl-16 lg:pl-24",
  right: "items-end text-right pr-6 md:pr-16 lg:pr-24",
  center: "items-center text-center px-6",
};

const slideFrom: Record<Align, number> = {
  left: -48,
  right: 48,
  center: 0,
};

export default function StoryBeat({
  scrollYProgress,
  range,
  align,
  eyebrow,
  headline,
  body,
  gradientHeadline = false,
}: StoryBeatProps) {
  const [start, end] = range;
  const span = end - start;
  // Fade in over the first 20% of the range, hold, fade out over the last 20%
  const fadeIn = start + span * 0.2;
  const fadeOutStart = end - span * 0.2;

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOutStart, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOutStart, end],
    [24, 0, 0, -24]
  );
  const x = useTransform(
    scrollYProgress,
    [start, fadeIn],
    [slideFrom[align], 0]
  );
  // Pointer events only active while the beat is meaningfully visible
  const pointerEvents = useTransform(opacity, (v) =>
    v > 0.15 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, y, x, pointerEvents }}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 ${alignClasses[align]}`}
    >
      {eyebrow && <p className="text-sm text-white/40">{eyebrow}</p>}
      <h2
        className={`max-w-xl text-4xl font-bold tracking-tight text-glow sm:text-5xl md:text-6xl ${
          gradientHeadline ? "text-headline-gradient" : "text-white/90"
        }`}
      >
        {headline}
      </h2>
      <div className="max-w-md space-y-2 text-base leading-relaxed text-white/60 md:text-lg">
        {body}
      </div>
    </motion.div>
  );
}
