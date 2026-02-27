export type Project = {
  slug: string;
  title: string;
  summary: string;
  impactLine: string;
  stack: string[];
  metrics: string[];
  artifacts: {
    diagram: string;
  };
  problem: string;
  approach: string[];
  architecture: string[];
  qualityTesting: string[];
  results: string[];
  tradeoffs: string[];
  nextImprovements: string[];
};

export const projects: Project[] = [
  {
    slug: "llm-assisted-data-quality-anomaly-detection",
    title: "LLM-assisted Data Quality & Anomaly Detection",
    summary:
      "Combined deterministic checks with LLM-guided triage to reduce noisy alerts and accelerate incident response.",
    impactLine: "Reduced data errors by 45% and improved incident triage speed with structured anomaly summaries.",
    stack: ["Python", "SQL", "Airflow", "dbt", "LLM provider", "AWS Lambda"],
    metrics: ["45% data error reduction", "Faster triage", "Lower noisy alert load"],
    artifacts: {
      diagram: "/diagrams/llm-data-quality.svg"
    },
    problem:
      "High alert volume and low-context incidents made on-call diagnosis slow and inconsistent across data domains.",
    approach: [
      "Designed prompt templates combining schema metadata, anomaly signals, and upstream context.",
      "Enforced JSON schema outputs for anomaly type, confidence, and suggested next checks.",
      "Added few-shot examples for recurring failure patterns."
    ],
    architecture: [
      "Quality checks emit structured anomaly events to a triage service.",
      "Triage service enriches prompts with historical run context and table health signals.",
      "LLM output is validated and routed to alert channels with fallback paths."
    ],
    qualityTesting: [
      "Schema validation on every response; retry on malformed output.",
      "Confidence thresholds trigger deterministic rule-based fallback.",
      "Sensitive fields masked before prompt construction."
    ],
    results: [
      "Reduced noisy alert volume while preserving true-positive detection.",
      "Improved mean time to triage with structured summaries.",
      "Increased stakeholder trust through explicit guardrails and fallback logic."
    ],
    tradeoffs: [
      "Higher model quality increased latency for complex incidents.",
      "Token cost required caching and tiered model strategy.",
      "Strict schema checks improved reliability but required tighter prompt discipline."
    ],
    nextImprovements: [
      "Extend anomaly feedback loop for continuous prompt calibration.",
      "Add automated post-incident root-cause tagging.",
      "Integrate cost-aware model selection based on alert severity."
    ]
  },
  {
    slug: "aws-lakehouse-self-serve-analytics",
    title: "AWS Lakehouse for Self-Serve Analytics",
    summary:
      "Built a governed AWS lakehouse that unified curated datasets and enabled trusted self-serve analytics at scale.",
    impactLine: "Enabled self-serve analytics for 200+ users and accelerated decision cycles.",
    stack: ["AWS S3", "Glue", "Spark", "Redshift", "Python", "Terraform"],
    metrics: ["200+ analytics users", "10TB+/day processing", "Higher data trust"],
    artifacts: {
      diagram: "/diagrams/aws-lakehouse.svg"
    },
    problem:
      "Analytics teams relied on fragmented marts and manual requests, creating long lead times and inconsistent metrics.",
    approach: [
      "Implemented medallion-style modeling on S3 with governed serving layers.",
      "Established contracts and schema checks for reliable downstream consumption.",
      "Added reusable ingestion patterns for faster domain onboarding."
    ],
    architecture: [
      "Raw and curated layers in S3 with Glue catalog governance.",
      "Spark pipelines transform data into domain-specific serving tables.",
      "Redshift and BI tools consume trusted curated datasets."
    ],
    qualityTesting: [
      "Freshness and completeness checks for critical tables.",
      "Automated schema change detection.",
      "Alerting for SLA breaches in ingestion and transform stages."
    ],
    results: [
      "Expanded analytics access to 200+ users.",
      "Improved consistency across KPI definitions.",
      "Reduced request-response cycle for business insights."
    ],
    tradeoffs: [
      "Stronger governance introduced initial onboarding overhead.",
      "Storage optimization required periodic partition maintenance.",
      "Cross-team ownership needed clear operating agreements."
    ],
    nextImprovements: [
      "Add semantic layer for broader metric reuse.",
      "Expand lineage tracking for governance visibility.",
      "Increase automated cost optimization recommendations."
    ]
  },
  {
    slug: "airflow-migration-legacy-etl-modernization",
    title: "Airflow Migration: Legacy ETL Modernization",
    summary:
      "Migrated brittle legacy scheduling systems to Airflow for resilience, visibility, and operational control.",
    impactLine: "Reduced failures by 30% and improved throughput by 40% through workflow modernization.",
    stack: ["Airflow", "Python", "SQL", "Docker", "CI/CD"],
    metrics: ["30% fewer failures", "40% throughput improvement", "Lower toil"],
    artifacts: {
      diagram: "/diagrams/airflow-migration.svg"
    },
    problem:
      "Legacy ETL chains had poor dependency visibility, fragile recovery paths, and inconsistent deployment controls.",
    approach: [
      "Rebuilt jobs as modular DAGs with standardized operator patterns.",
      "Implemented CI gates and environment promotion standards.",
      "Added SLA-aware alerting and runbook-driven incident handling."
    ],
    architecture: [
      "Airflow orchestrates dependent DAGs across batch domains.",
      "Containerized workers execute reusable transformation modules.",
      "Monitoring stack surfaces runtime state and SLA drift."
    ],
    qualityTesting: [
      "DAG linting and unit checks in CI.",
      "Data quality checks integrated into critical DAG stages.",
      "Automated alert escalation for repeated run failures."
    ],
    results: [
      "Failure rates dropped by 30% after migration.",
      "Throughput improved 40% through orchestration and batching changes.",
      "Operational load decreased with deterministic recovery paths."
    ],
    tradeoffs: [
      "Migration required phased coexistence with legacy tooling.",
      "New standards required team retraining.",
      "DAG sprawl risk required governance controls."
    ],
    nextImprovements: [
      "Introduce dynamic DAG generation for repetitive workflows.",
      "Add deeper task-level cost telemetry.",
      "Expand self-service pipeline templates for new domains."
    ]
  },
  {
    slug: "kafka-streaming-real-time-monitoring",
    title: "Kafka Streaming for Real-time Monitoring",
    summary:
      "Delivered streaming pipelines for low-latency monitoring and event-driven analytics.",
    impactLine: "Enabled sub-second data availability for real-time operational visibility.",
    stack: ["Kafka", "Spark Structured Streaming", "PySpark", "Delta Lake", "Databricks"],
    metrics: ["Sub-second latency", "Higher alert freshness", "Reduced dashboard lag"],
    artifacts: {
      diagram: "/diagrams/kafka-streaming.svg"
    },
    problem:
      "Batch pipelines introduced stale operational views and delayed anomaly detection for fast-moving systems.",
    approach: [
      "Defined Kafka topic and partition strategy for scalable event flow.",
      "Implemented Spark streaming jobs with low-latency transforms.",
      "Built replay-safe recovery paths for resilience."
    ],
    architecture: [
      "Source services publish events to partitioned Kafka topics.",
      "Streaming compute processes and enriches events in near real-time.",
      "Monitoring and analytics layers consume curated streaming outputs."
    ],
    qualityTesting: [
      "Schema registry validation for producer/consumer compatibility.",
      "Latency SLA tracking and alerting across processing stages.",
      "Replay and backpressure simulation tests."
    ],
    results: [
      "Achieved sub-second event availability for key dashboards.",
      "Improved anomaly response lead time.",
      "Reduced stale-data incidents in operational reporting."
    ],
    tradeoffs: [
      "Tighter latency targets increased operational complexity.",
      "Throughput spikes required proactive partition and consumer tuning.",
      "Monitoring depth increased observability overhead."
    ],
    nextImprovements: [
      "Introduce adaptive autoscaling for streaming consumers.",
      "Add richer end-to-end lineage for streaming pipelines.",
      "Standardize event contracts across additional domains."
    ]
  }
];

export const projectSlugs = projects.map((project) => project.slug);
