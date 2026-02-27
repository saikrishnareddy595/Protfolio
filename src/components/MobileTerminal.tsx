"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type LineType = "cmd" | "success" | "info" | "warn";

const lines: { type: LineType; text: string; delay: number }[] = [
  { type: "cmd",     delay: 400,  text: "spark-submit etl_pipeline.py --executor-cores 4" },
  { type: "info",    delay: 650,  text: "INFO  SparkContext initialized | Executors: 8/8" },
  { type: "info",    delay: 400,  text: "INFO  Stage[1/4] reading delta://s3a://lakehouse/raw" },
  { type: "success", delay: 700,  text: "✓  10.4 TB ingested · 2.1B rows · SLA: met" },
  { type: "cmd",     delay: 950,  text: "dbt run --select marts.analytics.* --threads 8" },
  { type: "info",    delay: 500,  text: "INFO  Compiled 47 models · Running: 47" },
  { type: "success", delay: 800,  text: "✓  47 models · 0 errors · 0 warnings · 2m 14s" },
  { type: "cmd",     delay: 900,  text: "kafka-consumer-groups.sh --describe --group etl_v2" },
  { type: "success", delay: 550,  text: "LAG: 0  THROUGHPUT: ↑40%  PARTITIONS: 12  TOPICS: 8" },
  { type: "cmd",     delay: 900,  text: "kubectl get pods -n data-platform -o wide" },
  { type: "info",    delay: 350,  text: "airflow-scheduler-d8f4c   1/1   Running   0d6h" },
  { type: "info",    delay: 200,  text: "spark-history-server-9b2  1/1   Running   0d6h" },
  { type: "info",    delay: 200,  text: "kafka-connect-5f7a1       1/1   Running   0d6h" },
  { type: "success", delay: 500,  text: "ALL SYSTEMS NOMINAL · SLA 99.9% · USERS: 200+" },
];

const colorMap: Record<LineType, string> = {
  cmd:     "text-indigo-300",
  success: "text-emerald-400",
  info:    "text-zinc-400",
  warn:    "text-amber-400",
};

const prefixMap: Record<LineType, { char: string; color: string }> = {
  cmd:     { char: "$",  color: "text-indigo-500" },
  success: { char: "✓",  color: "text-emerald-500" },
  info:    { char: "│",  color: "text-zinc-700" },
  warn:    { char: "!",  color: "text-amber-500" },
};

export function MobileTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [visible, setVisible] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let accumulated = 0;
    lines.forEach((line, i) => {
      accumulated += line.delay;
      const t = accumulated;
      setTimeout(() => setVisible(i + 1), t);
    });
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#06060f]/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
    >
      {/* macOS-style window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 font-mono text-[10px] text-zinc-600">
          krishna@data-platform — zsh
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600">
            live
          </span>
        </div>
      </div>

      {/* Terminal output */}
      <div className="min-h-[220px] space-y-1 p-4 font-mono text-[11px] leading-6 sm:text-xs">
        {lines.slice(0, visible).map((line, i) => {
          const pfx = prefixMap[line.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className={`flex gap-2 ${colorMap[line.type]}`}
            >
              <span className={`shrink-0 select-none ${pfx.color}`}>{pfx.char}</span>
              <span className="min-w-0 break-all">{line.text}</span>
            </motion.div>
          );
        })}

        {/* Blinking cursor while animating */}
        {visible < lines.length && (
          <div className="flex items-center gap-2">
            <span className="select-none text-indigo-500">$</span>
            <span className="terminal-cursor" />
          </div>
        )}

        {/* Session footer — only devs know what this means */}
        {visible >= lines.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-2 font-mono text-[9px] text-zinc-800"
          >
            <span>pid:31415 · rss:0x7FFE2B3A · stack:0x00</span>
            <span>↑ 1d 6h 42m</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
