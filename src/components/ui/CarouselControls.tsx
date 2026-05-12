"use client";

/**
 * CarouselControls — unified nav bar shared by all carousels on the site.
 *
 * Layout:
 *   [ actionSlot (left)         ] [ dots ]  [ ← → (right) ]
 *
 * Props:
 *   index        current active index
 *   total        total number of items / pages
 *   onPrev       go to previous
 *   onNext       go to next
 *   onDotClick   jump to index
 *   actionSlot   ReactNode — CTA buttons, links, etc. on the left
 *   dotStyle     "dot" (default) | "line"
 *   canPrev      disable left arrow when false (default: index > 0)
 *   canNext      disable right arrow when false (default: index < total-1)
 */

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

export type CarouselControlsDotStyle = "line" | "dot";

export type CarouselControlsProps = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick?: (i: number) => void;
  /** Rendered on the left — CTAs, links, any ReactNode */
  actionSlot?: React.ReactNode;
  dotStyle?: CarouselControlsDotStyle;
  /** Override prev-disabled logic */
  canPrev?: boolean;
  /** Override next-disabled logic */
  canNext?: boolean;
  className?: string;
};

export function CarouselControls({
  index,
  total,
  onPrev,
  onNext,
  onDotClick,
  actionSlot,
  dotStyle = "dot",
  canPrev,
  canNext,
  className,
}: CarouselControlsProps) {
  const prevDisabled = canPrev !== undefined ? !canPrev : index <= 0;
  const nextDisabled = canNext !== undefined ? !canNext : index >= total - 1;

  return (
    <div className={cn("ui-carousel-controls flex items-center justify-between gap-6", className)}>
      {/* ── Left: action slot ── */}
      <div className="flex flex-wrap items-center gap-4">{actionSlot}</div>

      {/* ── Right: dots + arrows ── */}
      <div className="flex shrink-0 items-center gap-5">
        {/* Dot indicators */}
        {total > 1 && onDotClick && (
          <div className="hidden items-center gap-2 sm:flex">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to item ${i + 1}`}
                onClick={() => onDotClick(i)}
                className={cn(
                  "transition-all duration-300",
                  dotStyle === "line"
                    ? cn(
                        "h-[2px]",
                        i === index
                          ? "w-8 bg-[#DB5828]"
                          : "w-5 bg-white/30 hover:bg-white/55",
                      )
                    : cn(
                        "rounded-full",
                        i === index
                          ? "h-2 w-2 bg-[#DB5828]"
                          : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50",
                      ),
                )}
              />
            ))}
          </div>
        )}

        {/* Arrows */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="md"
            iconOnly
            rounded
            onClick={onPrev}
            disabled={prevDisabled}
            aria-label="Previous"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button
            variant="outline"
            size="md"
            iconOnly
            rounded
            onClick={onNext}
            disabled={nextDisabled}
            aria-label="Next"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
