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
  { label: "Home",       href: "/",           sectionId: "top" },
  { label: "Projects",   href: "/#projects",  sectionId: "projects" },
  { label: "Skills",     href: "/#skills",    sectionId: "skills" },
  { label: "Experience", href: "/#experience",sectionId: "experience" },
  { label: "Education",  href: "/#education", sectionId: "education" },
];

const defaultNavItems: NavItem[] = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Resume",   href: "/resume" },
  { label: "Contact",  href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>(pathname);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const navItems = useMemo(() => (isHome ? homeNavItems : defaultNavItems), [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(pathname);
      return;
    }

    const sectionIds = homeNavItems.map((item) => item.sectionId).filter(Boolean) as string[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveSection(visible.target.id === "top" ? "/" : `/#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    const topAnchor = document.getElementById("top");
    if (topAnchor) observer.observe(topAnchor);
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const handleAnchorNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string
  ) => {
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#030308]/85 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading shrink-0 text-sm font-bold tracking-[0.22em] text-white transition-colors hover:text-indigo-200"
        >
          KRISHNA REDDY
        </Link>

        <nav
          aria-label="Primary"
          className="no-scrollbar flex max-w-[55vw] items-center gap-0.5 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl sm:max-w-none"
        >
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href || (!isHome && pathname === item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleAnchorNavigation(event, item.href, item.sectionId)
                }
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-100 shadow-[inset_0_1px_0_rgba(129,140,248,0.2)]"
                    : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {socials.LinkedIn ? (
            <IconLink href={socials.LinkedIn} label="LinkedIn" icon={<LinkedInIcon className="h-4 w-4" />} />
          ) : null}
          {socials.GitHub ? (
            <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} />
          ) : null}
          <Button href="/contact" className="hidden sm:inline-flex">
            Contact
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
