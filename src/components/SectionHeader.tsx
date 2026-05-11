import { ElementType } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Heading semantic level for SEO — defaults to "h2" */
  as?: "h1" | "h2" | "h3";
  /** Layout variant — defaults to "split" (left heading / right description) */
  layout?: "split" | "stack";
  className?: string;
}

function renderHeadingLines(heading: string) {
  return heading.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  as: Tag = "h2",
  layout = "split",
  className = "",
}: SectionHeaderProps) {
  if (layout === "stack") {
    return (
      <div className={`mb-14 text-center ${className}`}>
        {eyebrow && (
          <p className="mb-4 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
            {eyebrow}
          </p>
        )}
        <Tag className="mx-auto max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
          {renderHeadingLines(heading)}
        </Tag>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-7 text-white/55">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start ${className}`}>
      <div>
        {eyebrow && (
          <p className="mb-3 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
            {eyebrow}
          </p>
        )}
        <Tag className="max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
          {renderHeadingLines(heading)}
        </Tag>
      </div>
      {description && (
        <p className="max-w-xl text-sm font-light leading-7 text-white/55 lg:ml-auto lg:pt-3 lg:text-right">
          {description}
        </p>
      )}
    </div>
  );
}
