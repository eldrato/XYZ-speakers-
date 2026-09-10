# Frame sequence

This folder already contains the real "exploded jog" sequence you provided:
**300 frames**, `frame_0001.jpg` … `frame_0300.jpg`, at 1280×720.

`TOTAL_FRAMES` in `components/ScrollCanvas.tsx` is set to `300` to match.

## Naming convention

```
frame_XXXX.jpg
```

- 4-digit, zero-padded, 1-indexed (`frame_0001.jpg`, not `frame_0000.jpg`).
- Sequential with no gaps — the preloader requests every index from 1 to
  `TOTAL_FRAMES` and does not check for missing files.

## Swapping in a different sequence

1. Replace the files in this folder, keeping the same naming convention.
2. Update `TOTAL_FRAMES` in `components/ScrollCanvas.tsx` to the new frame
   count. That's the only code change required — `useImageSequence` and the
   scroll-to-frame mapping both read from that constant.
3. If your source frames use a different prefix, padding width, or
   extension, pass the optional arguments to `useImageSequence` in
   `ScrollCanvas.tsx` (`prefix`, `padLength`, `extension`).

## Fallback behavior

If this folder is ever emptied or every frame fails to load (e.g. wrong
path in a fresh deploy), `ScrollCanvas` automatically renders
`ExplodedFallback` — an animated SVG layered diagram — instead of a blank
canvas, so the site stays demoable while frames are being swapped in.

## Performance note

300 frames at ~18KB average (5.5MB total) preload comfortably before the
section becomes interactive. If you significantly increase resolution or
frame count, consider adding a lower-res/compressed pass (e.g. 960px wide,
progressive JPEG, quality ~70) to keep the initial preload fast on mobile
networks.
