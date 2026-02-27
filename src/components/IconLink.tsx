import { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

export function IconLink({ href, label, icon }: IconLinkProps) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-indigo-400/[0.08] hover:text-zinc-100 hover:shadow-[0_0_16px_rgba(129,140,248,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
