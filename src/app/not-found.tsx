import Link from "next/link";

export default function NotFound() {
  return (
    <section className="glass-card p-10 text-center">
      <h1 className="text-3xl font-semibold text-ink">Page Not Found</h1>
      <p className="mt-3 text-slate">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-ink">
        Back to Home
      </Link>
    </section>
  );
}
