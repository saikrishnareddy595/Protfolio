"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300/10 text-emerald-300 text-xl">
          ✓
        </div>
        <p className="mt-3 font-heading text-lg font-semibold text-emerald-300">Message received!</p>
        <p className="mt-1 text-sm text-zinc-400">I&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setState("idle")}
          className="mt-4 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="grid gap-1 text-sm text-zinc-300" htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 transition focus:border-cyan-300/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-1 text-sm text-zinc-300" htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 transition focus:border-cyan-300/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-1 text-sm text-zinc-300" htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about the role, team size, and tech stack…"
          className="resize-none rounded-xl border border-white/15 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 transition focus:border-cyan-300/50 focus:outline-none"
        />
      </label>

      {state === "error" && (
        <p className="rounded-xl border border-red-300/30 bg-red-300/10 px-3 py-2 text-sm text-red-300">
          Something went wrong. Please try emailing directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
