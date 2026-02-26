import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { projectSlugs, projects } from "@/data/projects";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      description: project.summary,
      images: ["/og.png"]
    }
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-10">
      <header className="glass-card p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Case Study</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate">{project.summary}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
        <div className="space-y-10">
          <Section title="Architecture Diagram">
            <div className="glass-card overflow-hidden p-4">
              <img src={project.diagram} alt={`${project.title} architecture diagram`} className="h-auto w-full rounded-lg border border-white/10" />
            </div>
          </Section>

          <Section title="Challenge">
            <div className="glass-card p-6 text-slate">{project.challenge}</div>
          </Section>

          <Section title="Approach">
            <div className="glass-card p-6">
              <ul className="space-y-3 text-slate">
                {project.approach.map((step) => (
                  <li key={step} className="list-inside list-disc leading-7">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Impact">
            <div className="glass-card p-6">
              <ul className="space-y-3 text-slate">
                {project.impact.map((result) => (
                  <li key={result} className="list-inside list-disc leading-7">
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Technology Stack">
            <div className="glass-card p-6">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {project.genaiDetails ? (
            <>
              <Section title="Problem">
                <div className="glass-card p-6 text-slate">{project.genaiDetails.problem}</div>
              </Section>

              <Section title="Approach (Prompt Structure + JSON Schema Output)">
                <div className="glass-card p-6">
                  <ul className="space-y-3 text-slate">
                    {project.genaiDetails.approach.map((item) => (
                      <li key={item} className="list-inside list-disc leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              <Section title="Guardrails (Validation, Retries, Fallbacks)">
                <div className="glass-card p-6">
                  <ul className="space-y-3 text-slate">
                    {project.genaiDetails.guardrails.map((item) => (
                      <li key={item} className="list-inside list-disc leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              <Section title="Latency/Cost Tradeoffs">
                <div className="glass-card p-6">
                  <ul className="space-y-3 text-slate">
                    {project.genaiDetails.latencyCostTradeoffs.map((item) => (
                      <li key={item} className="list-inside list-disc leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              <Section title="Outcomes/Metrics">
                <div className="glass-card p-6">
                  <ul className="space-y-3 text-slate">
                    {project.genaiDetails.outcomes.map((item) => (
                      <li key={item} className="list-inside list-disc leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </>
          ) : null}
        </div>

        <aside className="glass-card p-6 lg:sticky lg:top-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Artifacts</h2>
          <div className="mt-4 grid gap-3">
            <a href={project.artifacts.githubRepo} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-4 py-2 text-center text-sm font-medium text-slate-950">
              GitHub Repo
            </a>
            <a href={project.artifacts.architectureDiagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-center text-sm text-ink">
              Architecture Diagram
            </a>
            {project.artifacts.liveDemo ? (
              <a href={project.artifacts.liveDemo} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-center text-sm text-ink">
                Live Demo
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
