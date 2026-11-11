import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GitHubIcon } from "@/components/ui/icons";
import { navLinks, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="" width={24} height={24} />
          <span className="font-medium">{profile.name}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-paper">
              {link.label}
            </a>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-paper"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </nav>

        <p className="text-sm text-muted">&copy; {new Date().getFullYear()} {profile.name}</p>
      </Container>
    </footer>
  );
}
