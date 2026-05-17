import { useRef, useCallback } from "react";

export interface SwipeHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

/**
 * Returns event handlers for swipe detection (touch-primary, pointer-mouse fallback).
 * Supports horizontal (left/right) and vertical (up/down) swipe callbacks.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 40,
}: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}): SwipeHandlers {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const pointerIsTouch = useRef(false);

  function handleDelta(dx: number, dy: number) {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX >= absY) {
      // horizontal dominant
      if (absX < threshold) return;
      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    } else {
      // vertical dominant
      if (absY < threshold) return;
      if (dy < 0) onSwipeUp?.();
      else onSwipeDown?.();
    }
  }

  // ── Touch events (primary on mobile) ─────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      handleDelta(dx, dy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold],
  );

  // ── Pointer events (mouse / stylus fallback) ──────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") { pointerIsTouch.current = true; return; }
    pointerIsTouch.current = false;
    if (e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIsTouch.current || !pointerStart.current) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;
      pointerStart.current = null;
      handleDelta(dx, dy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold],
  );

  const onPointerCancel = useCallback(() => {
    pointerStart.current = null;
  }, []);

  return { onPointerDown, onPointerUp, onPointerCancel, onTouchStart, onTouchEnd };
}
