import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030308]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_0_20px_rgba(129,140,248,0.35)] hover:shadow-[0_0_35px_rgba(129,140,248,0.55)] hover:scale-[1.03] active:scale-[0.99]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08] hover:border-white/25 hover:scale-[1.02] active:scale-[0.99]",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:scale-[1.02]",
};

export function Button({
  href,
  children,
  className = "",
  variant = "primary",
  target,
  rel,
}: LinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="btn-shimmer pointer-events-none absolute" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}
