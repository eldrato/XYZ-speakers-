import GlassFoldDemo from "@/components/ui/demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Fold Shader Demo — XYZ",
  description: "Animated WebGL Glass Fold gradient shader demo.",
};

export default function GlassFoldDemoPage() {
  return <GlassFoldDemo />;
}
