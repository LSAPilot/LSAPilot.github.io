"use client";

import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/icons";
import { profile, projects, type Project } from "@/content/profile";
import { DESKTOP_MOTION_OK, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-line bg-ink-raised">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="size-full object-cover contrast-125 grayscale-[35%] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="max-w-xl">
          <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-paper/70">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-accent">
          {project.linkLabel}
          <ArrowIcon className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
}

/** Pinned title on the left while the project gallery scrolls past on the right (desktop only). */
export function Work() {
  const scope = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION_OK, () => {
        ScrollTrigger.create({
          trigger: intro.current,
          start: "top 128px",
          end: () => `+=${Math.max(0, (gallery.current?.offsetHeight ?? 0) - (intro.current?.offsetHeight ?? 0))}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id="work" aria-labelledby="work-title" className="scroll-mt-24 py-32 md:py-48">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div ref={intro}>
            <h2 id="work-title" className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-bold tracking-tight">
              Selected work
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Projects I designed and built, from creative coding to a full website. More are on the way.
            </p>
            <ButtonLink href={profile.githubUrl} variant="ghost" external className="mt-10">
              More on GitHub
            </ButtonLink>
          </div>
        </div>

        <div ref={gallery} className="flex flex-col gap-24 md:gap-32 lg:col-span-7">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
