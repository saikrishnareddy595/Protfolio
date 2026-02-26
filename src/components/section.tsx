import { ReactNode } from "react";

type SectionProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function Section({ title, eyebrow, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p> : null}
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
