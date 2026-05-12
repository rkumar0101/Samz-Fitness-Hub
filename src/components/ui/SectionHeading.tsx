export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--fh-red)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-black/62">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
