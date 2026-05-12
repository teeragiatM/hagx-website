"use client";

/**
 * PageHero — shared hero section used across all inner pages.
 *
 * Layout (centered by default, left-aligned optional):
 *
 *   ┌────────────────────────────────────────────────┐
 *   │  [background / image / glow]                   │
 *   │                                                │
 *   │      eyebrow                                   │
 *   │      title                                     │
 *   │      subtitle                                  │
 *   │      [children — stats, logos, CTA, etc.]      │
 *   │                                                │
 *   │  [bottomSlot — full-width bar, e.g. logo strip]│
 *   ├────────────────────────────────────────────────┤
 *   │  ░░░░ bottom fade to bg ░░░░░░░░░░░░░░░░░░░░░ │
 *   └────────────────────────────────────────────────┘
 *
 * Usage:
 *   <PageHero eyebrow="About Us" title="Precise glass..." subtitle="..." />
 *   <PageHero align="left" minHeight="70vh" glow={false} image="/bg.jpg">
 *     <StatRow />
 *   </PageHero>
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  eyebrow?:        string;
  title:           React.ReactNode;
  /** muted second line — renders slightly dimmer */
  titleAlt?:       React.ReactNode;
  subtitle?:       React.ReactNode;
  /** Extra content below subtitle — stats, logos, CTA, etc. */
  children?:       React.ReactNode;
  /** Full-width slot pinned to the bottom of the hero (above the fade) */
  bottomSlot?:     React.ReactNode;
  /** Absolute-positioned background layer (e.g. marquee columns) rendered behind glow */
  backgroundSlot?: React.ReactNode;
  /** "center" (default) | "left" */
  align?:          "center" | "left";
  /** CSS min-height string, default "100vh" */
  minHeight?:      string;
  /** Show radial orange glow, default true */
  glow?:           boolean;
  /** Background image URL — layered under glow */
  image?:          string;
  /** Extra classes on the outer <section> */
  className?:      string;
};

export default function PageHero({
  eyebrow,
  title,
  titleAlt,
  subtitle,
  children,
  bottomSlot,
  backgroundSlot,
  align      = "center",
  minHeight  = "100vh",
  glow       = true,
  image,
  className,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "hero-bottom-shadow relative flex flex-col overflow-hidden border-b border-white/[0.06]",
        isCenter ? "items-center justify-center text-center" : "justify-center",
        className,
      )}
      style={{ minHeight }}
    >
      {/* ── Custom background slot (e.g. marquee columns) ── */}
      {backgroundSlot && (
        <div className="absolute inset-0 overflow-hidden">
          {backgroundSlot}
        </div>
      )}

      {/* ── Background image ── */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
      )}

      {/* ── Radial orange glow ── */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(120,50,0,0.55) 0%, rgba(8,8,8,0) 70%)",
          }}
        />
      )}

      {/* ── Arc shape at bottom ── */}
      {/* ── Bottom fade to page bg ── */}
      {/* ── Main content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "hero-content-layer relative z-10 w-full px-[var(--site-inline-px)] pb-20 pt-32",
          isCenter ? "mx-auto max-w-5xl" : "max-w-[1500px]",
        )}
      >
        {eyebrow && (
          <p className="mb-6 text-xs font-light uppercase tracking-widest text-white/45">
            {eyebrow}
          </p>
        )}

        <h1
          className={cn(
            "font-bold leading-tight tracking-tight",
            isCenter
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-5xl sm:text-6xl lg:text-7xl",
          )}
        >
          {title}
          {titleAlt && (
            <>
              <br className="hidden sm:block" />
              <span className="text-white/35">{titleAlt}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p
            className={cn(
              "mt-6 text-sm font-light leading-8 text-white/45",
              isCenter ? "mx-auto max-w-xl" : "max-w-2xl",
            )}
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div className={cn("mt-10", isCenter && "flex flex-col items-center")}>
            {children}
          </div>
        )}
      </motion.div>

      {/* ── Bottom slot (full-width, above fade) ── */}
      {bottomSlot && (
        <div className="relative z-10 w-full">
          {bottomSlot}
        </div>
      )}
    </section>
  );
}
