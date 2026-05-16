"use client";

import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/i18n/useI18n";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// ─── GALLERY CONFIG ────────────────────────────────────────────────────────────
const CFG = {
  // scroll distance รวม — ยิ่งมาก ยิ่งต้อง scroll นานกว่าจะจบ section
  sectionVh: 300,

  // Canvas height
  canvasMultiple: 8,

  // canvas เลื่อนขึ้นเท่านี้ vh — ควรใกล้เคียง lastCard.t% * canvasMultiple * 100 - 50
  travelVh: 390,

  // spring นุ่มนวลขึ้น
  spring: { stiffness: 30, damping: 30, mass: 1.8 },
  parallaxPx: {
    x: [12, -12] as [number, number],
    y: [6, -6] as [number, number],
  },
};
// ───────────────────────────────────────────────────────────────────────────────

type PortfolioItem = {
  title: string;
  sub: string;
  desc: string;
  image: string;
  slug: string;
  scope: string;
};

// 15 การ์ด
const PLACEMENTS = [
  { l: 5, t: 0, w: 22, z: 3, opacity: 0.92, depth: 1.0 },
  { l: 35, t: 4, w: 9, z: 1, opacity: 0.24, depth: 0.14 },
  { l: 70, t: 2, w: 20, z: 3, opacity: 0.88, depth: 0.95 },
  { l: 0, t: 14, w: 10, z: 1, opacity: 0.25, depth: 0.15 },
  { l: 15, t: 18, w: 18, z: 2, opacity: 0.78, depth: 0.85 },
  { l: 55, t: 12, w: 22, z: 3, opacity: 0.9, depth: 0.98 },
  { l: 8, t: 28, w: 20, z: 3, opacity: 0.88, depth: 0.95 },
  { l: 40, t: 32, w: 8, z: 1, opacity: 0.22, depth: 0.13 },
  { l: 65, t: 28, w: 18, z: 2, opacity: 0.76, depth: 0.83 },
  { l: 2, t: 42, w: 19, z: 3, opacity: 0.88, depth: 0.95 },
  { l: 35, t: 46, w: 9, z: 1, opacity: 0.23, depth: 0.13 },
  { l: 68, t: 42, w: 20, z: 3, opacity: 0.9, depth: 0.98 },
  { l: 12, t: 52, w: 18, z: 3, opacity: 0.88, depth: 0.95 },
  { l: 45, t: 55, w: 8, z: 1, opacity: 0.22, depth: 0.13 },
  { l: 75, t: 53, w: 16, z: 2, opacity: 0.76, depth: 0.83 },
] as const;

function PortfolioCard({
  item,
  placement,
  index,
  gridX,
  gridY,
}: {
  item: PortfolioItem;
  placement: (typeof PLACEMENTS)[number];
  index: number;
  gridX: ReturnType<typeof useSpring>;
  gridY: ReturnType<typeof useSpring>;
}) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);

  const x = useTransform(gridX, (v) => v * placement.depth);
  const y = useTransform(gridY, (v) => v * placement.depth);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: `${placement.l}%`,
        top: `${placement.t}%`,
        width: `${placement.w}%`,
        aspectRatio: "3 / 4",
        zIndex: hovered ? 30 : placement.z,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: placement.opacity, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ opacity: 1 }}
      className="cursor-pointer"
    >
      <Link href={`/portfolio/${item.slug}`} className="block h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1280px) 15vw, 18vw"
              quality={60}
              loading="lazy"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: hovered ? 0.52 : 0.08 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[7px] font-light uppercase tracking-widest text-[#f76b15]/90">
              {item.scope}
            </p>
            <p className="text-[10px] font-light leading-snug text-foreground-200">
              {item.title}
            </p>
            <span className="mt-1 text-[7px] font-light uppercase tracking-widest text-foreground-400 underline underline-offset-2">
              {t("projects.view")}
            </span>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 border border-[#f76b15]"
            animate={{ opacity: hovered ? 0.6 : 0 }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePortfolioSection({
  portfolio,
}: {
  portfolio: PortfolioItem[];
}) {
  const { t } = useI18n();
  if (portfolio.length === 0) return null;

  const visible = PLACEMENTS.map((_, i) => portfolio[i % portfolio.length]);

  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  const travelPct = `${-CFG.travelVh}%`;
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', travelPct]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const gridX = useSpring(
    useTransform(rawX, [-0.5, 0.5], CFG.parallaxPx.x),
    CFG.spring
  );
  const gridY = useSpring(
    useTransform(rawY, [-0.5, 0.5], CFG.parallaxPx.y),
    CFG.spring
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const sectionHeight = `${CFG.sectionVh}vh`;
  const canvasHeight = `${CFG.canvasMultiple * 100}%`;

  return (
    <div
      ref={outerRef}
      className="relative hidden lg:block"
      style={{ height: sectionHeight }}
    >
      <div
        ref={viewportRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="PageSection_root sticky top-0 h-screen overflow-hidden"
      >
        {/* Top fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-40"
          style={{
            height: '20%',
            background:
              'linear-gradient(to bottom, var(--background-100) 0%, var(--background-100) 10%, rgba(15,16,17,0.70) 55%, transparent 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40"
          style={{
            height: '20%',
            background:
              'linear-gradient(to top, var(--background-100) 0%, var(--background-100) 10%, rgba(15,16,17,0.75) 55%, transparent 100%)',
          }}
        />

        {/* Header */}
        <div className="absolute right-0 left-0 z-50">
          <SectionHeader
            heading={t('projects.title')
              .split('\n')
              .map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            action={
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-light tracking-widest text-foreground-400 uppercase transition-all duration-500 hover:border-foreground-100/35 hover:text-foreground-200"
              >
                {t('projects.see_all')}
                <span className="text-accent-600">({portfolio.length})</span>
              </Link>
            }
          />
        </div>

        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-(--homepage-padding-inset) select-none">
          <p className="text-9xl leading-none font-extralight tracking-tighter whitespace-nowrap text-foreground-100">
            Our Work
            <sup className="text-[0.28em] opacity-50">
              {' '}
              ({portfolio.length})
            </sup>
          </p>
        </div>

        {/* Scrolling canvas */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ y: canvasY }}
          transition={{ duration: 0.1, ease: 'linear' }}
        >
          <div className="relative w-full" style={{ height: canvasHeight }}>
            {visible.map((item, i) => (
              <PortfolioCard
                key={`${item.slug}-${i}`}
                item={item}
                placement={PLACEMENTS[i]}
                index={i}
                gridX={gridX}
                gridY={gridY}
              />
            ))}
          </div>
        </motion.div>

        {/* Side vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              'radial-gradient(ellipse 90% 100% at 50% 50%, transparent 50%, var(--background-100) 100%)',
          }}
        />
      </div>
    </div>
  );
}
