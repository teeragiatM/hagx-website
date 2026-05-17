"use client";

import { useEffect } from "react";

/**
 * Lock body scroll by setting data-scroll-locked="1".
 * SmoothScroll watches this attribute and pauses Lenis automatically.
 * CSS in globals.css applies overflow:hidden + scrollbar compensation.
 */
export function useScrollLock() {
  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
      "--removed-body-scroll-bar-size",
      `${scrollBarWidth}px`
    );
    document.body.dataset.scrollLocked = "1";

    return () => {
      delete document.body.dataset.scrollLocked;
      document.documentElement.style.removeProperty(
        "--removed-body-scroll-bar-size"
      );
    };
  }, []);
}
