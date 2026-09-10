import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Specifications · XYZ Aura One",
  description:
    "Comprehensive engineering specifications for XYZ Aura One: 48mm neodymium driver, 38Hz sub-bass, dual force-canceling passive radiators, 5200mAh battery, and IP67 rating.",
};

export default function SpecsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
