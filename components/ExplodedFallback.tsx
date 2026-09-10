"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface ExplodedFallbackProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Geometric stand-in for the real frame sequence: 8 layers of a speaker,
 * drifting apart and reassembling as the user scrolls. Only shown if the
 * real frame sequence at /public/sequence fails to load entirely.
 */
export default function ExplodedFallback({ scrollYProgress }: ExplodedFallbackProps) {
  const explode = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const shellTopY = useTransform(explode, [0, 1], [0, -90]);
  const shellBottomY = useTransform(explode, [0, 1], [0, 90]);
  const grilleY = useTransform(explode, [0, 1], [0, -140]);
  const grilleOpacity = useTransform(explode, [0, 1], [1, 0.85]);
  const woofeY = useTransform(explode, [0, 1], [0, -40]);
  const tweeterY = useTransform(explode, [0, 1], [0, -20]);
  const radiatorY = useTransform(explode, [0, 1], [0, 30]);
  const magnetY = useTransform(explode, [0, 1], [0, 60]);
  const pcbY = useTransform(explode, [0, 1], [0, 20]);
  const pcbRotate = useTransform(explode, [0, 1], [0, -6]);
  const batteryY = useTransform(explode, [0, 1], [0, 55]);
  const batteryRotate = useTransform(explode, [0, 1], [0, 5]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">
      <svg
        viewBox="0 0 800 500"
        className="h-[70%] w-auto max-w-[90%]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Battery pack */}
        <motion.g style={{ y: batteryY, rotate: batteryRotate }}>
          <rect x="330" y="330" width="140" height="34" rx="6" fill="#101014" stroke="#2A2A32" />
          <rect x="345" y="340" width="110" height="4" rx="2" fill="#0050FF" opacity="0.5" />
        </motion.g>

        {/* Main PCB / amp board */}
        <motion.g style={{ y: pcbY, rotate: pcbRotate }}>
          <rect x="320" y="290" width="160" height="26" rx="4" fill="#0B0B0E" stroke="#2A2A32" />
          <circle cx="340" cy="303" r="4" fill="#00D6FF" opacity="0.6" />
          <circle cx="360" cy="303" r="4" fill="#0050FF" opacity="0.6" />
        </motion.g>

        {/* Driver magnet assembly */}
        <motion.g style={{ y: magnetY }}>
          <circle cx="400" cy="270" r="46" fill="#16161A" stroke="#2A2A32" />
          <circle cx="400" cy="270" r="18" fill="#0A0A0C" stroke="#3A3A44" />
        </motion.g>

        {/* Passive radiator */}
        <motion.g style={{ y: radiatorY }}>
          <ellipse cx="560" cy="255" rx="52" ry="52" fill="#111114" stroke="#2A2A32" />
          <ellipse cx="560" cy="255" rx="30" ry="30" fill="#0A0A0C" />
        </motion.g>

        {/* Woofer cone */}
        <motion.g style={{ y: woofeY }}>
          <circle cx="400" cy="250" r="70" fill="#141418" stroke="#33333c" />
          <circle cx="400" cy="250" r="46" fill="#1B1B20" />
          <circle cx="400" cy="250" r="14" fill="#08080a" />
        </motion.g>

        {/* Tweeter */}
        <motion.g style={{ y: tweeterY }}>
          <circle cx="240" cy="235" r="30" fill="#141418" stroke="#33333c" />
          <circle cx="240" cy="235" r="12" fill="#0A0A0C" />
        </motion.g>

        {/* Mesh grille */}
        <motion.g style={{ y: grilleY, opacity: grilleOpacity }}>
          <circle cx="400" cy="250" r="92" fill="none" stroke="#0050FF" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="78" fill="none" stroke="#00D6FF" strokeOpacity="0.25" strokeWidth="1" />
        </motion.g>

        {/* Outer shell — top half */}
        <motion.path
          style={{ y: shellTopY }}
          d="M180 250 C180 150 290 120 400 120 C510 120 620 150 620 250 L620 250 C560 200 460 190 400 190 C340 190 240 200 180 250 Z"
          fill="#0D0D10"
          stroke="#26262e"
          strokeWidth="1.5"
        />

        {/* Outer shell — bottom half */}
        <motion.path
          style={{ y: shellBottomY }}
          d="M180 250 C240 300 340 310 400 310 C460 310 560 300 620 250 L620 250 C620 350 510 380 400 380 C290 380 180 350 180 250 Z"
          fill="#0D0D10"
          stroke="#26262e"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
