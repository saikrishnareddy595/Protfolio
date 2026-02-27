export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  timelineLabel: string;
  bullets: string[];
  keyAchievement: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Charter Communications",
    role: "Senior Data Engineer",
    dates: "Dec 2023–Present",
    timelineLabel: "Senior Data Engineer @ Charter Communications — Dec 2023–Present",
    keyAchievement: "Scaled and stabilized 10TB+ daily data operations.",
    bullets: [
      "Led engineering for enterprise pipelines supporting analytics and operational reporting.",
      "Improved platform throughput by 40% through Spark and orchestration tuning.",
      "Built streaming products enabling sub-second monitoring visibility."
    ]
  },
  {
    company: "Wells Fargo",
    role: "Data Engineer",
    dates: "Aug 2022–Nov 2023",
    timelineLabel: "Data Engineer @ Wells Fargo — Aug 2022–Nov 2023",
    keyAchievement: "Reduced incident load through orchestration modernization.",
    bullets: [
      "Migrated legacy ETL to Airflow, reducing failures by 30%.",
      "Implemented quality automation that lowered data errors by 45%.",
      "Partnered with governance and analytics teams to increase dataset trust."
    ]
  },
  {
    company: "McKesson",
    role: "Data Engineer",
    dates: "Aug 2021–Jun 2022",
    timelineLabel: "Data Engineer @ McKesson — Aug 2021–Jun 2022",
    keyAchievement: "Enabled self-serve analytics for 200+ users.",
    bullets: [
      "Built AWS lakehouse foundations for governed analytics at scale.",
      "Created reusable ingestion and transformation templates.",
      "Supported secure, multi-environment CI/CD and IaC delivery."
    ]
  }
];
