"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#sound" },
  { label: "Technology", href: "/technology" },
  { label: "Specs", href: "/specs" },
  { label: "Shader Demo", href: "/demo/glass-fold" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.2]);
  const blur = useTransform(scrollY, [0, 80], [0, 16]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: useTransform(
            backgroundOpacity,
            (v) => `rgba(0, 0, 0, ${v})`
          ),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(255, 255, 255, ${v})`
          ),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        <nav
          className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-10 lg:px-16"
          aria-label="Main Navigation"
        >
          {/* Left: Wordmark in light weight */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl tracking-[0.25em] font-light text-white transition-opacity hover:opacity-80"
            aria-label="XYZ Aura One Home"
          >
            <span className="font-light">XYZ</span>
            <span className="text-xs font-normal tracking-widest text-[#8a8a8a] uppercase group-hover:text-white transition-colors">
              Aura One
            </span>
          </Link>

          {/* Center-Right: Links in muted grey, white on hover with subtle underline */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && !item.href.startsWith("/#") && pathname === item.href);

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group relative py-1 text-sm tracking-wide transition-colors duration-200 ${isActive ? "text-white font-medium" : "text-[#8a8a8a] hover:text-white"
                      }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Far Right: Solid white "Buy Now" button, black bold text, sharp corners */}
          <div className="flex items-center gap-4">
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center justify-center bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black rounded-none border border-white transition-all duration-250 ease-in-out hover:bg-black hover:text-white min-h-[44px]"
            >
              Buy Now
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-none border border-white/20 bg-transparent text-white transition-colors hover:border-white hover:bg-white/10 md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="text-xl leading-none">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen Dark Overlay Menu for Mobile (<768px) per spec 6.1 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black/98 px-8 py-24 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8a]">
                Navigation
              </span>
              <ul className="flex flex-col space-y-5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-2xl font-semibold tracking-tight text-white hover:text-[#8a8a8a] transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center bg-white py-4 text-sm font-bold uppercase tracking-wider text-black rounded-none border border-white hover:bg-black hover:text-white transition-all duration-250 min-h-[44px]"
              >
                Buy Now — From $299
              </Link>
              <p className="text-center text-xs text-[#8a8a8a]">
                Free Worldwide Express Shipping • 30-Day Trial
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
