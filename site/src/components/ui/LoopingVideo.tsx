"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/content/profile";
import { cx } from "@/lib/cx";
import { REDUCED_MOTION } from "@/lib/media-queries";
import { PauseIcon, PlayIcon } from "./icons";

type LoopingVideoProps = {
  video: VideoAsset;
  className?: string;
  /** "auto" for above-the-fold videos, "metadata" for everything further down. */
  preload?: "auto" | "metadata";
};

/**
 * Muted, looping, inline video with a pause button (WCAG 2.2.2: moving content that runs
 * longer than five seconds needs a way to pause it). Under reduced motion it starts paused
 * on its poster frame and can still be played on demand.
 *
 * Render it inside a positioned container: the button is placed in its bottom-right corner.
 */
export function LoopingVideo({ video, className, preload = "metadata" }: LoopingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const query = window.matchMedia(REDUCED_MOTION);
    const applyPreference = () => {
      if (query.matches) {
        element.pause();
        element.currentTime = 0;
      } else {
        // play() rejects when the browser blocks autoplay; the poster then stays visible.
        element.play().catch(() => {});
      }
    };

    // autoPlay may start (or be blocked) before React attaches onPlay/onPause, so read the actual state once.
    setPlaying(!element.paused);
    applyPreference();
    query.addEventListener("change", applyPreference);
    return () => query.removeEventListener("change", applyPreference);
  }, []);

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  };

  return (
    <>
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
        // The element's own events keep the button in sync, whatever paused or started it.
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={className}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className={cx(
          "absolute right-3 bottom-3 z-10 grid size-10 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper backdrop-blur",
          "transition-colors hover:bg-ink focus-visible:outline-accent",
        )}
      >
        {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
      </button>
    </>
  );
}
