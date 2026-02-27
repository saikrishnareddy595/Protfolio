import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Premium data engineering projects with architecture depth and measurable outcomes.",
  alternates: {
    canonical: "/projects"
  },
  openGraph: {
    description: "Data engineering projects across lakehouse, streaming, orchestration, and AI-ready data platforms.",
    images: [siteConfig.ogImage]
  }
};

export default function ProjectsPage() {
  return <ProjectsExplorer />;
}
