interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="gold-line" />

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-barber-gold">
            {eyebrow}
          </span>

          {centered && <span className="gold-line" />}
        </div>
      )}

      <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
