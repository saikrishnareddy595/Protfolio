"use client";

import { capabilities, credentials, languages, profile } from "@/lib/content";
import { GlassCard, Reveal, Tag } from "./primitives";

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 15L15 5M7.5 5H15v7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Closing() {
  return (
    <section id="contact" className="relative" style={{ minHeight: "160svh" }}>
      <div className="relative mx-auto flex min-h-[160svh] max-w-[1400px] flex-col justify-between px-5 pb-10 pt-32 sm:px-8">
        {/* A scrim so the rack reads as depth behind the text, not noise. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-void/80 to-void" />

        <div className="relative">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
          </Reveal>

          <div className="mt-8 grid gap-2.5 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((group, i) => (
              <Reveal key={group.title} delay={i} className="h-full">
                <GlassCard className="h-full p-5">
                  <h3 className="font-display text-[0.98rem] tracking-sub text-white">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 sm:gap-3 md:grid-cols-3">
            <Reveal className="h-full md:col-span-1">
              <GlassCard className="h-full p-5">
                <h3 className="font-display text-[0.98rem] tracking-sub text-white">Languages</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <Tag key={l}>{l}</Tag>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {credentials.map((c, i) => (
              <Reveal key={c.title} delay={i + 1} className="h-full">
                <GlassCard className="h-full p-5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-violet-glow/75">
                    {c.kind}
                  </span>
                  <h3 className="pretty mt-3 font-display text-[0.95rem] leading-snug tracking-sub text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] text-silver-faint">{c.issuer}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---- Contact ---- */}
        <div className="relative mt-24">
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="display mt-6 text-[clamp(2.25rem,8.5vw,6.5rem)]">
              <span className="text-gradient">Let&rsquo;s build</span>{" "}
              <span className="text-accent-gradient">agentic systems</span>
              <span className="text-white/35"> that hold up in production.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal delay={2}>
              <p className="pretty max-w-xl text-[0.92rem] leading-relaxed text-silver-dim">
                {profile.longSummary}
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="glass group inline-flex items-center gap-2.5 rounded-full py-3 pl-4 pr-5 text-[0.85rem] text-white transition-colors duration-300 hover:border-cyber/40"
                >
                  <MailIcon />
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-3 text-[0.85rem] text-silver-dim transition-colors duration-300 hover:text-white"
                >
                  LinkedIn <ArrowIcon />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-3 text-[0.85rem] text-silver-dim transition-colors duration-300 hover:text-white"
                >
                  GitHub <ArrowIcon />
                </a>
              </div>
            </Reveal>
          </div>

          <footer className="mt-16 flex flex-col gap-3 border-t border-white/[0.07] pt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-silver-faint sm:flex-row sm:items-center sm:justify-between">
            <span>
              {profile.phone}
            </span>
            <span>
              © {new Date().getFullYear()} {profile.fullName}
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default Closing;
