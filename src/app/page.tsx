import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconLink } from "@/components/IconLink";
import { MetricCard } from "@/components/MetricCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
  ArrowRightIcon,
  DatabaseIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
  CloudIcon,
  LayersIcon,
  CodeIcon,
  CpuIcon,
} from "@/components/social-icons";
import { HeroVisual } from "@/components/HeroVisual";
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
    images: [siteConfig.ogImage],
  },
};

function monogram(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Skill category config: icon, accent colors
const skillConfig: Record<
  string,
  { icon: React.ReactNode; border: string; bg: string; text: string; glow: string }
> = {
  Foundations: {
    icon: <CodeIcon className="h-5 w-5" />,
    border: "border-violet-400/30",
    bg: "bg-violet-400/[0.06]",
    text: "text-violet-200",
    glow: "rgba(167,139,250,0.12)",
  },
  Warehousing: {
    icon: <DatabaseIcon className="h-5 w-5" />,
    border: "border-blue-400/30",
    bg: "bg-blue-400/[0.06]",
    text: "text-blue-200",
    glow: "rgba(96,165,250,0.12)",
  },
  Lakehouse: {
    icon: <LayersIcon className="h-5 w-5" />,
    border: "border-sky-400/30",
    bg: "bg-sky-400/[0.06]",
    text: "text-sky-200",
    glow: "rgba(56,189,248,0.12)",
  },
  Spark: {
    icon: <ZapIcon className="h-5 w-5" />,
    border: "border-orange-400/30",
    bg: "bg-orange-400/[0.06]",
    text: "text-orange-200",
    glow: "rgba(251,146,60,0.12)",
  },
  "Kafka/Flink": {
    icon: <TrendingUpIcon className="h-5 w-5" />,
    border: "border-rose-400/30",
    bg: "bg-rose-400/[0.06]",
    text: "text-rose-200",
    glow: "rgba(251,113,133,0.12)",
  },
  "Airflow/dbt": {
    icon: <ZapIcon className="h-5 w-5" />,
    border: "border-amber-400/30",
    bg: "bg-amber-400/[0.06]",
    text: "text-amber-200",
    glow: "rgba(251,191,36,0.12)",
  },
  "Cloud/IaC": {
    icon: <CloudIcon className="h-5 w-5" />,
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/[0.06]",
    text: "text-emerald-200",
    glow: "rgba(52,211,153,0.12)",
  },
  "Quality/Observability": {
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    border: "border-teal-400/30",
    bg: "bg-teal-400/[0.06]",
    text: "text-teal-200",
    glow: "rgba(45,212,191,0.12)",
  },
  "AI Edge": {
    icon: <CpuIcon className="h-5 w-5" />,
    border: "border-pink-400/30",
    bg: "bg-pink-400/[0.06]",
    text: "text-pink-200",
    glow: "rgba(244,114,182,0.12)",
  },
};

// Metric accent colors
const metricAccents = [
  {
    icon: <DatabaseIcon className="h-6 w-6" />,
    color: "text-indigo-300",
    glow: "rgba(129,140,248,0.18)",
  },
  {
    icon: <TrendingUpIcon className="h-6 w-6" />,
    color: "text-emerald-300",
    glow: "rgba(52,211,153,0.18)",
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    color: "text-amber-300",
    glow: "rgba(251,191,36,0.18)",
  },
  {
    icon: <UsersIcon className="h-6 w-6" />,
    color: "text-violet-300",
    glow: "rgba(167,139,250,0.18)",
  },
];

export default function HomePage() {
  return (
    <>
      <div id="top" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-16 pt-12 sm:pt-16">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-orb-1 absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="animate-orb-2 absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-violet-500/8 blur-[130px]" />
          <div className="animate-orb-3 absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left – content */}
            <Reveal>
              <div className="space-y-7">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-1.5">
                  <span className="status-dot h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold tracking-wide text-emerald-300">
                    Open to Opportunities
                  </span>
                </div>

                {/* Role label */}
                <p className="font-heading text-xs font-bold uppercase tracking-[0.32em] text-indigo-400">
                  {siteConfig.role}
                </p>

                {/* Name headline */}
                <h1 className="font-heading text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block text-white">Krishna</span>
                  <span className="gradient-text block">Reddy</span>
                </h1>

                {/* Tagline */}
                <p className="max-w-xl text-lg leading-8 text-zinc-300">
                  {siteConfig.tagline}
                </p>

                {/* Trust line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-zinc-500">Previously at</span>
                  {["Charter Communications", "Wells Fargo", "McKesson"].map((co, i) => (
                    <span key={co} className="flex items-center gap-3">
                      <span className="font-semibold text-zinc-200">{co}</span>
                      {i < 2 && <span className="text-zinc-700">·</span>}
                    </span>
                  ))}
                </div>

                {/* Location */}
                <p className="flex items-center gap-2 text-sm text-zinc-500">
                  <PinIcon className="h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{siteConfig.locationLine}</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button href="/#projects">
                    View Projects
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    href={siteConfig.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    Download Resume
                  </Button>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-2 pt-1">
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
                    <IconLink
                      href={socials.GitHub}
                      label="GitHub"
                      icon={<GitHubIcon className="h-4 w-4" />}
                    />
                  ) : null}
                </div>
              </div>
            </Reveal>

            {/* Right – orbital visual */}
            <Reveal delay={0.18} className="hidden lg:block">
              <HeroVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── IMPACT METRICS ──────────────────────────────────────────── */}
      <Section id="impact" title="Impact at Scale" eyebrow="Results">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.impactMetrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.07}>
                <MetricCard
                  value={metric.value}
                  label={metric.label}
                  context={metric.context}
                  icon={metricAccents[index].icon}
                  accentColor={metricAccents[index].color}
                  glowColor={metricAccents[index].glow}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <Section id="projects" title="Selected Projects" eyebrow="Engineering Work">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Button href="/projects" variant="secondary">
                View All Projects
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── SKILLS MATRIX ───────────────────────────────────────────── */}
      <Section id="skills" title="Skills Matrix" eyebrow="Engineering Depth">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {skillGroups.map((group, index) => {
              const cfg =
                skillConfig[group.title] ?? {
                  icon: <CodeIcon className="h-5 w-5" />,
                  border: "border-zinc-400/20",
                  bg: "bg-zinc-400/[0.05]",
                  text: "text-zinc-300",
                  glow: "rgba(200,200,200,0.08)",
                };
              return (
                <Reveal
                  key={group.title}
                  delay={index * 0.04}
                  className={index === skillGroups.length - 1 ? "lg:col-span-2" : ""}
                >
                  <article
                    className="card-hover-glow relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.13]"
                  >
                    {/* Category header */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border ${cfg.border} ${cfg.bg} ${cfg.text}`}
                      >
                        {cfg.icon}
                      </div>
                      <h3 className="font-heading text-base font-bold text-white">
                        {group.title}
                      </h3>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] ${cfg.border} ${cfg.bg} ${cfg.text}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Production use note */}
                    <p className="mt-4 text-xs leading-5 text-zinc-600">
                      {group.productionUse}
                    </p>

                    {/* Ambient glow */}
                    <div
                      className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-3xl"
                      style={{ background: cfg.glow }}
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── EXPERIENCE TIMELINE ─────────────────────────────────────── */}
      <Section id="experience" title="Experience Timeline" eyebrow="Career">
        <Container>
          <div className="relative space-y-5">
            {/* Animated vertical timeline line */}
            <div className="absolute left-8 top-3 bottom-3 w-px overflow-hidden">
              <div
                className="timeline-line-animate h-full w-full bg-gradient-to-b from-indigo-500/60 via-violet-500/40 to-transparent"
              />
            </div>

            {experience.map((item, index) => (
              <Reveal key={item.company} delay={index * 0.08}>
                <article className="relative ml-16 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.48),0_0_30px_rgba(129,140,248,0.07)]">
                  {/* Timeline dot / company badge */}
                  <div className="absolute -left-[3.6rem] top-5 flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/40 bg-[#030308] text-xs font-bold text-indigo-200 shadow-[0_0_16px_rgba(129,140,248,0.2)]">
                    {monogram(item.company)}
                  </div>

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-indigo-300">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
                      {item.dates}
                    </span>
                  </div>

                  {/* Key achievement highlight */}
                  <div className="mt-3 rounded-xl border border-indigo-400/15 bg-indigo-400/[0.05] px-4 py-2">
                    <p className="text-sm font-semibold text-indigo-100">{item.keyAchievement}</p>
                  </div>

                  {/* Bullet list */}
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-zinc-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
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

      {/* ── EDUCATION ───────────────────────────────────────────────── */}
      <Section id="education" title="Education" eyebrow="Academic">
        <Container>
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                  {/* Degree icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/35 bg-violet-400/[0.08] shadow-[0_0_20px_rgba(167,139,250,0.2)]">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-violet-300" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12v5c3.33 2 8.67 2 12 0v-5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-white">
                      Master&apos;s in Data Science and Analytics
                    </p>
                    <p className="mt-1 text-sm font-semibold text-violet-300">New England College</p>
                  </div>
                </div>
                <span className="rounded-full border border-violet-400/30 bg-violet-400/[0.08] px-5 py-2 text-xs font-semibold text-violet-200">
                  Graduate Degree
                </span>
              </div>
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/8 blur-3xl" />
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* ── PRINCIPLES ──────────────────────────────────────────────── */}
      <Section id="about" title="Engineering Principles" eyebrow="Philosophy">
        <Container>
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                {siteConfig.about.map((line, i) => (
                  <div key={line} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-400/[0.07] text-xs font-bold text-indigo-300">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm leading-7 text-zinc-300">{line}</p>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-indigo-500/6 blur-3xl" />
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* ── CONTACT CTA ─────────────────────────────────────────────── */}
      <Section id="contact-cta" className="pb-8 pt-4">
        <Container>
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl border border-indigo-400/25 p-10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] lg:p-14"
              style={{
                background:
                  "linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(167,139,250,0.08) 40%, rgba(34,211,238,0.06) 100%)",
              }}
            >
              {/* Top gradient glow */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-indigo-400">
                  Let&apos;s Connect
                </p>
                <h2 className="font-heading mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Open to Senior Data<br className="hidden sm:block" /> Engineering opportunities
                </h2>
                <p className="mt-4 text-base text-zinc-300">
                  I respond within 24 hours. Let&apos;s discuss your data platform challenges.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {socials.Email ? (
                    <Button href={socials.Email}>
                      <MailIcon className="h-4 w-4" />
                      Email Me
                    </Button>
                  ) : null}
                  {socials.LinkedIn ? (
                    <Button href={socials.LinkedIn} target="_blank" rel="noreferrer" variant="secondary">
                      <LinkedInIcon className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  ) : null}
                  {socials.GitHub ? (
                    <Button href={socials.GitHub} target="_blank" rel="noreferrer" variant="secondary">
                      <GitHubIcon className="h-4 w-4" />
                      GitHub
                    </Button>
                  ) : null}
                  <Button href="/contact" variant="secondary">
                    Contact Form
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
