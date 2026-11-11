"use client";

import { Fragment, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { aboutFacts, aboutOutro, aboutStatement } from "@/content/profile";
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

        <dl className="mx-auto mt-20 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-24">
          {aboutFacts.map((fact) => (
            <div key={fact.label} className="rounded-[1.5rem] border border-line bg-ink-raised p-6 md:p-7">
              <dt className="text-sm font-medium tracking-wide text-accent uppercase">{fact.label}</dt>
              <dd className="mt-3 leading-relaxed text-paper/80">{fact.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-muted">{aboutOutro}</p>
      </Container>
    </section>
  );
}
