"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestones } from "@/content/profile";

const sliceBackgrounds = [
  "bg-[radial-gradient(circle_at_20%_10%,rgb(139_123_255/0.35),transparent_60%)]",
  "bg-[radial-gradient(circle_at_80%_20%,rgb(56_189_248/0.25),transparent_60%)]",
  "bg-[radial-gradient(circle_at_30%_90%,rgb(204_183_255/0.3),transparent_60%)]",
  "bg-[radial-gradient(circle_at_70%_70%,rgb(139_123_255/0.45),transparent_65%)]",
];

/**
 * Horizontal accordion: on desktop the active slice widens on hover or focus.
 * On small screens every slice is shown expanded in a vertical stack.
 */
export function Journey() {
  const [active, setActive] = useState(milestones.length - 1);

  return (
    <section aria-labelledby="journey-title" className="pb-32 md:pb-48">
      <Container>
        <SectionHeading id="journey-title" title="From school to code." />

        <ol className="mt-16 flex flex-col gap-4 md:mt-20 lg:h-[30rem] lg:flex-row">
          {milestones.map((milestone, index) => {
            const isActive = index === active;
            const panelId = `milestone-${index}`;

            return (
              <li
                key={milestone.marker}
                onMouseEnter={() => setActive(index)}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised transition-[flex-grow,border-color] duration-700 ease-out motion-reduce:transition-none lg:min-w-0 ${
                  isActive ? "lg:flex-[4] lg:border-paper/20" : "lg:flex-[1]"
                }`}
              >
                <div aria-hidden="true" className={`absolute inset-0 ${sliceBackgrounds[index % sliceBackgrounds.length]}`} />

                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="relative flex w-full items-start p-7 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent md:p-8 lg:h-full"
                >
                  <span
                    className={`text-outline text-5xl leading-none font-black tracking-tight whitespace-nowrap transition-colors duration-500 md:text-6xl ${
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
                  <h3 className="text-2xl font-bold tracking-tight">{milestone.title}</h3>
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
