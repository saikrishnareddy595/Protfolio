import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { projectSlugs, projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`
    },
    openGraph: {
      description: project.summary,
      images: [siteConfig.ogImage]
    }
  };
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-heading text-xl font-semibold text-zinc-100">{title}</h2>
      <ul className="space-y-2 text-sm leading-7 text-zinc-300">
        {items.map((item) => (
          <li key={item} className="list-inside list-disc">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) notFound();

  return (
    <Section className="pt-12 sm:pt-14">
      <Container>
        <div className="space-y-8">
          <Reveal>
            <header className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Case Study</p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">{project.title}</h1>
              <p className="max-w-3xl text-base leading-7 text-zinc-300">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <Badge key={metric}>{metric}</Badge>
                ))}
              </div>
            </header>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3">
              <img src={project.artifacts.diagram} alt={`${project.title} architecture diagram`} className="h-auto w-full rounded-2xl" />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-xl font-semibold text-zinc-100">Problem</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{project.problem}</p>
            </section>

            <ListBlock title="Approach" items={project.approach} />
            <ListBlock title="Architecture" items={project.architecture} />
            <ListBlock title="Data Quality/Testing" items={project.qualityTesting} />
            <ListBlock title="Results" items={project.results} />
            <ListBlock title="Tradeoffs" items={project.tradeoffs} />
            <ListBlock title="Next Improvements" items={project.nextImprovements} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
