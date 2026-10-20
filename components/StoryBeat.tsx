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
  left: "items-start text-left pl-6 sm:pl-12 md:pl-16 lg:pl-24",
  right: "items-end text-right pr-6 sm:pr-12 md:pr-16 lg:pr-24",
  center: "items-center text-center px-6",
};

const slideFrom: Record<Align, number> = {
  left: -32,
  right: 32,
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
  // Fade in over first 20% of range, hold, fade out over last 20%
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
    [20, 0, 0, -20]
  );
  const x = useTransform(
    scrollYProgress,
    [start, fadeIn],
    [slideFrom[align], 0]
  );
  // Pointer events only active while the beat is visibly active
  const pointerEvents = useTransform(opacity, (v) =>
    v > 0.15 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, y, x, pointerEvents }}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center ${alignClasses[align]}`}
    >
      <div className="glass-card max-w-lg pointer-events-auto p-6 md:p-8 space-y-3 shadow-2xl">
        {eyebrow && (
          <p className="text-xs font-mono uppercase tracking-widest text-[#8a8a8a]">
            {eyebrow}
          </p>
        )}
        <h2
          className={`text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ${
            gradientHeadline ? "text-headline-gradient" : "text-white"
          }`}
        >
          {headline}
        </h2>
        <div className="space-y-2 text-xs leading-relaxed text-[#8a8a8a] sm:text-sm md:text-base">
          {body}
        </div>
      </div>
    </motion.div>
  );
}
