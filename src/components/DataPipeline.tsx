"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Kafka",   color: "#818cf8", sub: "10TB/day",  glyph: "⟨K⟩" },
  { label: "Spark",   color: "#f97316", sub: "ETL+DQ",    glyph: "⟨S⟩" },
  { label: "Δ Lake",  color: "#22d3ee", sub: "Lakehouse", glyph: "⟨Δ⟩" },
  { label: "dbt",     color: "#a78bfa", sub: "Transform", glyph: "⟨T⟩" },
  { label: "Snow",    color: "#34d399", sub: "Warehouse", glyph: "⟨W⟩" },
  { label: "BI",      color: "#fbbf24", sub: "200+ USR",  glyph: "⟨B⟩" },
];

export function DataPipeline() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
            prod · pipeline · nominal
          </span>
        </div>
        <span className="font-mono text-[9px] text-zinc-700">lag: 0ms · sla: 99.9%</span>
      </div>

      {/* Pipeline stages + connectors */}
      <div className="flex items-start justify-between gap-1 overflow-x-auto pb-1 no-scrollbar">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex shrink-0 items-center">
            {/* Stage node */}
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{ boxShadow: [`0 0 8px ${stage.color}20`, `0 0 16px ${stage.color}40`, `0 0 8px ${stage.color}20`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[9px] font-bold tracking-tight sm:h-10 sm:w-10 sm:text-[10px]"
                style={{
                  border: `1px solid ${stage.color}45`,
                  background: `${stage.color}12`,
                  color: stage.color,
                }}
              >
                {stage.label}
              </motion.div>
              <span className="text-center text-[7px] leading-tight text-zinc-600 sm:text-[8px]">
                {stage.sub}
              </span>
            </div>

            {/* Animated connector */}
            {i < stages.length - 1 && (
              <div
                className="relative mx-1 shrink-0 overflow-hidden sm:mx-1.5"
                style={{ width: 22, height: 2 }}
              >
                {/* Track */}
                <div className="absolute inset-0 bg-white/[0.05]" />
                {/* Flowing packet */}
                <motion.div
                  className="absolute inset-y-0 w-2 rounded-full"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.22,
                  }}
                  style={{
                    background: stage.color,
                    boxShadow: `0 0 5px ${stage.color}`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Throughput bar — looks like a live bandwidth monitor */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between font-mono text-[8px] text-zinc-700">
          <span>throughput</span>
          <span>10.4 TB / d</span>
        </div>
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #818cf8, #a78bfa, #22d3ee)",
            }}
            animate={{ width: ["72%", "85%", "78%", "90%", "72%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
