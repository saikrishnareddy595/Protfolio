import Shell from "@/components/Shell";
import { capabilities, credentials, profile, selectedProjects } from "@/lib/content";

/**
 * The visible page is a client-driven WebGL experience, so the crawlable,
 * screen-reader-friendly version of the same content ships alongside it as
 * structured data plus a visually-hidden document outline.
 */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.role,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: capabilities.flatMap((c) => c.items),
    alumniOf: { "@type": "CollegeOrUniversity", name: "New England University" },
    hasCredential: credentials
      .filter((c) => c.kind === "Certification")
      .map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.title })),
    worksFor: {
      "@type": "Organization",
      name: "Spectrum (Charter Communications)",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <StructuredData />

      <Shell />

      {/* Full-text mirror of the scroll story, for crawlers and screen readers. */}
      <div className="sr-only" aria-label="Text version of this portfolio">
        <p>{profile.summary}</p>
        {selectedProjects.map((s) => (
          <section key={s.id}>
            <h2>
              {s.company}, {s.period}
            </h2>
            <p>{s.tagline}</p>
            <p>{s.problem}</p>
            <ul>
              {s.scaleMetrics.map((m) => (
                <li key={m.label}>
                  {m.value} — {m.label}. {m.detail}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2>Contact</h2>
          <p>
            {profile.fullName}. Email {profile.email}. Phone {profile.phone}.
          </p>
        </section>
      </div>
    </>
  );
}
