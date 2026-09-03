"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/lib/content";
import { scroll } from "@/lib/scroll";

/**
 * A hairline progress rail down the right edge. It writes straight to the DOM
 * on rAF rather than through React, for the same reason the 3D layer does.
 */
export function ScrollRail() {
  const fill = useRef<HTMLSpanElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    let last = -1;
    const loop = () => {
      const p = scroll.progress;
      if (fill.current) fill.current.style.transform = `scaleY(${Math.max(p, 0.005)})`;
      const pct = Math.round(p * 100);
      if (pct !== last && readout.current) {
        last = pct;
        readout.current.textContent = String(pct).padStart(2, "0");
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <span className="font-mono text-[0.62rem] tracking-[0.2em] text-silver-faint">
        <span ref={readout}>00</span>
        <span className="opacity-40">/100</span>
      </span>

      <div className="relative h-56 w-px bg-white/10">
        <span
          ref={fill}
          className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyber via-cyber to-violet"
          style={{ transform: "scaleY(0)" }}
        />
        {chapters.map((c, i) => (
          <span
            key={c.id}
            className="absolute -left-[3px] h-[7px] w-[7px] rounded-full border border-white/25 bg-void"
            style={{ top: `${(i / (chapters.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-silver-faint [writing-mode:vertical-rl]">
        Scroll
      </span>
    </div>
  );
}

export default ScrollRail;
