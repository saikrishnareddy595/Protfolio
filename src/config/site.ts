export const siteConfig = {
  name: "Krishna Reddy",
  role: "Senior Data & AI Engineer",
  title: "Krishna Reddy — AI Engineer Portfolio",
  url: "https://krishnareddy.vercel.app",
  description:
    "Senior Data & AI Engineer with 5+ years building production-grade lakehouse + streaming platforms that power ML/AI systems at Fortune 500 scale — where data engineering meets LLM infrastructure.",
  tagline:
    "Building intelligent lakehouse + streaming platforms that power ML/AI systems at Fortune 500 scale — where data engineering meets LLM infrastructure.",
  trustLine: "Experience across Charter Communications, Wells Fargo, and McKesson.",
  locationLine: "Charlotte, NC · Open to Remote · US Work Authorized",
  footerLine: "Charlotte, NC · Open to Remote · US Work Authorized",
  about: [
    "I engineer for reliability first: deterministic pipelines, explicit SLAs, and measurable recovery paths.",
    "I build observability into every critical workflow so failures are visible, explainable, and fast to resolve.",
    "My architecture decisions balance performance and cost-awareness while treating data quality as a core product requirement.",
    "I am especially focused on lakehouse design, streaming systems, and AI-ready data platform engineering."
  ],
  impactMetrics: [
    {
      value: "10TB+/day",
      label: "Pipeline Throughput",
      context: "Reliable high-volume ingestion for analytics-critical domains."
    },
    {
      value: "40%",
      label: "Throughput Improvement",
      context: "Reduced batch window by ~2 hours via Spark and orchestration tuning."
    },
    {
      value: "30%",
      label: "Fewer Failures",
      context: "Less on-call triage with faster recovery and backfills."
    },
    {
      value: "200+",
      label: "Self-Serve Users",
      context: "Trusted analytics access enabled through governed lakehouse datasets."
    }
  ],
  resumePath: "/resume.pdf",
  ogImage: "/og.png"
} as const;
