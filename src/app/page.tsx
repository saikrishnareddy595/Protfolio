import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const highlights = [
  "Built and operated 10TB+ daily data pipelines across enterprise platforms.",
  "Improved throughput by 40% via ETL redesign and orchestration optimization.",
  "Reduced failures by 30% through Airflow migration from legacy jobs.",
  "Delivered AWS lakehouse self-serve analytics for 200+ users.",
  "Enabled sub-second availability using Kafka and Spark streaming.",
  "Cut data quality errors by 45% with automated quality controls."
];

const skills = [
  "Python",
  "PySpark",
  "SQL",
  "Spark",
  "Kafka",
  "Hadoop",
  "AWS (S3, Glue, Lambda, Redshift)",
  "Azure (ADF, Synapse)",
  "Snowflake",
  "Databricks",
  "Delta Lake",
  "Airflow",
  "dbt",
  "Terraform",
  "Docker",
  "Git",
  "Jenkins",
  "GitLab CI",
  "GenAI/LLMs"
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Reveal>
        <section className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute right-8 top-8 hidden rounded-full border border-white/20 px-3 py-1 text-xs text-slate sm:block">
            Available for Senior Data Engineering roles
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Senior Data Engineer</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            Krishna Reddy
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate sm:text-lg">
            5+ years delivering cloud-native data platforms for Charter Communications, Wells Fargo, and McKesson.
            I build resilient batch and streaming systems that improve reliability, speed, and decision quality.
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
            {highlights.map((item) => (
              <article key={item} className="glass-card p-5 text-sm leading-6 text-slate">
                {item}
              </article>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal delay={0.12}>
        <Section title="Core Expertise" eyebrow="Skills">
          <div className="glass-card p-6">
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </Reveal>
    </div>
  );
}
