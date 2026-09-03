/**
 * Single source of truth for every piece of copy on the site.
 * All figures are taken verbatim from the résumé so the 3D scenes and the
 * HTML overlays can never drift apart.
 */

export const profile = {
  firstName: "Sai Krishna",
  lastName: "Reddy",
  fullName: "Sai Krishna Reddy",
  role: "Senior Software Engineer",
  discipline: "AI Systems · Distributed Data Infrastructure",
  location: "Charlotte, NC",
  email: "krishreddem@gmail.com",
  phone: "(573) 200-4725",
  linkedin: "https://www.linkedin.com/in/reddy4725/",
  github: "https://github.com/saikrishnareddy595",
  resume: "/Sai-Krishna-Reddy-Resume.pdf",
  summary:
    "Senior engineer with 5+ years building production AI systems and the distributed data infrastructure that powers them — across telecommunications, financial services, and cloud data platforms.",
  longSummary:
    "I build multi-agent systems that run unattended in production, and the streaming, storage, and observability layers underneath them. Depth in Python and Go backend services, Kafka streaming, Kubernetes on AWS and Azure, and agent architecture: MCP tool integration, durable execution, evaluation, and observability.",
} as const;

export const heroStats = [
  { value: "8,000+", label: "Autonomous investigations / day" },
  { value: "50M+", label: "Network endpoints covered" },
  { value: "99.92%", label: "Production availability" },
] as const;

export type Scene = {
  id: string;
  index: string;
  eyebrow: string;
  company: string;
  role: string;
  period: string;
  location: string;
  title: string;
  lede: string;
  metrics: { value: string; label: string; detail: string }[];
  bullets: string[];
  stack: string[];
};

export const scenes: Scene[] = [
  {
    id: "spectrum",
    index: "01",
    eyebrow: "Multi-Agent Systems",
    company: "Spectrum · Charter Communications",
    role: "AI Engineer — Field Ops, SCOPE Platform",
    period: "Mar 2025 — Present",
    location: "Charlotte, NC",
    title: "Agents that diagnose a continent-scale network.",
    lede: "A production LangGraph multi-agent system that autonomously troubleshoots faults across a 7-level HFC/DOCSIS 3.1 hierarchy serving 50M+ subscriber endpoints.",
    metrics: [
      {
        value: "8,000+",
        label: "Investigations / day",
        detail: "Autonomous fault diagnostics running unattended in production.",
      },
      {
        value: "35%",
        label: "Less manual triage",
        detail: "Supervisor–worker workflows absorbing decomposition and recovery.",
      },
      {
        value: "20+",
        label: "Tools via MCP",
        detail: "RBAC, schema validation, and audit logging on every invocation.",
      },
      {
        value: "18%",
        label: "Root-cause accuracy",
        detail: "Gained through OpenTelemetry trace analysis across daily runs.",
      },
    ],
    bullets: [
      "Architected supervisor–worker agent workflows combining task decomposition, tool calling, state management, and recovery logic.",
      "Implemented durable execution and checkpointing on PostgreSQL and Redis so long-running investigations resume from the last checkpoint instead of restarting.",
      "Built asynchronous telemetry processing handling 2M+ events/hour across HBase, OpenSearch, and OpenTSDB — 15TB+ of network data at 99.9% completeness.",
      "Developed fault-tolerant gRPC and asynchronous services with retries, timeouts, and failure recovery, sustaining 99.92% availability under load.",
      "Migrated legacy monitoring services to containerized microservices on AWS EKS, cutting deployment cycles from ~2 weeks to under 1 day.",
    ],
    stack: [
      "Python",
      "LangGraph",
      "LangChain",
      "MCP",
      "Kafka",
      "Kubernetes",
      "AWS EKS",
      "HBase",
      "OpenSearch",
      "OpenTSDB",
      "Redis",
      "PostgreSQL",
      "gRPC",
      "OpenTelemetry",
    ],
  },
  {
    id: "capital-one",
    index: "02",
    eyebrow: "Distributed Data Streaming",
    company: "Capital One",
    role: "Data Engineer — Enterprise Data & Payment Intelligence",
    period: "Jun 2023 — Mar 2025",
    location: "Dallas, TX",
    title: "Three million events a day, in motion.",
    lede: "Distributed data services for payment investigation workflows — real-time and asynchronous pipelines feeding 25+ internal services and risk-analysis applications.",
    metrics: [
      {
        value: "3M+",
        label: "Events / day",
        detail: "Financial and operational events through streaming pipelines.",
      },
      {
        value: "1,200/s",
        label: "Kafka throughput",
        detail: "Idempotent consumers with deduplication, retry, and recovery.",
      },
      {
        value: "420→170ms",
        label: "p95 query latency",
        detail: "Redis caching at ~82% hit rate plus SQL, index, and access tuning.",
      },
      {
        value: "30%",
        label: "Faster triage",
        detail: "Monitoring for consumer lag, failures, latency, and data quality.",
      },
    ],
    bullets: [
      "Developed Apache Kafka pipelines with idempotent consumers, deduplication, retry handling, and recovery mechanisms for reliable downstream processing.",
      "Built Python/FastAPI services for ingesting, validating, transforming, and serving transaction data, catching duplicates, malformed records, and inconsistent states before they propagate.",
      "Prepared transaction, account, and operational datasets for retrieval in AI-powered financial investigation workflows.",
      "Integrated golden-dataset and trace-based regression tests into CI/CD to monitor data and AI workflow quality.",
      "Secured data-access services with OAuth 2.0, mTLS, RBAC, and PII protection across 25+ internal consumers.",
    ],
    stack: [
      "Python",
      "SQL",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "FastAPI",
      "Kubernetes",
      "AWS",
      "REST",
      "OAuth 2.0",
      "mTLS",
    ],
  },
  {
    id: "teradata",
    index: "03",
    eyebrow: "Cloud Control Plane",
    company: "Teradata",
    role: "Data Engineer — VantageCloud Data Platform",
    period: "Aug 2021 — May 2023",
    location: "San Diego, CA",
    title: "Infrastructure that provisions and repairs itself.",
    lede: "High-concurrency Go microservices for the VantageCloud control plane, automating multi-tenant database environments across two clouds.",
    metrics: [
      {
        value: "1,500+",
        label: "Environments automated",
        detail: "Multi-tenant database provisioning across AWS and Azure.",
      },
      {
        value: "18→11 min",
        label: "Provisioning latency",
        detail: "Elastic Compute Provisioner tuned for on-demand workloads.",
      },
      {
        value: "60→85%",
        label: "Automation coverage",
        detail: "Lifecycle automation cutting manual provisioning work by ~40%.",
      },
      {
        value: "~40TB",
        label: "Backup & DR data",
        detail: "S3 and Azure Blob workflows with ~25% higher recovery throughput.",
      },
    ],
    bullets: [
      "Built reconciliation services in Go that compare desired vs. actual cloud resource state and self-correct drift, reducing provisioning failure rates by 12%.",
      "Cut compute deployment overhead by ~30% with Terraform and Kubernetes provisioning workflows.",
      "Developed gRPC and REST APIs integrating Amazon S3 and Azure Blob Storage for backup, restore, and disaster-recovery workflows.",
      "Implemented retry handling, state reconciliation, and resource-recovery logic to keep tenant environments consistent through infrastructure failures and workload spikes.",
    ],
    stack: [
      "Go",
      "SQL",
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "Amazon S3",
      "Azure Blob",
      "gRPC",
      "REST",
    ],
  },
];

