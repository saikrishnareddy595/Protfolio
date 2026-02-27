import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-indigo-300/20 bg-indigo-300/[0.07] px-3 py-1 text-xs font-medium text-indigo-200 transition-colors hover:border-indigo-300/35 hover:bg-indigo-300/[0.12] ${className}`}
    >
      {children}
    </span>
  );
}
