import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 ${className}`}>
      {children}
    </span>
  );
}
