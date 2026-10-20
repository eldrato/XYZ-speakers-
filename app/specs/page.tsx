"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

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
    <main className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-[#8a8a8a]">
                Engineering Datasheet
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Technical <span className="text-[#8a8a8a]">Specifications.</span>
              </h1>
              <p className="text-base text-[#8a8a8a] sm:text-lg leading-relaxed">
                Every millimeter, material, and acoustic parameter verified by rigorous measurement.
                Full specifications for the XYZ Aura One portable acoustic reference.
              </p>
            </div>

            {/* Controls: Unit Toggle & Print */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Metric / Imperial toggle */}
              <div className="flex items-center border border-white/20 bg-black p-0.5 text-xs font-mono">
                <button
                  onClick={() => setUseImperial(false)}
                  className={`px-3 py-2 transition-all ${
                    !useImperial
                      ? "bg-white text-black font-bold"
                      : "text-[#8a8a8a] hover:text-white"
                  }`}
                >
                  Metric (mm/g)
                </button>
                <button
                  onClick={() => setUseImperial(true)}
                  className={`px-3 py-2 transition-all ${
                    useImperial
                      ? "bg-white text-black font-bold"
                      : "text-[#8a8a8a] hover:text-white"
                  }`}
                >
                  Imperial (in/oz)
                </button>
              </div>

              <button
                onClick={() => window.print()}
                className="btn-secondary px-4 py-2 text-xs font-mono"
                title="Print or Save PDF"
              >
                Print Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Visual Reference */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="glass-card p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 text-xs font-mono text-[#8a8a8a]">
              <span>FIGURE 1.0 — EXPLODED KINEMATIC COMPONENT SCHEMATIC</span>
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
          </div>
        </div>
      </section>

      {/* Specifications Search Filter */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search specifications (e.g. 38 Hz, battery, LDAC)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/20 px-4 py-3 text-sm text-white placeholder-[#8a8a8a] focus:border-white focus:outline-none rounded-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8a8a8a] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Specification Categories Data List */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.title} className="glass-card p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8a8a8a]">
                    {category.badge}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {category.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#8a8a8a]">
                  {category.items.length} Parameters
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {category.items.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-white/10 pb-4 last:border-b-0 space-y-1"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8a8a8a]">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-white font-mono">
                      {useImperial ? item.imperial : item.metric}
                    </div>
                    {item.detail && (
                      <p className="text-xs text-[#8a8a8a] leading-relaxed">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="glass-card p-12 text-center text-[#8a8a8a]">
              No specifications match &quot;{searchTerm}&quot;. Try searching for &quot;battery&quot;, &quot;spl&quot;, or &quot;neodymium&quot;.
            </div>
          )}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="relative border-t border-white/20 bg-[#0a0a0a] py-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Experience the benchmark in portable sound.
          </h2>
          <p className="mt-3 text-sm text-[#8a8a8a] max-w-lg mx-auto">
            Order your XYZ Aura One with priority dispatch, worldwide shipping, and risk-free trial.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/order" variant="primary" size="lg">
              Pre-order Aura One — $299
            </Button>
            <Button href="/technology" variant="secondary" size="lg">
              Explore Internal Architecture
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
