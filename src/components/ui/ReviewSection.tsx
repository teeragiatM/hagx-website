"use client";

/**
 * ReviewSection — drop-in testimonial / client review section
 *
 * Wraps TestimonialCarousel in a standard page section.
 * Use this anywhere you need a review block — services, clients, home, etc.
 *
 * Usage:
 *   <ReviewSection
 *     eyebrow="Client Stories"
 *     title="สิ่งที่ลูกค้าพูดถึงเรา"
 *     description="ความเชื่อมั่นจากผลงานจริง"
 *     items={testimonials}
 *   />
 *
 *   // Without section wrapper (embed in existing layout)
 *   <ReviewSection items={testimonials} bare />
 */

import TestimonialCarousel, { type TestimonialItem } from "@/components/TestimonialCarousel";
import { cn } from "@/lib/utils";

export type { TestimonialItem };

export type ReviewSectionProps = {
  eyebrow?:    string;
  title?:      string;
  description?: string;
  items:        TestimonialItem[];
  /** Remove outer <section> wrapper — use when embedding inside custom layout */
  bare?:        boolean;
  autoPlay?:    boolean;
  intervalMs?:  number;
  className?:   string;
};

export function ReviewSection({
  eyebrow     = "Client Stories",
  title       = "สิ่งที่ลูกค้าพูดถึงเรา",
  description,
  items,
  bare        = false,
  autoPlay,
  intervalMs,
  className,
}: ReviewSectionProps) {
  const carousel = (
    <TestimonialCarousel
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items}
      autoPlay={autoPlay}
      intervalMs={intervalMs}
    />
  );

  if (bare) return <div className={cn(className)}>{carousel}</div>;

  return (
    <section className={cn("border-b border-white/[0.06]", className)}>
      {carousel}
    </section>
  );
}
