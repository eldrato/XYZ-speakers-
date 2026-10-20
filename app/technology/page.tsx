import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ExplodedHotspotViewer from "@/components/ExplodedHotspotViewer";

export const metadata: Metadata = {
  title: "Technology & Internal Architecture · XYZ Aura One",
  description:
    "Explore the internal engineering of XYZ Aura One: dual opposing passive radiators, 48mm neodymium driver, 32-bit DSP, Class-D bi-amplification, and aerospace-grade chassis.",
};

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-[#8a8a8a]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              Acoustic &amp; Mechanical Architecture
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineered from the{" "}
              <span className="text-[#8a8a8a]">inside out.</span>
            </h1>

            <p className="text-base text-[#8a8a8a] sm:text-lg leading-relaxed">
              We disassembled traditional portable speaker design to its raw physics.
              Explore the 10-stage precision assembly that delivers uncompressed studio
              clarity, dual-force bass cancellation, and room-filling acoustic scale.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-white font-mono">45W RMS</div>
                <div className="text-xs text-[#8a8a8a]">Bi-Amp Class-D Output</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-white font-mono">38 Hz</div>
                <div className="text-xs text-[#8a8a8a]">Sub-Bass Extension</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-white font-mono">32-Bit</div>
                <div className="text-xs text-[#8a8a8a]">192 kHz Floating DSP</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-2xl font-bold text-white font-mono">IP67</div>
                <div className="text-xs text-[#8a8a8a]">Submersible Chassis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exploded View Interactive Section */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Interactive Component Inspection
            </h2>
            <p className="mt-1 text-sm text-[#8a8a8a]">
              Hover or tap on any hotspot pin or component pill below to examine materials, tolerances, and acoustic roles.
            </p>
          </div>

          <ExplodedHotspotViewer />
        </div>
      </section>

      {/* Engineering Pillars Deep Dive */}
      <section className="relative border-t border-white/20 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl space-y-3 mb-16">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
              Acoustic Physics
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Breakthroughs in Compact Acoustics
            </h2>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">
              How XYZ Aura One achieves desktop studio-monitor bass response and zero mechanical distortion within an ultra-portable cylindrical form factor.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pillar 1 */}
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white mb-6 font-mono text-lg font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Dual Force-Canceling Passive Radiators
              </h3>
              <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">
                By placing two identical mass-tuned passive radiators directly opposite each other on the cylinder’s longitudinal axis, mechanical kinetic momentum cancels out entirely.
              </p>
              <ul className="space-y-2 text-xs text-[#8a8a8a] border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Zero desk walking, buzzing, or kinetic drift
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Eliminates air-chuffing turbulence from port tubes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Extended sub-bass resonance down to 38 Hz
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white mb-6 font-mono text-lg font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                48mm Custom Neodymium Transducer
              </h3>
              <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">
                An aerospace aluminum-magnesium alloy cone driven by an oversized N52 neodymium magnetic motor delivers ultra-fast transient attack, pristine vocals, and microscopic detail.
              </p>
              <ul className="space-y-2 text-xs text-[#8a8a8a] border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Rigid alloy cone prevents modal breakup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 92 dB SPL maximum clean output with &lt;0.15% THD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Vented former maintains thermal stability
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card p-8">
              <div className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white mb-6 font-mono text-lg font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Real-Time 32-Bit Dynamic DSP
              </h3>
              <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">
                A dual-core DSP continuously analyzes incoming audio signals at 192 kHz, applying psychoacoustic harmonic synthesis to extend low bass and dynamic excursion limiting to prevent distortion.
              </p>
              <ul className="space-y-2 text-xs text-[#8a8a8a] border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> 100,000 algorithmic corrections per second
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Studio-master decoding: LDAC &amp; aptX Adaptive
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Adaptive volume equalization across any level
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Chain Architecture */}
      <section className="relative py-24 border-t border-white/20 bg-black">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8a8a8a]">
              Signal Flow
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Path from Source to Soundwave
            </h2>
            <p className="mt-2 text-sm text-[#8a8a8a] max-w-xl mx-auto">
              How digital packets transform into pristine acoustic air pressure.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card p-6">
              <div className="text-xs font-mono text-[#8a8a8a]">STEP 01</div>
              <h3 className="mt-2 text-base font-bold text-white">Lossless Input</h3>
              <p className="mt-2 text-xs text-[#8a8a8a] leading-relaxed">
                Bluetooth 5.3 LE Audio / LDAC (990 kbps) or lossless 24-bit/96kHz wired USB-C bitstream ingestion.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="text-xs font-mono text-[#8a8a8a]">STEP 02</div>
              <h3 className="mt-2 text-base font-bold text-white">32-Bit Processing</h3>
              <p className="mt-2 text-xs text-[#8a8a8a] leading-relaxed">
                Dual-core DSP applies room-tuning EQ curves, dynamic range compression, and phase alignment.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="text-xs font-mono text-[#8a8a8a]">STEP 03</div>
              <h3 className="mt-2 text-base font-bold text-white">Class-D Bi-Amp</h3>
              <p className="mt-2 text-xs text-[#8a8a8a] leading-relaxed">
                45W RMS high-efficiency bi-amplification with instantaneous high-discharge current from the 5200mAh pack.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="text-xs font-mono text-[#8a8a8a]">STEP 04</div>
              <h3 className="mt-2 text-base font-bold text-white">Acoustic Projection</h3>
              <p className="mt-2 text-xs text-[#8a8a8a] leading-relaxed">
                Dual opposing passive radiators and 48mm aluminum transducer generate omnidirectional 360° sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="relative border-t border-white/20 bg-[#0a0a0a] py-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to examine the full technical data?
          </h2>
          <p className="mt-3 text-sm text-[#8a8a8a] max-w-lg mx-auto">
            Review detailed physical dimensions, battery curves, wireless codecs, and warranty certifications.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/specs" variant="primary" size="md">
              View Full Technical Specs
            </Button>
            <Button href="/order" variant="secondary" size="md">
              Pre-order Aura One — $299
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
