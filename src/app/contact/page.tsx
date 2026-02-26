import type { Metadata } from "next";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/social-icons";
import { socials } from "@/lib/socials";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Krishna Reddy for Senior Data Engineer roles. Fast response and clear communication.",
  openGraph: {
    description: "Reach out to Krishna Reddy for data platform engineering opportunities."
  }
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="glass-card p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Let&apos;s Connect</h1>
        <p className="mt-4 max-w-3xl text-slate">
          I am open to Senior Data Engineer opportunities and data platform roles. I respond within 24 hours.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={socials.Email}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-slate-950"
          >
            <MailIcon className="h-4 w-4" />
            Email Me
          </a>
          <a
            href={socials.LinkedIn}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-ink"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={socials.GitHub}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </header>

      <article className="glass-card p-8">
        <h2 className="text-xl font-semibold text-ink">Send a Message</h2>
        <p className="mt-2 text-sm text-slate">Share your role, team, and timeline, and I will follow up quickly.</p>
        <form className="mt-6 grid gap-4" method="post" action="/api/contact">
          <label className="grid gap-1 text-sm text-slate" htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              required
              className="rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-ink outline-none ring-accent focus:ring"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate" htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-ink outline-none ring-accent focus:ring"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate" htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-ink outline-none ring-accent focus:ring"
            />
          </label>
          <button type="submit" className="w-fit rounded-full bg-white/10 px-5 py-2 text-sm text-ink transition hover:bg-white/20">
            Submit
          </button>
        </form>
      </article>
    </section>
  );
}
