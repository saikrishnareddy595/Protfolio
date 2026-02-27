"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { IconLink } from "@/components/IconLink";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { socials } from "@/config/socials";

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};

const homeNavItems: NavItem[] = [
  { label: "Home", href: "/", sectionId: "top" },
  { label: "Projects Worked", href: "/#projects", sectionId: "projects" },
  { label: "Skills Matrix", href: "/#skills", sectionId: "skills" },
  { label: "Experience", href: "/#experience", sectionId: "experience" }
];

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects Worked", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>(pathname);

  const isHome = pathname === "/";
  const navItems = useMemo(() => (isHome ? homeNavItems : defaultNavItems), [isHome]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(pathname);
      return;
    }

    const sectionIds = homeNavItems.map((item) => item.sectionId).filter(Boolean) as string[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        setActiveSection(visible.target.id === "top" ? "/" : `/#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    const topAnchor = document.getElementById("top");
    if (topAnchor) observer.observe(topAnchor);

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isHome, pathname]);

  const handleAnchorNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    if (!isHome || !sectionId) return;

    event.preventDefault();

    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-sm font-semibold tracking-[0.18em] text-zinc-100">
          KRISHNA REDDY
        </Link>

        <nav aria-label="Primary" className="no-scrollbar flex max-w-[55vw] items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 sm:max-w-none">
          {navItems.map((item) => {
            const isActive = activeSection === item.href || (!isHome && pathname === item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleAnchorNavigation(event, item.href, item.sectionId)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition duration-300 ${
                  isActive ? "bg-white/15 text-zinc-100" : "text-zinc-300 hover:bg-white/[0.1] hover:text-zinc-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {socials.LinkedIn ? <IconLink href={socials.LinkedIn} label="LinkedIn" icon={<LinkedInIcon className="h-4 w-4" />} /> : null}
          {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
          <Button href="/contact" className="hidden sm:inline-flex">
            Contact
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
