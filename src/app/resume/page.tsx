import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { experience } from "@/config/experience";
import { siteConfig } from "@/config/site";
import { skillGroups } from "@/config/skills";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Krishna Reddy with enterprise data engineering experience and platform outcomes.",
  alternates: {
    canonical: "/resume"
  },
  openGraph: {
    description: "Professional experience, education, and production skills for Krishna Reddy.",
    images: [siteConfig.ogImage]
  }
};

export default function ResumePage() {
  return (
    <Section className="pt-12 sm:pt-14">
      <Container>
        <div className="space-y-8">
          <Reveal>
            <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Resume</p>
              <h1 className="font-heading mt-2 text-4xl font-semibold text-zinc-100">{siteConfig.name}</h1>
              <p className="mt-3 max-w-3xl text-zinc-300">{siteConfig.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={siteConfig.resumePath} target="_blank" rel="noreferrer">
                  Download Resume
                </Button>
                <p className="text-xs text-zinc-400">Last updated: Feb 2026</p>
              </div>
            </header>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Experience</h2>
              <div className="mt-5 space-y-5">
                {experience.map((item) => (
                  <div key={item.company} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <h3 className="font-heading text-xl font-semibold text-zinc-100">{item.timelineLabel}</h3>
                    <p className="mt-3 text-sm text-zinc-300">{item.keyAchievement}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-zinc-300">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="list-inside list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Education</h2>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-zinc-200">Master&apos;s in Data Science and Analytics — New England College</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Categorized Skills</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <h3 className="font-heading text-base font-semibold text-zinc-100">{group.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
