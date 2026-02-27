"use client";

import { motion } from "framer-motion";

const outerNodes = [
  { angle: 0,   label: "Spark",   color: "#f97316" },
  { angle: 60,  label: "Kafka",   color: "#818cf8" },
  { angle: 120, label: "AWS",     color: "#22d3ee" },
  { angle: 180, label: "dbt",     color: "#a78bfa" },
  { angle: 240, label: "Delta",   color: "#34d399" },
  { angle: 300, label: "K8s",     color: "#f472b6" },
];

const innerNodes = [
  { angle: 30,  label: "PY",  color: "#fbbf24" },
  { angle: 150, label: "SQL", color: "#22d3ee" },
  { angle: 270, label: "TF",  color: "#a78bfa" },
];

export function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center h-[380px] lg:h-[460px] w-full select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-3xl scale-75" />

      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute h-[300px] w-[300px] rounded-full border border-indigo-500/15 lg:h-[360px] lg:w-[360px]"
      >
        {outerNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const left = 50 + Math.cos(rad) * 50;
          const top  = 50 + Math.sin(rad) * 50;
          return (
            <motion.div
              key={i}
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl text-[10px] font-bold tracking-wide"
              style={{
                left: `${left}%`,
                top:  `${top}%`,
                border: `1px solid ${node.color}50`,
                background: `${node.color}18`,
                color: node.color,
                boxShadow: `0 0 14px ${node.color}30`,
              }}
            >
              {node.label}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute h-[180px] w-[180px] rounded-full border border-violet-500/20 lg:h-[210px] lg:w-[210px]"
      >
        {innerNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const left = 50 + Math.cos(rad) * 50;
          const top  = 50 + Math.sin(rad) * 50;
          return (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg text-[9px] font-bold"
              style={{
                left: `${left}%`,
                top:  `${top}%`,
                border: `1px solid ${node.color}50`,
                background: `${node.color}20`,
                color: node.color,
                boxShadow: `0 0 10px ${node.color}30`,
              }}
            >
              {node.label}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative ring */}
      <div className="absolute h-[230px] w-[230px] rounded-full border border-white/[0.04] lg:h-[270px] lg:w-[270px]" />

      {/* Center badge */}
      <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-indigo-400/40 shadow-[0_0_40px_rgba(129,140,248,0.35)] lg:h-24 lg:w-24"
        style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.2), rgba(167,139,250,0.15))" }}
      >
        <span className="font-heading text-2xl font-bold gradient-text lg:text-3xl">KR</span>
        <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-indigo-300/70">Data Eng</span>
        {/* Glow pulse on center */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: "0 0 30px rgba(129,140,248,0.5)" }}
        />
      </div>

      {/* Connecting dot lines (static decorative) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="90" fill="none" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="4 12" />
        <circle cx="200" cy="200" r="185" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="2 10" />
      </svg>
    </div>
  );
}
