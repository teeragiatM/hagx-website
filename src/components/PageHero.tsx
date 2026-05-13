import { motion } from "framer-motion";
import Image from "next/image";
import { Heading, Text } from "./ui";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  titleAlt?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  backgroundSlot?: React.ReactNode;
  align?: "center" | "left";
  minHeight?: string;
  variant?: "shadow" | "no-shadow";
  glow?: boolean;
  image?: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function PageHero({
  eyebrow,
  title,
  titleAlt,
  subtitle,
  children,
  bottomSlot,
  backgroundSlot,
  align = "center",
  minHeight = "100vh",
  variant = "shadow",
  glow = true,
  image,
  className,
  titleClassName,
  subtitleClassName,
}: PageHeroProps) {
  return (
    <section
      data-variant={variant}
      data-align={align}
      data-glow={glow}
      className={cn("hero-content", className)}
      style={{ minHeight }}
    >
      {backgroundSlot && (
        <div className="absolute inset-0 overflow-hidden">{backgroundSlot}</div>
      )}

      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
      )}

      {glow && (
        <div
          aria-hidden
          className="hero-grid-glow pointer-events-none absolute inset-0"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 ui-margin z-10"
      >
        {eyebrow && (
          <Text
            as="p"
            weight={{ initial: "light" }}
            size="1"
            color=""
            uppercase
            preserveLineBreaks
          >
            {eyebrow}
          </Text>
        )}

        <Heading
          as="h1"
          size={{ initial: "9" }}
          className={cn("ui-Header-Text", titleClassName)}
        >
          {title}
          {titleAlt && (
            <>
              <br className="hidden sm:block" />
              <span
                data-accent-color="gray"
                style={{ color: "var(--accent-a11)" }}
              >
                {titleAlt}
              </span>
            </>
          )}
        </Heading>

        {subtitle && (
          <div className={cn("hero-subtitle", subtitleClassName)}>
            <Text
              as="p"
              size={"1"}
              weight="light"
              preserveLineBreaks
              style={{ lineHeight: "var(--line-height-2)" }}
            >
              {subtitle}
            </Text>
          </div>
        )}

        {children && <>{children}</>}
        {bottomSlot && <div className="relative z-10 w-full">{bottomSlot}</div>}
      </motion.div>
    </section>
  );
}
