"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useSwipe } from "@/hooks/useSwipe";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export type SheetProps = {
  open: boolean;
  onClose: () => void;
  /** Default title shown in header. Ignored if headerSlot is provided. */
  title?: string;
  /** Replaces the entire header. You own the close button. */
  headerSlot?: React.ReactNode;
  /** Sticky footer rendered below the scrollable content area. */
  footerSlot?: React.ReactNode;
  children: React.ReactNode;
  /** Force a specific side regardless of screen size */
  side?: "bottom" | "right";
  className?: string;
};

export function Sheet({
  open,
  onClose,
  title,
  headerSlot,
  footerSlot,
  children,
  side,
  className,
}: SheetProps) {
  const isDesktop = useIsDesktop();

  const useRight = side === "right" || (!side && isDesktop);
  const useBottom = side === "bottom" || (!side && !isDesktop);

  useEffect(() => {
    if (open) {
      document.body.setAttribute("data-scroll-locked", "1");
    } else {
      document.body.removeAttribute("data-scroll-locked");
    }
    return () => { document.body.removeAttribute("data-scroll-locked"); };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // swipe-to-dismiss: bottom sheet → swipe down, right panel → swipe right
  const swipeDismiss = useSwipe({
    onSwipeDown: useBottom ? onClose : undefined,
    onSwipeRight: useRight ? onClose : undefined,
  });

  const panelClass = useRight
    ? cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#111] shadow-2xl", className)
    : cn("fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl bg-[#111] shadow-2xl", className);

  const initial = useRight ? { x: "100%" } : { y: "100%" };
  const animate = useRight ? { x: 0 } : { y: 0 };
  const exit = useRight ? { x: "100%" } : { y: "100%" };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            onTouchEnd={(e) => { e.preventDefault(); onClose(); }}
          />

          <motion.div
            key="sheet-panel"
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={panelClass}
          >
            {/* Handle bar — swipe-to-dismiss zone for bottom sheet */}
            {useBottom && (
              <div
                {...swipeDismiss}
                className="flex touch-pan-x justify-center pt-3 pb-1 shrink-0 cursor-grab"
              >
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
            )}

            {/* Header */}
            {headerSlot ?? (
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-6 py-4">
                {title && (
                  <p className="text-xs font-light tracking-widest text-foreground-300 uppercase">
                    {title}
                  </p>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="ml-auto flex h-8 w-8 items-center justify-center text-foreground-400 transition-colors hover:text-foreground-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Scrollable content — data-lenis-prevent tells Lenis to skip this element */}
            <div data-lenis-prevent className="flex-1 touch-pan-y overflow-y-auto px-6 py-5">{children}</div>

            {/* Footer */}
            {footerSlot && (
              <div className="shrink-0 border-t border-white/[0.08]">{footerSlot}</div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
