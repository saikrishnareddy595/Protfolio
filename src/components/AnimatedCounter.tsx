"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, suffix: value, prefix: "" };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function AnimatedCounter({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { num, suffix, prefix } = parseValue(value);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    if (num === 0) {
      setDisplay(value);
      return;
    }

    const steps = 52;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(num * eased * 10) / 10;
      const formatted = current % 1 === 0 ? String(Math.round(current)) : current.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, num, suffix, prefix, value, duration]);

  return <span ref={ref}>{display}</span>;
}
