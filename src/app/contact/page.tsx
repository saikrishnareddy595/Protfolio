import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { IconLink } from "@/components/IconLink";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { socials } from "@/config/socials";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Krishna Reddy for senior data engineering opportunities and platform leadership roles.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    description: "Professional contact options for Krishna Reddy.",
    images: [siteConfig.ogImage]
  }
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Contact</p>
              <h1 className="font-heading mt-2 text-4xl font-semibold text-zinc-100">Let&apos;s connect</h1>
              <p className="mt-4 max-w-2xl text-zinc-300">
                Open to Senior Data Engineer opportunities and data platform leadership roles. I respond within 24 hours.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <MailIcon className="h-4 w-4 shrink-0 text-cyan-300" />
                  <a href={socials.Email} className="text-sm text-zinc-300 transition hover:text-zinc-100">
                    reddamgufus21188@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <LinkedInIcon className="h-4 w-4 shrink-0 text-cyan-300" />
                  <a href={socials.LinkedIn} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 transition hover:text-zinc-100">
                    linkedin.com/in/reddy4725
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <GitHubIcon className="h-4 w-4 shrink-0 text-cyan-300" />
                  <a href={socials.GitHub} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 transition hover:text-zinc-100">
                    github.com/saikrishnareddy595
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {socials.Email ? <Button href={socials.Email}>Email</Button> : null}
                {socials.LinkedIn ? (
                  <Button href={socials.LinkedIn} target="_blank" rel="noreferrer" variant="secondary">
                    LinkedIn
                  </Button>
                ) : null}
                {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Location</p>
                <p className="mt-1 text-sm text-zinc-300">{siteConfig.locationLine}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Send a Message</h2>
              <p className="mt-2 text-sm text-zinc-400">Share your role, team, and timeline.</p>
              <ContactForm />
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
