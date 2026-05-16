"use client";

import { motion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

// ─── Progress hook ─────────────────────────────────────────────────────────────

export function useRealProgress(onDone: () => void): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let displayed = 0;
    let raf: number | undefined;
    let fontsReady = false;
    let loadEventFired = document.readyState === "complete";

    const getSnapshot = () => {
      const allImages = Array.from(document.images || []);
      const images = allImages.filter(
        (img) => (img.getAttribute("loading") || "").toLowerCase() !== "lazy"
      );
      const total = images.length + 1;
      const loadedImages = images.reduce(
        (acc, img) => acc + (img.complete ? 1 : 0),
        0
      );
      const loaded = loadedImages + (fontsReady ? 1 : 0);
      return {
        ratio: total > 0 ? loaded / total : 0,
        allImagesLoaded: loadedImages === images.length,
      };
    };

    const tick = () => {
      const { ratio, allImagesLoaded } = getSnapshot();
      const fullyReady = loadEventFired && fontsReady && allImagesLoaded;
      const target = fullyReady ? 100 : Math.min(95, Math.max(5, ratio * 95));

      displayed += (target - displayed) * 0.12;
      displayed = Math.max(displayed, Math.min(target, displayed + 0.08));
      displayed = Math.min(displayed, target);
      setProgress(displayed);

      if (fullyReady && displayed >= 99.5) {
        setProgress(100);
        window.setTimeout(onDone, 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      (document.fonts?.ready as Promise<unknown> | undefined)
        ?.then(() => { fontsReady = true; })
        .catch(() => { fontsReady = true; });
    } else {
      fontsReady = true;
    }

    const imageEls = Array.from(document.images || []).filter(
      (img) => (img.getAttribute("loading") || "").toLowerCase() !== "lazy"
    );
    const onImgDone = () => {};
    for (const img of imageEls) {
      if (!img.complete) {
        img.addEventListener("load", onImgDone, { once: true });
        img.addEventListener("error", onImgDone, { once: true });
      }
    }

    const onLoad = () => { loadEventFired = true; };
    if (!loadEventFired) window.addEventListener("load", onLoad, { once: true });

    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      for (const img of imageEls) {
        img.removeEventListener("load", onImgDone);
        img.removeEventListener("error", onImgDone);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  return progress;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const Ctx = createContext<{ pct: number }>({ pct: 0 });
const usePct = () => useContext(Ctx).pct;

// ─── Root ─────────────────────────────────────────────────────────────────────

function Root({
  onDone,
  children,
}: {
  onDone: () => void;
  children: ReactNode;
}) {
  const progress = useRealProgress(onDone);
  const pct = Math.min(progress, 100);

  return (
    <Ctx.Provider value={{ pct }}>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background-100"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </Ctx.Provider>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 55% 50% at 50% 50%, black 0%, black 35%, rgba(0,0,0,0.6) 60%, transparent 100%)",
      }}
    />
  );
}

// ─── Logo (spinner) ───────────────────────────────────────────────────────────

const POLY =
  "0 302.59 0 81.86 194.43 0 291.73 40.54 291.73 343.91 194.43 384.45 0 302.59";
const INNER =
  "M194.48,88V28.75L26.52,99.47v185.5l167.96,70.72v-59.24l70.72,29.78V58.22l-70.72,29.78ZM167.96,315.75l-114.92-48.39V117.08l114.92-48.39v30.47l-70.72,29.78v126.57l70.72,29.78v30.47ZM167.96,127.94v128.57l-44.2-18.61v-91.35l44.2-18.61ZM238.68,192.23v94.06l-44.2-18.61V116.77l44.2-18.61v94.06Z";

const LOOP = {
  pathLength: [0, 1, 1, 0],
  opacity: [0.4, 1, 1, 0.4],
};
const LOOP_T = {
  duration: 2.6,
  times: [0, 0.42, 0.58, 1],
  repeat: Infinity,
  ease: "easeInOut" as const,
};

function Logo({ className }: { className?: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: "clamp(88px, 14vw, 160px)" }}
    >
      {/* Ambient glow — pulses with stroke */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        animate={{ opacity: [0.2, 0.55, 0.55, 0.2] }}
        transition={LOOP_T}
        style={{
          inset: "-40%",
          background:
            "radial-gradient(circle, rgba(247,107,21,0.35) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <svg
        viewBox="0 0 291.73 384.45"
        aria-hidden
        className={className}
        style={{ width: "100%", height: "auto" }}
      >
        {/* Static dim fills so the shape is readable */}
        <polygon points={POLY} fill="var(--accent-500)" fillOpacity={0.1} />
        <path d={INNER} fill="white" fillOpacity={0.08} />

        {/* Outer polygon — looping stroke draw */}
        <motion.polygon
          points={POLY}
          fill="none"
          stroke="var(--accent-500)"
          strokeWidth={4}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          animate={LOOP}
          transition={LOOP_T}
        />

        {/* Inner H — looping stroke, offset phase */}
        <motion.path
          d={INNER}
          fill="none"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          animate={LOOP}
          transition={{ ...LOOP_T, delay: 0.35 }}
        />
      </svg>
    </div>
  );
}

// ─── Percent ──────────────────────────────────────────────────────────────────

function Percent({ className }: HTMLAttributes<HTMLParagraphElement>) {
  const pct = usePct();
  return (
    <p
      className={className}
      style={{
        fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
        fontWeight: 200,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        marginBottom: "0.85rem",
        color: "var(--foreground)",
      }}
    >
      {Math.round(pct)}
      <span style={{ fontSize: "0.4em", opacity: 0.28, marginLeft: "0.1em" }}>
        %
      </span>
    </p>
  );
}

// ─── Bar ──────────────────────────────────────────────────────────────────────

function Bar({ className }: HTMLAttributes<HTMLDivElement>) {
  const pct = usePct();
  const tipOpa = 0.35 + pct * 0.003;
  const tipBlur = 6 + pct * 0.08;

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-valuetext={`${Math.round(pct)}%`}
      style={{
        position: "relative",
        width: "100%",
        height: "2px",
        background: "rgba(255,255,255,0.07)",
        overflow: "visible",
        ["--progress-value" as string]: pct,
        ["--progress-max" as string]: 100,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "2px",
          width: "100%",
          transformOrigin: "left",
          transform: `scaleX(${pct / 100})`,
          transition: "transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)",
          background:
            "linear-gradient(90deg, rgba(247,107,21,0.75) 0%, rgba(247,107,21,0.95) 70%, rgba(247,107,21,1) 100%)",
        }}
      >
        {pct > 2 && (
          <span
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "2px",
              height: "6px",
              background: "rgba(255,230,200,0.95)",
              boxShadow: `0 0 ${tipBlur}px 2px rgba(247,107,21,${tipOpa}), 0 0 ${tipBlur * 2}px 4px rgba(247,107,21,${tipOpa * 0.4})`,
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Bottom strip ─────────────────────────────────────────────────────────────

function Bottom({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "1.5rem 2.5rem 2rem",
        zIndex: 2,
      }}
    >
      {children}
    </div>
  );
}

// ─── Compound export ──────────────────────────────────────────────────────────

export const Preloader = Object.assign(Root, {
  Background,
  Logo,
  Percent,
  Bar,
  Bottom,
});
