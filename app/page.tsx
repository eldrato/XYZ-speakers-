"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ScrollCanvas from "@/components/ScrollCanvas";
import StoryBeat from "@/components/StoryBeat";
import Footer from "@/components/Footer";

// Scroll-progress breakpoints for each story beat. Named here so retiming
// the sequence later is a one-line change, not a hunt through JSX.
const HERO_RANGE: [number, number] = [0, 0.15];
const ENGINEERING_RANGE: [number, number] = [0.15, 0.4];
const POWER_RANGE: [number, number] = [0.4, 0.65];
const SOUND_RANGE: [number, number] = [0.65, 0.85];
const REASSEMBLY_RANGE: [number, number] = [0.85, 1];

export default function Home() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState("Obsidian Black");

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative bg-bg-primary text-white">
      <Navbar />

      {/* Pinned scroll-scrubbed sequence — 400vh of scroll on desktop,
          250vh on mobile, mapped 0-1 to the frame index and to every beat. */}
      <section
        id="overview"
        ref={sequenceRef}
        className="relative h-[250vh] md:h-[400vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg-primary">
          {/* Ambient radial glow behind the product, matched to page background
              so frame edges are invisible */}
          <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />

          <div className="absolute inset-0">
            <ScrollCanvas scrollYProgress={scrollYProgress} />
          </div>

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={HERO_RANGE}
            align="center"
            headline="XYZ"
            gradientHeadline
            body={
              <>
                <p className="text-xl text-white/80">Sound, perfected.</p>
                <p>
                  Flagship acoustic engineering, re-engineered for a world
                  that never stops.
                </p>
              </>
            }
          />

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={ENGINEERING_RANGE}
            align="left"
            headline="Precision-engineered for sound."
            body={
              <>
                <p>
                  Custom drivers, a rigid enclosure, and optimized internal
                  airflow deliver studio-grade clarity.
                </p>
                <p>
                  Every component is tuned for balance, power, and output —
                  hour after hour.
                </p>
              </>
            }
          />

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={POWER_RANGE}
            align="right"
            headline="Power, redefined."
            body={
              <>
                <p>High-capacity battery delivers all-day playback.</p>
                <p>Onboard amplification adapts output in real time.</p>
                <p>
                  Seamless wireless connectivity keeps every device in sync.
                </p>
              </>
            }
          />

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={SOUND_RANGE}
            align="left"
            headline="Immersive, room-filling sound."
            body={
              <>
                <p>
                  High-performance drivers unlock detail, depth, and texture
                  in every track.
                </p>
                <p>
                  Advanced acoustic tuning restores clarity to compressed
                  audio, so every note feels alive.
                </p>
              </>
            }
          />

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={REASSEMBLY_RANGE}
            align="center"
            headline="Hear everything. Feel nothing else."
            gradientHeadline
            body={
              <>
                <p className="text-lg text-white/80">
                  XYZ. Designed for sound, crafted for anywhere.
                </p>
                <div className="flex flex-col items-center gap-3 pt-4">
                  <a
                    href="#buy"
                    className="pointer-events-auto rounded-full bg-cta-gradient px-8 py-3 text-sm font-semibold text-white drop-shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    Experience XYZ
                  </a>
                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <Link
                      href="/technology"
                      className="pointer-events-auto text-accent-secondary hover:underline"
                    >
                      Explore Technology →
                    </Link>
                    <span className="text-white/20">•</span>
                    <Link
                      href="/specs"
                      className="pointer-events-auto text-white/60 hover:text-white"
                    >
                      Technical Specs →
                    </Link>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </section>

      {/* Acoustic Sound Section */}
      <section id="sound" className="relative border-t border-white/10 bg-[#070709] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-secondary">
                ACOUSTIC PRECISION
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Room-filling scale. <br />
                <span className="text-headline-gradient">Microscopic detail.</span>
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                Conventional portable speakers sacrifice sub-bass extension to fit in your palm.
                Aura One pairs an internal air-coupled bass radiator with dual opposing force-canceling
                radiators to dig down to an astonishing 38 Hz — without walking across the table or buzzing on glass.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="text-2xl font-bold font-mono text-accent-secondary">38 Hz</div>
                  <div className="text-xs text-white/50 mt-1">Deep Bass Cutoff</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">92 dB</div>
                  <div className="text-xs text-white/50 mt-1">Peak Clean SPL</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-accent-secondary">&lt;0.15%</div>
                  <div className="text-xs text-white/50 mt-1">THD+N Distortion</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white mb-2">
                  Dynamic Multi-Band DSP Equalization
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Real-time algorithmic monitoring checks speaker excursion and coil temperature
                  100,000 times per second, maintaining optimum frequency curve balance at every volume level.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white mb-2">
                  Dual Force-Canceling Symmetry
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Mechanical inertia is completely canceled by equal and opposite radiator oscillations.
                  Feel the deep pulse in the air, not vibrating into your furniture.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h4 className="text-base font-bold text-white mb-2">
                  High-Resolution Lossless Playback
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Native LDAC (990 kbps) and Qualcomm aptX Adaptive decode high-resolution 24-bit/96kHz
                  audio with zero compression artifacts over Bluetooth 5.3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section Feature: Exploded View Architecture */}
      <section id="technology" className="relative border-t border-white/10 bg-bg-primary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-secondary">
                Internal Architecture
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                The 10-Stage Exploded Assembly
              </h2>
              <p className="text-sm text-white/60">
                A look inside the acoustic skeleton: from dual force-canceling passive radiators to the 32-bit DSP engine and 24-hour battery cell.
              </p>
            </div>

            <Link
              href="/technology"
              className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/40 bg-accent-primary/20 px-5 py-2.5 text-xs font-semibold text-accent-secondary hover:bg-accent-primary/30 transition-all shadow-[0_0_12px_rgba(0,214,255,0.2)]"
            >
              <span>Explore Interactive Architecture</span>
              <span>→</span>
            </Link>
          </div>

          {/* Exploded Diagram Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08080C] p-6 shadow-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src="/exploded-view.jpg"
                alt="XYZ Aura One exploded view diagram"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-accent-secondary uppercase">Acoustic Core</div>
                <div className="text-sm font-semibold text-white">48mm Neodymium Transducer</div>
                <p className="text-xs text-white/50">Al-Mg cone, ultra-fast transients, 92 dB clean output.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-accent-secondary uppercase">Low-End Extension</div>
                <div className="text-sm font-semibold text-white">Dual Opposing Radiators</div>
                <p className="text-xs text-white/50">Force-canceling butyl surrounds for sub-38 Hz bass.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-accent-secondary uppercase">Processing & Amp</div>
                <div className="text-sm font-semibold text-white">32-Bit DSP &amp; Class-D Bi-Amp</div>
                <p className="text-xs text-white/50">45W RMS continuous power with dynamic thermal safety.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-accent-secondary uppercase">Power Architecture</div>
                <div className="text-sm font-semibold text-white">5200 mAh Li-ion Cell</div>
                <p className="text-xs text-white/50">24-hour playback endurance with USB-C PD fast charge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section Teaser */}
      <section id="specs" className="relative border-t border-white/10 bg-[#070709] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-secondary">
                Technical Blueprint
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Precision Specifications
              </h2>
              <p className="text-sm text-white/60">
                Engineered to acoustic reference standards with unyielding physical tolerances.
              </p>
            </div>

            <Link
              href="/specs"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>View Full Datasheet</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs font-mono uppercase text-accent-secondary">Acoustics</div>
              <h3 className="mt-2 text-lg font-bold text-white">Frequency &amp; SPL</h3>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Range:</span>
                  <span className="font-mono text-white">38 Hz – 22 kHz</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Peak SPL:</span>
                  <span className="font-mono text-white">92 dB @ 1m</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/40">Amplifier:</span>
                  <span className="font-mono text-white">45W RMS Bi-Amp</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs font-mono uppercase text-accent-secondary">Energy</div>
              <h3 className="mt-2 text-lg font-bold text-white">Battery &amp; Charging</h3>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Playback:</span>
                  <span className="font-mono text-white">Up to 24 Hours</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Fast Charge:</span>
                  <span className="font-mono text-white">80% in 42 min</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/40">Capacity:</span>
                  <span className="font-mono text-white">5200 mAh (38.4 Wh)</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs font-mono uppercase text-accent-secondary">Enclosure</div>
              <h3 className="mt-2 text-lg font-bold text-white">Build &amp; Protection</h3>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Rating:</span>
                  <span className="font-mono text-white">IP67 Submersible</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Weight:</span>
                  <span className="font-mono text-white">685 grams</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/40">Materials:</span>
                  <span className="font-mono text-white">Alloy &amp; Silicone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section
        id="buy"
        className="relative border-t border-white/10 bg-gradient-to-b from-[#08080c] via-bg-primary to-[#050507] py-28 px-6 text-center"
      >
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-primary/10 px-4 py-1 text-xs font-semibold text-accent-secondary">
            LIMITED FIRST RUN
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight text-white text-glow sm:text-5xl">
            XYZ Aura One
          </h3>

          <p className="text-base text-white/70 leading-relaxed">
            The standard for portable acoustic excellence. Available for pre-order now with worldwide priority shipping.
          </p>

          {/* Colorway selector */}
          <div className="pt-2">
            <div className="text-xs text-white/50 mb-3">
              Finish: <span className="font-semibold text-white">{selectedFinish}</span>
            </div>
            <div className="flex justify-center gap-3">
              {[
                { name: "Obsidian Black", color: "#171719" },
                { name: "Sandstone Titanium", color: "#8E8880" },
                { name: "Deep Forest", color: "#2B3830" },
              ].map((f) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFinish(f.name)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform ${
                    selectedFinish === f.name
                      ? "border-accent-secondary scale-110 shadow-[0_0_12px_rgba(0,214,255,0.6)]"
                      : "border-transparent hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: f.color }}
                  title={f.name}
                  aria-label={f.name}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/order"
              className="inline-block rounded-full bg-cta-gradient px-10 py-4 text-base font-semibold text-white drop-shadow-glow transition-all hover:scale-[1.03] shadow-[0_0_24px_rgba(0,80,255,0.4)]"
            >
              Configure &amp; Pre-order Now — From $299
            </Link>
            <p className="mt-3 text-xs text-white/40">
              Includes 2-Year International Warranty • Free Expedited Shipping • 30-Day In-Home Acoustic Trial
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
