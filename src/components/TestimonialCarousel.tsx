"use client";

import {
  TestimonialCarousel as TestimonialCarouselRoot,
  TestimonialContent,
  TestimonialControls,
  TestimonialHeader,
  type TestimonialCarouselItem,
} from "@/components/ui/testimonial-carousel";

export type TestimonialItem = TestimonialCarouselItem;

type TestimonialCarouselProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: TestimonialItem[];
  autoPlay?: boolean;
  intervalMs?: number;
  autoPlayDirection?: "next" | "prev";
  className?: string;
};

export default function TestimonialCarousel({
  eyebrow = "Client Stories",
  title,
  description,
  items,
  autoPlay = true,
  intervalMs = 5200,
  autoPlayDirection = "next",
  className = "",
}: TestimonialCarouselProps) {
  return (
    <TestimonialCarouselRoot
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
    </TestimonialCarouselRoot>
  );
}
