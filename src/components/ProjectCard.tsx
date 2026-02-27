"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Badge } from "@/components/Badge";
import { Project } from "@/config/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="h-full"
    >
      <div className="card-hover-glow flex h-full flex-col justify-between gap-5 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-7 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-indigo-400/25">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-heading text-xl font-bold leading-snug text-white">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">{project.summary}</p>
          </div>

          <div className="rounded-xl border border-indigo-400/20 bg-indigo-400/[0.06] px-3 py-2">
            <p className="text-xs font-semibold text-indigo-200">{project.impactLine}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 transition-all duration-300 hover:gap-2.5 hover:text-indigo-100"
        >
          Read case study
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
