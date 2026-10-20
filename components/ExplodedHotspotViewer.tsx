"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface ComponentSpec {
  id: string;
  name: string;
  short: string;
  category: "Acoustics" | "Electronics" | "Power" | "Enclosure";
  x: number; // percentage from left
  y: number; // percentage from top
  role: string;
  material: string;
  specs: string;
  description: string;
  acousticBenefit: string;
}

export const COMPONENTS_DATA: ComponentSpec[] = [
  {
    id: "passive-radiator-front",
    name: "Dual-Opposing Passive Radiator (Front)",
    short: "Passive Radiator",
    category: "Acoustics",
    x: 7.5,
    y: 56,
    role: "Low-Frequency Extension & Kinetic Balance",
    material: "Brushed anodized aluminum disc, low-hysteresis butyl rubber surround",
    specs: "38 Hz tuning frequency • 14mm peak-to-peak excursion",
    description: "Tuned to eliminate cabinet vibration while pumping out sub-bass frequencies without requiring bulky bass reflex ports or introducing air turbulence.",
    acousticBenefit: "Neutralizes cabinet rattle while delivering clean, subterranean low-end down to 38 Hz.",
  },
  {
    id: "front-cover",
    name: "Acoustic Front Bezel & Micro-Grille",
    short: "Front Cover",
    category: "Enclosure",
    x: 18.5,
    y: 53,
    role: "Dispersion & Physical Driver Protection",
    material: "CNC-machined 6061-T6 aerospace aluminum",
    specs: "42% acoustic open area • 0.8mm laser-cut micro-perforations",
    description: "Provides structural rigidity and precision acoustic dispersion while protecting the active neodymium transducer from dust, moisture, and impact.",
    acousticBenefit: "Zero high-frequency diffraction or acoustic coloration across a wide 160° listening angle.",
  },
  {
    id: "driver",
    name: "48mm Neodymium Long-Throw Driver",
    short: "Active Driver",
    category: "Acoustics",
    x: 29.5,
    y: 55,
    role: "Primary Full-Range Acoustic Transducer",
    material: "Aluminum-Magnesium alloy cone with high-flux N52 neodymium motor",
    specs: "45W RMS continuous power • 92 dB peak SPL • 120 Hz – 22 kHz bandwidth",
    description: "Engineered for lightning-fast transient response and ultra-low harmonic distortion (<0.15%), ensuring vocals and highs remain crystal clear at maximum output.",
    acousticBenefit: "Extremely rigid yet featherweight cone prevents modal breakup during high-volume transients.",
  },
  {
    id: "bass-radiator",
    name: "Internal Sub-Bass Acoustic Radiator",
    short: "Bass Radiator",
    category: "Acoustics",
    x: 37,
    y: 57,
    role: "Internal Acoustic Coupling & Air Displacement",
    material: "High-compliance composite diaphragm with reinforced spider",
    specs: "Volume displacement: 32 cm³ • Sealed chamber acoustic suspension",
    description: "Coupled directly to the internal air mass to convert forward driver excursion into omnidirectional, punchy low-frequency resonance.",
    acousticBenefit: "Doubles acoustic energy density within the compact cylindrical form factor.",
  },
  {
    id: "pcb",
    name: "Electronics, DSP & Dual Class-D Amplifier",
    short: "PCB / Electronics",
    category: "Electronics",
    x: 50.5,
    y: 45,
    role: "Signal Processing, Amplification & Wireless Engine",
    material: "4-layer FR-4 gold-plated PCB with integrated thermal heat spreader",
    specs: "Dual-core 32-bit / 192 kHz DSP • Bluetooth 5.3 LE • 94% Class-D efficiency",
    description: "Features real-time dynamic equalization, excursion limiting, and lossless codec decoding (aptX Adaptive, LDAC) to preserve studio-master fidelity.",
    acousticBenefit: "Performs 100,000 algorithmic corrections per second to eliminate clipping and thermal compression.",
  },
  {
    id: "battery",
    name: "High-Capacity Li-ion Power Cell",
    short: "Battery Pack",
    category: "Power",
    x: 51,
    y: 68,
    role: "High-Discharge Power System",
    material: "Dual-cell cylindrical lithium-ion pack (7.4V, 5200 mAh, 38.48 Wh)",
    specs: "24-hour playback • USB-C PD fast charge (80% in 42 min) • 10W reverse charging",
    description: "Powers peak dynamic audio transients without voltage sag. Features integrated battery management system (BMS) for thermal and overcurrent protection.",
    acousticBenefit: "Low internal resistance guarantees immediate instantaneous current for explosive bass drops.",
  },
  {
    id: "wrap",
    name: "Acoustic-Damped Silicone & Leather Sleeve",
    short: "Silicone / Leather Wrap",
    category: "Enclosure",
    x: 64,
    y: 52,
    role: "Tactile Grip, Vibration Damping & Control Surface",
    material: "Medical-grade liquid silicone / Vegetable-tanned full-grain leather",
    specs: "IP67 dust & water submersion • Debossed micro-switch tactile buttons",
    description: "Absorbs micro-vibrations across the chassis, prevents slippage on smooth surfaces, and houses intuitive debossed volume, power, and playback controls.",
    acousticBenefit: "Damps cabinet surface resonances, preventing outer shell coloration.",
  },
  {
    id: "rear-housing",
    name: "Rigid Structural Acoustic Chassis",
    short: "Rear Housing",
    category: "Enclosure",
    x: 78.5,
    y: 55,
    role: "Hermetic Internal Chamber & Structural Skeleton",
    material: "Glass-fiber reinforced polycarbonate-ABS composite",
    specs: "Internal bracing ribs • 0dB standing wave reflection geometry",
    description: "Engineered with internal spiral acoustic diffusers to eliminate standing waves and provide an airtight, pressure-calibrated acoustic chamber.",
    acousticBenefit: "Provides infinite acoustic resistance against mechanical flex, channeling 100% of driver energy into acoustic soundwaves.",
  },
  {
    id: "rear-cover",
    name: "Hermetic Rear Seal & Retaining Ring",
    short: "Rear Cover",
    category: "Enclosure",
    x: 87.5,
    y: 56,
    role: "Pressure Containment & Radiator Lock Ring",
    material: "High-torque anodized aluminum alloy ring with dual O-ring gaskets",
    specs: "100% hermetic pressure seal • High-strength bayonet retention",
    description: "Locks the rear chamber airtight to guarantee maximum pressure transfer between the active driver and opposing passive radiators.",
    acousticBenefit: "Prevents pressure leaks that would degrade sub-bass Q-factor and transient tightness.",
  },
  {
    id: "passive-radiator-rear",
    name: "Dual-Opposing Passive Radiator (Rear)",
    short: "Passive Radiator",
    category: "Acoustics",
    x: 95,
    y: 58,
    role: "Balanced Force Cancellation & 360° Low-End Waveguide",
    material: "Matched-mass aluminum diaphragm, inverted butyl surround",
    specs: "180° opposing phase balance • Zero desk walk or drift",
    description: "Mirrors the front radiator's motion with equal and opposite momentum. Neutralizes physical inertia so the speaker stays rock-steady on any surface.",
    acousticBenefit: "Symmetrical force cancellation means no surface buzzing or dancing, even at maximum 92 dB output.",
  },
];

