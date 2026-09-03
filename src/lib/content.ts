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
  headline: "Senior Software Engineer — AI Systems & Distributed Infrastructure",
  experienceYears: "5+ Years Experience",
  email: "krishreddem@gmail.com",
  phone: "(573) 200-4725",
  linkedin: "https://www.linkedin.com/in/reddy4725/",
  github: "https://github.com/saikrishnareddy595",
  resume: "/Sai-Krishna-Reddy-Resume.pdf",
  summary:
    "Senior Software Engineer with 5+ years designing and scaling production multi-agent AI systems, high-throughput distributed streaming engines, and multi-cloud control planes.",
  longSummary:
    "I build multi-agent systems that run unattended in production, and the streaming, storage, and observability layers underneath them. Specialized in Python and Go backend services, Apache Kafka streaming pipelines, Kubernetes on AWS and Azure, and agent architecture: MCP tool integration, durable state execution, evaluation, and distributed observability.",
} as const;

export const engineeringPillars = [
  {
    id: "ai-systems",
    title: "AI/ML Systems & Autonomous Agents",
    short: "Multi-Agent Systems",
    summary:
      "LangGraph supervisor–worker orchestration, Model Context Protocol (MCP) tool meshes, durable checkpointing, and LLM evaluation in production.",
    highlights: [
      "LangGraph & LangChain state machines",
      "Model Context Protocol (MCP) tool integration",
      "Durable execution & checkpointing (Postgres/Redis)",
      "OpenTelemetry agent tracing & eval benchmarks",
    ],
    metric: "8,000+ daily autonomous runs",
  },
  {
    id: "distributed-streaming",
    title: "Distributed Systems & Streaming",
    short: "Distributed Systems",
    summary:
      "Event-driven architectures with Apache Kafka, idempotent consumers, deduplication, retry/DLQ patterns, and low-latency gRPC services.",
    highlights: [
      "Apache Kafka event streaming & partition keys",
      "Idempotent processing & sliding-window deduplication",
      "gRPC & high-concurrency REST microservices",
      "Zero-drop failure recovery & dead-letter queues",
    ],
    metric: "3M+ events/day · 1,200/s peak",
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Platforms & Kubernetes",
    short: "Cloud Infrastructure",
    summary:
      "Multi-cloud control planes across AWS and Azure, Kubernetes container orchestration, Terraform IaC, and automated state reconciliation.",
    highlights: [
      "AWS (EKS, S3, IAM) & Azure (AKS, Blob)",
      "Terraform Infrastructure as Code (IaC)",
      "Kubernetes custom reconciliation controllers",
      "mTLS, OAuth 2.0, RBAC & zero-trust security",
    ],
    metric: "1,500+ automated environments",
  },
  {
    id: "data-infrastructure",
    title: "Real-Time Data & Storage",
    short: "Data Infrastructure",
    summary:
      "Sub-10ms caching layers, high-throughput time-series telemetry, relational database tuning, and distributed analytical storage engines.",
    highlights: [
      "Redis caching with 82%+ cache hit rate",
      "PostgreSQL query optimization & partitioning",
      "HBase, OpenSearch & OpenTSDB telemetry",
      "p95 query latency reduced 420ms → 170ms",
    ],
    metric: "15TB+ telemetry · 420→170ms p95",
  },
] as const;

export const recruiterSnapshot = {
  headline: "Senior Software Engineer — 15-Second Recruiter Brief",
  targetRoles: "Senior Software Engineer / Staff Engineer (AI Systems, Distributed Platforms, Backend Infrastructure)",
  yearsExperience: "5+ Years of Production Experience",
  currentWork: "Spectrum (Charter) — Leading LangGraph multi-agent diagnostic AI running 8K+ autonomous runs/day over 50M+ network endpoints.",
  priorScale: "Capital One (3M+ daily events, 1,200/s Kafka, 420→170ms p95), Teradata (1,500+ automated cloud DB environments, multi-cloud Go control plane).",
  education: "M.S. in Data Science and Analytics, New England University",
  certifications: [
    "AWS Certified Solutions Architect — Professional",
    "Azure AI Engineer Associate",
  ],
  quickStats: [
    { label: "Daily Autonomous Runs", value: "8,000+" },
    { label: "Network Endpoints Covered", value: "50M+" },
    { label: "Daily Streaming Events", value: "3M+" },
    { label: "Production Availability SLA", value: "99.92%" },
  ],
} as const;

