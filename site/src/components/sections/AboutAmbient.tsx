"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Fixed positions (percent) so server and client render the same markup. */
const STARS = [
  [6, 12], [14, 64], [22, 30], [31, 82], [38, 8], [47, 52], [55, 90],
  [63, 22], [71, 70], [79, 14], [86, 48], [92, 84], [96, 28], [44, 36],
] as const;

/**
 * Ambient background of the About section: slow aurora fields that drift on their own
 * plus a few twinkling points. No scroll or cursor input, which sets it apart from the hero.
 * Under reduced motion everything stays in a calm, static state.
 */
export function AboutAmbient() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const drift = [
          { x: 140, y: -70 },
          { x: -160, y: 90 },
          { x: 110, y: -100 },
        ];

        gsap.utils.toArray<HTMLElement>("[data-aurora]").forEach((el, i) => {
          // Two tweens with different periods so the motion never visibly repeats.
          gsap.to(el, { ...drift[i % drift.length], duration: 16 + i * 5, ease: "sine.inOut", repeat: -1, yoyo: true });
          gsap.fromTo(
            el,
            { scale: 0.9, opacity: 0.55 },
            { scale: 1.25, opacity: 1, duration: 9 + i * 3, ease: "sine.inOut", repeat: -1, yoyo: true },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-star]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0.08 },
            { opacity: 0.85, duration: 2 + (i % 4) * 0.8, delay: (i * 0.37) % 3, ease: "sine.inOut", repeat: -1, yoyo: true },
          );
        });
      });
    },
    { scope },
  );

  return (
    // Taller than the section on purpose: the blurred fields bleed into the neighbouring sections
    // instead of being cut off at the edge. Only the x axis is clipped, to avoid a horizontal scrollbar.
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-48 -z-10 overflow-x-clip">
      <div data-aurora className="absolute top-[10%] left-[4%] size-[30rem] rounded-full bg-accent-strong/20 blur-[120px] will-change-transform" />
      <div data-aurora className="absolute top-[40%] right-[0%] size-[28rem] rounded-full bg-sky-500/15 blur-[120px] will-change-transform" />
      <div data-aurora className="absolute bottom-[8%] left-[34%] size-[26rem] rounded-full bg-accent/15 blur-[120px] will-change-transform" />
      {/* Stars stay inside the section itself. */}
      <div className="absolute inset-x-0 top-48 bottom-48">
        {STARS.map(([left, top], i) => (
          <span
            key={i}
            data-star
            className="absolute size-1 rounded-full bg-accent opacity-40"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
    </div>
  );
}
