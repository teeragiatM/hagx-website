"use client";

import {
  TestimonialCarousel,
  TestimonialContent,
  TestimonialControls,
  TestimonialHeader,
  type TestimonialCarouselItem,
} from "@/components/ui/testimonial-carousel";
import { cn } from "@/lib/utils";

export type TestimonialItem = TestimonialCarouselItem;

export type ReviewSectionProps = {
  eyebrow?:     string;
  title?:       string;
  description?: string;
  items:        TestimonialItem[];
  autoPlay?:    boolean;
  intervalMs?:  number;
  autoPlayDirection?: "next" | "prev";
  className?:   string;
};

export function ReviewSection({
  eyebrow     = "Client Stories",
  title       = "สิ่งที่ลูกค้าพูดถึงเรา",
  description,
  items,
  autoPlay,
  intervalMs,
  autoPlayDirection,
  className,
}: ReviewSectionProps) {
  return (
    <TestimonialCarousel
      items={items}
      autoPlay={autoPlay}
      intervalMs={intervalMs}
      autoPlayDirection={autoPlayDirection}
      className={className}
    >
      <TestimonialHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="relative">
        <TestimonialContent />
        <TestimonialControls />
      </div>
    </TestimonialCarousel>
  );
}
