"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content/profile";

/** Floating glass pill that slides away while scrolling down and returns on scroll up. */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > lastY);
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-500 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main"
        className={`flex items-center gap-1 rounded-full border py-1.5 pr-1.5 pl-2 backdrop-blur-xl transition-colors duration-500 ${
          scrolled ? "border-line bg-ink/70 shadow-2xl shadow-black/40" : "border-transparent bg-paper/[0.04]"
        }`}
      >
        <a
          href="#top"
          aria-label={`${profile.name}, back to top`}
          className="mr-1 grid size-9 place-items-center rounded-full bg-paper/5 transition-colors hover:bg-paper/10 sm:mr-3"
        >
          <Image src="/images/logo.svg" alt="" width={20} height={20} priority />
        </a>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
              link.href === "#contact"
                ? "bg-paper text-ink hover:bg-accent"
                : "text-paper/75 hover:bg-paper/10 hover:text-paper"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
