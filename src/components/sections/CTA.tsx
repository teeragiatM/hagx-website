import Link from "next/link";
import { Button } from '@ui';
import { Spacer } from '@ui/Spacer';

type CtaAction = {
  href: string;
  label: string;
};

type CTAProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  className?: string;
};

export default function CTA ({
  eyebrow = "Start a Project",
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTAProps) {
  return (
    <section content="CTA" className="sm:my-32 lg:my-56 my-24 flex flex-col text-center justify-center items-center w-full">
      <h2 className="xl:tex-7xl text-4xl font-medium whitespace-pre-line md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base whitespace-pre-line text-foreground-200">
          {description}
        </p>
      )}
      <div className="mt-10 flex items-center gap-4 sm:justify-center">
        <Button asChild variant="default" size={{ initial: '4' }}>
          <Link href={primaryAction.href}>{primaryAction.label}</Link>
        </Button>
        {secondaryAction && (
          <Button asChild variant="secondary" size={{ initial: '4' }}>
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
