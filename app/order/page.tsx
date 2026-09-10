"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FinishOption {
  id: string;
  name: string;
  color: string;
  accent: string;
  description: string;
}

interface BundleOption {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  includes: string[];
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const FINISHES: FinishOption[] = [
  {
    id: "obsidian",
    name: "Obsidian Black",
    color: "#18181b",
    accent: "#00d6ff",
    description: "Deep matte black anodized aluminum with carbon-infused tactile silicone wrap.",
  },
  {
    id: "sandstone",
    name: "Sandstone Titanium",
    color: "#8c857b",
    accent: "#f59e0b",
    description: "Warm architectural mineral sandstone wrap with champagne satin titanium bezels.",
  },
  {
    id: "forest",
    name: "Deep Forest",
    color: "#24332c",
    accent: "#10b981",
    description: "Subtle earthy moss green silicone sleeve with smoked dark gunmetal trim.",
  },
];

const BUNDLES: BundleOption[] = [
  {
    id: "solo",
    name: "Solo Reference",
    price: 299,
    description: "1x XYZ Aura One — High-fidelity omnidirectional speaker",
    includes: [
      "1x XYZ Aura One Speaker",
      "Braided 1.2m USB-C Fast-Charge Cable",
      "Microfiber Padded Travel Pouch",
      "2-Year International Warranty",
    ],
  },
  {
    id: "duo",
    name: "Immersive Stereo Duo",
    price: 539,
    originalPrice: 598,
    badge: "Most Popular • Save $59",
    description: "2x XYZ Aura One units paired for true wireless discrete L/R stereo staging",
    includes: [
      "2x XYZ Aura One Speakers",
      "Instant Wireless TWS Stereo Channel Pairing",
      "2x Braided USB-C Cables",
      "2x Microfiber Travel Sleeves",
      "Dedicated Stereo Positioning Guide",
    ],
  },
  {
    id: "audiophile",
    name: "Studio Archival Pack",
    price: 629,
    originalPrice: 707,
    badge: "Save $78",
    description: "Complete studio setup with 2x Aura One speakers and 2x acoustic isolation stands",
    includes: [
      "2x XYZ Aura One Speakers",
      "2x CNC Aluminum Desktop Stands (15° upward acoustic tilt)",
      "Dual-Port 65W GaN Fast Charger & Cables",
      "Acoustic Calibration Setup Manual",
    ],
  },
];

const ADDONS: AddonOption[] = [
  {
    id: "stand",
    name: "CNC Aluminum Desktop Stand",
    price: 49,
    description: "Acoustic vibration-damping isolation stand with a 15° upward ear-level listening angle.",
  },
  {
    id: "case",
    name: "Italian Full-Grain Leather Case",
    price: 69,
    description: "Handcrafted vegetable-tanned travel holster with brass hardware and magnetic closure.",
  },
  {
    id: "care",
    name: "XYZ Care+ (3-Year Coverage)",
    price: 39,
    description: "Comprehensive accidental drop, liquid damage, and express overnight replacement protection.",
  },
];

export default function OrderPage() {
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISHES[0]);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(BUNDLES[1]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<"assembled" | "exploded">("assembled");

  // Checkout form state
  const [shippingMethod, setShippingMethod] = useState<"standard" | "priority">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "installments">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Customer form inputs
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "United States",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "08/28",
    cardCvc: "891",
  });

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const shippingCost = shippingMethod === "priority" ? 15 : 0;
  const subtotal = selectedBundle.price + addonsTotal;
  const total = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-bg-primary text-white">
      <Navbar />

      <div className="relative pt-24 pb-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          {/* Header Title */}
          {!orderComplete && (
            <div className="mb-10 max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-secondary">
                LIMITED FIRST PRODUCTION RUN • BATCH #1
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Configure Your <span className="text-headline-gradient">Aura One.</span>
              </h1>
              <p className="text-sm text-white/60 sm:text-base">
                Select your bespoke finish, choose standalone or paired stereo configuration,
                and secure your priority production slot with worldwide insured shipping.
              </p>
            </div>
          )}

          {/* ORDER CONFIRMATION SCREEN */}
          {orderComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#08080C] p-8 md:p-12 shadow-2xl text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-secondary/20 text-accent-secondary text-3xl mb-6 shadow-[0_0_24px_rgba(0,214,255,0.4)]">
                ✓
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-accent-secondary">
                PRE-ORDER CONFIRMED
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                You&apos;re on the priority list.
              </h2>
              <p className="mt-2 text-sm text-white/60">
                A confirmation email and acoustic calibration questionnaire have been dispatched to{" "}
                <span className="font-semibold text-white">{formData.email}</span>.
              </p>

              {/* Order Details Card */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 text-xs">
                  <div>
                    <span className="text-white/40">Order Number:</span>{" "}
                    <span className="font-mono font-bold text-white">#XYZ-89241</span>
                  </div>
                  <div>
                    <span className="text-white/40">Estimated Dispatch:</span>{" "}
                    <span className="font-medium text-accent-secondary">Within 3 Weeks</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Hardware Setup:</span>
                    <span className="font-medium text-white">{selectedBundle.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Selected Finish:</span>
                    <span className="font-medium text-white flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: selectedFinish.color }}
                      />
                      {selectedFinish.name}
                    </span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Accessories Included:</span>
                      <span className="font-medium text-white text-right">
                        {selectedAddons
                          .map((id) => ADDONS.find((a) => a.id === id)?.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/60">Shipping Destination:</span>
                    <span className="font-medium text-white">
                      {formData.address}, {formData.city}, {formData.state} {formData.zip}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-sm font-bold text-white">
                    <span>Total Charged:</span>
                    <span className="font-mono text-accent-secondary">${total} USD</span>
                  </div>
                </div>
              </div>

              {/* Production Progress Ticker */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0F] p-6 text-left">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-4 font-semibold">
                  Batch #1 Production Milestone
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(0,214,255,0.8)]" />
                    <span className="font-semibold text-accent-secondary">Order Confirmed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-accent-secondary/60" />
                    <span className="text-white/70">CNC Chassis Milling</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-white/20" />
                    <span className="text-white/40">Acoustic Calibration</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-white/20" />
                    <span className="text-white/40">Express Courier</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Print Order Invoice (PDF)
                </button>
                <Link
                  href="/"
                  className="rounded-full bg-cta-gradient px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(0,214,255,0.4)] hover:scale-[1.03] transition-transform"
                >
                  Return to Home
                </Link>
                <Link
                  href="/technology"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Explore Internal Technology
                </Link>
              </div>
            </motion.div>
          ) : (
            /* CONFIGURATOR & CHECKOUT GRID */
            <div className="grid gap-12 lg:grid-cols-12">
              {/* LEFT COLUMN: VISUAL PREVIEW (STICKY ON DESKTOP) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 self-start">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08080C] p-6 shadow-2xl">
                  {/* Ambient illumination matching selected finish */}
                  <div
                    className="pointer-events-none absolute -inset-10 opacity-30 blur-3xl transition-all duration-700"
                    style={{ backgroundColor: selectedFinish.accent }}
                  />

                  {/* Top Switcher: Assembled vs Exploded */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="text-xs font-semibold text-white">
                      {selectedBundle.name}
                    </div>
                    <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5 text-[11px]">
                      <button
                        onClick={() => setPreviewMode("assembled")}
                        className={`rounded-full px-2.5 py-1 transition-all ${
                          previewMode === "assembled"
                            ? "bg-white/20 text-white font-medium shadow-sm"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        Assembled View
                      </button>
                      <button
                        onClick={() => setPreviewMode("exploded")}
                        className={`rounded-full px-2.5 py-1 transition-all ${
                          previewMode === "exploded"
                            ? "bg-white/20 text-white font-medium shadow-sm"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        Exploded Internal
                      </button>
                    </div>
                  </div>

                  {/* Image View */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src={
                        previewMode === "assembled"
                          ? "/sequence/frame_0001.jpg"
                          : "/exploded-view.jpg"
                      }
                      alt="XYZ Aura One Preview"
                      fill
                      className="object-contain transition-all duration-500"
                      priority
                    />

                    {/* Finish indicator tag */}
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] backdrop-blur-md flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: selectedFinish.color }}
                      />
                      <span className="text-white/80">{selectedFinish.name}</span>
                    </div>
                  </div>

                  {/* Quick Feature Checklist */}
                  <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-xs text-white/60">
                    <div className="flex items-center justify-between">
                      <span>Low Frequency Output:</span>
                      <span className="font-mono text-accent-secondary">38 Hz Sub-Bass</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Amplification:</span>
                      <span className="font-mono text-white">45W RMS Bi-Amp</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Battery Life:</span>
                      <span className="font-mono text-white">24 Hours Continuous</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ingress Protection:</span>
                      <span className="font-mono text-accent-secondary">IP67 Submersible</span>
                    </div>
                  </div>
                </div>

                {/* Trust & Guarantees card */}
                <div className="rounded-2xl border border-white/10 bg-[#07070A] p-5 space-y-3 text-xs text-white/70">
                  <div className="flex items-center gap-3">
                    <span className="text-accent-secondary text-base">🛡️</span>
                    <div>
                      <div className="font-semibold text-white">30-Day In-Home Acoustic Trial</div>
                      <div className="text-[11px] text-white/50">Full refund if you are not totally captivated.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-secondary text-base">✈️</span>
                    <div>
                      <div className="font-semibold text-white">Free Insured Courier Delivery</div>
                      <div className="text-[11px] text-white/50">Signature-required priority air dispatch.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-secondary text-base">🔧</span>
                    <div>
                      <div className="font-semibold text-white">2-Year Global Hardware Warranty</div>
                      <div className="text-[11px] text-white/50">Comprehensive coverage with express swap service.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: CONFIGURATION & CHECKOUT FORM */}
              <div className="lg:col-span-7 space-y-10">
                {/* STEP 1: CHOOSE FINISH */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">
                      1. Select Finish &amp; Materials
                    </h2>
                    <span className="text-xs text-accent-secondary font-medium">
                      {selectedFinish.name}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {FINISHES.map((finish) => {
                      const isSelected = selectedFinish.id === finish.id;
                      return (
                        <button
                          key={finish.id}
                          type="button"
                          onClick={() => setSelectedFinish(finish)}
                          className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                            isSelected
                              ? "border-accent-secondary bg-white/[0.06] shadow-[0_0_16px_rgba(0,214,255,0.2)]"
                              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-3">
                            <span
                              className="h-6 w-6 rounded-full border border-white/30 shadow-inner"
                              style={{ backgroundColor: finish.color }}
                            />
                            {isSelected && (
                              <span className="text-xs text-accent-secondary font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {finish.name}
                          </div>
                          <p className="mt-1 text-[11px] text-white/50 line-clamp-2">
                            {finish.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: CHOOSE BUNDLE SETUP */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">
                      2. Choose Acoustic Setup
                    </h2>
                    <span className="text-xs text-white/40">
                      Select 1x Solo or 2x Paired Units
                    </span>
                  </div>

                  <div className="space-y-3">
                    {BUNDLES.map((bundle) => {
                      const isSelected = selectedBundle.id === bundle.id;
                      return (
                        <button
                          key={bundle.id}
                          type="button"
                          onClick={() => setSelectedBundle(bundle)}
                          className={`w-full rounded-2xl border p-5 text-left transition-all relative ${
                            isSelected
                              ? "border-accent-secondary bg-white/[0.06] shadow-[0_0_16px_rgba(0,214,255,0.2)]"
                              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                          }`}
                        >
                          {bundle.badge && (
                            <span className="absolute -top-2.5 right-4 rounded-full bg-accent-secondary px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                              {bundle.badge}
                            </span>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <div className="text-base font-bold text-white flex items-center gap-2">
                                <span>{bundle.name}</span>
                                {isSelected && (
                                  <span className="text-accent-secondary text-xs">●</span>
                                )}
                              </div>
                              <p className="text-xs text-white/60 mt-0.5">
                                {bundle.description}
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold font-mono text-white">
                                ${bundle.price}
                              </div>
                              {bundle.originalPrice && (
                                <div className="text-xs text-white/40 line-through">
                                  ${bundle.originalPrice}
                                </div>
                              )}
                            </div>
                          </div>

                          <ul className="mt-3 grid gap-1 sm:grid-cols-2 text-[11px] text-white/50 border-t border-white/5 pt-3">
                            {bundle.includes.map((inc, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="text-accent-secondary">✓</span> {inc}
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: OPTIONAL ACCESSORIES */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white">
                    3. Optional Add-ons &amp; Protection
                  </h2>

                  <div className="space-y-2.5">
                    {ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                            isChecked
                              ? "border-accent-secondary/50 bg-white/[0.05]"
                              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                                isChecked
                                  ? "border-accent-secondary bg-accent-secondary text-black"
                                  : "border-white/30 bg-transparent"
                              }`}
                            >
                              {isChecked && <span className="text-xs font-bold">✓</span>}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                {addon.name}
                              </div>
                              <div className="text-[11px] text-white/50">
                                {addon.description}
                              </div>
                            </div>
                          </div>
                          <div className="font-mono text-xs font-bold text-accent-secondary pl-3">
                            +${addon.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 4: SHIPPING & PAYMENT FORM */}
                <form onSubmit={handleSubmitOrder} className="space-y-6 border-t border-white/10 pt-8">
                  <h2 className="text-lg font-bold text-white">
                    4. Shipping &amp; Payment Details
                  </h2>

                  {/* Customer Information */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                      Email Address (Order Confirmation)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData({ ...formData, zip: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-accent-secondary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block">
                      Delivery Method
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div
                        onClick={() => setShippingMethod("standard")}
                        className={`rounded-xl border p-3 cursor-pointer text-xs transition-all ${
                          shippingMethod === "standard"
                            ? "border-accent-secondary/50 bg-white/[0.05]"
                            : "border-white/10 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex justify-between font-semibold text-white">
                          <span>Express Insured Courier</span>
                          <span className="text-accent-secondary">FREE</span>
                        </div>
                        <div className="text-[11px] text-white/50 mt-1">
                          2–3 business days after batch dispatch
                        </div>
                      </div>

                      <div
                        onClick={() => setShippingMethod("priority")}
                        className={`rounded-xl border p-3 cursor-pointer text-xs transition-all ${
                          shippingMethod === "priority"
                            ? "border-accent-secondary/50 bg-white/[0.05]"
                            : "border-white/10 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex justify-between font-semibold text-white">
                          <span>Priority Saturday Delivery</span>
                          <span className="font-mono text-white">$15</span>
                        </div>
                        <div className="text-[11px] text-white/50 mt-1">
                          Guaranteed weekend arrival window
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Switcher */}
                  <div className="space-y-3 pt-2">
                    <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block">
                      Payment Option
                    </label>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`rounded-xl border py-2.5 text-center font-medium transition-all ${
                          paymentMethod === "card"
                            ? "border-accent-secondary bg-white/10 text-white"
                            : "border-white/10 text-white/50 hover:text-white"
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wallet")}
                        className={`rounded-xl border py-2.5 text-center font-medium transition-all ${
                          paymentMethod === "wallet"
                            ? "border-accent-secondary bg-white/10 text-white"
                            : "border-white/10 text-white/50 hover:text-white"
                        }`}
                      >
                        Apple / Google Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("installments")}
                        className={`rounded-xl border py-2.5 text-center font-medium transition-all ${
                          paymentMethod === "installments"
                            ? "border-accent-secondary bg-white/10 text-white"
                            : "border-white/10 text-white/50 hover:text-white"
                        }`}
                      >
                        4x Installments
                      </button>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, cardNumber: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-mono text-white focus:border-accent-secondary focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.cardExpiry}
                              onChange={(e) =>
                                setFormData({ ...formData, cardExpiry: e.target.value })
                              }
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-mono text-white focus:border-accent-secondary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                              CVC Security Code
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.cardCvc}
                              onChange={(e) =>
                                setFormData({ ...formData, cardCvc: e.target.value })
                              }
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-mono text-white focus:border-accent-secondary focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "wallet" && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-2">
                        <div className="text-2xl">📱</div>
                        <div className="text-xs text-white/80 font-semibold">
                          Biometric Quick Checkout Ready
                        </div>
                        <p className="text-[11px] text-white/50">
                          Clicking Pre-order will invoke Apple Pay / Google Pay authentication on your device.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "installments" && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-1">
                        <div className="font-semibold text-white">
                          Pay in 4 interest-free payments of ${(total / 4).toFixed(2)}
                        </div>
                        <p className="text-[11px] text-white/50">
                          Due every 2 weeks. No hidden interest, no impact on credit score.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Total & Submit CTA */}
                  <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black p-6 space-y-4">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-white/60">
                        <span>{selectedBundle.name}:</span>
                        <span className="font-mono text-white">${selectedBundle.price}</span>
                      </div>
                      {addonsTotal > 0 && (
                        <div className="flex justify-between text-white/60">
                          <span>Selected Accessories:</span>
                          <span className="font-mono text-white">+${addonsTotal}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-white/60">
                        <span>Worldwide Express Shipping:</span>
                        <span className="font-mono text-accent-secondary">
                          {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3 text-base font-extrabold text-white">
                        <span>Total Due Today:</span>
                        <span className="font-mono text-accent-secondary text-xl">
                          ${total} USD
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-cta-gradient py-4 text-sm font-bold text-white shadow-[0_0_24px_rgba(0,214,255,0.35)] transition-all hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Securing Batch #1 Allocation...
                        </span>
                      ) : (
                        `Complete Pre-order — $${total} USD`
                      )}
                    </button>

                    <div className="text-center text-[11px] text-white/40 flex items-center justify-center gap-2">
                      <span>🔒 256-Bit SSL Encrypted</span>
                      <span>•</span>
                      <span>30-Day Money Back Guarantee</span>
                      <span>•</span>
                      <span>No Charges Until Shipped</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
