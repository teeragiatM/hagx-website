import Link from "next/link";
import { Heading, Text, Button } from "./ui";

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
}: CtaSectionProps) {
  return (
    <section className="ui-padding">
      <div className="ui-margin">
        <div
          data-slot="CTA"
          className="relative flex flex-col items-center gap-10"
        >
          {eyebrow && (
            <Text
              as="p"
              color=""
              size={{ initial: "1" }}
              uppercase
              preserveLineBreaks
              weight={{ initial: "light" }}
            >
              {eyebrow}
            </Text>
          )}
          <Heading
            size={{ initial: "7", lg: "8", sm: "9" }}
            as="h2"
            align="center"
            preserveLineBreaks
          >
            {title}
          </Heading>

          {description && (
            <Text
              as="p"
              color="gray"
              size={{ initial: "2" }}
              align="center"
              preserveLineBreaks
            >
              {description}
            </Text>
          )}

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="outline" color="gray">
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>

            {secondaryAction && (
              <Button asChild variant="default">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
