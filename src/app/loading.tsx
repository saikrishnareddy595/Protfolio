export default function Loading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8" role="status" aria-live="polite">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-zinc-300">Loading...</div>
    </div>
  );
}
