import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Krishna Reddy, Senior Data Engineer with experience at Charter Communications, Wells Fargo, and McKesson.",
  openGraph: {
    description: "Experience, skills, and education summary for Krishna Reddy.",
    images: ["/og.png"]
  }
};

const experience = [
  {
    company: "Charter Communications",
    role: "Senior Data Engineer",
    dates: "Dec 2023 - Present",
    details: [
      "Led engineering for 10TB+ daily data pipelines supporting analytics and operational reporting.",
      "Improved throughput by 40% using Spark tuning, partition strategy optimization, and orchestration redesign.",
      "Implemented streaming data products with Kafka for sub-second monitoring data availability."
    ]
  },
  {
    company: "Wells Fargo",
    role: "Data Engineer",
    dates: "Aug 2022 - Nov 2023",
    details: [
      "Migrated legacy ETL frameworks to Airflow DAGs, reducing failure rates by 30%.",
      "Standardized data quality checks and automation that reduced downstream errors by 45%.",
      "Partnered across analytics and governance teams to increase trust in enterprise datasets."
    ]
  },
  {
    company: "McKesson",
    role: "Data Engineer",
    dates: "Aug 2021 - Jun 2022",
    details: [
      "Built AWS lakehouse foundations enabling self-serve analytics for 200+ users.",
      "Developed reusable ingestion and transformation templates for scalable delivery.",
      "Supported secure multi-environment deployments with IaC and CI/CD workflows."
    ]
  }
];

const skills = {
  languages: "Python, PySpark, SQL",
  platforms: "Spark, Kafka, Hadoop, Snowflake, Databricks, Delta Lake",
  cloud: "AWS (S3, Glue, Lambda, Redshift), Azure (ADF, Synapse)",
  tools: "Airflow, dbt, Terraform, Docker, Git, Jenkins, GitLab CI, GenAI/LLMs"
};

const education = [
  {
    school: "University Name (Placeholder)",
    degree: "Master's Degree (Placeholder)",
    dates: "Year - Year"
  },
  {
    school: "University Name (Placeholder)",
    degree: "Bachelor's Degree (Placeholder)",
    dates: "Year - Year"
  }
];

export default function ResumePage() {
  return (
    <div className="space-y-10">
      <header className="glass-card p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Resume</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Krishna Reddy</h1>
        <p className="mt-4 max-w-3xl text-slate">
          Senior Data Engineer with 5+ years building enterprise-scale data platforms and real-time analytics systems.
        </p>
        <a
          href="/resume.pdf"
          className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-slate-950"
          target="_blank"
          rel="noreferrer"
        >
          Download Resume
        </a>
        <p className="mt-2 text-xs text-slate">Last updated: Feb 2026</p>
      </header>

      <Section title="Experience">
        <div className="space-y-4">
          {experience.map((job) => (
            <article key={job.company} className="glass-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold text-ink">{job.role}</h2>
                  <p className="mt-1 text-sm text-accent">{job.company}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.1em] text-slate">{job.dates}</p>
              </div>
              <ul className="mt-4 space-y-2 text-slate">
                {job.details.map((point) => (
                  <li key={point} className="list-inside list-disc leading-7">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Technical Skills">
        <article className="glass-card p-6 text-slate">
          <p className="leading-7"><strong className="text-ink">Languages:</strong> {skills.languages}</p>
          <p className="leading-7"><strong className="text-ink">Platforms:</strong> {skills.platforms}</p>
          <p className="leading-7"><strong className="text-ink">Cloud:</strong> {skills.cloud}</p>
          <p className="leading-7"><strong className="text-ink">Tools:</strong> {skills.tools}</p>
        </article>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {education.map((item) => (
            <article key={`${item.school}-${item.degree}`} className="glass-card p-6">
              <h3 className="text-lg font-semibold text-ink">{item.degree}</h3>
              <p className="mt-1 text-sm text-accent">{item.school}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate">{item.dates}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
