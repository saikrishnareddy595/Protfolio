"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay: i * 0.07, ease: EASE },
  }),
};

/** A staggered fade-up that fires once the element enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px 0px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function Eyebrow({ children, tone = "silver" }: { children: ReactNode; tone?: "silver" | "cyber" }) {
  return (
    <span className={`eyebrow ${tone === "cyber" ? "text-cyber-glow/85" : ""}`}>{children}</span>
  );
}

export function GlassCard({
  children,
  className = "",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`glass relative overflow-hidden rounded-2xl ${
        interactive
          ? "transition-[transform,border-color,box-shadow] duration-500 ease-expo hover:-translate-y-0.5 hover:border-white/20"
          : ""
      } ${className}`}
    >
      {/* Top highlight, the tell of a real glass panel. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
      {children}
    </div>
  );
}

export function MetricTile({
  value,
  label,
  detail,
  index = 0,
}: {
  value: string;
  label: string;
  detail: string;
  index?: number;
}) {
  return (
    <Reveal delay={index} className="h-full">
      <GlassCard className="group h-full p-5 sm:p-6">
        <div className="font-display text-[clamp(1.6rem,3.6vw,2.5rem)] leading-none tracking-tightest text-white">
          {value}
        </div>
        <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyber-glow/80">
          {label}
        </div>
        <p className="pretty mt-3 text-[0.8rem] leading-relaxed text-silver-dim">{detail}</p>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-10 h-32 w-32 rounded-full bg-cyber/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </GlassCard>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-silver-dim transition-colors duration-300 hover:border-cyber/40 hover:text-cyber-glow">
      {children}
    </li>
  );
}

export function StatusDot() {
  return (
    <span className="relative flex h-1.5 w-1.5" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyber" />
    </span>
  );
}
