export type Project = {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string[];
  impact: string[];
  stack: string[];
  diagram: string;
  artifacts: {
    githubRepo: string;
    diagram: string;
    liveDemo?: string;
  };
  genaiDetails?: {
    modelProvider: string;
    promptingApproach: string[];
    guardrails: string[];
    latencyCostTradeoffs: string[];
    measuredOutcomes: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "aws-lakehouse-self-serve-analytics",
    title: "AWS Lakehouse for Self-Serve Analytics",
    summary:
      "Built a scalable AWS lakehouse that unified curated datasets and enabled trusted self-serve analytics for 200+ internal users.",
    challenge:
      "Business teams depended on slow, ticket-based data requests and fragmented marts, limiting visibility and decision speed.",
    approach: [
      "Designed a medallion-style architecture on S3 with Glue, Spark, and Redshift serving layers.",
      "Implemented schema governance and data contracts to stabilize downstream consumption.",
      "Added role-based access and shared semantic datasets to reduce duplicate reporting logic."
    ],
    impact: [
      "Enabled self-serve analytics for 200+ business users.",
      "Reduced time-to-insight by consolidating critical datasets into a governed platform.",
      "Improved reliability and observability for daily 10TB+ data movement."
    ],
    stack: ["AWS S3", "AWS Glue", "Spark", "Redshift", "Python", "SQL", "Terraform"],
    diagram: "/diagrams/aws-lakehouse.svg",
    artifacts: {
      githubRepo: "https://github.com/saikrishnareddy595/Protfolio/tree/main#todo-lakehouse-repo",
      diagram: "/diagrams/aws-lakehouse.svg",
      liveDemo: "https://example.com/todo-lakehouse-demo"
    }
  },
  {
    slug: "airflow-migration-legacy-etl-modernization",
    title: "Airflow Migration: Legacy ETL Modernization",
    summary:
      "Migrated legacy schedulers and brittle ETL chains to Airflow DAGs with standardized orchestration and monitoring.",
    challenge:
      "Legacy workflows lacked dependency visibility, had manual recovery steps, and caused frequent production failures.",
    approach: [
      "Rebuilt critical pipelines in modular Airflow DAGs with reusable operators and alerting.",
      "Introduced CI checks and environment promotion standards for DAG quality.",
      "Instrumented SLA tracking and runbooks to speed incident response."
    ],
    impact: [
      "Cut pipeline failures by 30% after migration.",
      "Increased end-to-end throughput by 40% through optimized orchestration.",
      "Reduced operational burden by replacing manual interventions with automated retries and alerts."
    ],
    stack: ["Apache Airflow", "Python", "SQL", "Docker", "GitLab CI", "Jenkins"],
    diagram: "/diagrams/airflow-migration.svg",
    artifacts: {
      githubRepo: "https://github.com/saikrishnareddy595/Protfolio/tree/main#todo-airflow-repo",
      diagram: "/diagrams/airflow-migration.svg",
      liveDemo: "https://example.com/todo-airflow-demo"
    }
  },
  {
    slug: "kafka-streaming-real-time-monitoring",
    title: "Kafka Streaming for Real-time Monitoring",
    summary:
      "Delivered event-driven streaming pipelines using Kafka and Spark for near real-time operational visibility.",
    challenge:
      "Batch-first architecture delayed critical monitoring and caused stale dashboards for fast-moving operations.",
    approach: [
      "Designed Kafka topic strategy with partitioning and consumer scaling patterns.",
      "Implemented Spark Structured Streaming jobs with low-latency transformations.",
      "Added quality gates and replay-friendly processing for resilience."
    ],
    impact: [
      "Achieved sub-second data availability for monitoring use cases.",
      "Improved anomaly detection response time with streaming-derived metrics.",
      "Reduced lag between source events and analytics consumption."
    ],
    stack: ["Apache Kafka", "Spark Structured Streaming", "PySpark", "Delta Lake", "Databricks"],
    diagram: "/diagrams/kafka-streaming.svg",
    artifacts: {
      githubRepo: "https://github.com/saikrishnareddy595/Protfolio/tree/main#todo-kafka-repo",
      diagram: "/diagrams/kafka-streaming.svg",
      liveDemo: "https://example.com/todo-kafka-demo"
    }
  },
  {
    slug: "llm-assisted-data-quality-anomaly-detection",
    title: "LLM-assisted Data Quality & Anomaly Detection",
    summary:
      "Combined rule-based validation and LLM-assisted triage to improve quality checks and accelerate root-cause analysis.",
    challenge:
      "Traditional checks caught failures late and generated noisy alerts that were expensive to triage.",
    approach: [
      "Built automated data quality monitors on critical tables with threshold and freshness checks.",
      "Integrated LLM-assisted summaries to cluster anomaly context for on-call engineers.",
      "Operationalized quality scores into alert routing and dashboarding."
    ],
    impact: [
      "Reduced data errors by 45% through automated quality enforcement.",
      "Improved incident triage speed with contextual anomaly summaries.",
      "Raised stakeholder confidence in downstream analytics outputs."
    ],
    stack: ["Python", "SQL", "dbt", "Airflow", "LLM provider", "AWS Lambda"],
    diagram: "/diagrams/llm-data-quality.svg",
    artifacts: {
      githubRepo: "https://github.com/saikrishnareddy595/Protfolio/tree/main#todo-llm-repo",
      diagram: "/diagrams/llm-data-quality.svg",
      liveDemo: "https://example.com/todo-llm-demo"
    },
    genaiDetails: {
      modelProvider: "LLM provider (anonymized enterprise endpoint)",
      promptingApproach: [
        "Used structured prompts with schema-constrained outputs for anomaly classification and severity tags.",
        "Grounded prompts with sampled row stats, freshness metadata, and upstream dependency context.",
        "Applied few-shot examples for common incident patterns to improve consistency."
      ],
      guardrails: [
        "Masked sensitive fields and removed direct PII before prompt construction.",
        "Enforced deterministic fallback rules when model confidence was low.",
        "Kept human approval for production incident closure recommendations."
      ],
      latencyCostTradeoffs: [
        "Used smaller models for high-frequency checks and escalated to larger models only for complex anomalies.",
        "Cached repeated prompt contexts for recurring table patterns.",
        "Batched low-priority checks to lower token usage during peak windows."
      ],
      measuredOutcomes: [
        "Reduced noisy alert volume while preserving true-positive incident detection.",
        "Improved on-call triage speed with concise root-cause summaries.",
        "Lowered manual effort for recurring data-quality investigations."
      ]
    }
  }
];

export const projectSlugs = projects.map((project) => project.slug);
