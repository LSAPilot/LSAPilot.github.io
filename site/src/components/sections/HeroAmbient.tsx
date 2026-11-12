"use client";

import { useRef } from "react";
import { heroAmbientMotion } from "@/animations/hero";
import { useScopedMotion } from "@/lib/motion";

/**
 * Ambient background of the hero: two color fields that drift against the cursor and a
 * soft spotlight that trails it. The motion itself lives in animations/hero.ts.
 */
export function HeroAmbient() {
  const scope = useRef<HTMLDivElement>(null);
  useScopedMotion(scope, heroAmbientMotion);

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        data-field
        className="absolute -top-40 -left-32 size-[38rem] rounded-full bg-accent-strong/25 blur-[140px] will-change-transform"
      />
      <div
        data-field
        className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-sky-500/15 blur-[140px] will-change-transform"
      />
      <div
        data-spot
        className="absolute top-0 left-0 size-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_20%,transparent),color-mix(in_srgb,var(--color-accent-strong)_8%,transparent)_45%,transparent_70%)] opacity-0 will-change-transform"
      />
    </div>
  );
}
