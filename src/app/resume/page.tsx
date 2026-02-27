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

const skillColorMap: Record<string, string> = {
  Foundations: "border-violet-300/40 bg-violet-300/10 text-violet-200",
  Warehousing: "border-blue-300/40 bg-blue-300/10 text-blue-200",
  Lakehouse: "border-sky-300/40 bg-sky-300/10 text-sky-200",
  Spark: "border-orange-300/40 bg-orange-300/10 text-orange-200",
  "Kafka/Flink": "border-rose-300/40 bg-rose-300/10 text-rose-200",
  "Airflow/dbt": "border-amber-300/40 bg-amber-300/10 text-amber-200",
  "Cloud/IaC": "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
  "Quality/Observability": "border-teal-300/40 bg-teal-300/10 text-teal-200",
  "AI Edge": "border-pink-300/40 bg-pink-300/10 text-pink-200",
};

function monogram(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ResumePage() {
  return (
    <Section className="pt-12 sm:pt-14">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <Reveal>
            <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Resume</p>
              <h1 className="font-heading mt-2 text-4xl font-semibold text-zinc-100">{siteConfig.name}</h1>
              <p className="mt-1 text-sm font-medium text-cyan-300">{siteConfig.role}</p>
              <p className="mt-3 max-w-3xl text-zinc-300">{siteConfig.tagline}</p>
              <p className="mt-2 text-sm text-zinc-400">{siteConfig.locationLine}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={siteConfig.resumePath} target="_blank" rel="noreferrer">
                  Download Resume PDF
                </Button>
                <p className="text-xs text-zinc-500">Last updated: Feb 2026</p>
              </div>
            </header>
          </Reveal>

          {/* Experience */}
          <Reveal delay={0.04}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Experience</h2>
              <div className="mt-5 space-y-5">
                {experience.map((item) => (
                  <div key={item.company} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex flex-wrap items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-semibold text-cyan-200">
                        {monogram(item.company)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="font-heading text-lg font-semibold text-zinc-100">{item.role}</h3>
                            <p className="text-sm font-medium text-cyan-300">{item.company}</p>
                          </div>
                          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
                            {item.dates}
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-medium text-zinc-200">{item.keyAchievement}</p>
                        <ul className="mt-3 space-y-1.5">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-sm text-zinc-400">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.08}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Education</h2>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div>
                  <p className="font-heading text-base font-semibold text-zinc-100">Master&apos;s in Data Science and Analytics</p>
                  <p className="mt-0.5 text-sm text-cyan-300">New England College</p>
                </div>
                <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-4 py-1.5 text-xs font-medium text-violet-300">
                  Graduate Degree
                </span>
              </div>
            </article>
          </Reveal>

          {/* Skills */}
          <Reveal delay={0.12}>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-2xl font-semibold text-zinc-100">Technical Skills</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {skillGroups.map((group) => {
                  const colorClass = skillColorMap[group.title] ?? "border-zinc-300/20 bg-zinc-300/5 text-zinc-300";
                  return (
                    <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <h3 className="font-heading text-base font-semibold text-zinc-100">{group.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorClass}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
