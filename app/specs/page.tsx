"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SpecItem {
  label: string;
  metric: string;
  imperial: string;
  detail?: string;
}

interface SpecCategory {
  title: string;
  badge: string;
  icon: string;
  items: SpecItem[];
}

const SPEC_CATEGORIES: SpecCategory[] = [
  {
    title: "Acoustic Architecture & Transducers",
    badge: "Audio Engine",
    icon: "🔊",
    items: [
      {
        label: "Primary Active Driver",
        metric: "1x 48mm Neodymium Long-Throw Aluminum-Magnesium Transducer",
        imperial: "1x 1.89\" Neodymium Long-Throw Aluminum-Magnesium Transducer",
        detail: "High-flux N52 magnet motor, vented voice coil former for thermal control",
      },
      {
        label: "Internal Bass Radiator",
        metric: "1x Acoustic Air-Coupled Internal Composite Radiator (32 cm³ displacement)",
        imperial: "1x Acoustic Air-Coupled Internal Composite Radiator (1.95 cu in displacement)",
        detail: "Coupled directly to main chamber for omnidirectional low-frequency resonance",
      },
      {
        label: "Passive Radiator Array",
        metric: "2x 65mm Dual-Opposing Force-Canceling Butyl Rubber Radiators",
        imperial: "2x 2.56\" Dual-Opposing Force-Canceling Butyl Rubber Radiators",
        detail: "180° symmetrical opposing orientation eliminates cabinet vibration & walking",
      },
      {
        label: "Frequency Response",
        metric: "38 Hz – 22,000 Hz (±3 dB)",
        imperial: "38 Hz – 22,000 Hz (±3 dB)",
        detail: "Tuned low-end cutoff at 38 Hz without port turbulence or harmonic distortion",
      },
      {
        label: "Peak Sound Pressure Level",
        metric: "92 dB SPL @ 1 meter",
        imperial: "92 dB SPL @ 3.3 feet",
        detail: "Clean room-filling sound with <0.15% Total Harmonic Distortion (THD+N)",
      },
      {
        label: "Amplification Topology",
        metric: "45W RMS Continuous / 65W Peak Dynamic (Closed-Loop Class-D Bi-Amp)",
        imperial: "45W RMS Continuous / 65W Peak Dynamic (Closed-Loop Class-D Bi-Amp)",
        detail: "94% electrical efficiency with active thermal throttling protection",
      },
      {
        label: "DSP Processing",
        metric: "Dual-Core 32-bit Floating Point DSP @ 192 kHz sample rate",
        imperial: "Dual-Core 32-bit Floating Point DSP @ 192 kHz sample rate",
        detail: "100,000 algorithmic adjustments/sec for real-time EQ & dynamic excursion limiting",
      },
      {
        label: "Acoustic Dispersion",
        metric: "360° Omnidirectional Cylindrical Soundfield",
        imperial: "360° Omnidirectional Cylindrical Soundfield",
        detail: "Consistent frequency balance from any angle in room or outdoor setting",
      },
    ],
  },
  {
    title: "Power, Battery & Fast Charging",
    badge: "Energy System",
    icon: "⚡",
    items: [
      {
        label: "Battery Architecture",
        metric: "Dual-Cell High-Discharge Lithium-Ion (7.4V, 5200 mAh, 38.48 Wh)",
        imperial: "Dual-Cell High-Discharge Lithium-Ion (7.4V, 5200 mAh, 38.48 Wh)",
        detail: "Low internal resistance cells designed for high peak audio current draw",
      },
      {
        label: "Playback Endurance",
        metric: "Up to 24 Hours at 50% volume • 12 Hours at peak 92 dB output",
        imperial: "Up to 24 Hours at 50% volume • 12 Hours at peak 92 dB output",
        detail: "Tested under standardized mixed acoustic track playback",
      },
      {
        label: "Fast Charging Protocol",
        metric: "USB-C Power Delivery 3.0 (USB-PD 9V/2A, 12V/1.5A up to 18W)",
        imperial: "USB-C Power Delivery 3.0 (USB-PD 9V/2A, 12V/1.5A up to 18W)",
        detail: "Universal compatibility with smartphone and laptop USB-C chargers",
      },
      {
        label: "Charge Time",
        metric: "0 to 80% in 42 minutes • 100% full charge in 75 minutes",
        imperial: "0 to 80% in 42 minutes • 100% full charge in 75 minutes",
      },
      {
        label: "Quick Boost Playback",
        metric: "15-minute quick charge yields up to 5 hours continuous playback",
        imperial: "15-minute quick charge yields up to 5 hours continuous playback",
      },
      {
        label: "Reverse Power Bank",
        metric: "USB-C Power Out (5V / 2.1A, 10W) to charge phones and accessories",
        imperial: "USB-C Power Out (5V / 2.1A, 10W) to charge phones and accessories",
      },
      {
        label: "Standby Duration",
        metric: "90 Days in Ultra-Low Quiescent Sleep Mode",
        imperial: "90 Days in Ultra-Low Quiescent Sleep Mode",
      },
    ],
  },
  {
    title: "Electronics, Wireless & Processing",
    badge: "Connectivity",
    icon: "📡",
    items: [
      {
        label: "Wireless Standard",
        metric: "Bluetooth 5.3 + Bluetooth LE Audio (Auracast™ broadcast support)",
        imperial: "Bluetooth 5.3 + Bluetooth LE Audio (Auracast™ broadcast support)",
      },
      {
        label: "Wireless Range",
        metric: "Up to 30 meters line-of-sight",
        imperial: "Up to 100 feet line-of-sight",
      },
      {
        label: "Supported Audio Codecs",
        metric: "LDAC (990 kbps / 24-bit/96kHz), Qualcomm aptX Adaptive, AAC, SBC, LC3",
        imperial: "LDAC (990 kbps / 24-bit/96kHz), Qualcomm aptX Adaptive, AAC, SBC, LC3",
      },
      {
        label: "Multi-Device Multipoint",
        metric: "Simultaneous 2-device active connection with instant intelligent audio handoff",
        imperial: "Simultaneous 2-device active connection with instant intelligent audio handoff",
      },
      {
        label: "True Wireless Stereo (TWS)",
        metric: "Wireless pairing of 2x Aura One units for discrete Left/Right studio staging",
        imperial: "Wireless pairing of 2x Aura One units for discrete Left/Right studio staging",
      },
      {
        label: "Lossless Wired Input",
        metric: "USB-C Digital Bitstream Audio (Lossless 24-bit / 96 kHz PCM direct)",
        imperial: "USB-C Digital Bitstream Audio (Lossless 24-bit / 96 kHz PCM direct)",
      },
      {
        label: "Voice & Calling",
        metric: "Dual Beamforming Noise-Canceling MEMS Microphones with echo suppression",
        imperial: "Dual Beamforming Noise-Canceling MEMS Microphones with echo suppression",
      },
    ],
  },
  {
    title: "Materials, Enclosure & Dimensions",
    badge: "Physical Design",
    icon: "📐",
    items: [
      {
        label: "Outer Sleeve & Grip",
        metric: "Medical-grade liquid silicone wrap with debossed tactile controls",
        imperial: "Medical-grade liquid silicone wrap with debossed tactile controls",
        detail: "Damps cabinet micro-resonances; optional vegetable-tanned leather wrap",
      },
      {
        label: "Grille & End Bezels",
        metric: "CNC-machined 6061-T6 aerospace aluminum with bead-blasted satin finish",
        imperial: "CNC-machined 6061-T6 aerospace aluminum with bead-blasted satin finish",
      },
      {
        label: "Internal Structural Skeleton",
        metric: "Glass-fiber reinforced polycarbonate-ABS composite with spiral bracing",
        imperial: "Glass-fiber reinforced polycarbonate-ABS composite with spiral bracing",
      },
      {
        label: "Radiator Diaphragms",
        metric: "Brushed anodized aluminum discs with inverted low-hysteresis butyl rubber",
        imperial: "Brushed anodized aluminum discs with inverted low-hysteresis butyl rubber",
      },
      {
        label: "Dimensions (L x Diameter)",
        metric: "198 mm x 78 mm",
        imperial: "7.80\" x 3.07\"",
      },
      {
        label: "Weight",
        metric: "685 grams",
        imperial: "24.16 ounces (1.51 lbs)",
      },
      {
        label: "Available Finishes",
        metric: "Obsidian Black, Sandstone Titanium, Deep Forest",
        imperial: "Obsidian Black, Sandstone Titanium, Deep Forest",
      },
    ],
  },
  {
    title: "Durability & Environmental Standards",
    badge: "Rugged Build",
    icon: "🛡️",
    items: [
      {
        label: "Ingress Protection Rating",
        metric: "IP67 (100% dust-tight; waterproof submerged 1m for 30 minutes)",
        imperial: "IP67 (100% dust-tight; waterproof submerged 3.3 ft for 30 minutes)",
      },
      {
        label: "Impact Resistance",
        metric: "1.5-meter drop-tested onto hard concrete without acoustic loss",
        imperial: "5-foot drop-tested onto hard concrete without acoustic loss",
      },
      {
        label: "Operating Temperature",
        metric: "-10°C to 45°C",
        imperial: "14°F to 113°F",
      },
      {
        label: "Recycled Materials",
        metric: "100% recycled aluminum end bezels • 85% post-consumer recycled internal polymers",
        imperial: "100% recycled aluminum end bezels • 85% post-consumer recycled internal polymers",
      },
      {
        label: "Packaging",
        metric: "100% plastic-free, FSC-certified unbleached fiber packaging with soy inks",
        imperial: "100% plastic-free, FSC-certified unbleached fiber packaging with soy inks",
      },
      {
        label: "Warranty",
        metric: "2-Year International Limited Hardware Warranty with express replacement",
        imperial: "2-Year International Limited Hardware Warranty with express replacement",
      },
    ],
  },
];

