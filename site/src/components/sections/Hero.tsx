import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";

export function Hero() {
  const art = profile.images.p5js;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center pt-36 pb-24 md:pt-44">
      {/* Ambient mesh: two soft color fields behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-[38rem] rounded-full bg-accent-strong/25 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[32rem] rounded-full bg-sky-500/15 blur-[140px]" />
      </div>

      <Container>
        <h1
          id="hero-title"
          className="max-w-6xl animate-rise text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-bold tracking-tight motion-reduce:animate-none"
        >
          Hello, I am <span className="whitespace-nowrap text-accent">{profile.name}.</span>
        </h1>

        <div className="mt-14 grid items-start gap-14 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="animate-rise [animation-delay:150ms] motion-reduce:animate-none lg:col-span-5 lg:pt-8">
            <p className="text-2xl leading-snug font-medium text-paper md:text-3xl">{profile.role}.</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              {profile.study}, building websites and software next to my studies.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#work">View my work</ButtonLink>
              <ButtonLink href="#contact" variant="ghost">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <figure className="group animate-rise [animation-delay:300ms] motion-reduce:animate-none lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-ink-raised">
              <Image
                src={art.src}
                alt={art.alt}
                width={art.width}
                height={art.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full object-cover contrast-125 saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgb(8_7_13/0.7))]" />
            </div>
            <figcaption className="mt-4 text-sm text-muted">Generative sketch, made with p5.js</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
