"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestones } from "@/content/profile";
import { CURSOR_MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/** Resting glow of each slice, plus the same color as a follow-the-cursor glow on hover. */
const slices = [
  { rest: "bg-[radial-gradient(circle_at_20%_10%,rgb(139_123_255/0.35),transparent_60%)]", glow: "139 123 255 / 0.4" },
  { rest: "bg-[radial-gradient(circle_at_80%_20%,rgb(56_189_248/0.25),transparent_60%)]", glow: "56 189 248 / 0.3" },
  { rest: "bg-[radial-gradient(circle_at_30%_90%,rgb(204_183_255/0.3),transparent_60%)]", glow: "204 183 255 / 0.35" },
  { rest: "bg-[radial-gradient(circle_at_70%_70%,rgb(139_123_255/0.45),transparent_65%)]", glow: "139 123 255 / 0.5" },
  { rest: "bg-[radial-gradient(circle_at_50%_40%,rgb(56_189_248/0.3),transparent_60%)]", glow: "56 189 248 / 0.35" },
];

/**
 * Horizontal accordion: on desktop the active slice widens on hover or focus.
 * On small screens every slice is shown expanded in a vertical stack.
 */
export function Journey() {
  const [active, setActive] = useState(milestones.length - 1);
  const scope = useRef<HTMLElement>(null);

  // On hover the resting glow fades out and a copy of it follows the cursor inside the slice.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CURSOR_MOTION_OK, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>("[data-milestone]", scope.current).map((slice) => {
          const rest = slice.querySelector<HTMLElement>("[data-rest]");
          const glow = slice.querySelector<HTMLElement>("[data-glow]");
          if (!rest || !glow) return () => {};
          // Measured on enter, not at setup: the stylesheet may not be applied yet when this runs.
          let half = 0;

          const glowX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3" });
          const glowY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3" });
          const glowOpacity = gsap.quickTo(glow, "opacity", { duration: 0.6, ease: "power2.out" });
          const restOpacity = gsap.quickTo(rest, "opacity", { duration: 0.6, ease: "power2.out" });

          const position = (e: PointerEvent) => {
            const rect = slice.getBoundingClientRect();
            return { x: e.clientX - rect.left - half, y: e.clientY - rect.top - half };
          };
          const onEnter = (e: PointerEvent) => {
            half = glow.offsetWidth / 2;
            const { x, y } = position(e);
            gsap.set(glow, { x, y });
            glowOpacity(1);
            restOpacity(0.2);
          };
          const onMove = (e: PointerEvent) => {
            const { x, y } = position(e);
            glowX(x);
            glowY(y);
          };
          const onLeave = () => {
            glowOpacity(0);
            restOpacity(1);
          };

          slice.addEventListener("pointerenter", onEnter);
          slice.addEventListener("pointermove", onMove);
          slice.addEventListener("pointerleave", onLeave);
          return () => {
            slice.removeEventListener("pointerenter", onEnter);
            slice.removeEventListener("pointermove", onMove);
            slice.removeEventListener("pointerleave", onLeave);
          };
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    },
    { scope },
  );

  return (
    <section ref={scope} aria-labelledby="journey-title" className="pb-32 md:pb-48">
      <Container>
        <SectionHeading id="journey-title" title="From school to code." />

        <ol className="mt-16 flex flex-col gap-4 md:mt-20 lg:h-[30rem] lg:flex-row">
          {milestones.map((milestone, index) => {
            const isActive = index === active;
            const panelId = `milestone-${index}`;

            return (
              <li
                key={milestone.marker}
                data-milestone
                onMouseEnter={() => setActive(index)}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised transition-[flex-grow,border-color] duration-700 ease-out motion-reduce:transition-none lg:min-w-0 ${
                  isActive ? "lg:flex-[4] lg:border-paper/20" : "lg:flex-[1]"
                }`}
              >
                <div data-rest aria-hidden="true" className={`absolute inset-0 ${slices[index % slices.length].rest}`} />
                <div
                  data-glow
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 size-[30rem] rounded-full opacity-0 will-change-transform"
                  style={{ backgroundImage: `radial-gradient(circle, rgb(${slices[index % slices.length].glow}), transparent 62%)` }}
                />

                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="relative flex w-full items-start p-7 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent md:p-8 lg:h-full"
                >
                  <span
                    className={`text-outline text-4xl leading-none font-black tracking-tight whitespace-nowrap transition-colors duration-500 md:text-5xl ${
                      isActive ? "lg:text-paper lg:[-webkit-text-stroke:0]" : "lg:rotate-180 lg:[writing-mode:vertical-rl]"
                    }`}
                  >
                    {milestone.marker}
                  </span>
                </button>

                <div
                  id={panelId}
                  className={`relative px-7 pb-7 transition-opacity duration-500 md:px-8 md:pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:w-[min(28rem,100%)] ${
                    isActive ? "lg:opacity-100 lg:delay-200" : "lg:pointer-events-none lg:opacity-0"
                  }`}
                >
                  <p className="text-sm font-medium tracking-wide text-accent uppercase">{milestone.year}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{milestone.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{milestone.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
