"use client";

import { IconLink } from "@/components/IconLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { socials } from "@/config/socials";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/[0.06]">
      {/* Gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-1">
          <p className="font-heading text-sm font-bold tracking-[0.2em] text-white">
            KRISHNA REDDY
          </p>
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} · Senior Data Engineer · {siteConfig.footerLine}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {socials.Email ? (
            <IconLink href={socials.Email} label="Email" icon={<MailIcon className="h-4 w-4" />} />
          ) : null}
          {socials.LinkedIn ? (
            <IconLink
              href={socials.LinkedIn}
              label="LinkedIn"
              icon={<LinkedInIcon className="h-4 w-4" />}
            />
          ) : null}
          {socials.GitHub ? (
            <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} />
          ) : null}
        </div>
      </div>
    </footer>
  );
}
