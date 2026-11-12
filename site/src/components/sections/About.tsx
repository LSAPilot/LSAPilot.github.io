import { Fragment } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/ui/Container";
import { about } from "@/content/profile";
import { AboutAmbient } from "./AboutAmbient";

/** Statement whose words brighten while scrolling, a few short facts and an ambient background. */
export function About() {
  const words = about.statement.split(" ");

  return (
    <MotionSection motion="about" id="about" aria-labelledby="about-title" className="relative isolate scroll-mt-24 py-32 md:py-48">
      <AboutAmbient />
      <Container>
        <h2 id="about-title" className="sr-only">
          {about.title}
        </h2>
        <p
          data-statement
          className="mx-auto max-w-5xl text-center text-[clamp(1.875rem,4vw,3.5rem)] leading-[1.15] font-bold tracking-tight text-balance"
        >
          {/* Words are wrapped individually so they can brighten one by one; the spaces stay real text. */}
          {words.map((word, index) => (
            // The statement is static text, so the position is a stable key even for repeated words.
            <Fragment key={index}>
              <span data-word className="inline-block">
                {word}
              </span>{" "}
            </Fragment>
          ))}
        </p>

        <dl className="mx-auto mt-20 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-24">
          {about.facts.map((fact) => (
            <div key={fact.label} className="rounded-[1.5rem] border border-line bg-ink-raised p-6 md:p-7">
              <dt className="text-sm font-medium tracking-wide text-accent uppercase">{fact.label}</dt>
              <dd className="mt-3 leading-relaxed text-paper/80">{fact.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-muted">{about.outro}</p>
      </Container>
    </MotionSection>
  );
}
