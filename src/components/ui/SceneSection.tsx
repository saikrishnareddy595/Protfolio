"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Scene } from "@/lib/content";
import { GlassCard, Reveal, Tag } from "./primitives";

/**
 * One chapter of the scroll story. The pane is sticky for the full section, so
 * the copy holds still while the 3D scene behind it morphs; it cross-fades out
 * as the next chapter's 3D geometry takes over.
 */
export function SceneSection({ scene, align }: { scene: Scene; align: "left" | "right" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.06, 0.22, 0.72, 0.88], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.06, 0.22, 0.72, 0.88], [40, 0, 0, -40]);
  const blur = useTransform(scrollYProgress, [0.1, 0.22, 0.72, 0.86], [8, 0, 0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id={scene.id}
      className="relative"
      style={{ height: "220svh" }}
      aria-label={`${scene.company} — ${scene.role}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity, y, filter }}
          className="mx-auto flex h-full max-w-[1400px] flex-col px-5 pb-5 pt-20 sm:px-8 sm:pb-8 sm:pt-24"
        >
          {/* ---- Narrative column ----
              flex-1 + min-h-0 means a short viewport clips the prose rather
              than pushing the metric strip off the bottom of the screen. */}
          <div
            className={`flex min-h-0 flex-1 overflow-hidden ${
              align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative max-w-xl">
              {/* Keeps the copy legible wherever the 3D happens to be bright. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
                style={{
                  background: `radial-gradient(75% 65% at ${
                    align === "right" ? "70%" : "30%"
                  } 45%, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.72) 45%, rgba(5,5,5,0) 100%)`,
                }}
              />

              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-cyber-glow/80">
                  {scene.index}
                </span>
                <span className="h-px w-8 bg-white/20" />
                <span className="eyebrow">{scene.eyebrow}</span>
              </div>

              <h2 className="display mt-5 text-[clamp(1.7rem,4.2vw,3.1rem)] text-white">
                <span className="text-gradient">{scene.title}</span>
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-silver-dim">
                <span className="font-medium text-white/90">{scene.company}</span>
                <span className="text-white/20">/</span>
                <span>{scene.role}</span>
                <span className="text-white/20">/</span>
                <span className="font-mono text-[0.7rem] tracking-wide text-silver-faint">
                  {scene.period}
                </span>
              </div>

              <p className="pretty mt-4 text-[0.9rem] leading-relaxed text-silver-dim sm:text-[0.98rem]">
                {scene.lede}
              </p>

              <ul className="mt-5 hidden space-y-2 md:block">
                {scene.bullets.slice(0, 3).map((b, i) => (
                  <Reveal
                    as="li"
                    key={b}
                    delay={i}
                    className="flex gap-3 text-[0.82rem] leading-relaxed text-silver-dim/90"
                  >
                    <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-cyber/70" />
                    <span className="pretty">{b}</span>
                  </Reveal>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {scene.stack.slice(0, 8).map((st) => (
                  <Tag key={st}>{st}</Tag>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Metric strip ---- */}
          <div className="mt-5 grid shrink-0 grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {scene.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i} className="h-full">
                <GlassCard className="h-full px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="font-display text-[clamp(1.1rem,2.4vw,1.75rem)] leading-none tracking-tightest text-white">
                    {m.value}
                  </div>
                  <div className="mt-1.5 font-mono text-[0.6rem] uppercase leading-tight tracking-[0.14em] text-cyber-glow/75">
                    {m.label}
                  </div>
                  <p className="pretty mt-2 hidden text-[0.74rem] leading-snug text-silver-faint xl:block">
                    {m.detail}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SceneSection;
