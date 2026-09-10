import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050507] py-16 text-white/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">
                XYZ <span className="text-accent-secondary">·</span> Aura One
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-white/50">
              Precision acoustic architecture, dual force-canceling passive radiators,
              and 32-bit floating point dynamic DSP. Designed for pure sound, crafted for anywhere.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-white/40">
              <span>© {new Date().getFullYear()} XYZ Acoustics Inc.</span>
              <span>•</span>
              <span>All rights reserved.</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Overview & Experience
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Internal Architecture & Tech
                </Link>
              </li>
              <li>
                <Link href="/specs" className="hover:text-white transition-colors">
                  Full Technical Specifications
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition-colors">
                  Pre-order — From $299
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Engineering Specs
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-white/50">
              <li>38 Hz – 22,000 Hz Response</li>
              <li>92 dB Peak SPL Output</li>
              <li>Dual Class-D 45W RMS Bi-Amp</li>
              <li>IP67 Waterproof & Dustproof</li>
              <li>24-Hour Li-ion Fast Charge</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
