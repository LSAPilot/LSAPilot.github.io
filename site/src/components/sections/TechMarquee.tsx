"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon, SparkIcon } from "@/components/ui/icons";
import { focusAreas } from "@/content/profile";
import { cx } from "@/lib/cx";

function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {focusAreas.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-5 text-[clamp(1.25rem,0.75rem+1.5vw,2rem)] font-semibold tracking-tight whitespace-nowrap text-paper/70 md:px-8">
            {item}
          </span>
          <SparkIcon className="size-3 text-accent/70 md:size-4" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Endless typographic band of my focus areas. The row is rendered twice so the loop is
 * seamless; the copy is hidden from screen readers. It pauses on hover and has a pause
 * button (WCAG 2.2.2); under reduced motion it stands still and the button is not needed.
 */
export function TechMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="Focus areas" className="relative border-y border-line py-6 md:py-8">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className={cx("flex w-max motion-safe:animate-marquee group-hover:animation-paused", paused && "animation-paused")}>
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play scrolling text" : "Pause scrolling text"}
        className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 text-paper/80 backdrop-blur transition-colors hover:text-paper motion-reduce:hidden"
      >
        {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
      </button>
    </section>
  );
}
