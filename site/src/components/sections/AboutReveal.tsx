"use client";

import { Fragment, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { aboutStatement } from "@/content/profile";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Words brighten one after another as the statement scrolls through the viewport. */
export function AboutReveal() {
  const scope = useRef<HTMLElement>(null);
  const words = aboutStatement.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: "[data-statement]",
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id="about" aria-labelledby="about-title" className="relative scroll-mt-24 py-32 md:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-80 max-w-3xl -translate-y-1/2 rounded-full bg-accent-strong/10 blur-[120px]"
      />
      <Container>
        <h2 id="about-title" className="sr-only">
          About me
        </h2>
        <p
          data-statement
          className="mx-auto max-w-5xl text-center text-[clamp(1.875rem,4vw,3.5rem)] leading-[1.15] font-bold tracking-tight text-balance"
        >
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span data-word className="inline-block">
                {word}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </Container>
    </section>
  );
}
