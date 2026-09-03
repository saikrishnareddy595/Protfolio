"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { engineeringPillars, profile, recruiterSnapshot } from "@/lib/content";
import { GlassCard, Reveal, StatusDot, GithubIcon, LinkedinIcon } from "./primitives";
import {
  FileText,
  Mail,
  Phone,
  Check,
  Copy,
  Cpu,
  Radio,
  Server,
  Database,
  ExternalLink,
  Award,
  GraduationCap,
  Layers,
} from "lucide-react";

export function RecruiterBrief() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case "ai-systems":
        return <Cpu className="h-5 w-5 text-cyber" />;
      case "distributed-streaming":
        return <Radio className="h-5 w-5 text-cyber-glow" />;
      case "cloud-infrastructure":
        return <Server className="h-5 w-5 text-violet" />;
      case "data-infrastructure":
        return <Database className="h-5 w-5 text-violet-glow" />;
      default:
        return <Layers className="h-5 w-5 text-cyber" />;
    }
  };

  return (
    <section id="profile-snapshot" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyber">
                <StatusDot />
                <span>Executive Engineering Profile</span>
              </div>
              <h2 className="display mt-2 text-[clamp(1.8rem,4vw,3.2rem)] text-white">
                15-Second <span className="text-gradient">Recruiter Summary</span>
              </h2>
            </div>

            {/* Quick Action Dock */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-cyber/40 bg-cyber/15 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyber transition-all hover:bg-cyber hover:text-void"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Résumé (PDF)</span>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(profile.email, "email")}
                className="glass-soft flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-silver-dim transition-colors hover:text-white"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="h-3.5 w-3.5 text-cyber" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(profile.phone, "phone")}
                className="glass-soft hidden items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-silver-dim transition-colors hover:text-white sm:flex"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="h-3.5 w-3.5 text-cyber" /> : <Phone className="h-3.5 w-3.5" />}
                <span>{copiedPhone ? "Copied" : "Copy Phone"}</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Recruiter At-a-Glance Fact Card */}
        <Reveal delay={1} className="mt-8">
          <GlassCard className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Column: Fast Candidate Profile */}
              <div className="space-y-4 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-white/10 px-2.5 py-1 font-mono text-[0.7rem] text-white">
                    {profile.role}
                  </span>
                  <span className="rounded bg-cyber/15 px-2.5 py-1 font-mono text-[0.7rem] text-cyber">
                    {recruiterSnapshot.yearsExperience}
                  </span>
                </div>

                <p className="pretty text-[0.95rem] leading-relaxed text-silver-dim sm:text-[1.02rem]">
                  {recruiterSnapshot.currentWork}
                </p>

                <p className="pretty text-[0.88rem] leading-relaxed text-silver-faint">
                  <strong className="font-medium text-white/90">Proven Scale: </strong>
                  {recruiterSnapshot.priorScale}
                </p>

                {/* Target roles & Education */}
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-silver-faint">
                      <GraduationCap className="h-3.5 w-3.5 text-cyber" />
                      <span>Education</span>
                    </div>
                    <div className="mt-1 text-[0.82rem] font-medium text-white">
                      M.S. Data Science & Analytics
                    </div>
                    <div className="text-[0.74rem] text-silver-faint">New England University</div>
                  </div>

                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-silver-faint">
                      <Award className="h-3.5 w-3.5 text-violet" />
                      <span>Key Certifications</span>
                    </div>
                    <div className="mt-1 text-[0.82rem] font-medium text-white">
                      AWS Solutions Architect Pro
                    </div>
                    <div className="text-[0.74rem] text-silver-faint">Azure AI Engineer Associate</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Production Numbers */}
              <div className="flex flex-col justify-between border-t border-white/10 pt-5 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyber-glow">
                  Production SLA & Metrics
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  {recruiterSnapshot.quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-white/[0.02] p-3 border border-white/5">
                      <div className="font-display text-[clamp(1.2rem,2.2vw,1.75rem)] leading-none text-white">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 font-mono text-[0.62rem] leading-tight text-silver-dim">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Reach Out Box */}
                <div className="mt-5 rounded-lg border border-cyber/20 bg-cyber/[0.04] p-3.5">
                  <div className="text-[0.75rem] text-silver-dim">
                    Direct inquiries welcome for Senior AI Systems, Distributed Streaming & Platform Engineering.
                  </div>
                  <div className="mt-2.5 flex items-center gap-3 font-mono text-[0.72rem]">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-cyber hover:underline flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" /> {profile.email}
                    </a>
                    <span className="text-white/20">·</span>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-silver-dim hover:text-white flex items-center gap-1"
                    >
                      LinkedIn <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* 4 Core Engineering Pillars Breakdown */}
        <div className="mt-10">
          <Reveal delay={2}>
            <div className="mb-6 flex items-center justify-between">
              <span className="eyebrow">The 4 Core Engineering Pillars</span>
              <span className="font-mono text-[0.65rem] tracking-wide text-silver-faint">
                Production Depth & Architectures
              </span>
            </div>
          </Reveal>

          <div className="grid gap-3.5 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {engineeringPillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i + 1} className="h-full">
                <GlassCard className="flex h-full flex-col justify-between p-5 transition-all duration-300 hover:border-cyber/30">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
                        {getPillarIcon(pillar.id)}
                      </div>
                      <span className="font-mono text-[0.65rem] text-cyber-glow/80">
                        {pillar.metric}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[1.05rem] leading-snug tracking-sub text-white">
                      {pillar.title}
                    </h3>

                    <p className="pretty mt-2 text-[0.82rem] leading-relaxed text-silver-dim">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-3.5">
                    <div className="font-mono text-[0.6rem] uppercase tracking-wider text-silver-faint mb-2">
                      Key Competencies
                    </div>
                    <ul className="space-y-1.5 text-[0.74rem] text-silver-dim">
                      {pillar.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyber/70" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecruiterBrief;
