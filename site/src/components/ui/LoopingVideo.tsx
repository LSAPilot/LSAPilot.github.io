"use client";

import { useEffect, useRef } from "react";
import type { VideoAsset } from "@/content/profile";
import { REDUCED_MOTION } from "@/lib/media-queries";

type LoopingVideoProps = {
  video: VideoAsset;
  className?: string;
  /** "auto" for above-the-fold videos, "metadata" for everything further down. */
  preload?: "auto" | "metadata";
};

/**
 * Muted, looping, inline video that stands still on its poster frame when the visitor
 * prefers reduced motion (WCAG 2.2.2: moving content must not play endlessly without control).
 */
export function LoopingVideo({ video, className, preload = "metadata" }: LoopingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const query = window.matchMedia(REDUCED_MOTION);
    const sync = () => {
      if (query.matches) {
        element.pause();
        element.currentTime = 0;
      } else {
        // play() rejects when the browser blocks autoplay; the poster then stays visible.
        element.play().catch(() => {});
      }
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster.src}
      aria-label={video.poster.alt}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      className={className}
    />
  );
}
