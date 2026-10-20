"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";
import ScrollCanvas from "@/components/ScrollCanvas";
import StoryBeat from "@/components/StoryBeat";
import Footer from "@/components/Footer";

// Scroll-progress breakpoints for each story beat
const HERO_RANGE: [number, number] = [0, 0.15];
const ENGINEERING_RANGE: [number, number] = [0.15, 0.4];
const POWER_RANGE: [number, number] = [0.4, 0.65];
const SOUND_RANGE: [number, number] = [0.65, 0.85];
const REASSEMBLY_RANGE: [number, number] = [0.85, 1];

export default function Home() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState("Obsidian Black");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const faqs = [
    {
      q: "What makes the dual force-canceling acoustic radiators unique?",
      a: "Traditional portable speakers vibrate off tables or rattle when hitting sub-bass frequencies. Aura One places two precision 65mm radiators directly opposing each other (180°), completely canceling mechanical vibrations while pressurizing air down to 38 Hz.",
    },
    {
      q: "Can I pair two XYZ Aura One speakers for stereo sound?",
      a: "Yes. With Instant Wireless TWS Pairing, holding the top pairing switch for two seconds pairs two units into discrete Left and Right channels with sub-millisecond sync.",
    },
    {
      q: "What is the battery endurance and charging speed?",
      a: "The onboard 5200 mAh cell provides up to 24 hours of continuous playback at moderate acoustic levels. USB-C Power Delivery charges the battery to 80% in just 42 minutes.",
    },
    {
      q: "What is included with the 30-Day In-Home Acoustic Trial?",
      a: "Every direct pre-order includes a risk-free 30-day trial. If Aura One doesn't surpass your acoustic expectations in your own listening environment, return it for a 100% full refund with prepaid return shipping.",
    },
  ];

  return (
    <main className="relative bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Cinematic Dark Hero matching reference screenshot */}
      <Hero />

      {/* Interactive 300-Frame Scrollytelling Sequence */}
      <section
        id="experience"
        ref={sequenceRef}
        className="relative h-[250vh] md:h-[400vh] border-t border-white/20"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

          <div className="absolute inset-0">
            <ScrollCanvas scrollYProgress={scrollYProgress} />
          </div>

          <StoryBeat
            scrollYProgress={scrollYProgress}
            range={HERO_RANGE}
            align="center"
            headline="XYZ Aura One"
            gradientHeadline
            body={
              <>
                <p className="text-xl text-white/90">Sound, perfected.</p>
                <p className="text-[#8a8a8a]">
                  Flagship acoustic engineering, re-engineered for a world that never stops.
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
                  Custom drivers, a rigid enclosure, and optimized internal airflow deliver studio-grade clarity.
                </p>
                <p>
                  Every component is tuned for balance, power, and output — hour after hour.
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
                <p>Seamless wireless connectivity keeps every device in sync.</p>
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
                  High-performance drivers unlock detail, depth, and texture in every track.
                </p>
                <p>
                  Advanced acoustic tuning restores clarity to compressed audio, so every note feels alive.
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
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button href="/order" variant="primary" size="md">
                    Pre-order Aura One — $299
                  </Button>
                  <div className="flex items-center gap-4 text-xs">
                    <Link
                      href="/technology"
                      className="pointer-events-auto text-[#8a8a8a] hover:text-white transition-colors"
                    >
                      Explore Technology →
                    </Link>
                    <span className="text-white/20">•</span>
                    <Link
                      href="/specs"
                      className="pointer-events-auto text-[#8a8a8a] hover:text-white transition-colors"
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

      {/* Features & Acoustic Sound Section (#sound) */}
      <section id="sound" className="relative border-t border-white/20 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
                Acoustic Precision
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                Room-filling scale. <br />
                <span className="text-[#8a8a8a]">Microscopic detail.</span>
              </h2>
              <p className="text-base leading-relaxed text-[#8a8a8a]">
                Conventional portable speakers sacrifice sub-bass extension to fit in your palm.
                Aura One pairs an internal air-coupled bass radiator with dual opposing force-canceling
                radiators to dig down to an astonishing 38 Hz — without walking across the table or buzzing on glass.
              </p>

              {/* Benchmarks */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                <div>
                  <div className="text-2xl font-bold font-mono text-white">38 Hz</div>
                  <div className="text-xs text-[#8a8a8a] mt-1">Deep Bass Cutoff</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">92 dB</div>
                  <div className="text-xs text-[#8a8a8a] mt-1">Peak Clean SPL</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">&lt;0.15%</div>
                  <div className="text-xs text-[#8a8a8a] mt-1">THD+N Distortion</div>
                </div>
              </div>
            </div>

            {/* Glass Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-card">
                <h3 className="text-base font-bold text-white mb-2">
                  Dynamic Multi-Band DSP Equalization
                </h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">
                  Real-time algorithmic monitoring checks speaker excursion and coil temperature
                  100,000 times per second, maintaining optimum frequency curve balance at every volume level.
                </p>
              </div>

              <div className="glass-card">
                <h3 className="text-base font-bold text-white mb-2">
                  Dual Force-Canceling Symmetry
                </h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">
                  Mechanical inertia is completely canceled by equal and opposite radiator oscillations.
                  Feel the deep pulse in the air, not vibrating into your furniture.
                </p>
              </div>

              <div className="glass-card">
                <h3 className="text-base font-bold text-white mb-2">
                  High-Resolution Lossless Playback
                </h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">
                  Native LDAC (990 kbps) and Qualcomm aptX Adaptive decode high-resolution 24-bit/96kHz
                  audio with zero compression artifacts over Bluetooth 5.3.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Internal Architecture Teaser (#technology) */}
      <section id="technology" className="relative border-t border-white/20 bg-[#0a0a0a] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
                Internal Architecture
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The 10-Stage Exploded Assembly
              </h2>
              <p className="text-sm text-[#8a8a8a]">
                A look inside the acoustic skeleton: from dual force-canceling passive radiators to the 32-bit DSP engine and 24-hour battery cell.
              </p>
            </div>

            <Button href="/technology" variant="secondary" size="md">
              Explore Interactive View →
            </Button>
          </div>

          {/* Diagram Glass Card */}
          <div className="glass-card p-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src="/exploded-view.jpg"
                alt="XYZ Aura One exploded view diagram"
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-white/20">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#8a8a8a] uppercase">Acoustic Core</div>
                <div className="text-sm font-semibold text-white">48mm Neodymium Transducer</div>
                <p className="text-xs text-[#8a8a8a]">Al-Mg cone, ultra-fast transients, 92 dB clean output.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#8a8a8a] uppercase">Low-End Extension</div>
                <div className="text-sm font-semibold text-white">Dual Opposing Radiators</div>
                <p className="text-xs text-[#8a8a8a]">Force-canceling butyl surrounds for sub-38 Hz bass.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#8a8a8a] uppercase">Processing & Amp</div>
                <div className="text-sm font-semibold text-white">32-Bit DSP & Class-D Bi-Amp</div>
                <p className="text-xs text-[#8a8a8a]">45W RMS continuous power with dynamic thermal safety.</p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#8a8a8a] uppercase">Power Architecture</div>
                <div className="text-sm font-semibold text-white">5200 mAh Li-ion Cell</div>
                <p className="text-xs text-[#8a8a8a]">24-hour playback endurance with USB-C PD fast charge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Teaser (#specs) */}
      <section id="specs" className="relative border-t border-white/20 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
                Technical Blueprint
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Precision Specifications
              </h2>
              <p className="text-sm text-[#8a8a8a]">
                Engineered to acoustic reference standards with unyielding physical tolerances.
              </p>
            </div>

            <Button href="/specs" variant="secondary" size="md">
              View Full Datasheet →
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card">
              <div className="text-xs font-mono uppercase text-[#8a8a8a]">Acoustics</div>
              <h3 className="mt-2 text-lg font-bold text-white">Frequency &amp; SPL</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#8a8a8a]">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Range:</span>
                  <span className="font-mono text-white">38 Hz – 22 kHz</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Peak SPL:</span>
                  <span className="font-mono text-white">92 dB @ 1m</span>
                </li>
                <li className="flex justify-between">
                  <span>Amplifier:</span>
                  <span className="font-mono text-white">45W RMS Bi-Amp</span>
                </li>
              </ul>
            </div>

            <div className="glass-card">
              <div className="text-xs font-mono uppercase text-[#8a8a8a]">Energy</div>
              <h3 className="mt-2 text-lg font-bold text-white">Battery &amp; Charging</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#8a8a8a]">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Playback:</span>
                  <span className="font-mono text-white">Up to 24 Hours</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Fast Charge:</span>
                  <span className="font-mono text-white">80% in 42 min</span>
                </li>
                <li className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-mono text-white">5200 mAh (38.4 Wh)</span>
                </li>
              </ul>
            </div>

            <div className="glass-card">
              <div className="text-xs font-mono uppercase text-[#8a8a8a]">Enclosure</div>
              <h3 className="mt-2 text-lg font-bold text-white">Build &amp; Protection</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#8a8a8a]">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Rating:</span>
                  <span className="font-mono text-white">IP67 Submersible</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Weight:</span>
                  <span className="font-mono text-white">685 grams</span>
                </li>
                <li className="flex justify-between">
                  <span>Materials:</span>
                  <span className="font-mono text-white">Alloy &amp; Silicone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (#faqs) */}
      <section id="faqs" className="relative border-t border-white/20 bg-[#0a0a0a] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
              Clarity &amp; Assurance
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#8a8a8a]">
              Everything you need to know about acoustic performance, shipping, and warranty.
            </p>
          </div>

          <div className="grid gap-4 max-w-3xl">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="glass-card cursor-pointer transition-colors"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white pr-4">
                      {faq.q}
                    </h3>
                    <span className="text-lg font-mono text-white">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="mt-4 text-sm leading-relaxed text-[#8a8a8a] border-t border-white/10 pt-4">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Support Section (#contact) */}
      <section id="contact" className="relative border-t border-white/20 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
                Direct Acoustic Support
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Connect with our acoustic engineers.
              </h2>
              <p className="text-sm text-[#8a8a8a] leading-relaxed">
                Have questions about room acoustics, pairing configurations, or enterprise batch orders?
                Our engineering team in Zurich is available directly.
              </p>
              <div className="pt-4 space-y-2 text-xs font-mono text-[#8a8a8a]">
                <div>Email: acoustics@xyzaudio.io</div>
                <div>Hours: Monday – Friday, 08:00 – 18:00 CET</div>
                <div>Global Dispatch: Hamburg, Tokyo, San Francisco</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message received. An XYZ engineer will respond within 24 hours.");
                }}
                className="glass-card space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8a8a8a] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Vance"
                      className="w-full bg-black/60 border border-white/20 px-4 py-3 text-sm text-white focus:border-white focus:outline-none rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8a8a8a] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      className="w-full bg-black/60 border border-white/20 px-4 py-3 text-sm text-white focus:border-white focus:outline-none rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8a8a8a] mb-1">
                    Subject / Inquiry Type
                  </label>
                  <select
                    className="w-full bg-black/60 border border-white/20 px-4 py-3 text-sm text-white focus:border-white focus:outline-none rounded-none"
                  >
                    <option value="acoustic">Acoustic Performance & Architecture</option>
                    <option value="order">Pre-order & Worldwide Priority Shipping</option>
                    <option value="tws">Stereo TWS Multi-Unit Staging</option>
                    <option value="warranty">Warranty & In-Home Trial Policy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8a8a8a] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist your acoustic journey?"
                    className="w-full bg-black/60 border border-white/20 px-4 py-3 text-sm text-white focus:border-white focus:outline-none rounded-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" fullWidth>
                  Send Direct Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Section (#buy) */}
      <section
        id="buy"
        className="relative border-t border-white/20 bg-black py-28 px-6 text-center"
      >
        <div className="mx-auto max-w-2xl space-y-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
            Limited First Run
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            XYZ Aura One
          </h2>

          <p className="text-base text-[#8a8a8a] leading-relaxed">
            The benchmark for portable acoustic excellence. Available for direct pre-order now with worldwide priority shipping.
          </p>

          {/* Colorway selector */}
          <div className="pt-2">
            <div className="text-xs text-[#8a8a8a] mb-3">
              Finish: <span className="font-semibold text-white">{selectedFinish}</span>
            </div>
            <div className="flex justify-center gap-4">
              {[
                { name: "Obsidian Black", color: "#171719" },
                { name: "Sandstone Titanium", color: "#8E8880" },
                { name: "Deep Forest", color: "#2B3830" },
              ].map((f) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFinish(f.name)}
                  className={`flex h-10 w-10 items-center justify-center rounded-none border-2 transition-transform ${
                    selectedFinish === f.name
                      ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      : "border-white/20 hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: f.color }}
                  title={f.name}
                  aria-label={f.name}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button href="/order" variant="primary" size="lg">
              Configure &amp; Pre-order Now — From $299
            </Button>
            <p className="text-xs text-[#8a8a8a]">
              Includes 2-Year International Warranty • Free Expedited Shipping • 30-Day In-Home Acoustic Trial
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
