export type SkillGroup = {
  title: string;
  items: string[];
  productionUse: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Foundations",
    items: ["Python", "Advanced SQL", "Java/Scala"],
    productionUse: "Used in production for data modeling, performance tuning, and incident debugging."
  },
  {
    title: "Warehousing",
    items: ["Snowflake/BigQuery/Redshift", "Postgres/MySQL", "Mongo/Dynamo/Cassandra"],
    productionUse: "Used in production for analytics serving layers and workload-specific data access patterns."
  },
  {
    title: "Lakehouse",
    items: ["Delta Lake", "Apache Iceberg", "Databricks"],
    productionUse: "Used in production for governed table formats and scalable self-serve analytics."
  },
  {
    title: "Spark",
    items: ["Spark SQL", "PySpark", "Partitioning/Shuffle/Memory tuning"],
    productionUse: "Used in production to reduce batch windows and improve throughput under high data volume."
  },
  {
    title: "Kafka/Flink",
    items: ["Kafka", "Flink (or equivalent)", "Streaming event design"],
    productionUse: "Used in production for low-latency monitoring and real-time analytical event pipelines."
  },
  {
    title: "Airflow/dbt",
    items: ["Apache Airflow", "dbt", "SLA orchestration"],
    productionUse: "Used in production for dependency-aware orchestration and repeatable transformation workflows."
  },
  {
    title: "Cloud/IaC",
    items: ["AWS/GCP/Azure", "Terraform/CloudFormation", "Docker/K8s", "CI/CD"],
    productionUse: "Used in production for reliable infrastructure delivery and safer environment promotion."
  },
  {
    title: "Quality/Observability",
    items: ["Great Expectations/dbt tests", "Lineage and monitoring", "Alerting SLAs"],
    productionUse: "Used in production to catch data issues early and shorten root-cause analysis time."
  },
  {
    title: "AI Edge",
    items: ["RAG-ready pipelines", "Vector DB concepts", "Feature store basics", "AI copilot fluency"],
    productionUse: "Used in production planning to prepare trusted data foundations for AI-enabled use cases."
  }
];
