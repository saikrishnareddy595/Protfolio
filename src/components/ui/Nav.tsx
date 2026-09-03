"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { chapters, profile } from "@/lib/content";
import { scroll } from "@/lib/scroll";
import { StatusDot } from "./primitives";

export function Nav({
  reduced,
  onToggleMotion,
}: {
  reduced: boolean;
  onToggleMotion: () => void;
}) {
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);
  const raf = useRef(0);

  // Track the active chapter off the shared scroll value — no scroll listeners
  // in React, no re-render unless the chapter actually changes.
  useEffect(() => {
    const bounds: [string, number, number][] = [
      ["hero", 0, 0.155],
      ["spectrum", 0.155, 0.41],
      ["capital-one", 0.41, 0.665],
      ["teradata", 0.665, 0.925],
      ["contact", 0.925, 1.01],
    ];
    let current = "hero";
    const loop = () => {
      const p = scroll.progress;
      const found = bounds.find(([, a, b]) => p >= a && p < b)?.[0] ?? "contact";
      if (found !== current) {
        current = found;
        setActive(found);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
        <a
          href="#hero"
          className="glass-soft group flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-sm"
        >
          <StatusDot />
          <span className="font-mono text-[0.7rem] tracking-[0.14em] text-white/90">SKR</span>
          <span className="hidden text-[0.72rem] text-silver-faint sm:inline">
            {profile.location}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="glass-soft hidden items-center gap-1 rounded-full px-1.5 py-1.5 md:flex">
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={active === c.id ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    active === c.id ? "text-white" : "text-silver-faint hover:text-silver-dim"
                  }`}
                >
                  {active === c.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggleMotion}
            aria-pressed={reduced}
            title={reduced ? "Enable motion" : "Reduce motion"}
            className="glass-soft hidden h-9 w-9 items-center justify-center rounded-full text-silver-dim transition-colors hover:text-white sm:flex"
          >
            <span className="sr-only">{reduced ? "Enable motion" : "Reduce motion"}</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              {reduced ? (
                <>
                  <circle cx="10" cy="10" r="6.2" />
                  <path d="M7.4 10h5.2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx="10" cy="10" r="2.4" />
                  <path d="M10 3.2v1.6M10 15.2v1.6M3.2 10h1.6M15.2 10h1.6" strokeLinecap="round" />
                  <path d="M5.4 5.4l1.1 1.1M13.5 13.5l1.1 1.1M14.6 5.4l-1.1 1.1M6.5 13.5l-1.1 1.1" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>

          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="glass-soft group relative overflow-hidden rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-cyber/40"
          >
            <span className="relative z-10">Résumé</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyber/0 via-cyber/25 to-cyber/0 transition-transform duration-700 ease-expo group-hover:translate-x-full" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="glass-soft flex h-9 w-9 items-center justify-center rounded-full text-silver-dim md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={open ? "M5 5l10 10M15 5L5 15" : "M4 7h12M4 13h12"} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-5 mb-2 grid gap-1 rounded-2xl p-2 md:hidden"
        >
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] ${
                  active === c.id ? "bg-white/[0.07] text-white" : "text-silver-dim"
                }`}
              >
                {c.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}

export default Nav;
