import Link from "next/link";
import { profile } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_30%,rgba(76,201,255,0.1),transparent_65%)]" />
      <span className="eyebrow relative">Error 404</span>
      <h1 className="display relative text-[clamp(2.5rem,10vw,6rem)] text-gradient">
        Route not found.
      </h1>
      <p className="relative max-w-md text-[0.9rem] leading-relaxed text-silver-dim">
        That path does not resolve. Head back to the main scroll experience.
      </p>
      <Link
        href="/"
        className="glass relative rounded-full px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white"
      >
        Return to {profile.firstName}&rsquo;s portfolio
      </Link>
    </main>
  );
}
