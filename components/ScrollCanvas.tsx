"use client";

import { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useImageSequence } from "@/hooks/useImageSequence";
import ExplodedFallback from "@/components/ExplodedFallback";

const TOTAL_FRAMES = 300;
const SEQUENCE_PATH = "/sequence";

interface ScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollCanvas({ scrollYProgress }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastDrawnIndex = useRef(-1);
  const { frames, isLoaded, loadProgress, hasFailed } = useImageSequence(
    TOTAL_FRAMES,
    SEQUENCE_PATH
  );

  // Map 0-1 scroll progress across the pinned section to a frame index.
  // Rounded so we only ever draw on an actual index change (no wasted redraws).
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !frames[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const img = frames[index];
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    // "contain" fit — preserve aspect ratio, never crop the product
    let drawWidth: number;
    let drawHeight: number;
    if (imgRatio > canvasRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
    }

    const offsetX = (displayWidth - drawWidth) / 2;
    const offsetY = (displayHeight - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redraw on scroll-driven frame changes, guarded against duplicate indices.
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded || hasFailed) return;
    const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
    if (rounded === lastDrawnIndex.current) return;
    lastDrawnIndex.current = rounded;
    requestAnimationFrame(() => drawFrame(rounded));
  });

  // Draw the first frame once loading completes, and on resize.
  useEffect(() => {
    if (!isLoaded || hasFailed) return;
    drawFrame(lastDrawnIndex.current === -1 ? 0 : lastDrawnIndex.current);

    const handleResize = () => {
      drawFrame(lastDrawnIndex.current === -1 ? 0 : lastDrawnIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, hasFailed]);

  return (
    <div className="relative h-full w-full bg-bg-primary">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black">
          <div className="h-px w-40 overflow-hidden bg-white/20">
            <div
              className="h-full bg-white transition-[width] duration-150 ease-out"
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
          <p className="text-xs font-mono tracking-wide text-[#8a8a8a]">
            Loading {Math.round(loadProgress * 100)}%
          </p>
        </div>
      )}

      {isLoaded && hasFailed && (
        <ExplodedFallback scrollYProgress={scrollYProgress} />
      )}

      <canvas
        ref={canvasRef}
        className="will-change-transform h-full w-full [transform:translateZ(0)]"
        style={{ display: isLoaded && !hasFailed ? "block" : "none" }}
      />
    </div>
  );
}

export { TOTAL_FRAMES, SEQUENCE_PATH };
