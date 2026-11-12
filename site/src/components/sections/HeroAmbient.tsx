"use client";

import { useRef } from "react";
import { CURSOR_MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/**
 * Ambient background of the hero: two color fields that drift against the cursor
 * (parallax) and a soft spotlight that trails it. Only transforms and opacity are
 * animated, through gsap.quickTo(), so pointer moves reuse a single tween each.
 */
export function HeroAmbient() {
  const scope = useRef<HTMLDivElement>(null);
  const fieldA = useRef<HTMLDivElement>(null);
  const fieldB = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = scope.current?.closest("section");
      const a = fieldA.current;
      const b = fieldB.current;
      const s = spot.current;
      if (!hero || !a || !b || !s) return;

      const mm = gsap.matchMedia();
      mm.add(CURSOR_MOTION_OK, () => {
        // Measured on the first move, not at setup: the stylesheet may not be applied yet when this runs.
        let half = 0;

        const spotX = gsap.quickTo(s, "x", { duration: 0.7, ease: "power3" });
        const spotY = gsap.quickTo(s, "y", { duration: 0.7, ease: "power3" });
        const spotOpacity = gsap.quickTo(s, "opacity", { duration: 0.8, ease: "power2.out" });
        const aX = gsap.quickTo(a, "x", { duration: 1.6, ease: "power3" });
        const aY = gsap.quickTo(a, "y", { duration: 1.6, ease: "power3" });
        const bX = gsap.quickTo(b, "x", { duration: 2, ease: "power3" });
        const bY = gsap.quickTo(b, "y", { duration: 2, ease: "power3" });

        let inside = false;

        const onMove = (e: PointerEvent) => {
          const rect = hero.getBoundingClientRect();
          const px = e.clientX - rect.left;
          const py = e.clientY - rect.top;

          if (!inside) {
            // First move: start under the cursor instead of flying in from the corner.
            inside = true;
            half = s.offsetWidth / 2;
            gsap.set(s, { x: px - half, y: py - half });
            spotOpacity(1);
          }

          spotX(px - half);
          spotY(py - half);

          // -0.5 .. 0.5 across the hero; the fields move against the cursor.
          const nx = px / rect.width - 0.5;
          const ny = py / rect.height - 0.5;
          aX(nx * -90);
          aY(ny * -60);
          bX(nx * 120);
          bY(ny * 80);
        };

        const onLeave = () => {
          inside = false;
          spotOpacity(0);
          aX(0);
          aY(0);
          bX(0);
          bY(0);
        };

        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
        return () => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={fieldA}
        className="absolute -top-40 -left-32 size-[38rem] rounded-full bg-accent-strong/25 blur-[140px] will-change-transform"
      />
      <div
        ref={fieldB}
        className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-sky-500/15 blur-[140px] will-change-transform"
      />
      <div
        ref={spot}
        className="absolute top-0 left-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(204_183_255/0.2),rgb(139_123_255/0.08)_45%,transparent_70%)] opacity-0 will-change-transform"
      />
    </div>
  );
}