export const capabilities = [
  {
    title: "AI / LLM Systems",
    items: [
      "LangGraph",
      "LangChain",
      "Supervisor–worker workflows",
      "MCP tool integration",
      "Agent state management",
      "Durable execution & checkpointing",
      "RAG data preparation",
      "Tracing & evaluation",
      "Golden-dataset regression testing",
      "Guardrails: RBAC, schema validation, audit logging",
    ],
  },
  {
    title: "Distributed Systems",
    items: [
      "gRPC",
      "REST",
      "FastAPI",
      "Microservices",
      "Event-driven architecture",
      "Idempotency",
      "Deduplication",
      "Retry & recovery",
      "State reconciliation",
      "Distributed caching",
      "Fault tolerance",
    ],
  },
  {
    title: "Data & Streaming",
    items: [
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "HBase",
      "OpenSearch",
      "OpenTSDB",
      "ETL / ELT",
      "Stream & batch processing",
      "Data validation & quality monitoring",
    ],
  },
  {
    title: "Cloud, Observability & Security",
    items: [
      "AWS (EKS, S3)",
      "Azure Blob Storage",
      "Kubernetes",
      "Docker",
      "Helm",
      "Terraform",
      "CI/CD",
      "OpenTelemetry",
      "Distributed tracing",
      "OAuth 2.0",
      "mTLS",
      "PII protection",
    ],
  },
] as const;

export const languages = ["Python", "Go", "SQL", "Bash"] as const;

export const credentials = [
  {
    kind: "Education",
    title: "M.S. Data Science and Analytics",
    issuer: "New England University",
  },
  {
    kind: "Certification",
    title: "AWS Certified Solutions Architect — Professional",
    issuer: "Amazon Web Services",
  },
  {
    kind: "Certification",
    title: "Azure AI Engineer Associate",
    issuer: "Microsoft",
  },
] as const;

/** Section anchors, in scroll order — used by the nav and the scroll rail. */
export const chapters = [
  { id: "hero", label: "Intro" },
  { id: "spectrum", label: "Agents" },
  { id: "capital-one", label: "Streaming" },
  { id: "teradata", label: "Infrastructure" },
  { id: "contact", label: "Contact" },
] as const;
