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
    description: project.summary
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
    </article>
  );
}
