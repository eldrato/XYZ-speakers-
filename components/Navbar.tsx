"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  isExternalOrHash?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Technology", href: "/technology" },
  { label: "Sound", href: "/#sound" },
  { label: "Specs", href: "/specs" },
  { label: "Order", href: "/order" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.3, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.05, 0.12]);
  const blur = useTransform(scrollY, [0, 100], [8, 16]);

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 md:px-10"
        style={{
          backgroundColor: useTransform(
            backgroundOpacity,
            (v) => `rgba(5, 5, 7, ${v})`
          ),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(255, 255, 255, ${v})`
          ),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white/90 transition-colors hover:text-white"
        >
          <span className="text-white">XYZ</span>
          <span className="text-accent-secondary">·</span>
          <span className="text-white/60 group-hover:text-white/90 transition-colors">
            Aura One
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.href === "/" && pathname === "/") ||
              (item.href !== "/" && !item.href.startsWith("/#") && pathname.startsWith(item.href));

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative text-xs uppercase tracking-wider transition-all duration-200 ${isActive
                    ? "text-accent-secondary font-semibold"
                    : "text-white/60 hover:text-white"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(0,214,255,0.8)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/order"
            className="rounded-full bg-cta-gradient px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(0,80,255,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(0,214,255,0.6)]"
          >
            Pre-order
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="text-base">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-[#070709]/95 p-6 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-white/80 hover:text-accent-secondary py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
