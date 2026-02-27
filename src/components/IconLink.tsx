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
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 transition duration-300 hover:-translate-y-0.5 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
