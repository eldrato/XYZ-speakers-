"use client";

import { GlassFold } from "@/components/ui/glass-fold";

interface SiteGlassFoldBackgroundProps {
  /** The body tone of each glass pane */
  color1?: string;
  /** The deepest background space */
  color2?: string;
  /** The lit, refracting edges of each folded pane */
  color3?: string;
  /** Movement speed - gentle cinematic pace */
  speed?: number;
  /** Density and scale of the folds */
  scale?: number;
  /** Film grain texture */
  noise?: number;
}

/**
 * SiteGlassFoldBackground
 * Renders an ambient, continuous WebGL folded glass caustic background
 * fixed across the entire website behind all routes and components.
 */
export default function SiteGlassFoldBackground({
  color1 = "#09090c",
  color2 = "#000000",
  color3 = "#52525a",
  speed = 0.25,
  scale = 0.85,
  noise = 0.08,
}: SiteGlassFoldBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <GlassFold
        color1={color1}
        color2={color2}
        color3={color3}
        speed={speed}
        scale={scale}
        noise={noise}
        className="h-full w-full opacity-85"
      />
      {/* Dark vignette to ensure pristine text readability and contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/65 pointer-events-none" />
    </div>
  );
}
