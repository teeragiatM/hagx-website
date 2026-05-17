"use client";

/**
 * Marquee — reusable infinite-scroll component (compound)
 *
 * Usage:
 *   <Marquee orientation="horizontal" direction="left" speed={40} gap={16}>
 *     <Marquee.Item>...</Marquee.Item>
 *   </Marquee>
 *
 *   <Marquee orientation="vertical" direction="up" speed={44} gap={12} className="h-full">
 *     <Marquee.Item>...</Marquee.Item>
 *   </Marquee>
 */

import { cn } from '@/lib/utils';
import * as React from "react";

/** Convenience shape used by some pages/content */
export type MarqueeItem = {
  id: string;
  label: string;
  sub?: string;
  logo?: string;
};

export type MarqueeOrientation = 'horizontal' | 'vertical';
export type MarqueeHorizontalDirection = 'left' | 'right';
export type MarqueeVerticalDirection = 'up' | 'down';

export type MarqueeProps = {
  orientation?: MarqueeOrientation;
  /** Horizontal: "left" (default) | "right" ; Vertical: "up" (default) | "down" */
  direction?: MarqueeHorizontalDirection | MarqueeVerticalDirection;
  /** Duration seconds for one loop (lower = faster). Default 40 */
  speed?: number;
  /** Gap between items in px, default 16 */
  gap?: number;
  /** Pixel offset for start position (useful to stagger multiple marquees). Default 0 */
  offsetPx?: number;
  className?: string;
  /** Optional class for the inner track */
  trackClassName?: string;
  children: React.ReactNode;
};

export type MarqueeItemProps = {
  className?: string;
  children: React.ReactNode;
};

function MarqueeItemImpl({ className, children }: MarqueeItemProps) {
  return <div className={cn('shrink-0', className)}>{children}</div>;
}

function MarqueeImpl({
  orientation = 'horizontal',
  direction,
  speed = 40,
  gap = 16,
  offsetPx = 0,
  className,
  trackClassName,
  children,
}: MarqueeProps) {
  const items = React.Children.toArray(children);
  if (items.length === 0) return null;

  // seg prefix ensures each DOM segment gets distinct element instances
  const repeat = (n: number, seg: string) =>
    Array.from({ length: n }, (_, ri) =>
      items.map((child, ci) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { key: `${seg}r${ri}c${ci}` })
          : child
      )
    ).flat();

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const segmentRef = React.useRef<HTMLDivElement | null>(null);
  // Start at 2 so the first render already fills most viewports.
  // Only ever increase — prevents animation snap from resize.
  const [repeatCount, setRepeatCount] = React.useState(2);

  React.useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const segmentEl = segmentRef.current;
    if (!wrapperEl || !segmentEl) return;

    const compute = () => {
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const segmentRect = segmentEl.getBoundingClientRect();

      const wrapperSize =
        orientation === 'vertical' ? wrapperRect.height : wrapperRect.width;
      const segmentSize =
        orientation === 'vertical' ? segmentRect.height : segmentRect.width;

      if (!Number.isFinite(wrapperSize) || !Number.isFinite(segmentSize))
        return;
      if (wrapperSize <= 0 || segmentSize <= 0) return;

      const min = Math.max(2, Math.ceil((wrapperSize * 2) / segmentSize));
      setRepeatCount((prev) => (prev >= min ? prev : min));
    };

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(wrapperEl);
    ro.observe(segmentEl);
    return () => ro.disconnect();
  }, [orientation, items.length]);

  if (orientation === 'vertical') {
    const verticalDirection = (direction ?? 'up') as MarqueeVerticalDirection;
    const animName = verticalDirection === 'up' ? 'marquee-up' : 'marquee-down';

    return (
      <div
        ref={wrapperRef}
        className={cn(
          'ui-marquee ui-marquee-vertical group relative h-full overflow-hidden',
          className
        )}
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className={cn('flex flex-col will-change-transform', trackClassName)}
          style={{ gap, animation: `${animName} ${speed}s linear infinite` }}
        >
          <div
            ref={segmentRef}
            className="flex flex-col"
            style={{
              gap,
              transform: offsetPx ? `translateY(${offsetPx}px)` : undefined,
            }}
          >
            {repeat(repeatCount, 'a')}
          </div>
          <div className="flex flex-col" aria-hidden style={{ gap }}>
            {repeat(repeatCount, 'b')}
          </div>
        </div>
      </div>
    );
  }

  const horizontalDirection = (direction ??
    'left') as MarqueeHorizontalDirection;
  const animName =
    horizontalDirection === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      ref={wrapperRef}
      className={cn('ui-marquee group relative overflow-hidden', className)}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className={cn('flex w-max will-change-transform', trackClassName)}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          transform: offsetPx ? `translateX(${offsetPx}px)` : undefined,
        }}
      >
        <div
          ref={segmentRef}
          className="flex shrink-0"
          style={{ gap, paddingRight: gap }}
        >
          {repeat(repeatCount, 'a')}
        </div>
        <div
          className="flex shrink-0"
          aria-hidden
          style={{ gap, paddingRight: gap }}
        >
          {repeat(repeatCount, 'b')}
        </div>
      </div>
    </div>
  );
}

export const Marquee = Object.assign(MarqueeImpl, { Item: MarqueeItemImpl });
