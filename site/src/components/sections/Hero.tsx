import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { LoopingVideo } from "@/components/ui/LoopingVideo";
import { hero, profile } from "@/content/profile";
import { HeroAmbient } from "./HeroAmbient";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center pt-36 pb-24 md:pt-44">
      <HeroAmbient />

      <Container>
        <h1
          id="hero-title"
          className="max-w-6xl animate-rise text-[clamp(2.5rem,1.25rem+4.5vw,5.5rem)] leading-[1.02] font-bold tracking-tight motion-reduce:animate-none"
        >
          {hero.greeting} <span className="whitespace-nowrap text-accent">{profile.name}.</span>
        </h1>

        <div className="mt-14 grid items-start gap-14 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="animate-rise [animation-delay:150ms] motion-reduce:animate-none lg:col-span-5 lg:pt-8">
            <p className="text-2xl leading-snug font-medium text-paper md:text-3xl">{profile.role}.</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{profile.study}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <figure className="group animate-rise [animation-delay:300ms] motion-reduce:animate-none lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-ink-raised">
              <LoopingVideo
                video={hero.art}
                preload="auto"
                className="size-full object-cover contrast-125 saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Vignette in the page background color. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,color-mix(in_srgb,var(--color-ink)_70%,transparent))]"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted">{hero.art.caption}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
