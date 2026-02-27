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

export default function HomePage() {
  return (
    <>
      <div id="top" />
      <Section className="relative overflow-hidden pb-12 pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div className="relative">
            <div className="pointer-events-none absolute -left-20 top-[-80px] h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
            <Reveal>
              <div className="relative rounded-3xl border border-white/12 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-12">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-400">{siteConfig.role}</p>
                <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight text-zinc-100 sm:text-6xl">
                  {siteConfig.name}
                </h1>

                <div className="mt-5 h-px w-28 bg-gradient-to-r from-cyan-300 via-cyan-200 to-transparent" />

                <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-200">{siteConfig.tagline}</p>
                <p className="mt-3 text-sm text-zinc-300">{siteConfig.trustLine}</p>
                <p className="mt-2 text-sm text-zinc-400">{siteConfig.locationLine}</p>

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

      <Section id="projects" title="Projects Worked" eyebrow="Selected Work">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="skills" title="Skills Matrix" eyebrow="Engineering Depth">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.03}>
                <article
                  className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.32)] ${
                    index === skillGroups.length - 1 ? "lg:col-span-2" : ""
                  }`}
                >
                  <h3 className="font-heading text-lg font-semibold text-zinc-100">{group.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                    {group.items.map((item) => (
                      <li key={item} className="list-inside list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-zinc-400">Used in production for: {group.productionUse}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="experience" title="Experience Timeline" eyebrow="Career">
        <Container>
          <div className="relative space-y-4 before:absolute before:left-8 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-white/15">
            {experience.map((item, index) => (
              <Reveal key={item.company} delay={index * 0.05}>
                <article className="relative ml-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
                  <div className="absolute -left-14 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/50 bg-zinc-900 text-xs font-semibold text-cyan-200">
                    {monogram(item.company)}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-zinc-100">{item.timelineLabel}</h3>
                  <p className="mt-3 text-sm text-zinc-300">{item.keyAchievement}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

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

      <Section id="contact-cta" className="pt-8">
        <Container>
          <Reveal>
            <article className="rounded-3xl border border-cyan-200/20 bg-gradient-to-r from-cyan-300/10 via-white/[0.03] to-white/[0.03] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <p className="font-heading text-sm uppercase tracking-[0.2em] text-zinc-400">Contact</p>
              <h2 className="font-heading mt-2 text-3xl font-semibold text-zinc-100">Open to Senior Data Engineering opportunities</h2>
              <p className="mt-3 text-sm text-zinc-300">I respond within 24 hours.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.Email ? <Button href={socials.Email}>Email</Button> : null}
                {socials.LinkedIn ? (
                  <Button href={socials.LinkedIn} target="_blank" rel="noreferrer" variant="secondary">
                    LinkedIn
                  </Button>
                ) : null}
                {socials.GitHub ? <IconLink href={socials.GitHub} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} /> : null}
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
