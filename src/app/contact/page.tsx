import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Krishna Reddy for Senior Data Engineer opportunities."
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="glass-card p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Let&apos;s Connect</h1>
        <p className="mt-4 max-w-3xl text-slate">
          The fastest way to reach me is by email. I am open to Senior Data Engineer opportunities and consulting.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-slate-950"
          >
            Email Me
          </a>
          <a
            href={siteConfig.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-ink"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <article className="glass-card p-8">
        <h2 className="text-xl font-semibold text-ink">Optional Contact Form</h2>
        <p className="mt-2 text-sm text-slate">This form posts to a Next.js API route and logs messages server-side.</p>
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
