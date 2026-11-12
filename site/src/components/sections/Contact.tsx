import { MotionSection } from "@/components/motion/MotionSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/icons";
import { contact, profile } from "@/content/profile";

/** Radius of the circle the ring text runs along, in the SVG's 200 x 200 viewBox. */
const RING_RADIUS = 78;
/** The text is stretched to exactly one lap so its start meets its end. */
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const RING_PATH = `M100 100m-${RING_RADIUS} 0a${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${2 * RING_RADIUS} 0a${RING_RADIUS} ${RING_RADIUS} 0 1 1 -${2 * RING_RADIUS} 0`;
/** Only one ring exists on the page, so a fixed id is unique. */
const RING_PATH_ID = "contact-ring-path";

/**
 * Closing chapter. A big headline and a round magnetic call to action with a slowly
 * rotating text ring; the motion lives in animations/contact.ts.
 *
 * Together with the footer it fills exactly one screen: the min-heights subtract the
 * footer's height (14.1rem stacked on mobile, 7.6rem from md). Keep them in sync with Footer.
 * The negative scroll margin cancels html's scroll-padding-top, so #contact lands flush.
 */
export function Contact() {
  const hasEmail = profile.email.length > 0;
  const primaryHref = hasEmail ? `mailto:${profile.email}` : profile.githubUrl;
  const primaryLabel = hasEmail ? contact.emailLabel : contact.githubLabel;
  // Non-breaking spaces so the gap around the dot survives at the seam of the ring.
  const ringText = `${primaryLabel.toUpperCase()} · `.repeat(2);

  return (
    <MotionSection
      motion="contact"
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate flex -scroll-mt-24 min-h-[calc(100svh-14.1rem)] flex-col justify-center overflow-hidden py-8 md:min-h-[calc(100svh-7.6rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent-strong/35 blur-[160px]" />
        <div className="absolute top-1/4 right-0 size-[26rem] translate-x-1/3 rounded-full bg-sky-500/15 blur-[140px]" />
      </div>

      <Container className="text-center">
        <h2
          id="contact-title"
          data-headline
          className="mx-auto max-w-[90rem] text-[clamp(2.5rem,1rem+min(6vw,7.5vh),8rem)] leading-[1.02] font-black tracking-tight"
        >
          {/* The trailing space keeps words apart in the accessible name; block spans add no whitespace. */}
          {contact.headline.map(({ text, accent }) => (
            <span key={text} className="block">
              {text}
              {accent && (
                <>
                  {" "}
                  <span className="text-accent">{accent}</span>
                </>
              )}{" "}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{contact.text}</p>

        {/* The zone stays in place and serves as the reference point for the magnet. */}
        <div data-magnet-zone className="relative mx-auto mt-8 grid size-56 place-items-center">
          <div data-magnet className="relative grid size-40 place-items-center md:size-44">
            {/* Halo and sonar rings sit behind the button and move with it. */}
            <div data-turn aria-hidden="true" className="absolute -inset-8">
              <div className="size-full rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-strong),var(--color-sky),var(--color-accent),var(--color-accent-strong))] opacity-50 blur-2xl motion-safe:animate-ring-turn" />
            </div>
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-accent/50 motion-safe:animate-sonar" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-accent/30 motion-safe:animate-sonar-offset" />

            <a
              data-cta
              href={primaryHref}
              aria-label={hasEmail ? primaryLabel : `${primaryLabel} (opens in a new tab)`}
              {...(!hasEmail && { target: "_blank", rel: "noopener noreferrer" })}
              className="group relative grid size-full place-items-center rounded-full bg-accent text-ink transition-colors duration-300 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
            >
              {/* Outer span: the quick turn on hover (GSAP). Inner svg: the slow endless turn (CSS). */}
              <span data-turn aria-hidden="true" className="absolute inset-0">
                <svg viewBox="0 0 200 200" className="size-full motion-safe:animate-ring-turn">
                  <defs>
                    <path id={RING_PATH_ID} d={RING_PATH} />
                  </defs>
                  <text className="fill-ink text-[14px] font-bold">
                    <textPath href={`#${RING_PATH_ID}`} textLength={RING_LENGTH} lengthAdjust="spacing">
                      {ringText}
                    </textPath>
                  </text>
                </svg>
              </span>
              <span data-magnet-arrow className="relative">
                <ArrowIcon className="size-14 transition-transform duration-500 ease-out group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        {hasEmail && (
          <div className="mt-6 flex justify-center">
            <ButtonLink href={profile.githubUrl} variant="ghost" external>
              {contact.githubLabel}
            </ButtonLink>
          </div>
        )}
      </Container>
    </MotionSection>
  );
}
