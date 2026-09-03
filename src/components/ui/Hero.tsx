"use client";

import { motion } from "framer-motion";
import { heroStats, profile } from "@/lib/content";
import { StatusDot } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { opacity: 0, y: "0.42em" },
  show: (i: number) => ({
    opacity: 1,
    y: "0em",
    transition: { duration: 1.15, delay: 0.35 + i * 0.11, ease: EASE },
  }),
};

export function Hero({ started }: { started: boolean }) {
  const animate = started ? "show" : "hidden";

  return (
    <section id="hero" className="relative" style={{ height: "140svh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-16">
        {/* Top-left: who and what, kept small so the subject owns the frame. */}
        <motion.div
          initial="hidden"
          animate={animate}
          variants={line}
          custom={0}
          className="max-w-md"
        >
          <div className="flex items-center gap-2.5">
            <StatusDot />
            <span className="eyebrow">Open to AI Engineer roles</span>
          </div>
        </motion.div>

        {/* Scroll cue, pinned to the bottom of the sticky pane. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center"
        >
          <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-silver-faint">
            <span className="h-8 w-px overflow-hidden bg-white/[0.12]">
              <span className="block h-full w-full animate-scan bg-cyber" />
            </span>
            Scroll to enter
          </span>
        </motion.div>

        {/* Bottom: the masthead. */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-[-2rem] bottom-[-4rem] top-[-8rem] bg-gradient-to-t from-void via-void/80 to-transparent" />

          <div className="relative">
            <motion.p
              initial="hidden"
              animate={animate}
              variants={line}
              custom={1}
              className="eyebrow mb-4 sm:mb-6"
            >
              {profile.role} — {profile.discipline}
            </motion.p>

            <h1 className="display text-gradient text-[clamp(2.75rem,11.2vw,10.5rem)]">
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
                  className="block pl-[0.06em] text-white/45"
                >
                  Reddy
                </motion.span>
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-8 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <motion.p
                initial="hidden"
                animate={animate}
                variants={line}
                custom={4}
                className="pretty max-w-xl text-[0.95rem] leading-relaxed text-silver-dim sm:text-[1.02rem]"
              >
                {profile.summary}
              </motion.p>

              <motion.dl
                initial="hidden"
                animate={animate}
                variants={line}
                custom={5}
                className="grid shrink-0 grid-cols-3 gap-x-5 gap-y-1 sm:gap-x-10"
              >
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-[clamp(1.15rem,3vw,1.9rem)] leading-none tracking-tightest text-white">
                      {s.value}
                    </dd>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase leading-tight tracking-[0.14em] text-silver-faint">
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
