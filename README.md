# sai-krishna-reddy-portfolio

> Production Engineering Portfolio & Interactive 3D Case-Study System for **Sai Krishna Reddy** — Senior Software Engineer specializing in **AI Systems & Distributed Infrastructure**.

---

## ⚡ Executive Snapshot (15-Second Recruiter Brief)

- **Candidate:** Sai Krishna Reddy
- **Target Roles:** Senior Software Engineer / Staff Engineer — AI Systems, Distributed Platforms, Backend Infrastructure
- **Experience:** 5+ Years of Production Experience across Telecommunications, Financial Services, and Cloud Data Platforms
- **Location:** Charlotte, NC (Open to Remote / Hybrid)
- **Current Role:** AI Engineer — Field Ops, SCOPE Platform @ Spectrum (Charter Communications)
- **Scale Proven:**
  - **8,000+** Autonomous multi-agent diagnostic runs / day across **50M+** network endpoints
  - **3,000,000+** Streaming events / day with 1,200/s peak Kafka throughput at Capital One
  - **1,500+** Multi-tenant database environments automated with Go control plane at Teradata
- **Credentials:** M.S. Data Science & Analytics · AWS Certified Solutions Architect Professional · Azure AI Engineer Associate
- **Contact:** [krishreddem@gmail.com](mailto:krishreddem@gmail.com) · [LinkedIn](https://www.linkedin.com/in/reddy4725/) · [GitHub](https://github.com/saikrishnareddy595) · [Download Résumé (PDF)](./public/Sai-Krishna-Reddy-Resume.pdf)

---

## 📐 Architecture & System Flow

The site is built as an **engineering case-study website** pairing crawlable, accessible DOM overlays with an asynchronous Three.js / React Three Fiber WebGL canvas running in world space.

### System Architecture Flow

```
                                  [ Client Browser ]
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
         [ DOM Story Layer ]                            [ WebGL 3D Canvas ]
    (Next.js 15 App Router + Tailwind)                 (Three.js + R3F + Drei)
                  │                                               │
      • Hero Masthead & CTAs                              • Neural Particle Field
      • 15-Sec Recruiter Brief                            • 2.5D Parallax Glass Portrait
      • Interactive Case Studies                          • Multi-Agent Supervisor Graph
      • Architecture Inspector Flow                       • Velocity-Stretched Data Tunnel
      • Quantified Production Metrics                     • 360° Cloud Server Rack
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                            [ GSAP ScrollTrigger Bridge ]
                       (Zero React Re-renders / Plain Mutable State)
                                          │
                                          ▼
                         [ Shared progress / velocity / tier ]
                                 (src/lib/scroll.ts)
```

### Camera Corridor Translation

Rather than fading between disconnected 3D scenes, the entire canvas shares **one camera dollying down a single continuous `-Z` corridor**.

| Scroll Band | Section Anchor | World Camera Z | 3D Scene Focus |
| --- | --- | --- | --- |
| `0.00 – 0.08` | `#hero` | `+9.0 → +6.6` | 2.5D Parallax Portrait & Neural Field |
| `0.08 – 0.16` | `#profile-snapshot` | `+6.6 → -6.0` | Executive Profile & 4 Core Pillars |
| `0.16 – 0.32` | `#projects` | `-6.0 → -19.5` | Selected Engineering Case Studies |
| `0.32 – 0.54` | `#spectrum` | `-19.5 → -42.0` | Spectrum: Autonomous Multi-Agent Graph |
| `0.54 – 0.74` | `#capital-one` | `-58.0 → -112.0` | Capital One: High-Throughput Streaming Tunnel |
| `0.74 – 0.92` | `#teradata` | `-112.0 → -134.0` | Teradata: Cloud Control Plane Server Rack |
| `0.92 – 1.00` | `#contact` | `-134.0 → -120.0` | Technical Matrix, Credentials & Contact |

---

## 🛠 Selected Engineering Projects

### 1. Autonomous Network Incident Diagnostic System (Spectrum · Charter Communications)
- **Problem:** Outages and signal faults across a 7-level HFC/DOCSIS 3.1 network (50M+ subscribers) created alarm storms. Manual triage took 45+ minutes per incident.
- **Architecture:** 2M+ events/hr Kafka stream → LangGraph supervisor state machine → Model Context Protocol (MCP) tool mesh (20+ diagnostic tools) → PostgreSQL durable checkpoints → Automated remediation dispatch.
- **Scale:** 8,000+ daily autonomous runs, 35% manual triage reduction, 99.92% uptime SLA.
- **Trade-offs:** LangGraph deterministic state machine over unconstrained ReAct loops to prevent infinite tool recursions and ensure step-by-step auditability.

### 2. High-Throughput Payment Event Processing Pipeline (Capital One)
- **Problem:** Fraud detection pipelines required sub-200ms evaluations across millions of card transactions with zero duplicate deliveries.
- **Architecture:** Ingress Gateways → Customer-hash partitioned Kafka bus → Idempotent Python/FastAPI consumer workers → Redis sliding-window bloom filter deduplication → Real-time fraud scoring → Dual-storage PostgreSQL / Cassandra.
- **Scale:** 3M+ daily transactions, 1,200 events/sec peak, p95 query latency reduced 420ms → 170ms, 82% Redis cache hit rate.
- **Trade-offs:** In-memory Redis sliding deduplication vs. database unique constraints to eliminate locking contention under 1,200/s concurrency.

### 3. Multi-Tenant Cloud Control Plane & Self-Healing Provisioner (Teradata)
- **Problem:** Deploying 1,500+ analytical database environments across AWS and Azure suffered from 18-minute provisioning delays and configuration drift.
- **Architecture:** Go gRPC ingress → Declarative reconciliation state machine → Terraform cluster operator → Cross-cloud disaster recovery pipeline managing ~40TB backup data to Amazon S3 & Azure Blob Storage.
- **Scale:** 1,500+ environments automated, 39% reduction in provisioning latency (18 → 11 min), 60% → 85% automation coverage.
- **Trade-offs:** Custom reconciliation loop in Go with optimistic concurrency control over monolithic scripts to prevent split-brain states during cloud network timeouts.

---

## 💻 Tech Stack

| Domain | Technologies |
| --- | --- |
| **Languages** | Python, Go, SQL, TypeScript, Bash |
| **AI / Agentic Systems** | LangGraph, LangChain, Model Context Protocol (MCP), OpenTelemetry, LLM Evaluation |
| **Distributed Systems** | Apache Kafka, Flink, gRPC, REST, Idempotency, Dead-Letter Queues (DLQ) |
| **Cloud & Infrastructure** | Kubernetes, AWS (EKS, S3, IAM), Azure (AKS, Blob), Docker, Terraform (IaC) |
| **Databases & Caching** | PostgreSQL, Redis Cluster, HBase, OpenSearch, OpenTSDB, Cassandra |
| **Frontend & Visualization** | Next.js 15 (App Router), React 19, Three.js, React Three Fiber, GSAP, Tailwind CSS, Lucide Icons |

---

## 🚀 Performance & Engineering Highlights

- **Zero React Re-Renders on Scroll:** Scroll coordinates are written directly to a shared mutable object (`src/lib/scroll.ts`) read by Three.js `useFrame` callbacks at 60fps.
- **Device Tier Detection:** Hardware concurrency, GPU capability, and device memory are inspected before canvas mount to assign DPR caps, MSAA, and post-processing passes.
- **Adaptive Remapping:** Dynamic DOM bounding boxes align sections with exact 3D camera timeline markers regardless of font scaling or viewport heights.
- **Accessibility & Reduced Motion:** Full `prefers-reduced-motion` compliance, manual in-nav motion toggle, WCAG AA color contrast, and crawlable semantic HTML with `schema.org/Person` JSON-LD.

---

## 📦 Project Structure

```
sai-krishna-reddy-portfolio/
├── public/
│   ├── Sai-Krishna-Reddy-Resume.pdf          # Full Candidate Résumé
│   └── Gemini_Generated_Image_*.jpeg         # 2.5D Hero Portrait Asset
├── src/
│   ├── app/
│   │   ├── globals.css                       # Dark theme glassmorphic styles
│   │   ├── layout.tsx                        # Metadata, OpenGraph, JSON-LD Schema
│   │   ├── page.tsx                          # Root entry point
│   │   ├── robots.ts                         # SEO crawler definitions
│   │   └── sitemap.ts                        # XML sitemap configuration
│   ├── components/
│   │   ├── ScrollDriver.tsx                  # GSAP ScrollTrigger timeline controller
│   │   ├── Shell.tsx                         # Core layout wrapper
│   │   ├── canvas/                           # 3D WebGL Scene & Shaders
│   │   │   ├── AgentGraph.tsx                # Spectrum multi-agent topology
│   │   │   ├── Avatar.tsx                    # hero subject: portrait or fallback
│   │   │   ├── Portrait.tsx                  # depth-displaced 3D bust
│   │   │   ├── DataTunnel.tsx                # Velocity streaming data tunnel
│   │   │   ├── Effects.tsx                   # Postprocessing bloom & chromatic grade
│   │   │   ├── NeuralField.tsx               # Ambient particle field
│   │   │   ├── Portrait.tsx                  # Shader-based focal portrait
│   │   │   ├── Scene.tsx                     # R3F Canvas root
│   │   │   └── ServerRack.tsx                # Teradata cloud server rack
│   │   └── ui/                               # Recruiter-First DOM UI
│   │       ├── Closing.tsx                   # Technical matrix, credentials & contact
│   │       ├── Hero.tsx                      # Masthead with 5+ yrs exp & 4 pillars
│   │       ├── Loader.tsx                    # Shader precompile splash
│   │       ├── Nav.tsx                       # Navigation pills & motion toggle
│   │       ├── RecruiterBrief.tsx            # 15-second recruiter summary & action dock
│   │       ├── SceneSection.tsx              # Role deep dive with metrics
│   │       ├── ScrollRail.tsx                # Hairline progress rail
│   │       └── SelectedProjects.tsx          # Interactive architecture case studies
│   └── lib/
│       ├── content.ts                        # Single source of truth for copy & metrics
│       ├── math.ts                           # Vector interpolation utilities
│       └── scroll.ts                         # Global timeline & scroll state
├── metadata.json                             # AI Studio applet configuration
├── package.json                              # Dependencies & scripts
└── tsconfig.json                             # TypeScript compiler configuration
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript typecheck
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```

---

## 📄 License

MIT © [Sai Krishna Reddy](https://github.com/saikrishnareddy595)
