import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  description:
    "Krishna Reddy is a Senior Data Engineer building scalable platforms: 10TB/day pipelines, sub-second streaming, and self-serve analytics.",
  openGraph: {
    description: "Senior Data Engineer portfolio focused on data platform outcomes and architecture-led case studies."
  }
};

const metrics = [
  {
    headline: "10TB+ daily pipelines",
    context: "Designed for stable high-volume ingestion and predictable SLAs across core analytics domains."
  },
  {
    headline: "40% throughput improvement",
    context: "Achieved by Spark optimization, partition redesign, and dependency-aware orchestration."
  },
  {
    headline: "30% fewer failures",
    context: "Delivered through migration from legacy scheduling to Airflow with alerting and retries."
  },
  {
    headline: "200+ self-serve users",
    context: "Enabled governed access to trusted datasets through an AWS lakehouse model."
  },
  {
    headline: "Sub-second streaming visibility",
    context: "Built Kafka + Spark pipelines to minimize operational latency for monitoring signals."
  },
  {
    headline: "45% lower data errors",
    context: "Implemented automated data quality checks and anomaly triage for critical tables."
  }
];

const skillGroups = {
  Languages: ["Python", "PySpark", "SQL"],
  "Data Processing": ["Apache Spark", "Hadoop", "dbt"],
  Streaming: ["Apache Kafka", "Spark Structured Streaming"],
  Cloud: ["AWS (S3, Glue, Lambda, Redshift)", "Azure (ADF, Synapse)"],
  Orchestration: ["Airflow"],
  "Lakehouse/Warehouse": ["Databricks", "Delta Lake", "Snowflake"],
  "CI/CD & IaC": ["Docker", "Git", "Jenkins", "GitLab CI", "Terraform"]
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Reveal>
        <section className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute right-8 top-8 hidden rounded-full border border-white/20 px-3 py-1 text-xs text-slate sm:block">
            Available for Senior Data Engineering roles
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Senior Data Engineer</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">Krishna Reddy</h1>
          <p className="mt-3 text-sm text-slate">Charlotte, NC | Open to Remote | US Work Authorized</p>
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

      <Reveal delay={0.08}>
        <Section title="Impact Snapshot" eyebrow="Outcomes">
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((item) => (
              <article key={item.headline} className="glass-card p-5">
                <h3 className="text-base font-semibold text-ink">{item.headline}</h3>
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
              I design platforms for reliability first: deterministic pipelines, observable systems, and clear failure paths.
              I prioritize cost-aware architecture decisions so scale does not compromise efficiency. Data quality is treated as
              a product feature, not a downstream cleanup task.
            </p>
            <p className="mt-3 leading-7">
              I am especially interested in lakehouse architecture, streaming data systems, and long-term data platform
              engineering that helps teams move faster with trust.
            </p>
          </article>
        </Section>
      </Reveal>

      <Reveal delay={0.12}>
        <Section title="Core Expertise" eyebrow="Skills">
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skillGroups).map(([group, entries]) => (
              <article key={group} className="glass-card p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entries.map((skill) => (
                    <li key={skill} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>
      </Reveal>
    </div>
  );
}
