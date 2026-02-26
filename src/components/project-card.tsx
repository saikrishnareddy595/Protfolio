import Link from "next/link";
import { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-card group p-6">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        <p className="text-sm leading-6 text-slate">{project.summary}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span key={item} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-slate">
            {item}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-ink transition group-hover:bg-white/20"
      >
        View Case Study
      </Link>
    </article>
  );
}
