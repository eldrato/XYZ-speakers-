"use client";

import { useEffect, useRef, useState } from "react";

interface UseImageSequenceResult {
  /** Loaded (or in-flight) HTMLImageElement objects, indexed 0..totalFrames-1 */
  frames: HTMLImageElement[];
  /** True once every frame has either loaded or failed */
  isLoaded: boolean;
  /** 0..1 preload progress, for the loading bar */
  loadProgress: number;
  /** True if the sequence is unusable (folder empty / every frame failed) — triggers the SVG fallback */
  hasFailed: boolean;
}

/**
 * Preloads a zero-padded frame sequence (e.g. frame_0001.jpg ... frame_0120.jpg)
 * into memory so canvas scrubbing never stalls on a network fetch mid-scroll.
 *
 * @param totalFrames total number of frames in the sequence
 * @param path folder containing the frames, e.g. "/sequence"
 * @param prefix filename prefix before the zero-padded index, default "frame_"
 * @param padLength zero-pad width, default 4 (frame_0001.jpg)
 * @param extension file extension, default "jpg"
 */
export function useImageSequence(
  totalFrames: number,
  path: string,
  prefix = "frame_",
  padLength = 4,
  extension = "jpg"
): UseImageSequenceResult {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    let failedCount = 0;

    if (totalFrames <= 0) {
      setHasFailed(true);
      setIsLoaded(true);
      return;
    }

    const images: HTMLImageElement[] = new Array(totalFrames);

    const onSettle = () => {
      if (cancelled) return;
      const settled = loadedCount + failedCount;
      setLoadProgress(settled / totalFrames);
      if (settled === totalFrames) {
        framesRef.current = images;
        // If every single frame failed (e.g. the folder is genuinely empty),
        // fall back to the SVG exploded diagram instead of a blank canvas.
        setHasFailed(failedCount === totalFrames);
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const frameNumber = String(i + 1).padStart(padLength, "0");
      const img = new Image();
      img.src = `${path}/${prefix}${frameNumber}.${extension}`;
      img.onload = () => {
        loadedCount += 1;
        onSettle();
      };
      img.onerror = () => {
        failedCount += 1;
        onSettle();
      };
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [totalFrames, path, prefix, padLength, extension]);

  return {
    frames: framesRef.current,
    isLoaded,
    loadProgress,
    hasFailed,
  };
}
