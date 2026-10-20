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

  // Map 0-1 scroll progress across the pinned section to a frame index (0..299).
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !frames || frames.length === 0) return;

    // Pick target frame, or smoothly fallback to the nearest available loaded frame
    let img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let fallbackImg: HTMLImageElement | null = null;
      // Search backwards first
      for (let i = index - 1; i >= 0; i--) {
        if (frames[i]?.complete && frames[i].naturalWidth > 0) {
          fallbackImg = frames[i];
          break;
        }
      }
      // Search forwards if no previous frame is loaded
      if (!fallbackImg) {
        for (let i = index + 1; i < frames.length; i++) {
          if (frames[i]?.complete && frames[i].naturalWidth > 0) {
            fallbackImg = frames[i];
            break;
          }
        }
      }
      if (!fallbackImg) return;
      img = fallbackImg;
    }

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

  // Redraw on scroll-driven frame changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (hasFailed) return;
    const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
    if (rounded === lastDrawnIndex.current) return;
    lastDrawnIndex.current = rounded;
    requestAnimationFrame(() => drawFrame(rounded));
  });

  // Draw the initial frame once frame 0 is loaded, and on resize
  useEffect(() => {
    if (hasFailed) return;
    const idx = lastDrawnIndex.current === -1 ? 0 : lastDrawnIndex.current;
    drawFrame(idx);

    const handleResize = () => {
      drawFrame(lastDrawnIndex.current === -1 ? 0 : lastDrawnIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, hasFailed]);

  return (
    <div className="relative h-full w-full bg-black">
      {hasFailed ? (
        <ExplodedFallback scrollYProgress={scrollYProgress} />
      ) : (
        <canvas
          ref={canvasRef}
          className="will-change-transform h-full w-full [transform:translateZ(0)]"
          style={{ display: "block" }}
        />
      )}

      {/* Subtle loader only while the very first frame is loading */}
      {!isLoaded && !hasFailed && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black">
          <div className="h-0.5 w-36 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(8, Math.round(loadProgress * 100))}%` }}
            />
          </div>
          <p className="text-[10px] font-mono tracking-widest text-[#8a8a8a] uppercase">
            Loading Acoustic Core {Math.round(loadProgress * 100)}%
          </p>
        </div>
      )}
    </div>
  );
}

export { TOTAL_FRAMES, SEQUENCE_PATH };
