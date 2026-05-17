"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useScrollLock } from "@/lib/useScrollLock";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ModalDetail = { label: string; value: string };

export type ModalTag = { label: string; slug: string; href: string };

export type ModalGallery = { src: string; alt: string }[];

export type ModalShellProps = {
  /** Title shown top-left */
  title: string;
  /** Small label above title (eyebrow) */
  eyebrow?: string;
  /** Optional subtitle below title */
  subtitle?: string;
  /** Tagline with accent left-border */
  tagline?: string;
  /** Rows shown as label → value */
  details: ModalDetail[];
  /** Tag chips below details (navigate within modal on click) */
  tags?: ModalTag[];
  /** Tags section label */
  tagsLabel?: string;
  /** Gallery images */
  gallery: ModalGallery;
  /** Primary CTA link */
  cta: { href: string; label: string };
  /** Label on "Close" button */
  closeLabel?: string;
  /** Price display — shown prominently if provided */
  price?: { amount: string; unit: string };
  /** Stock badge */
  stockStatus?: { inStock: boolean; inLabel: string; outLabel: string };
  /** Replace the default image gallery panel with custom content (e.g. article body) */
  rightSlot?: ReactNode;
};

// ── Shared ModalShell ─────────────────────────────────────────────────────────

export default function ModalShell({
  title,
  eyebrow,
  subtitle,
  tagline,
  details,
  tags,
  tagsLabel,
  gallery,
  cta,
  closeLabel = "Close",
  price,
  stockStatus,
  rightSlot,
}: ModalShellProps) {
  const router = useRouter();
  const [imgIdx, setImgIdx] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => router.back(), [router]);

  useScrollLock();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Prevent wheel events on backdrop from reaching body
  const stopPropagation = (e: React.WheelEvent) => e.stopPropagation();

  const validGallery = gallery.filter((img) => img.src);
  const imgs =
    validGallery.length > 1
      ? validGallery
      : validGallery.length === 1
        ? [validGallery[0], validGallery[0]]
        : [];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-6 lg:p-10"
      onWheel={stopPropagation}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-zinc-900/45 backdrop-blur-xl backdrop-saturate-125"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={close}
      />

      {/* Dialog */}
      <motion.div
        className="relative z-10 flex w-full overflow-hidden bg-[#0e0a06] shadow-2xl sm:rounded-sm"
        style={{ maxWidth: 1160, height: '92vh', maxHeight: '92vh' }}
        initial={{ opacity: 0, scale: 0.97, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 28 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── LEFT panel — scrollable ── */}
        <div
          ref={leftRef}
          className="flex h-full shrink-0 flex-col border-r border-white/[0.08] lg:w-[38%]"
          style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}
        >
          {/* Title bar */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-7 py-6">
            <div className="min-w-0">
              {eyebrow && (
                <p className="mb-1 text-xs font-light tracking-widest text-accent-500/80 uppercase">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-xl leading-tight font-bold tracking-tight text-foreground-100 lg:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm font-light text-foreground-200">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={close}
              className="mt-0.5 shrink-0 border border-border-300 px-4 py-2 text-[10px] font-light tracking-widest text-foreground-300 uppercase transition-colors hover:border-foreground-100/50 hover:text-foreground-100"
            >
              {closeLabel}
            </button>
          </div>

          {/* Tagline */}
          {tagline && (
            <div className="shrink-0 border-b border-white/[0.06] px-7 py-5">
              <p className="border-l-2 border-accent-500 pl-4 text-sm font-light text-foreground-400 italic">
                {tagline}
              </p>
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="shrink-0 border-b border-white/[0.06] px-7 py-5">
              <p className="mb-1 text-xs font-light tracking-widest text-foreground-400 uppercase">
                ราคาเริ่มต้น
              </p>
              <p className="text-2xl font-bold text-accent-500">
                {price.amount}
                <span className="ml-1 text-sm font-light text-foreground-400">
                  / {price.unit}
                </span>
              </p>
              {stockStatus && (
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${stockStatus.inStock ? 'bg-green-500' : 'bg-yellow-500'}`}
                  />
                  <span className="text-[10px] font-light text-foreground-400">
                    {stockStatus.inStock
                      ? stockStatus.inLabel
                      : stockStatus.outLabel}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Details rows */}
          <div className="divide-y divide-white/[0.06] px-7">
            {details.map((d) => (
              <div key={d.label} className="py-4">
                <p className="mb-1.5 text-xs font-light tracking-widest text-foreground-400 uppercase">
                  {d.label}
                </p>
                <p className="text-sm leading-7 font-light text-foreground-300">
                  {d.value}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="px-7 py-5">
              {tagsLabel && (
                <p className="mb-3 text-xs font-light tracking-widest text-foreground-400 uppercase">
                  {tagsLabel}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => router.replace(tag.href)}
                    className="border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-500"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spacer + CTA pinned to bottom */}
          <div className="mt-auto shrink-0 border-t border-white/[0.08] px-7 py-6">
            <Link
              href={cta.href}
              className="btn btn-primary block w-full text-center"
            >
              {cta.label}
            </Link>
          </div>
        </div>

        {/* ── RIGHT panel ── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {rightSlot ? (
            <div className="h-full overflow-y-auto overscroll-contain">
              {rightSlot}
            </div>
          ) : (
            <>
              {/* Main image */}
              <div className="relative flex-1 overflow-hidden bg-background-100">
                <AnimatePresence mode="wait">
                  {imgs.length > 0 && (
                    <motion.div
                      key={imgIdx}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        src={imgs[imgIdx].src}
                        alt={imgs[imgIdx].alt}
                        fill
                        priority={imgIdx === 0}
                        sizes="(min-width:1024px) 65vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {imgs.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)
                      }
                      className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border-300 bg-background-100/50 text-foreground-200 backdrop-blur-sm transition hover:bg-background-100/80 hover:text-foreground-100"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setImgIdx((i) => (i + 1) % imgs.length)}
                      className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border-300 bg-background-100/50 text-foreground-200 backdrop-blur-sm transition hover:bg-background-100/80 hover:text-foreground-100"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="shrink-0 border-t border-white/[0.08] bg-[#0a0804] px-5 py-3">
                <div className="flex items-center gap-4">
                  <span className="shrink-0 text-xl leading-none font-bold text-accent-500">
                    {imgIdx + 1}
                    <span className="text-sm font-light text-foreground-400">
                      /{imgs.length}
                    </span>
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-0.5">
                    {imgs.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`relative h-14 w-[84px] shrink-0 overflow-hidden transition-all duration-200 ${
                          i === imgIdx
                            ? 'ring-2 ring-[#E15F31]'
                            : 'opacity-35 hover:opacity-65'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          sizes="84px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
