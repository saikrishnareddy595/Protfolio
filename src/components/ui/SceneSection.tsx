"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { EngineeringProject } from "@/lib/content";
import { GlassCard, Reveal, Tag } from "./primitives";
import { ShieldAlert, Workflow, Scale } from "lucide-react";

/**
 * One chapter of the scroll story. The pane is sticky for the full section, so
 * the copy holds still while the 3D scene behind it morphs; it cross-fades out
 * as the next chapter's 3D geometry takes over.
 */
export function SceneSection({ project, align }: { project: EngineeringProject; align: "left" | "right" }) {
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
      id={project.id}
      className="relative"
      style={{ height: "220svh" }}
      aria-label={`${project.company} — ${project.title}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity, y, filter }}
          className="mx-auto flex h-full max-w-[1400px] flex-col px-5 pb-5 pt-20 sm:px-8 sm:pb-8 sm:pt-24"
        >
          {/* ---- Narrative column ---- */}
          <div
            className={`flex min-h-0 flex-1 overflow-hidden ${
              align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative max-w-2xl flex flex-col justify-center">
              {/* Radial gradient backing for legibility */}
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
                  SYSTEM {project.index}
                </span>
                <span className="h-px w-8 bg-white/20" />
                <span className="eyebrow">{project.category}</span>
              </div>

              <h2 className="display mt-3 text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-white">
                <span className="text-gradient">{project.title}</span>
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-silver-dim">
                <span className="font-medium text-white/90">{project.company}</span>
                <span className="text-white/20">/</span>
                <span className="font-mono text-[0.7rem] tracking-wide text-silver-faint">
                  {project.period}
                </span>
              </div>

              {/* Tagline */}
              <div className="mt-4 rounded-lg border border-cyber/20 bg-cyber/[0.03] p-3.5 sm:p-4">
                <div className="mt-1 font-display text-[0.98rem] text-white">
                  {project.tagline}
                </div>
              </div>

              {/* Architecture & Problem Scrollable Area if needed, or just concise text */}
              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-silver-faint">
                    <ShieldAlert className="h-3.5 w-3.5 text-violet" />
                    <span>The Problem</span>
                  </div>
                  <p className="pretty mt-2 text-[0.88rem] leading-relaxed text-silver-dim sm:text-[0.92rem]">
                    {project.problem}
                  </p>
                </div>
                
                <div className="hidden sm:block">
                   <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-silver-faint">
                    <Workflow className="h-3.5 w-3.5 text-cyber" />
                    <span>Pipeline Architecture</span>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {project.architectureNodes.slice(0, 4).map((node, i) => (
                      <Reveal
                        as="li"
                        key={node.id}
                        delay={i}
                        className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-silver-dim"
                      >
                        <span className="mt-[0.1em] font-mono text-[0.65rem] text-cyber">0{i + 1}</span>
                        <div>
                          <span className="font-medium text-white/90">{node.name}</span>
                          <span className="mx-2 text-white/20">·</span>
                          <span className="font-mono text-[0.7rem] text-cyber-glow">{node.tech}</span>
                          <p className="mt-0.5 text-[0.8rem] text-silver-faint line-clamp-1">{node.detail}</p>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 8).map((st) => (
                  <Tag key={st}>{st}</Tag>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Metric strip ---- */}
          <div className="mt-5 grid shrink-0 grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {project.scaleMetrics.map((m, i) => (
              <Reveal key={m.label} delay={i} className="h-full">
                <GlassCard className="h-full px-4 py-3.5 sm:px-5 sm:py-4 border-white/5 bg-white/[0.02]">
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

