import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { BriefcaseIcon, HomeOfficeIcon, PinIcon } from "@/components/social-icons";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Krishna Reddy builds data platforms at scale with measurable impact across batch, streaming, and self-serve analytics.",
  openGraph: {
    description: "Senior Data Engineer portfolio with enterprise data platform case studies and production outcomes.",
    images: ["/og.png"]
  }
};

const metrics = [
  {
    number: "10TB+/day",
    title: "Pipeline Throughput",
    context: "Stable high-volume data movement for analytics-critical domains."
  },
  {
    number: "40%",
    title: "Throughput Improvement",
    context: "Reduced batch window by roughly two hours with Spark and orchestration tuning."
  },
  {
    number: "30%",
    title: "Fewer Failures",
    context: "Less on-call triage and faster backfills after Airflow modernization."
  },
  {
    number: "200+",
    title: "Self-Serve Users",
    context: "Trusted analytics consumption through governed lakehouse datasets."
  },
  {
    number: "<1s",
    title: "Streaming Availability",
    context: "Near real-time event visibility for operational monitoring pipelines."
  },
  {
    number: "45%",
    title: "Data Error Reduction",
    context: "Automated quality checks and anomaly triage improved downstream trust."
  }
];

const skillMatrix = [
  {
    title: "Foundations",
    items: ["Python", "Advanced SQL", "Java/Scala"],
    usage: "I use these daily for durable transformations, performance tuning, and production incident resolution."
  },
  {
    title: "Warehousing & Storage",
    items: [
      "Snowflake/BigQuery/Redshift",
      "Postgres/MySQL",
      "Mongo/Dynamo/Cassandra",
      "Delta/Iceberg"
    ],
    usage: "I select storage patterns based on workload shape, governance, and query latency requirements."
  },
  {
    title: "Big Data & Streaming",
    items: ["Spark/Hadoop (partitioning/shuffle/memory)", "Kafka", "Flink (or equivalent)"],
    usage: "I design batch and streaming paths that stay predictable under high volume and traffic spikes."
  },
  {
    title: "Orchestration & Transform",
    items: ["Airflow", "dbt"],
    usage: "I operationalize DAG reliability, SLA tracking, and versioned transformations for team-scale delivery."
  },
  {
    title: "Cloud & DataOps",
    items: ["AWS/GCP/Azure", "IaC (Terraform/CloudFormation)", "Docker/K8s", "CI/CD"],
    usage: "I treat infrastructure and deployment automation as core to repeatable, low-risk releases."
  },
  {
    title: "Data Quality & Observability",
    items: ["Great Expectations/dbt tests", "Lineage/monitoring", "Alerting SLAs"],
    usage: "I enforce quality contracts and observability so issues are detected early and explained clearly."
  },
  {
    title: "2026 AI Edge",
    items: ["RAG-ready pipelines", "Vector DB concepts", "Feature store basics", "AI copilot fluency"],
    usage: "I prepare data foundations for AI workloads without compromising platform reliability and governance."
  }
];

const experienceTimeline = [
  "Charter Communications - Dec 2023 to Present",
  "Wells Fargo - Aug 2022 to Nov 2023",
  "McKesson - Aug 2021 to Jun 2022"
];

export default function HomePage() {
  const featuredProject = projects.find((project) => project.slug === "llm-assisted-data-quality-anomaly-detection");

  return (
    <div className="space-y-16">
      <Reveal>
        <section className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute right-8 top-8 hidden rounded-full border border-white/20 px-3 py-1 text-xs text-slate sm:block">
            Available for Senior Data Engineering roles
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Senior Data Engineer</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">Krishna Reddy</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate">
            <span className="inline-flex items-center gap-1.5">
              <PinIcon className="h-4 w-4" />
              Charlotte, NC
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseIcon className="h-4 w-4" />
              Open to Relocate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HomeOfficeIcon className="h-4 w-4" />
              Open to Remote
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseIcon className="h-4 w-4" />
              US Work Authorized.
            </span>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate sm:text-lg">
            I build data platforms at scale - 10TB/day pipelines, sub-second streaming, and self-serve analytics trusted by
            200+ users.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-slate-950">
              Explore Projects
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-ink">
              Contact
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.06}>
        <Section title="Featured Project" eyebrow="Flagship">
          {featuredProject ? (
            <article className="glass-card p-6">
              <h3 className="text-xl font-semibold text-ink">{featuredProject.title}</h3>
              <p className="mt-3 max-w-3xl text-slate">{featuredProject.summary}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={featuredProject.artifacts.githubRepo} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-slate-950">
                  GitHub Repo
                </a>
                <Link href={`/projects/${featuredProject.slug}`} className="rounded-full border border-white/20 px-4 py-2 text-sm text-ink">
                  Read Case Study
                </Link>
              </div>
            </article>
          ) : null}
        </Section>
      </Reveal>

      <Reveal delay={0.08}>
        <Section title="Impact Metrics" eyebrow="Outcomes">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((item) => (
              <article key={item.title} className="glass-card p-5 shadow-glow">
                <p className="text-3xl font-semibold text-ink">{item.number}</p>
                <h3 className="mt-2 text-sm uppercase tracking-[0.12em] text-accent">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{item.context}</p>
              </article>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal delay={0.1}>
        <Section title="About" eyebrow="Engineering Principles">
          <article className="glass-card p-6 text-slate">
            <p className="leading-7">
              I design for reliability first: deterministic pipelines, explicit failure boundaries, and measurable SLAs. I build
              observability into the platform so root cause analysis is fast and shared across teams.
            </p>
            <p className="mt-3 leading-7">
              My decisions balance performance with cost-awareness, and I treat data quality as a non-negotiable product
              requirement. I am especially focused on lakehouse architecture, streaming systems, and AI-ready platform
              pipelines.
            </p>
          </article>
        </Section>
      </Reveal>

      <Reveal delay={0.12}>
        <Section title="Experience Timeline" eyebrow="Career">
          <div className="glass-card p-6">
            <ul className="space-y-3 text-slate">
              {experienceTimeline.map((item) => (
                <li key={item} className="list-inside list-disc leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </Reveal>

      <Reveal delay={0.14}>
        <Section title="FAANG-ready Skills Matrix" eyebrow="Depth">
          <div className="grid gap-4 lg:grid-cols-2">
            {skillMatrix.map((group) => (
              <article key={group.title} className="glass-card p-5 transition hover:border-accent/40">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate">
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-6 text-slate">{group.usage}</p>
              </article>
            ))}
          </div>
        </Section>
      </Reveal>
    </div>
  );
}