export default function SpecsPage() {
  const [useImperial, setUseImperial] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = SPEC_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.detail && item.detail.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-75" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-secondary">
                ENGINEERING DATASHEET
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Technical <span className="text-headline-gradient">Specifications.</span>
              </h1>
              <p className="text-base text-white/70 sm:text-lg leading-relaxed">
                Every millimeter, material, and acoustic parameter verified by rigorous measurement.
                Full specifications for the XYZ Aura One portable acoustic reference.
              </p>
            </div>

            {/* Controls: Unit Toggle & Print */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Metric / Imperial toggle */}
              <div className="flex items-center rounded-full border border-white/10 bg-[#0A0A0E] p-1 text-xs font-medium">
                <button
                  onClick={() => setUseImperial(false)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    !useImperial
                      ? "bg-accent-primary/30 text-accent-secondary shadow-sm font-semibold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Metric (mm / g)
                </button>
                <button
                  onClick={() => setUseImperial(true)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    useImperial
                      ? "bg-accent-primary/30 text-accent-secondary shadow-sm font-semibold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Imperial (in / oz)
                </button>
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                title="Print or Save PDF"
              >
                <span>🖨️</span>
                <span>Print Spec Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Hero Visual: Exploded View Reference */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08080B] p-6 shadow-2xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 text-xs text-white/50">
              <span className="font-mono text-accent-secondary">
                FIGURE 1.0 — EXPLODED KINEMATIC COMPONENT SCHEMATIC
              </span>
              <span>SCALE: 1:1 CALIBRATED • 10 PRECISION MODULES</span>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src="/exploded-view.jpg"
                alt="XYZ Aura One internal component exploded diagram"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
              <p>
                Labeled components mapped directly to acoustic chassis, electronics, dual passive radiators, and high-capacity battery.
              </p>
              <Link
                href="/technology"
                className="text-accent-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                Inspect interactive 3D component HUD →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter / Search Bar */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-white/40">🔍</span>
            <input
              type="text"
              placeholder="Search specifications (e.g., 'battery', 'frequency', 'radiator', 'weight', 'LDAC')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categorized Specifications */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 space-y-12">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#07070A] shadow-xl"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <h2 className="text-lg font-bold text-white tracking-tight sm:text-xl">
                    {category.title}
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-accent-secondary">
                  {category.badge}
                </span>
              </div>

              {/* Specs Table List */}
              <div className="divide-y divide-white/5">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid gap-2 px-6 py-4 sm:grid-cols-12 sm:items-start transition-colors hover:bg-white/[0.015]"
                  >
                    <div className="sm:col-span-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        {item.label}
                      </div>
                    </div>

                    <div className="sm:col-span-8 space-y-1">
                      <div className="text-sm font-medium text-white/95">
                        {useImperial ? item.imperial : item.metric}
                      </div>
                      {item.detail && (
                        <p className="text-xs text-white/50 leading-relaxed">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* In The Box Visual Showcase */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e0e12] to-[#070709] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">What&apos;s Included In The Box</h3>
            <p className="text-xs text-white/60 mb-6">
              Every XYZ Aura One comes complete with high-grade studio-grade accessories in 100% plastic-free unbleached packaging.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-3xl mb-2">🔊</div>
                <h4 className="text-sm font-semibold text-white">XYZ Aura One</h4>
                <p className="text-[11px] text-white/50 mt-1">
                  Selected finish (Obsidian / Sandstone / Deep Forest)
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-3xl mb-2">🔌</div>
                <h4 className="text-sm font-semibold text-white">Braided USB-C Cable</h4>
                <p className="text-[11px] text-white/50 mt-1">
                  1.2m reinforced fast-charge &amp; digital audio cable
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-3xl mb-2">🎒</div>
                <h4 className="text-sm font-semibold text-white">Travel Sleeve</h4>
                <p className="text-[11px] text-white/50 mt-1">
                  Microfiber padded protective travel pouch
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-3xl mb-2">📄</div>
                <h4 className="text-sm font-semibold text-white">Manual &amp; 2Y Warranty</h4>
                <p className="text-[11px] text-white/50 mt-1">
                  Quick start manual &amp; international warranty card
                </p>
              </div>
            </div>
          </div>

          {/* Speaker Comparison Matrix */}
          <div className="rounded-2xl border border-white/10 bg-[#07070A] p-6 md:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Acoustic Comparison: Aura One vs Standard Portable Speakers
            </h3>
            <p className="text-xs text-white/60 mb-6">
              How the 10-stage exploded architecture outperforms conventional single-radiator enclosures.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-accent-secondary font-bold">XYZ Aura One</th>
                    <th className="py-3 px-4 text-white/60">Conventional Portable Speaker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr>
                    <td className="py-3 px-4 font-semibold">Low-End Bass Extension</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold font-mono">38 Hz (±3 dB)</td>
                    <td className="py-3 px-4 text-white/50 font-mono">65 Hz – 75 Hz</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Kinetic Vibration / Desk Walk</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold">
                      Zero (Dual Force-Canceling)
                    </td>
                    <td className="py-3 px-4 text-white/50">Severe vibration on hard surfaces</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Amplification Engine</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold">
                      45W RMS Dual Class-D Bi-Amp
                    </td>
                    <td className="py-3 px-4 text-white/50">15W – 20W Single-Rail Amp</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Lossless Wireless Codecs</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold">
                      LDAC (990 kbps) + aptX Adaptive
                    </td>
                    <td className="py-3 px-4 text-white/50">SBC / AAC Only (~256 kbps)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Fast Charging Speed</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold">
                      80% in 42 minutes (USB-PD)
                    </td>
                    <td className="py-3 px-4 text-white/50">3.5 – 4.5 hours (5V/1A)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Environmental Protection</td>
                    <td className="py-3 px-4 text-accent-secondary font-semibold">
                      IP67 (Submersible 1m)
                    </td>
                    <td className="py-3 px-4 text-white/50">IPX4 (Splash-proof only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-order banner */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#08080C] to-[#050507] py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Order the XYZ Aura One
          </h3>
          <p className="mt-3 text-sm text-white/60">
            Pre-order today for $299. Includes 2-year warranty and free expedited worldwide shipping.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="rounded-full bg-cta-gradient px-8 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(0,214,255,0.3)] transition-all hover:scale-[1.03]"
            >
              Pre-order Now — $299
            </Link>
            <Link
              href="/technology"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore Internal Technology
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
