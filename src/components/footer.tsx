"use client";

import { IconLink } from "@/components/IconLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { socials } from "@/config/socials";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-1">
          <p className="text-sm text-zinc-300">© {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="text-xs text-zinc-500">{siteConfig.footerLine}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socials.Email ? <IconLink href={socials.Email} label="Email" icon={<MailIcon className="h-4 w-4" />} /> : null}
          {socials.LinkedIn ? <IconLink href={socials.LinkedIn} label="LinkedIn" icon={<LinkedInIcon className="h-4 w-4" />} /> : null}
          {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
        </div>
      </div>
    </footer>
  );
}
