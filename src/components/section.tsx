type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, className, children }: SectionProps) {
  const classes = ["py-20 sm:py-24 lg:py-32", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes}>
      {(title || eyebrow) && (
        <header className="mx-auto mb-10 w-full max-w-[1200px] px-4 sm:px-6 lg:mb-14 lg:px-8">
          {eyebrow ? (
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-indigo-400">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <div className="mt-2">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <div className="mt-3 h-[2px] w-14 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent" />
            </div>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
