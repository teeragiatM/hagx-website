/**
 * Legacy re-export shim — import from here OR from "@/components/ui/Carousel" directly.
 *
 * Prefer: import { Carousel, CarouselCard, CarouselRoot, CarouselNav, CarouselGrid, CarouselHeader } from "@/components/ui/Carousel";
 */
export {
  Carousel as default,
  Carousel,
  CarouselCard,
  CarouselGrid,
  CarouselHeader,
  CarouselNav,
  CarouselRoot,
} from "@/components/ui/Carousel";

export type {
  CarouselCta,
  CarouselItem as ServiceCarouselItem, // keeps services/page.tsx working unchanged
  CarouselProps,
  CarouselCardProps,
} from "@/components/ui/Carousel";
