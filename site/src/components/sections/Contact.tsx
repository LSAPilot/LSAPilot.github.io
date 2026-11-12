"use client";

import { useId, useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/icons";
import { contact, profile } from "@/content/profile";
import { CURSOR_MOTION_OK, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

/** Distance (px) from the button center at which it starts to lean toward the cursor. */
const MAGNET_RADIUS = 200;

/**
 * Closing chapter. A big headline and a round magnetic call to action with a slowly
 * rotating text ring. Together with the footer it fills exactly one screen.
 * Reduced motion keeps all of it in a calm, static state.
 */
export function Contact() {
  const scope = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const zone = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);
  const link = useRef<HTMLAnchorElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const ringTurn = useRef<HTMLSpanElement>(null);
  const ringId = useId();

  const hasEmail = profile.email.length > 0;
  const primaryHref = hasEmail ? `mailto:${profile.email}` : profile.githubUrl;
  const primaryLabel = hasEmail ? "Send me an email" : "Find me on GitHub";
  // Non-breaking spaces so the gap around the dot survives at the seam of the ring.
  const ring = `${primaryLabel.toUpperCase()}\u00a0\u00b7\u00a0`.repeat(2);

  // "Let's build something" is split so the headline always sets in three lines.
  const split = contact.heading.before.lastIndexOf(" ");
  const lineOne = contact.heading.before.slice(0, split);
  const lineTwo = contact.heading.before.slice(split + 1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance: letters rise out of their line masks, then the button pops in.
      mm.add(MOTION_OK, () => {
        const h = headline.current;
        const c = cta.current;
        if (!h || !c) return;
        SplitText.create(h, {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.025,
              scrollTrigger: { trigger: h, start: "top 80%", once: true },
            }),
        });
        gsap.from(c, {
          scale: 0.4,
          opacity: 0,
          duration: 1.4,
          ease: "elastic.out(1, 0.55)",
          scrollTrigger: { trigger: c, start: "top 92%", once: true },
        });
      });

      // Cursor: the button leans toward the pointer.
      mm.add(CURSOR_MOTION_OK, () => {
        const root = scope.current;
        const z = zone.current;
        const c = cta.current;
        const a = arrow.current;
        const l = link.current;
        const turners = [halo.current, ringTurn.current];
        if (!root || !z || !c || !a || !l || turners.some((t) => !t)) return;

        const ctaX = gsap.quickTo(c, "x", { duration: 0.7, ease: "power3" });
        const ctaY = gsap.quickTo(c, "y", { duration: 0.7, ease: "power3" });
        const arrowX = gsap.quickTo(a, "x", { duration: 0.5, ease: "power3" });
        const arrowY = gsap.quickTo(a, "y", { duration: 0.5, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const zr = z.getBoundingClientRect();
          const dx = e.clientX - (zr.left + zr.width / 2);
          const dy = e.clientY - (zr.top + zr.height / 2);
          const near = Math.hypot(dx, dy) < MAGNET_RADIUS;
          ctaX(near ? dx * 0.35 : 0);
          ctaY(near ? dy * 0.35 : 0);
          arrowX(near ? dx * 0.18 : 0);
          arrowY(near ? dy * 0.18 : 0);
        };
        const onLeave = () => {
          ctaX(0);
          ctaY(0);
          arrowX(0);
          arrowY(0);
        };

        // Halo and text ring make one quick extra turn on hover and one back on leave; the slow
        // rotation continues underneath. Targets are absolute (0 <-> 360), so a quick in-and-out
        // simply reverses from wherever the turn is.
        const turnTo = (rotation: number) =>
          gsap.to(turners, { rotation, duration: 1, ease: "power2.inOut", overwrite: true });
        const onEnter = () => turnTo(360);
        const onExit = () => turnTo(0);

        l.addEventListener("pointerenter", onEnter);
        l.addEventListener("pointerleave", onExit);
        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        return () => {
          l.removeEventListener("pointerenter", onEnter);
          l.removeEventListener("pointerleave", onExit);
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[calc(100svh-14.1rem)] flex-col justify-center overflow-hidden py-8 md:min-h-[calc(100svh-7.6rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent-strong/35 blur-[160px]" />
        <div className="absolute top-1/4 right-0 size-[26rem] translate-x-1/3 rounded-full bg-sky-500/15 blur-[140px]" />
      </div>

      <Container className="text-center">
        <h2
          id="contact-title"
          className="mx-auto max-w-[90rem] text-[clamp(2.5rem,min(7.5vw,9.5vh),8rem)] leading-[1.02] font-black tracking-tight"
        >
          <span className="block">{lineOne}</span>
          <span className="block">
            {lineTwo} <span className="text-accent">{contact.heading.middle}</span>
          </span>
          <span className="block">{contact.heading.after}</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{contact.text}</p>

        <div ref={zone} className="relative mx-auto mt-8 grid size-56 place-items-center">
          <div ref={cta} className="relative grid size-40 place-items-center md:size-44">
            {/* Halo and sonar rings sit behind the button and move with it. */}
            <div ref={halo} aria-hidden="true" className="absolute -inset-8">
              <div className="size-full rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-strong),#38bdf8,var(--color-accent),var(--color-accent-strong))] opacity-50 blur-2xl motion-safe:animate-ring-turn" />
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-accent/50 motion-safe:animate-sonar"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-accent/30 motion-safe:animate-sonar-offset"
            />

            <a
              ref={link}
              href={primaryHref}
              aria-label={primaryLabel}
              {...(hasEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="group relative grid size-full place-items-center rounded-full bg-accent text-ink transition-colors duration-300 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
            >
              <span ref={ringTurn} aria-hidden="true" className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="size-full motion-safe:animate-ring-turn">
                <defs>
                  <path id={ringId} d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1 -156 0" />
                </defs>
                <text className="fill-ink text-[14px] font-bold">
                  <textPath href={`#${ringId}`} textLength="489" lengthAdjust="spacing">
                    {ring}
                  </textPath>
                </text>
              </svg>
              </span>
              <span ref={arrow} className="relative">
                <ArrowIcon className="size-14 transition-transform duration-500 ease-out group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        {hasEmail ? (
          <div className="mt-6 flex justify-center">
            <ButtonLink href={profile.githubUrl} variant="ghost" external>
              Find me on GitHub
            </ButtonLink>
          </div>
        ) : null}
      </Container>

    </section>
  );
}
