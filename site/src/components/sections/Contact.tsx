import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { contact, profile } from "@/content/profile";

export function Contact() {
  const hasEmail = profile.email.length > 0;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-24 overflow-hidden py-32 md:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-strong/30 blur-[160px]" />
      </div>

      <Container className="text-center">
        <h2
          id="contact-title"
          className="mx-auto max-w-6xl text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] font-black tracking-tight text-balance"
        >
          {contact.heading.before} {contact.heading.middle} {contact.heading.after}
        </h2>
        <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{contact.text}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {hasEmail ? (
            <ButtonLink href={`mailto:${profile.email}`}>Send me an email</ButtonLink>
          ) : null}
          <ButtonLink href={profile.githubUrl} variant={hasEmail ? "ghost" : "primary"} external>
            Find me on GitHub
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
