"use client";

import { motion } from "framer-motion";
import { heroStats, profile, engineeringPillars, selectedProjects } from "@/lib/content";
import { StatusDot, GithubIcon, LinkedinIcon } from "./primitives";
import { FileText, Mail, ArrowDown, Sparkles, Terminal } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { opacity: 0, y: "0.42em" },
  show: (i: number) => ({
    opacity: 1,
    y: "0em",
    transition: { duration: 1.0, delay: 0.2 + i * 0.1, ease: EASE },
  }),
};

export function Hero({ started }: { started: boolean }) {
  const animate = started ? "show" : "hidden";

  return (
    <section id="hero" className="relative" style={{ height: "135svh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-5 pb-12 pt-20 short:pb-8 short:pt-16 sm:px-8 sm:pb-14 sm:pt-24">
        {/* Top bar: Recruiter status & rapid context */}
        <motion.div
          initial="hidden"
          animate={animate}
          variants={line}
          custom={0}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="glass-soft flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs">
            <StatusDot />
            <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-white/90">
              Open to AI Engineer & Forward Deployed Engineer roles
            </span>
          </div>
        </motion.div>

        {/* Scroll cue, pinned at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center short:hidden"
        >
          <a
            href="#profile-snapshot"
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-void/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-silver-faint backdrop-blur-md transition-colors hover:text-cyber"
          >
            <span className="h-4 w-px overflow-hidden bg-white/[0.15]">
              <span className="block h-full w-full animate-scan bg-cyber" />
            </span>
            Explore Systems <ArrowDown className="h-3 w-3" />
          </a>
        </motion.div>

        {/* Bottom Hero Content: The Recruiter-Optimized Masthead */}
        <div className="relative mt-auto">
          {/* Subtle gradient scrim to guarantee maximum typography legibility against the 3D canvas */}
          <div className="pointer-events-none absolute inset-x-[-2rem] bottom-[-4rem] top-[-9rem] bg-gradient-to-t from-void via-void/90 to-transparent" />

          <div className="relative">
            {/* Direct Role & Experience Badge */}
            <motion.div
              initial="hidden"
              animate={animate}
              variants={line}
              custom={1}
              className="mb-3 flex flex-wrap items-center gap-2 short:mb-2 sm:mb-4 sm:gap-3"
            >
              <span className="rounded border border-cyber/40 bg-cyber/10 px-2.5 py-1 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-cyber">
                5+ Years Experience
              </span>
              <span className="font-mono text-[0.72rem] tracking-wider text-silver-dim">
                Senior Software Engineer
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-[0.72rem] text-silver-faint">
                AI Systems & Distributed Infrastructure
              </span>
            </motion.div>

            {/* Candidate Name */}
            <h1 className="display text-gradient text-[clamp(2.6rem,9vw,7.8rem)] short:text-[clamp(2rem,6.4vw,4.2rem)] shorter:text-[clamp(1.85rem,5.6vw,3.4rem)]">
              <span className="block overflow-hidden">
                <motion.span initial="hidden" animate={animate} variants={line} custom={2} className="block">
                  Sai Krishna
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial="hidden"
                  animate={animate}
                  variants={line}
                  custom={3}
                  className="block pl-[0.04em] text-white/50"
                >
                  Reddy
                </motion.span>
              </span>
            </h1>

            {/* Core 4 Pillars Grid - Immediate Recruiter Answers */}
            <motion.div
              initial="hidden"
              animate={animate}
              variants={line}
              custom={4}
              className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.68rem] tracking-wide text-silver-dim short:hidden sm:mt-5"
            >
              <span className="text-silver-faint uppercase tracking-widest text-[0.62rem]">Core Focus:</span>
              {engineeringPillars.map((p) => (
                <a
                  key={p.id}
                  href="#profile-snapshot"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 transition-colors hover:border-cyber/50 hover:bg-cyber/10 hover:text-white"
                >
                  {p.title}
                </a>
              ))}
            </motion.div>

            {/* Actions & Recruiter Summary Row */}
            <div className="mt-6 flex flex-col gap-6 border-t border-white/10 pt-5 short:mt-4 short:gap-4 short:pt-4 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
              <div className="max-w-2xl space-y-4">
                <motion.p
                  initial="hidden"
                  animate={animate}
                  variants={line}
                  custom={5}
                  className="pretty text-[0.92rem] leading-relaxed text-silver-dim shorter:hidden sm:text-[0.98rem]"
                >
                  {profile.summary}
                </motion.p>

                {/* Direct High-Visibility Recruiter CTAs */}
                <motion.div
                  initial="hidden"
                  animate={animate}
                  variants={line}
                  custom={6}
                  className="flex flex-wrap items-center gap-2.5 pt-1"
                >
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-cyber/50 bg-cyber/15 px-5 py-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-cyber transition-all duration-300 hover:bg-cyber hover:text-void hover:shadow-[0_0_24px_rgba(76,201,255,0.4)]"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Résumé</span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-soft flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <GithubIcon className="h-4 w-4 text-silver-dim" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-soft flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <LinkedinIcon className="h-4 w-4 text-silver-dim" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={`mailto:${profile.email}`}
                    className="glass-soft flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-silver-dim transition-colors duration-300 hover:text-white hover:border-white/30"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </a>

                  <a
                    href={`#${selectedProjects[0].id}`}
                    className="glass-soft hidden items-center gap-1.5 rounded-full px-3.5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-violet transition-colors hover:text-white sm:inline-flex"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Selected Projects</span>
                  </a>
                </motion.div>
              </div>

              {/* Quantified Production Metrics */}
              <motion.dl
                initial="hidden"
                animate={animate}
                variants={line}
                custom={7}
                className="grid min-w-0 grid-cols-3 gap-x-5 gap-y-1 sm:gap-x-8 xl:shrink-0"
              >
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-[clamp(1.15rem,2.5vw,1.85rem)] leading-none tracking-tightest text-white">
                      {s.value}
                    </dd>
                    <p className="mt-2 font-mono text-[0.58rem] uppercase leading-tight tracking-[0.14em] text-silver-faint">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
