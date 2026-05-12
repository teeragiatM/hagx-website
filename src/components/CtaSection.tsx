import Link from "next/link";

type CtaAction = {
  href: string;
  label: string;
};

type CtaSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  className?: string;
};

export default function CtaSection({
  eyebrow = "Start a Project",
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}: CtaSectionProps) {
  return (
    <section
      className={`relative overflow-hidden border-t border-white/[0.06] bg-[#080808] px-6 py-24 text-center sm:px-10 lg:py-32 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_42%,rgba(255,138,0,0.12),transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E15F31]/45 to-transparent" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        {eyebrow && (
          <p className="mb-4 text-xs font-light uppercase tracking-[0.28em] text-[#E15F31]">
            {eyebrow}
          </p>
        )}

        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>

        {description && (
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-8 text-white/42 sm:text-base">
            {description}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryAction.href}
            className="inline-flex h-14 min-w-[220px] items-center justify-center bg-[#E15F31] px-9 text-xs font-light uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#e07a00]"
          >
            {primaryAction.label}
          </Link>

          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="inline-flex h-14 min-w-[150px] items-center justify-center border border-white/20 px-9 text-xs font-light uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
