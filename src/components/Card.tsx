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
      whileHover={hoverLift ? { y: -6, scale: 1.005 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`card-hover-glow rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.14] ${className}`}
    >
      {children}
    </motion.article>
  );
}
