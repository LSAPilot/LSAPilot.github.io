import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowIcon } from "./icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** Opens in a new tab and says so to screen readers. */
  external?: boolean;
  className?: string;
};

const variants = {
  // Light background with dark text.
  primary: "bg-accent text-ink hover:bg-paper",
  // Dark background with light text.
  ghost: "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/10",
} satisfies Record<NonNullable<ButtonLinkProps["variant"]>, string>;

export function ButtonLink({ href, children, variant = "primary", external = false, className }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        variants[variant],
        className,
      )}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
