import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-order XYZ Aura One · Acoustic Reference Speaker",
  description:
    "Configure and pre-order your XYZ Aura One speaker. Choose custom finishes, single or stereo duo bundles, and premium accessories with free express shipping and 30-day trial.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
