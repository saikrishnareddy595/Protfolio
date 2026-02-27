"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Project } from "@/config/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hoverLift className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-semibold text-zinc-100">{project.title}</h3>
          <p className="text-sm leading-6 text-zinc-300">{project.summary}</p>
          <p className="text-sm leading-6 text-zinc-300">{project.impactLine}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Link href={`/projects/${project.slug}`} className="inline-flex text-sm font-medium text-cyan-200 transition hover:text-cyan-100">
          Read case study
        </Link>
      </div>
    </Card>
  );
}
