"use client";

import { useRef } from "react";
import { aboutAmbientMotion } from "@/animations/about";
import { Starfield, type Star } from "@/components/ui/Starfield";
import { useScopedMotion } from "@/lib/motion";

const STARS: ReadonlyArray<Star> = [
  [6, 12], [14, 64], [22, 30], [31, 82], [38, 8], [47, 52], [55, 90],
  [63, 22], [71, 70], [79, 14], [86, 48], [92, 84], [96, 28], [44, 36],
];

/**
 * Ambient background of the About section: slow aurora fields and a few twinkling points.
 * Static under reduced motion. The motion itself lives in animations/about.ts.
 */
export function AboutAmbient() {
  const scope = useRef<HTMLDivElement>(null);
  useScopedMotion(scope, aboutAmbientMotion);

  return (
    // Taller than the section on purpose: the blurred fields bleed into the neighbouring sections
    // instead of being cut off at the edge. Only the x axis is clipped, to avoid a horizontal scrollbar.
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-48 -z-10 overflow-x-clip">
      <div data-aurora className="absolute top-[10%] left-[4%] size-[30rem] rounded-full bg-accent-strong/20 blur-[120px] will-change-transform" />
      <div data-aurora className="absolute top-[40%] right-0 size-[28rem] rounded-full bg-sky-500/15 blur-[120px] will-change-transform" />
      <div data-aurora className="absolute bottom-[8%] left-[34%] size-[26rem] rounded-full bg-accent/15 blur-[120px] will-change-transform" />
      {/* Stars stay inside the section itself. */}
      <div className="absolute inset-x-0 top-48 bottom-48">
        <Starfield stars={STARS} />
      </div>
    </div>
  );
}