const CATEGORIES = ["All", "Acoustics", "Electronics", "Power", "Enclosure"] as const;

export default function ExplodedHotspotViewer() {
  const [selectedId, setSelectedId] = useState<string>("driver");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const selectedComponent =
    COMPONENTS_DATA.find((c) => c.id === selectedId) || COMPONENTS_DATA[2];

  const filteredComponents =
    activeCategory === "All"
      ? COMPONENTS_DATA
      : COMPONENTS_DATA.filter((c) => c.category === activeCategory);

  const currentIndex = COMPONENTS_DATA.findIndex((c) => c.id === selectedId);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % COMPONENTS_DATA.length;
    setSelectedId(COMPONENTS_DATA[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + COMPONENTS_DATA.length) % COMPONENTS_DATA.length;
    setSelectedId(COMPONENTS_DATA[prevIdx].id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Category filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent-primary/20 text-accent-secondary border border-accent-secondary/40 shadow-[0_0_12px_rgba(0,214,255,0.2)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>Component {currentIndex + 1} of {COMPONENTS_DATA.length}</span>
          <div className="flex gap-1 ml-2">
            <button
              onClick={handlePrev}
              aria-label="Previous component"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next component"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Main Exploded Visualizer Canvas Container */}
      <div className="glass-card p-2 sm:p-6 shadow-2xl">
        {/* Subtle grid backdrop */}
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

        {/* Header HUD */}
        <div className="relative z-10 mb-2 flex items-center justify-between px-2 text-[11px] uppercase tracking-widest text-[#8a8a8a]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-white">Aura One Architecture Map</span>
          </div>
          <span className="font-mono text-[#8a8a8a]">10-Stage Precision Exploded Assembly</span>
        </div>

        {/* Exploded Diagram View with Interactive Hotspots */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
          <Image
            src="/exploded-view.jpg"
            alt="XYZ Aura One Exploded View Diagram showing internal components"
            fill
            className="object-contain"
            priority
          />

          {/* Interactive Hotspot pins */}
          {COMPONENTS_DATA.map((comp) => {
            const isSelected = comp.id === selectedId;
            const isDimmed =
              activeCategory !== "All" && comp.category !== activeCategory;

            return (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 focus:outline-none ${
                  isDimmed ? "opacity-20 pointer-events-none" : "opacity-100"
                }`}
                aria-label={`Inspect ${comp.name}`}
              >
                {/* Outer animated pulse ring when selected */}
                {isSelected && (
                  <span className="absolute -inset-3 animate-ping rounded-full bg-white/30" />
                )}

                {/* Hotspot node button */}
                <div
                  className={`relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110"
                      : "border-white/40 bg-black/80 text-white hover:border-white hover:bg-black hover:scale-105"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-bold leading-none">
                    +
                  </span>
                </div>

                {/* Label pill on hover / active */}
                <div
                  className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-none border px-2.5 py-1 text-[10px] font-medium tracking-tight backdrop-blur-md transition-all ${
                    isSelected
                      ? "border-white/40 bg-black/90 text-white shadow-lg opacity-100"
                      : "border-white/10 bg-black/70 text-[#8a8a8a] opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {comp.short}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Component selector horizontal ticker */}
        <div className="relative z-10 mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`flex-shrink-0 rounded-none px-3 py-2 text-left text-xs transition-all ${
                selectedId === comp.id
                  ? "bg-white text-black border border-white font-semibold"
                  : "bg-white/5 text-[#8a8a8a] hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <div className="font-semibold">{comp.short}</div>
              <div className="text-[10px] opacity-75">{comp.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Component Detailed Inspection HUD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedComponent.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="glass-card mt-6 p-6 md:p-8"
        >
          <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-none bg-white/10 border border-white/20 px-3 py-0.5 text-xs font-semibold text-white">
                  {selectedComponent.category}
                </span>
                <span className="text-xs text-[#8a8a8a] font-mono">
                  ASSEMBLY REF #{selectedComponent.id.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {selectedComponent.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-white/90">
                  {selectedComponent.role}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-[#8a8a8a]">
                {selectedComponent.description}
              </p>

              <div className="rounded-none border border-white/20 bg-white/[0.03] p-4">
                <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                  Acoustic & Mechanical Impact
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-white/90 leading-relaxed">
                  {selectedComponent.acousticBenefit}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4 border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#8a8a8a] font-semibold">
                  Material Composition
                </div>
                <div className="text-sm font-medium text-white/90">
                  {selectedComponent.material}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#8a8a8a] font-semibold">
                  Technical Specifications
                </div>
                <div className="text-sm font-mono text-white">
                  {selectedComponent.specs}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-[#8a8a8a] border-b border-white/10 pb-2">
                  <span>Assembly Phase</span>
                  <span className="text-white font-mono">Stage {currentIndex + 1} / 10</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#8a8a8a] py-2">
                  <span>Tolerance</span>
                  <span className="text-white font-mono">±0.02 mm</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#8a8a8a] border-t border-white/10 pt-2">
                  <span>Acoustic Chamber</span>
                  <span className="text-white font-mono">Hermetically Sealed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
