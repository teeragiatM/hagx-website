"use client";

import { ReviewSection } from "@/components/ui/ReviewSection";
import type { TestimonialCarouselItem } from "@/components/ui/testimonial-carousel";
import { useI18n } from "@/i18n/useI18n";

type Props = {
  itemsTh: TestimonialCarouselItem[];
  itemsEn: TestimonialCarouselItem[];
};

export default function HomeTestimonialsSection({ itemsTh, itemsEn }: Props) {
  const { lang } = useI18n();
  const items = lang === "th" ? itemsTh : itemsEn;

  if (items.length === 0) return null;

  return <ReviewSection items={items} intervalMs={4800} />;
}
