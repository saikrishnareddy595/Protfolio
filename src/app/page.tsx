import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconLink } from "@/components/IconLink";
import { MetricCard } from "@/components/MetricCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { experience } from "@/config/experience";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { skillGroups } from "@/config/skills";
import { socials } from "@/config/socials";

export const metadata: Metadata = {
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  }
};

function monogram(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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

export default function HomePage() {
  return (
    <>
      <div id="top" />

      {/* Hero */}
      <Section className="relative overflow-hidden pb-12 pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div className="relative">
            <div className="pointer-events-none absolute -left-20 top-[-80px] h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-400/8 blur-3xl" />
            <Reveal>
              <div className="relative rounded-3xl border border-white/12 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-12">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-300/20 to-cyan-300/5 text-xl font-bold text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.15)]">
                    {monogram(siteConfig.name)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Open to Opportunities
                  </span>
                </div>

                <p className="font-heading mt-5 text-xs uppercase tracking-[0.2em] text-zinc-400">{siteConfig.role}</p>
                <h1 className="font-heading mt-2 text-4xl font-semibold tracking-tight text-zinc-100 sm:text-6xl">
                  {siteConfig.name}
                </h1>

                <div className="mt-4 h-px w-28 bg-gradient-to-r from-cyan-300 via-cyan-200 to-transparent" />

                <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-200">{siteConfig.tagline}</p>
                <p className="mt-3 text-sm text-zinc-300">{siteConfig.trustLine}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {siteConfig.locationLine}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/#projects">View Projects</Button>
                  <Button href={siteConfig.resumePath} target="_blank" rel="noreferrer" variant="secondary">
                    Download Resume
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {socials.Email ? <IconLink href={socials.Email} label="Email" icon={<MailIcon className="h-4 w-4" />} /> : null}
                  {socials.LinkedIn ? (
                    <IconLink href={socials.LinkedIn} label="LinkedIn" icon={<LinkedInIcon className="h-4 w-4" />} />
                  ) : null}
                  {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Impact Metrics */}
      <Section id="impact" title="Impact Snapshot" eyebrow="Results">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.impactMetrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.04}>
                <MetricCard value={metric.value} label={metric.label} context={metric.context} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects Worked" eyebrow="Selected Work">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <Button href="/projects" variant="secondary">
                View All Projects
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills Matrix" eyebrow="Engineering Depth">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {skillGroups.map((group, index) => {
              const colorClass = skillColorMap[group.title] ?? "border-zinc-300/20 bg-zinc-300/5 text-zinc-300";
              return (
                <Reveal key={group.title} delay={index * 0.03}>
                  <article
                    className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.32)] ${
                      index === skillGroups.length - 1 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <h3 className="font-heading text-lg font-semibold text-zinc-100">{group.title}</h3>
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
                    <p className="mt-4 text-xs text-zinc-500">{group.productionUse}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience Timeline" eyebrow="Career">
        <Container>
          <div className="relative space-y-4 before:absolute before:left-8 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-white/15">
            {experience.map((item, index) => (
              <Reveal key={item.company} delay={index * 0.05}>
                <article className="relative ml-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
                  <div className="absolute -left-14 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/50 bg-zinc-900 text-xs font-semibold text-cyan-200">
                    {monogram(item.company)}
                  </div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-zinc-100">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-cyan-300">{item.company}</p>
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
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" eyebrow="Academic">
        <Container>
          <Reveal>
            <article className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
              <div>
                <p className="font-heading text-lg font-semibold text-zinc-100">Master&apos;s in Data Science and Analytics</p>
                <p className="mt-1 text-sm text-cyan-300">New England College</p>
              </div>
              <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-4 py-1.5 text-xs font-medium text-violet-300">
                Graduate Degree
              </span>
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* About / Principles */}
      <Section id="about" title="About" eyebrow="Principles">
        <Container>
          <Reveal>
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-zinc-300 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
              {siteConfig.about.map((line) => (
                <p key={line} className="mb-3 leading-7 last:mb-0">
                  {line}
                </p>
              ))}
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section id="contact-cta" className="pt-8">
        <Container>
          <Reveal>
            <article className="rounded-3xl border border-cyan-200/20 bg-gradient-to-r from-cyan-300/10 via-white/[0.03] to-white/[0.03] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <p className="font-heading text-sm uppercase tracking-[0.2em] text-zinc-400">Contact</p>
              <h2 className="font-heading mt-2 text-3xl font-semibold text-zinc-100">
                Open to Senior Data Engineering opportunities
              </h2>
              <p className="mt-3 text-sm text-zinc-300">I respond within 24 hours.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.Email ? <Button href={socials.Email}>Email</Button> : null}
                {socials.LinkedIn ? (
                  <Button href={socials.LinkedIn} target="_blank" rel="noreferrer" variant="secondary">
                    LinkedIn
                  </Button>
                ) : null}
                {socials.GitHub ? (
                  <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} />
                ) : null}
                <Button href="/contact" variant="secondary">
                  Contact Form
                </Button>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
