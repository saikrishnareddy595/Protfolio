import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <h1 className="font-heading text-3xl font-semibold text-zinc-100">Page Not Found</h1>
          <p className="mt-3 text-zinc-300">The page you requested does not exist.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-zinc-100 hover:bg-white/[0.08]">
            Back to Home
          </Link>
        </section>
      </Container>
    </Section>
  );
}
