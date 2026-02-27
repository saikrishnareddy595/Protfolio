import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

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
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan-300 text-zinc-950 hover:bg-cyan-200",
  secondary: "border border-white/20 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08]"
};

export function Button({ href, children, className = "", variant = "primary", target, rel }: LinkProps) {
  return (
    <Link href={href} target={target} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
      <span className="pointer-events-none absolute inset-y-0 -left-20 w-14 -skew-x-12 bg-white/40 opacity-0 blur-md transition-all duration-500 group-hover:left-[110%] group-hover:opacity-80" />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
