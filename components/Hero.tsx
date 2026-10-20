"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-black pt-24 pb-16 lg:pt-20 lg:pb-12"
      aria-label="XYZ Aura One Hero"
    >
      {/* Subtle ambient background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Subtle central radial highlight behind the product */}
      <div
        className="pointer-events-none absolute right-[10%] top-[40%] -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-between px-6 sm:px-10 lg:px-16">
        {/* Main 2-column layout on desktop, stacked on mobile */}
        <div className="my-auto grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Mobile Product Image (visible first on mobile <768px per spec 8) */}
          <div className="order-1 lg:hidden">
            <div className="relative mx-auto flex max-w-[420px] items-center justify-center py-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/hero-speaker.jpg"
                  alt="XYZ Aura One studio lit high-fidelity speaker"
                  fill
                  priority
                  className="speaker-blend object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Mobile Feature Badges / Cards */}
            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
              <GlassCard
                title="38 Hz Sub-Bass"
                description="Dual opposing radiators eliminate cabinet vibration."
                className="max-w-none p-4"
              />
              <GlassCard
                title="32-Bit Floating DSP"
                description="100,000 real-time acoustic adjustments per second."
                className="max-w-none p-4"
              />
              <GlassCard
                title="24-Hour Battery"
                description="5200 mAh fast-charging cell for all-day playback."
                className="max-w-none p-4"
              />
            </div>
          </div>

          {/* Left Column: Content aligned to bottom on desktop */}
          <div className="order-2 flex flex-col justify-end lg:order-1 lg:col-span-6 lg:pb-8">
            {/* Staggered entrance: Headline (60ms), Subcopy (120ms), CTAs (180ms) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-headline text-white tracking-tight">
                <span className="block text-white">Sound, perfected.</span>
                <span className="block text-[#8a8a8a]">Feel nothing else.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-[600px] text-base leading-[1.6] text-[#8a8a8a] sm:text-lg lg:text-[18px]"
            >
              Flagship acoustic engineering, re-engineered for a world that never stops.
              Precision dual force-canceling radiators and a custom neodymium transducer
              deliver studio-master fidelity anywhere you listen.
            </motion.p>

            {/* Two CTAs in a row per spec 6.2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button href="/order" variant="primary" size="lg" className="w-full sm:w-auto">
                Pre-order Now — $299
              </Button>
              <Button href="#sound" variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Sound
              </Button>
            </motion.div>

            {/* Quick reassurance line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-6 flex items-center gap-4 text-xs font-mono text-[#8a8a8a]"
            >
              <span>30-Day Acoustic Home Trial</span>
              <span className="text-white/20">•</span>
              <span>2-Year Warranty</span>
            </motion.div>
          </div>

          {/* Right Column: Studio-lit speaker image + 3 floating glass feature cards */}
          <div className="relative hidden lg:order-2 lg:col-span-6 lg:block">
            <div className="relative mx-auto flex h-[580px] w-full items-center justify-center">
              
              {/* Floating Glass Card 1: Top-Left */}
              <div className="absolute -left-4 top-4 z-20">
                <GlassCard
                  title="38 Hz Sub-Bass"
                  description="Dual opposing force-canceling radiators eliminate cabinet vibration."
                  tag="Acoustic Low-End"
                  floatAnimation="a"
                  className="shadow-glass"
                />
              </div>

              {/* Speaker Studio-Lit Image with radial-blend mask */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 h-[480px] w-[540px] will-change-transform"
              >
                <Image
                  src="/hero-speaker.jpg"
                  alt="XYZ Aura One studio lit high-fidelity speaker"
                  fill
                  priority
                  className="speaker-blend object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  sizes="540px"
                />
              </motion.div>

              {/* Floating Glass Card 2: Mid-Right */}
              <div className="absolute -right-2 top-[38%] z-20">
                <GlassCard
                  title="32-Bit Floating DSP"
                  description="100,000 real-time acoustic adjustments per second."
                  tag="Dynamic EQ"
                  floatAnimation="b"
                  className="shadow-glass"
                />
              </div>

              {/* Floating Glass Card 3: Bottom-Left */}
              <div className="absolute left-6 -bottom-2 z-20">
                <GlassCard
                  title="24-Hour Battery"
                  description="5200 mAh fast-charging power cell for all-day studio playback."
                  tag="Endurance"
                  floatAnimation="c"
                  className="shadow-glass"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
