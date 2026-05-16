"use client";

import {
  TestimonialCarousel,
  TestimonialContent,
  TestimonialControls,
  type TestimonialCarouselItem,
} from '@/components/ui/testimonial-carousel';

export type TestimonialItem = TestimonialCarouselItem;

export type ReviewSectionProps = {
  items:        TestimonialItem[];
  autoPlay?:    boolean;
  intervalMs?:  number;
  autoPlayDirection?: "next" | "prev";
  className?:   string;
};

export function ReviewSection({
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
      <TestimonialContent />
      <TestimonialControls />
    </TestimonialCarousel>
  );
}
