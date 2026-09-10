import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XYZ · Aura One",
  description:
    "XYZ Aura One — flagship acoustic engineering, re-engineered for a world that never stops. Sound, perfected.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary font-sans antialiased">{children}</body>
    </html>
  );
}
