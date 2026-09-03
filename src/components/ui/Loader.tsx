"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/content";

const BOOT = [
  "initialising webgl context",
  "compiling scene shaders",
  "assembling neural field",
  "linking agent topology",
  "ready",
];

/** A short, honest boot sequence — it hides the first shader compile, nothing more. */
export function Loader({ done, onExit }: { done: boolean; onExit: () => void }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setPct((v) => {
        const ceiling = done ? 100 : 92;
        const step = v < 60 ? 4.5 : v < 85 ? 2 : 1;
        return Math.min(ceiling, v + step * (0.6 + Math.random() * 0.8));
      });
      if (frame > 400) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => {
        setHidden(true);
        onExit();
      }, 420);
      return () => clearTimeout(t);
    }
  }, [pct, onExit]);

  const stage = BOOT[Math.min(BOOT.length - 1, Math.floor((pct / 100) * BOOT.length))];

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <div className="w-[min(88vw,30rem)]">
            <div className="mb-6 flex items-baseline justify-between">
              <span className="font-display text-[0.95rem] tracking-[0.2em] text-white/90">
                {profile.fullName.toUpperCase()}
              </span>
              <span className="font-mono text-[0.72rem] tabular-nums text-silver-faint">
                {String(Math.floor(pct)).padStart(3, "0")}
              </span>
            </div>

            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber to-violet"
                animate={{ scaleX: pct / 100 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-silver-faint">
              <span>{stage}</span>
              <span className="hidden sm:inline">{profile.discipline.split(" · ")[0]}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
