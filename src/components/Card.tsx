"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
};

export function Card({ children, className = "", hoverLift = false }: CardProps) {
  return (
    <motion.article
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.1] to-white/[0.04] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.article>
  );
}
