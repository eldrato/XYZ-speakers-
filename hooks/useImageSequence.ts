"use client";

import { useEffect, useRef, useState } from "react";

interface UseImageSequenceResult {
  /** Loaded (or in-flight) HTMLImageElement objects, indexed 0..totalFrames-1 */
  frames: HTMLImageElement[];
  /** True once at least the first frame is ready to render (canvas can display and scrub immediately) */
  isLoaded: boolean;
  /** True once all frames have settled */
  isFullyLoaded: boolean;
  /** 0..1 preload progress, for the loading bar */
  loadProgress: number;
  /** True if the sequence is unusable (folder empty / every frame failed) — triggers the SVG fallback */
  hasFailed: boolean;
}

/**
 * Preloads a zero-padded frame sequence (e.g. frame_0001.jpg ... frame_0300.jpg)
 * into memory so canvas scrubbing never stalls on a network fetch mid-scroll.
 *
 * Provides progressive readiness: as soon as frame 1 arrives, `isLoaded` becomes true
 * so the initial hero speaker is visible instantly without blocking on all 300 frames.
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
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
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
      setIsFullyLoaded(true);
      return;
    }

    const images: HTMLImageElement[] = new Array(totalFrames);
    framesRef.current = images;

    const onSettle = () => {
      if (cancelled) return;
      const settled = loadedCount + failedCount;
      setLoadProgress(settled / totalFrames);
      if (settled === totalFrames) {
        setIsFullyLoaded(true);
        // If every single frame failed, trigger fallback
        setHasFailed(failedCount === totalFrames);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const frameNumber = String(i + 1).padStart(padLength, "0");
      const img = new Image();

      img.onload = () => {
        loadedCount += 1;
        // Make canvas playable as soon as the first frame arrives
        if (i === 0 && !cancelled) {
          setIsLoaded(true);
        }
        onSettle();
      };

      img.onerror = () => {
        failedCount += 1;
        if (i === 0 && !cancelled) {
          setIsLoaded(true);
        }
        onSettle();
      };

      // Set src after onload/onerror handlers to avoid missing cached events
      img.src = `${path}/${prefix}${frameNumber}.${extension}`;
      images[i] = img;

      // Handle images that might already be complete from browser memory cache
      if (img.complete && img.naturalWidth > 0 && i === 0 && !cancelled) {
        setIsLoaded(true);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [totalFrames, path, prefix, padLength, extension]);

  return {
    frames: framesRef.current,
    isLoaded,
    isFullyLoaded,
    loadProgress,
    hasFailed,
  };
}
