"use client";

import { motion, useInView, useMotionValue, useSpring, Variant } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef } from "react";

const defaultEase = [0.22, 1, 0.36, 1];
const lineEase    = [0.16, 1, 0.3, 1];

// ── CSS-driven Animate ────────────────────────────────────────────────────────
// Uses data-attributes + CSS custom properties. No JS per-item.

export type AnimationType = "line-reveal" | "fade-up" | "fade-in" | "scale-up" | "none";

type AnimateCtxValue = {
  animation: AnimationType;
  indexRef: React.MutableRefObject<number>;
};

const AnimateCtx = createContext<AnimateCtxValue>({
  animation: "fade-up",
  indexRef: { current: 0 },
});

type AnimateProps = {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

export function Animate({
  children,
  animation = "fade-up",
  delay = 0,
  stagger = 0.1,
  duration = 0.7,
  once = true,
  margin = "-40px",
  as: Tag = "div",
  className,
  style,
}: AnimateProps) {
  const ref = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once, margin } as any);
  const indexRef = useRef(0);
  indexRef.current = 0;

  const Root = Tag as React.ElementType;

  return (
    <Root
      ref={ref}
      data-animate-state={inView ? "visible" : "hidden"}
      className={className}
      style={
        {
          "--animate-base-delay": `${delay}s`,
          "--animate-stagger": `${stagger}s`,
          "--animate-duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
    >
      <AnimateCtx.Provider value={{ animation, indexRef }}>
        {children}
      </AnimateCtx.Provider>
    </Root>
  );
}

type AnimateItemProps = {
  children: React.ReactNode;
  animation?: AnimationType;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  innerAs?: keyof React.JSX.IntrinsicElements;
};

Animate.Item = function AnimateItem({
  children,
  animation: animationOverride,
  index: indexOverride,
  className,
  style,
  as: Wrapper = "div",
  innerAs: Inner = "div",
}: AnimateItemProps) {
  const { animation: groupAnimation, indexRef } = useContext(AnimateCtx);
  const animation = animationOverride ?? groupAnimation;

  // Claim index once per mount — prevents double-increment in React Strict Mode
  const claimedIndex = useRef<number | null>(null);
  if (claimedIndex.current === null) {
    claimedIndex.current = indexOverride !== undefined ? indexOverride : indexRef.current++;
  }
  const myIndex = claimedIndex.current;

  const WrapperEl = Wrapper as React.ElementType;
  const InnerEl = Inner as React.ElementType;

  return (
    <WrapperEl
      data-animate={animation}
      className={className}
      style={{ "--animate-index": String(myIndex), ...style } as React.CSSProperties}
    >
      <InnerEl data-animate-inner="">{children}</InnerEl>
    </WrapperEl>
  );
};

// ── Reveal (framer-motion fade-up) ────────────────────────────────────────────

type RevealProps = {
  children: React.ReactNode;
  distance?: number;
  delay?: number;
  duration?: number;
  ease?: number[];
  once?: boolean;
  margin?: string;
  className?: string;
};

export function Reveal({
  children, distance = 32, delay = 0, duration = 0.7,
  ease = defaultEase, once = true, margin = "-80px", className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once, margin } as any);
  const hidden: Variant = { opacity: 0, y: distance };
  const visible: Variant = { opacity: 1, y: 0 };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden, visible }} transition={{ duration, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

// ── RevealGroup + RevealItem ──────────────────────────────────────────────────

type RevealGroupProps = {
  children: React.ReactNode;
  stagger?: number; delay?: number; distance?: number;
  duration?: number; ease?: number[];
  once?: boolean; margin?: string; className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function RevealGroup({
  children, stagger = 0.1, delay = 0, duration = 0.65,
  ease = defaultEase, once = true, margin = "-60px", className,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as Parameters<typeof useInView>[1]["margin"] });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}>
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  distance?: number; duration?: number; ease?: number[]; className?: string;
};

export function RevealItem({ children, distance = 28, duration = 0.65, ease = defaultEase, className }: RevealItemProps) {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0, transition: { duration, ease } },
    }} className={className}>
      {children}
    </motion.div>
  );
}

// ── LineReveal ────────────────────────────────────────────────────────────────
// Mask-clip line reveal — each Line child slides up from below overflow:hidden.

type LineRevealCtxValue = {
  inView: boolean;
  stagger: number;
  duration: number;
  ease: number[];
  baseDelay: number;
};

const LineRevealCtx = createContext<LineRevealCtxValue>({
  inView: false,
  stagger: 0.1,
  duration: 0.75,
  ease: lineEase,
  baseDelay: 0,
});

const IndexCtx = createContext<React.MutableRefObject<number> | null>(null);

type LineRevealProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements | false;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: number[];
  once?: boolean;
  margin?: string;
  className?: string;
};

export function LineReveal({
  children,
  as: Tag = "div",
  delay = 0,
  stagger = 0.1,
  duration = 0.75,
  ease = lineEase,
  once = true,
  margin = "-40px",
  className,
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once,
    margin: margin as Parameters<typeof useInView>[1]["margin"],
  });
  const indexRef = useRef(0);
  indexRef.current = 0;

  const ctx: LineRevealCtxValue = { inView, stagger, duration, ease, baseDelay: delay };

  const content = (
    <LineRevealCtx.Provider value={ctx}>
      <IndexCtx.Provider value={indexRef}>
        {children}
      </IndexCtx.Provider>
    </LineRevealCtx.Provider>
  );

  if (Tag === false) {
    return (
      <>
        <span ref={ref as React.RefObject<HTMLSpanElement>} aria-hidden style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
        {content}
      </>
    );
  }

  const Root = Tag as React.ElementType;
  return (
    <Root ref={ref} className={className}>
      {content}
    </Root>
  );
}

type LineRevealLineProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: number[];
  wrapper?: "span" | "div";
  className?: string;
};

LineReveal.Line = function LineRevealLine({
  children,
  delay: manualDelay,
  duration: manualDuration,
  ease: manualEase,
  wrapper = "div",
  className,
}: LineRevealLineProps) {
  const { inView, stagger, duration, ease, baseDelay } = useContext(LineRevealCtx);
  const indexRef = useContext(IndexCtx);

  const claimedIndex = useRef<number | null>(null);
  if (claimedIndex.current === null) {
    claimedIndex.current = indexRef ? indexRef.current++ : 0;
  }
  const myIndex = claimedIndex.current;
  const computedDelay = manualDelay !== undefined ? manualDelay : baseDelay + myIndex * stagger;
  const Wrapper = wrapper as React.ElementType;

  return (
    <Wrapper className={className} style={{ display: "block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "block", willChange: "transform" }}
        initial={{ y: "105%" }}
        animate={inView ? { y: "0%" } : { y: "105%" }}
        transition={{
          duration: manualDuration ?? duration,
          delay: computedDelay,
          ease: manualEase ?? ease,
        }}
      >
        {children}
      </motion.span>
    </Wrapper>
  );
};

// ── CountUp ───────────────────────────────────────────────────────────────────
// Animates a number from 0 to `to` when it enters the viewport.

type CountUpProps = {
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({
  to,
  duration = 1.6,
  delay = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => { raw.set(to); }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, to, delay, raw]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
    });
  }, [spring, decimals, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
