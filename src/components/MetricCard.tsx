"use client";

import { Card } from "@/components/Card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ReactNode } from "react";

type MetricCardProps = {
  value: string;
  label: string;
  context: string;
  icon?: ReactNode;
  accentColor?: string;
  glowColor?: string;
};

export function MetricCard({
  value,
  label,
  context,
  icon,
  accentColor = "text-indigo-300",
  glowColor = "rgba(129,140,248,0.15)",
}: MetricCardProps) {
  return (
    <Card hoverLift className="relative overflow-hidden space-y-3">
      {icon && <div className={`text-2xl ${accentColor}`}>{icon}</div>}
      <p className={`font-mono text-3xl font-bold leading-none sm:text-4xl ${accentColor}`}>
        <AnimatedCounter value={value} />
      </p>
      <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:text-[11px]">
        {label}
      </h3>
      <p className="text-xs leading-relaxed text-zinc-500 sm:text-sm">{context}</p>
      {/* Hex memory address — easter egg for engineers */}
      <span className="select-none font-mono text-[8px] text-zinc-800">
        {`0x${parseInt(value.replace(/\D/g, "") || "0").toString(16).toUpperCase().padStart(4, "0")}`}
      </span>
      {/* Bottom-right ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full blur-2xl"
        style={{ background: glowColor }}
      />
    </Card>
  );
}
