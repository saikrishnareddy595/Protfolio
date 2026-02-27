type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, className, children }: SectionProps) {
  const classes = ["py-16 sm:py-20 lg:py-24", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes}>
      {(title || eyebrow) && (
        <header className="mx-auto mb-8 w-full max-w-[1200px] px-4 sm:px-6 lg:mb-10 lg:px-8">
          {eyebrow ? <p className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-400">{eyebrow}</p> : null}
          {title ? <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{title}</h2> : null}
        </header>
      )}
      {children}
    </section>
  );
}
