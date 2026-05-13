"use client";

import {
  TestimonialCarousel as TestimonialCarouselRoot,
  TestimonialContent,
  TestimonialControls,
  type TestimonialCarouselItem,
} from "@/components/ui/testimonial-carousel";
import SectionHeader from "@/components/SectionHeader";

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
      <SectionHeader
        eyebrow={eyebrow}
        heading={title}
        description={description}
        layout="row"
      />
      <div className="relative">
        <TestimonialContent />
        <TestimonialControls />
      </div>
    </TestimonialCarouselRoot>
  );
}
