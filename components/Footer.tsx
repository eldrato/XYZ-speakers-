"use client";

import Link from "next/link";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black/80 backdrop-blur-md py-16 text-[#8a8a8a]">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-light tracking-[0.25em] text-white">
                XYZ
              </span>
              <span className="text-xs uppercase tracking-widest text-[#8a8a8a]">
                Aura One
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#8a8a8a]">
              Flagship acoustic engineering, dual opposing force-canceling radiators,
              and 32-bit floating DSP. Sound perfected for purists, built for anywhere.
            </p>
            <div className="pt-2 text-xs font-mono text-[#8a8a8a]">
              © {new Date().getFullYear()} XYZ Acoustics Inc. All rights reserved.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#sound" className="hover:text-white transition-colors">
                  Acoustic Sound
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Technology & Assembly
                </Link>
              </li>
              <li>
                <Link href="/specs" className="hover:text-white transition-colors">
                  Technical Specs
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference Specs */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Acoustic Benchmarks
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#8a8a8a]">
              <li>38 Hz – 22 kHz (±3 dB)</li>
              <li>92 dB Peak SPL @ 1m</li>
              <li>45W RMS Class-D Bi-Amp</li>
              <li>IP67 Waterproof Chassis</li>
              <li>24-Hour Battery Life</li>
            </ul>
          </div>

          {/* Acoustic Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Private Release List
            </h4>
            <p className="text-xs text-[#8a8a8a]">
              Get private firmware updates, engineering teardowns, and priority batch notifications.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. You are on the XYZ priority list.");
              }}
              className="flex flex-col gap-2 pt-1"
            >
              <input
                type="email"
                placeholder="your.email@domain.com"
                required
                className="w-full bg-[#0a0a0a] border border-white/20 px-3 py-2 text-xs text-white placeholder-[#8a8a8a] focus:border-white focus:outline-none rounded-none"
              />
              <Button type="submit" variant="primary" size="sm" fullWidth>
                Join Priority List
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
