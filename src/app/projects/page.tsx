import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data engineering case studies across lakehouse, ETL modernization, streaming, and AI-assisted data quality.",
  openGraph: {
    description: "Project deep dives covering architecture, implementation approach, and measurable outcomes."
  }
};

export default function ProjectsPage() {
  return (
    <Section title="Project Case Studies" eyebrow="Portfolio">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
