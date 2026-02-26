"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/social-icons";
import { socials } from "@/lib/socials";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-ink">
          KRISHNA REDDY
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary navigation" className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    isActive ? "bg-white/15 text-ink" : "text-slate hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <a
            href={socials.GitHub}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate transition hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
