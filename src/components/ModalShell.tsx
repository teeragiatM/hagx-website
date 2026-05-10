"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
};

// ── Shared ModalShell ─────────────────────────────────────────────────────────

export default function ModalShell({
  title, eyebrow, subtitle, tagline,
  details, tags, tagsLabel,
  gallery, cta, closeLabel = "Close",
  price, stockStatus,
}: ModalShellProps) {
  const router = useRouter();
  const [imgIdx, setImgIdx] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => router.back(), [router]);

  // ── Scroll lock — body locked, left panel scrolls ──────────────────────────
  useEffect(() => {
    // measure scrollbar width to avoid layout shift
    const scrollW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollW}px`;

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [close]);

  // Prevent wheel events on backdrop from reaching body
  const stopPropagation = (e: React.WheelEvent) => e.stopPropagation();

  const validGallery = gallery.filter((img) => img.src);
  const imgs = validGallery.length > 1 ? validGallery : validGallery.length === 1 ? [validGallery[0], validGallery[0]] : [];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-6 lg:p-10"
      onWheel={stopPropagation}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={close}
      />

      {/* Dialog */}
      <motion.div
        className="relative z-10 flex w-full overflow-hidden bg-[#0e0a06] shadow-2xl sm:rounded-sm"
        style={{ maxWidth: 1160, height: "92vh", maxHeight: "92vh" }}
        initial={{ opacity: 0, scale: 0.97, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 28 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── LEFT panel — scrollable ── */}
        <div
          ref={leftRef}
          className="flex h-full shrink-0 flex-col border-r border-white/[0.08] lg:w-[38%]"
          style={{ overflowY: "auto", overscrollBehavior: "contain" }}
        >
          {/* Title bar */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-7 py-6">
            <div className="min-w-0">
              {eyebrow && (
                <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-[#ff8a00]/80">{eyebrow}</p>
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">{title}</h1>
              {subtitle && <p className="mt-1 text-sm font-light text-white/35">{subtitle}</p>}
            </div>
            <button
              onClick={close}
              className="mt-0.5 shrink-0 border border-white/20 px-4 py-2 text-[10px] font-light uppercase tracking-widest text-white/50 transition-colors hover:border-white/50 hover:text-white"
            >
              {closeLabel}
            </button>
          </div>

          {/* Tagline */}
          {tagline && (
            <div className="shrink-0 border-b border-white/[0.06] px-7 py-5">
              <p className="border-l-2 border-[#ff8a00] pl-4 text-sm font-light italic text-white/45">{tagline}</p>
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="shrink-0 border-b border-white/[0.06] px-7 py-5">
              <p className="mb-1 text-[9px] font-light uppercase tracking-widest text-white/20">ราคาเริ่มต้น</p>
              <p className="text-2xl font-bold text-[#ff8a00]">
                {price.amount}
                <span className="ml-1 text-sm font-light text-white/30">/ {price.unit}</span>
              </p>
              {stockStatus && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${stockStatus.inStock ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className="text-[10px] font-light text-white/30">
                    {stockStatus.inStock ? stockStatus.inLabel : stockStatus.outLabel}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Details rows */}
          <div className="divide-y divide-white/[0.06] px-7">
            {details.map((d) => (
              <div key={d.label} className="py-4">
                <p className="mb-1.5 text-[9px] font-light uppercase tracking-widest text-white/25">{d.label}</p>
                <p className="text-sm font-light leading-7 text-white/65">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="px-7 py-5">
              {tagsLabel && (
                <p className="mb-3 text-[9px] font-light uppercase tracking-widest text-white/25">{tagsLabel}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => router.replace(tag.href)}
                    className="border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-[10px] font-light uppercase tracking-widest text-white/40 transition-colors hover:border-[#ff8a00]/50 hover:bg-[#ff8a00]/10 hover:text-[#ff8a00]"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spacer + CTA pinned to bottom */}
          <div className="mt-auto shrink-0 border-t border-white/[0.08] px-7 py-6">
            <Link href={cta.href} className="btn btn-primary block w-full text-center">
              {cta.label}
            </Link>
          </div>
        </div>

        {/* ── RIGHT panel — image gallery ── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Main image */}
          <div className="relative flex-1 overflow-hidden bg-[#080808]">
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

            {/* Arrow nav */}
            {imgs.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/50 text-lg text-white/60 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
                >
                  ‹
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % imgs.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/50 text-lg text-white/60 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 border-t border-white/[0.08] bg-[#0a0804] px-5 py-3">
            <div className="flex items-center gap-4">
              <span className="shrink-0 text-xl font-bold leading-none text-[#ff8a00]">
                {imgIdx + 1}<span className="text-sm font-light text-white/25">/{imgs.length}</span>
              </span>
              <div className="flex gap-2 overflow-x-auto pb-0.5">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`relative h-14 w-[84px] shrink-0 overflow-hidden transition-all duration-200 ${
                      i === imgIdx ? "ring-2 ring-[#ff8a00]" : "opacity-35 hover:opacity-65"
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="84px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
