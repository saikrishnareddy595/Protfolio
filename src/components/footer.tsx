import { siteConfig } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { socials } from "@/config/socials";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="inline-flex items-center gap-2 hover:text-ink" href={socials.Email}>
            <MailIcon className="h-4 w-4" />
            Email
          </a>
          <a className="inline-flex items-center gap-2 hover:text-ink" href={socials.LinkedIn} target="_blank" rel="noreferrer">
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a className="inline-flex items-center gap-2 hover:text-ink" href={socials.GitHub} target="_blank" rel="noreferrer">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
