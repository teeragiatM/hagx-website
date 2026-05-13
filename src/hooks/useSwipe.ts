import { useRef, useCallback } from "react";

interface SwipeHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
}

/**
 * Returns pointer event handlers to attach to a container.
 * Calls onSwipeLeft / onSwipeRight when horizontal drag exceeds threshold.
 * Cancels if the gesture is more vertical than horizontal (natural scroll).
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}): SwipeHandlers {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const active = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    active.current = true;
  }, []);

  const onPointerMove = useCallback((_e: React.PointerEvent) => {
    // just tracking — no drag visual needed for windowed carousel
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!active.current || startX.current === null || startY.current === null)
        return;
      active.current = false;

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;

      // ignore if more vertical than horizontal (natural scroll)
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (Math.abs(dx) < threshold) return;

      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    },
    [onSwipeLeft, onSwipeRight, threshold],
  );

  const onPointerCancel = useCallback(() => {
    active.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
