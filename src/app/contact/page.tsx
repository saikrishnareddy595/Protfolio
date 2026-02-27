import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconLink } from "@/components/IconLink";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { GitHubIcon } from "@/components/social-icons";
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

              <div className="mt-8 flex flex-wrap gap-3">
                {socials.Email ? <Button href={socials.Email}>Email</Button> : null}
                {socials.LinkedIn ? (
                  <Button href={socials.LinkedIn} target="_blank" rel="noreferrer" variant="secondary">
                    LinkedIn
                  </Button>
                ) : null}
                {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Send a Message</h2>
              <p className="mt-2 text-sm text-zinc-400">Share your role, team, and timeline.</p>

              <form className="mt-6 grid gap-4" method="post" action="/api/contact">
                <label className="grid gap-1 text-sm text-zinc-300" htmlFor="name">
                  Name
                  <input
                    id="name"
                    name="name"
                    required
                    className="rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2 text-zinc-100"
                  />
                </label>

                <label className="grid gap-1 text-sm text-zinc-300" htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2 text-zinc-100"
                  />
                </label>

                <label className="grid gap-1 text-sm text-zinc-300" htmlFor="message">
                  Message
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2 text-zinc-100"
                  />
                </label>

                <button type="submit" className="rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-sm text-zinc-100 hover:bg-white/[0.08]">
                  Submit
                </button>
              </form>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