export type ArchitectureStep = {
  id: string;
  name: string;
  tech: string;
  role: string;
  detail: string;
};

export type EngineeringProject = {
  id: string;
  index: string;
  /** Short label for the nav, the scroll rail and the chapter list. */
  navLabel: string;
  title: string;
  tagline: string;
  category: string;
  company: string;
  period: string;
  problem: string;
  architectureNodes: ArchitectureStep[];
  scaleMetrics: { value: string; label: string; detail: string }[];
  stack: string[];
  tradeoffs: { decision: string; rationale: string }[];
  result: string;
  github?: string;
  demoLabel?: string;
};

export const selectedProjects: EngineeringProject[] = [
  {
    id: "autonomous-diagnostic-mesh",
    navLabel: "Agents",
    index: "01",
    title: "Autonomous Network Incident Diagnostic System",
    tagline: "LangGraph Multi-Agent Mesh with MCP Tools Running 8,000+ Autonomous Investigations / Day Across 50M+ Endpoints",
    category: "AI Systems & Autonomous Agents",
    company: "Spectrum · Charter Communications",
    period: "2025 — Present",
    problem:
      "Outages and signal degradation across a 7-level HFC/DOCSIS 3.1 network serving 50M+ subscriber endpoints generated massive alarm storms. Field operations teams took 45+ minutes per incident manually correlating telemetry across disparate dashboards, causing prolonged subscriber downtime and high MTTR.",
    architectureNodes: [
      {
        id: "ingest",
        name: "Telemetry Ingestion",
        tech: "Kafka + HBase / OpenTSDB",
        role: "High-Throughput Stream Buffer",
        detail: "Ingests 2M+ events/hour from DOCSIS cable modems, optical nodes, and CMTS headends into partitioned Kafka topics.",
      },
      {
        id: "supervisor",
        name: "Supervisor Agent",
        tech: "Python + LangGraph",
        role: "Task Decomposition & State Machine",
        detail: "Evaluates incident alarms, decomposes hypothesis trees, and coordinates worker agents while maintaining durable execution state in PostgreSQL.",
      },
      {
        id: "mcp-mesh",
        name: "Specialized Tool Mesh",
        tech: "Model Context Protocol (MCP)",
        role: "Secure Tool Execution",
        detail: "Executes 20+ diagnostic tools across DOCSIS RF spectrum, optical nodes, BGP/DNS routing, and topology correlation with schema validation and strict RBAC.",
      },
      {
        id: "checkpoint",
        name: "Durable Checkpointing",
        tech: "PostgreSQL + Redis",
        role: "Fault-Tolerant State Store",
        detail: "Persists step-by-step agent memory and graph state. If worker pods cycle or network glitches occur, investigations resume seamlessly without re-running LLM calls.",
      },
      {
        id: "remediation",
        name: "Remediation Engine",
        tech: "gRPC + FastAPI + OpenTelemetry",
        role: "Action Dispatch & Tracing",
        detail: "Dispatches automated port resets or generates prioritized technician work orders with root-cause traces, verified against golden evaluation datasets.",
      },
    ],
    scaleMetrics: [
      {
        value: "8,000+",
        label: "Autonomous Investigations / Day",
        detail: "Unattended multi-agent diagnostic runs resolving network faults 24/7.",
      },
      {
        value: "35%",
        label: "Reduction in Manual Triage",
        detail: "Supervisor–worker agent workflows absorb routine telemetry correlation.",
      },
      {
        value: "50M+",
        label: "Endpoints Covered",
        detail: "Hierarchical DOCSIS 3.1 & optical network across entire North America footprint.",
      },
      {
        value: "99.92%",
        label: "System Availability",
        detail: "Containerized gRPC services on AWS EKS with self-healing retry logic.",
      },
    ],
    stack: [
      "Python",
      "LangGraph",
      "LangChain",
      "MCP",
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "AWS EKS",
      "gRPC",
      "OpenTelemetry",
      "HBase",
      "OpenSearch",
    ],
    tradeoffs: [
      {
        decision: "Supervisor-Worker Graph vs. Free-form ReAct Agent",
        rationale:
          "Free-form agent loops risked non-deterministic tool loops and uncontrolled token spend. A structured LangGraph state machine with explicit decomposition guaranteed predictable recovery and auditability.",
      },
      {
        decision: "Postgres/Redis Checkpointing vs. In-Memory Agent Memory",
        rationale:
          "Multi-minute network diagnostics could fail if Kubernetes evicted worker pods. Durable state serialization allowed paused runs to resume from the last completed tool invocation with zero recomputation.",
      },
      {
        decision: "Model Context Protocol (MCP) vs. Ad-hoc REST SDKs",
        rationale:
          "Standardized tool schemas, RBAC isolation, and uniform error contracts across 20+ internal diagnostic utilities prevented hallucinated arguments and simplified auditing.",
      },
    ],
    result:
      "Deployed into production nationwide, autonomously handling 8,000+ daily investigations, reducing manual field triage by 35%, and cutting deployment cycles from 2 weeks to under 1 day on AWS EKS.",
  },
  {
    id: "fraud-event-streaming",
    navLabel: "Streaming",
    index: "02",
    title: "Real-Time Payment Event Processing & Fraud Intelligence Engine",
    tagline: "Idempotent Event Streaming Pipeline Processing 3M+ Events/Day with Sub-200ms p95 Latency",
    category: "Distributed Streaming & Financial Intelligence",
    company: "Capital One",
    period: "2023 — 2025",
    problem:
      "Payment risk and investigation systems required sub-200ms fraud risk scoring across millions of concurrent card transactions. Legacy systems suffered from 15-minute consumer lag, duplicated event delivery during network partitions, and query latency exceeding 420ms.",
    architectureNodes: [
      {
        id: "gateway",
        name: "Card Transaction Gateway",
        tech: "REST / OAuth 2.0 / mTLS",
        role: "Secure Ingress",
        detail: "Captures worldwide card transactions and payment authorizations with mutual TLS authentication and tokenized PII masking.",
      },
      {
        id: "kafka-bus",
        name: "Partitioned Event Bus",
        tech: "Apache Kafka",
        role: "Durable Streaming",
        detail: "Partitions events by account hash to ensure strict in-order processing at sustained rates of 1,200 events/second.",
      },
      {
        id: "idempotent-workers",
        name: "Idempotent Stream Workers",
        tech: "Python + FastAPI + Docker",
        role: "Deduplication & Validation",
        detail: "Idempotent consumer pool deduplicating transactions against Redis sliding-window bloom filters to eliminate duplicate writes.",
      },
      {
        id: "feature-cache",
        name: "Distributed Feature Cache",
        tech: "Redis Cluster (AWS)",
        role: "Real-Time Feature Store",
        detail: "Maintains rolling 30-day cardholder behavioral patterns and velocity metrics at 82%+ cache hit rates.",
      },
      {
        id: "analytics-store",
        name: "Dual-Storage Persistence",
        tech: "PostgreSQL + DynamoDB",
        role: "ACID Ledger & Query Serving",
        detail: "Dual-write pipeline providing instantaneous reads for downstream fraud models and immutable cold storage for audit compliance.",
      },
    ],
    scaleMetrics: [
      {
        value: "3M+",
        label: "Events Processed Daily",
        detail: "Financial, authentication, and operational transactions processed without data loss.",
      },
      {
        value: "1,200/s",
        label: "Peak Kafka Throughput",
        detail: "Idempotent consumers handling transaction surges during peak retail windows.",
      },
      {
        value: "420→170ms",
        label: "p95 Query Latency",
        detail: "Achieved via strategic Redis feature caching and PostgreSQL indexing.",
      },
      {
        value: "82%",
        label: "Cache Hit Rate",
        detail: "High-concurrency caching eliminating redundant analytical database queries.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "AWS",
      "Docker",
      "mTLS",
      "OAuth 2.0",
      "OpenTelemetry",
    ],
    tradeoffs: [
      {
        decision: "Redis Sliding-Window Deduplication vs. Database Unique Constraints",
        rationale:
          "Database-level unique constraints caused high contention and lock latency under 1,200/s load. In-memory Redis sliding-window keys filtered 99.99% of duplicate deliveries before reaching the database.",
      },
      {
        decision: "Asynchronous Feature Buffering vs. Synchronous Model Inference",
        rationale:
          "Decoupling feature aggregation from transaction response path dropped p95 query latency from 420ms down to 170ms while sustaining zero-drop SLA guarantees.",
      },
    ],
    result:
      "Successfully scaled payment intelligence to 3M+ daily events across 25+ internal risk consumers, reducing latency by 60% and cutting incident triage time by 30%.",
  },
  {
    id: "cloud-control-plane",
    navLabel: "Control Plane",
    index: "03",
    title: "Multi-Tenant Cloud Control Plane & Self-Healing Database Provisioner",
    tagline: "Automated Go Control Plane Managing 1,500+ Multi-Tenant Database Clusters Across AWS & Azure",
    category: "Cloud Control Plane & Systems Engineering",
    company: "Teradata",
    period: "2021 — 2023",
    problem:
      "Deploying and managing 1,500+ multi-tenant database clusters across AWS and Azure suffered from 18+ minute provisioning delays, configuration drift between environments, and human operator intervention during cloud API rate limit events.",
    architectureNodes: [
      {
        id: "cp-api",
        name: "Control Plane Ingress",
        tech: "Go + gRPC + REST",
        role: "API Gateway & Request Validation",
        detail: "High-concurrency Go microservices validating tenant configuration schemas, quota limits, and region availability.",
      },
      {
        id: "reconciliation",
        name: "Reconciliation Controller",
        tech: "Go + State Machine Engine",
        role: "Desired vs. Actual State Sync",
        detail: "Kubernetes-style reconciliation loop continuously polling cloud infrastructure to detect and auto-remediate configuration drift.",
      },
      {
        id: "provisioner",
        name: "Elastic Compute Provisioner",
        tech: "Terraform + AWS/Azure SDKs",
        role: "Dynamic Cluster Lifecycle",
        detail: "Automates multi-tenant VPC creation, compute node scaling, and secure volume mounting across AWS and Azure.",
      },
      {
        id: "dr-pipeline",
        name: "Disaster Recovery Pipeline",
        tech: "Amazon S3 + Azure Blob Storage",
        role: "Cross-Cloud Backup & Restore",
        detail: "High-throughput asynchronous backup engine managing ~40TB of encrypted snapshot data with 25% faster recovery throughput.",
      },
    ],
    scaleMetrics: [
      {
        value: "1,500+",
        label: "Environments Automated",
        detail: "Multi-tenant cloud database clusters managed across AWS and Azure.",
      },
      {
        value: "18→11 min",
        label: "Provisioning Latency",
        detail: "Elastic Compute Provisioner optimizations cutting deployment time by 39%.",
      },
      {
        value: "60→85%",
        label: "Automation Coverage",
        detail: "Eliminated routine manual intervention, cutting operational support tickets by 40%.",
      },
      {
        value: "~40TB",
        label: "DR & Backup Volume",
        detail: "Automated snapshot lifecycle across Amazon S3 and Azure Blob Storage.",
      },
    ],
    stack: [
      "Go",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Azure",
      "Amazon S3",
      "Azure Blob",
      "gRPC",
      "REST",
      "Docker",
      "Linux",
    ],
    tradeoffs: [
      {
        decision: "Go Microservices with Custom State Reconciliation vs. Monolithic Scripts",
        rationale:
          "Monolithic provisioning scripts failed silently on transient cloud network drops. A declarative reconciliation loop in Go self-corrected infrastructure drift and reduced failure rates by 12%.",
      },
      {
        decision: "Abstract Cloud Provider Interface vs. Vendor-Specific Workflows",
        rationale:
          "Abstracting cloud resource primitives behind a unified Go interface allowed single-command cross-cloud deployments to AWS and Azure without duplicating business logic.",
      },
    ],
    result:
      "Reduced provisioning duration by 39%, increased automated lifecycle coverage from 60% to 85%, and maintained high-reliability disaster recovery for ~40TB of enterprise customer data.",
  },
];

export const heroStats = [
  { value: "8,000+", label: "Autonomous investigations / day" },
  { value: "50M+", label: "Network endpoints covered" },
  { value: "99.92%", label: "Production availability" },
] as const;



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
/**
 * Section anchors in scroll order, each pinned to a point on the 0 → 1 3D
 * timeline. Derived from `selectedProjects` rather than hand-listed: the nav,
 * the scroll rail and the 3D scene bands all read this, so a renamed project
 * id can no longer desync them from each other.
 */
const PROJECT_STOPS = [0.19, 0.43, 0.67];

export type Chapter = { id: string; label: string; t: number };

export const chapters: Chapter[] = [
  { id: "hero", label: "Intro", t: 0 },
  { id: "profile-snapshot", label: "Profile", t: 0.1 },
  ...selectedProjects.map((project, i) => ({
    id: project.id,
    label: project.navLabel,
    // Evenly spread any project beyond the three the timeline was tuned for.
    t: PROJECT_STOPS[i] ?? 0.1 + ((i + 1) / (selectedProjects.length + 1)) * 0.82,
  })),
  { id: "contact", label: "Contact", t: 0.92 },
];
