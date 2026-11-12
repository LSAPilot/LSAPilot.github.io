import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/icons";
import { LoopingVideo } from "@/components/ui/LoopingVideo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/TagList";
import { profile, work, type Media, type Project } from "@/content/profile";
import { cx } from "@/lib/cx";
import { WorkAmbient } from "./WorkAmbient";

const zoomOnHover = "transition duration-700 ease-out group-hover:scale-105";

function ProjectMedia({ media }: { media: Media }) {
  if (media.kind === "video") {
    return <LoopingVideo video={media} className={cx("size-full object-cover object-top", zoomOnHover)} />;
  }

  const { image, fit = "cover" } = media;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(min-width: 1024px) 55vw, 100vw"
      className={
        fit === "contain"
          ? "size-full object-contain p-4"
          : cx("size-full object-cover contrast-125 grayscale-[35%] group-hover:grayscale-0", zoomOnHover)
      }
    />
  );
}

/**
 * The project link. Its ::after stretches over the whole card, so the card stays clickable
 * while the link itself has a short, unique name instead of the card's entire text.
 */
function ProjectLink({ href, label, project }: { href: string; label: string; project: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-accent",
        "after:absolute after:inset-0 after:rounded-[2rem] after:content-['']",
        // The focus ring is drawn around the whole card, matching what the link covers.
        "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent",
      )}
    >
      {label}
      <ArrowIcon className="size-4" />
      <span className="sr-only">: {project} (opens in a new tab)</span>
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { href, media } = project;
  const contain = media.kind === "image" && media.fit === "contain";

  return (
    <article className="group relative rounded-[2rem]">
      <div
        className={cx(
          "relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-line",
          contain ? "bg-white" : "bg-ink-raised",
        )}
      >
        <ProjectMedia media={media} />
        {!contain && (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="max-w-xl">
          <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>
          <TagList items={project.tags} label="Technologies" className="mt-5" />
        </div>
        {href ? (
          <ProjectLink href={href} label={project.linkLabel} project={project.title} />
        ) : (
          <span className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-muted">
            {project.linkLabel}
          </span>
        )}
      </div>
    </article>
  );
}

/** Pinned intro on the left while the project gallery scrolls past on the right (desktop only). */
export function Work() {
  return (
    <MotionSection motion="work" id="work" aria-labelledby="work-title" className="relative isolate py-32 md:py-48">
      <WorkAmbient />
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-pin>
            <SectionHeading id="work-title" title={work.title} intro={work.intro} />
            <ButtonLink href={profile.githubUrl} variant="ghost" external className="mt-10">
              {work.moreLabel}
            </ButtonLink>
          </div>
        </div>

        <div data-pin-track className="flex flex-col gap-24 md:gap-32 lg:col-span-7">
          {work.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
