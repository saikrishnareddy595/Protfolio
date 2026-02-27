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
      <p className={`font-mono text-4xl font-bold leading-none ${accentColor}`}>
        <AnimatedCounter value={value} />
      </p>
      <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        {label}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-500">{context}</p>
      {/* Bottom-right ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full blur-2xl"
        style={{ background: glowColor }}
      />
    </Card>
  );
}
