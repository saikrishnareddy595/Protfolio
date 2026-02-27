"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { projects } from "@/config/projects";

const filters = ["All", "Lakehouse", "Streaming", "Orchestration", "AI"] as const;

type Filter = (typeof filters)[number];

function matchesFilter(filter: Filter, stack: string[]) {
  if (filter === "All") return true;
  const text = stack.join(" ").toLowerCase();
  if (filter === "Lakehouse") return text.includes("delta") || text.includes("iceberg") || text.includes("redshift") || text.includes("lakehouse");
  if (filter === "Streaming") return text.includes("kafka") || text.includes("stream");
  if (filter === "Orchestration") return text.includes("airflow") || text.includes("dbt");
  return text.includes("llm") || text.includes("ai");
}

export function ProjectsExplorer() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    return projects.filter((project) => {
      const haystack = `${project.title} ${project.summary} ${project.stack.join(" ")}`.toLowerCase();
      return matchesFilter(activeFilter, project.stack) && haystack.includes(query.toLowerCase());
    });
  }, [activeFilter, query]);

  return (
    <Section title="Projects Worked" eyebrow="Case Studies">
      <Container>
        <Reveal>
          <div className="mb-8 space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    activeFilter === filter
                      ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-200"
                      : "border-white/15 bg-white/[0.04] text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="block">
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, stack, or summary"
                className="w-full rounded-xl border border-white/15 bg-zinc-900/70 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500"
              />
            </label>
          </div>
        </Reveal>

        <div className="mb-5 flex flex-wrap gap-2">
          <Badge>{visible.length} projects</Badge>
          <Badge>{activeFilter}</Badge>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
