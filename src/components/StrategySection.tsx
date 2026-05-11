"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { PenTool, RefreshCw, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "@/i18n/useI18n";

const pillars = [
  {
    key: "design",
    num: "01",
    label_th: "ออกแบบอย่างสมบูรณ์",
    label_en: "Design Integrity",
    short: "Perfectly\nDesigned",
    desc_th:
      "เราออกแบบด้วยความแม่นยำ ควบคุมทุกเส้น รายละเอียด รอยต่อ และวัสดุให้มีเหตุผลรองรับตั้งแต่ Shop Drawing จนถึงวันส่งมอบ",
    desc_en:
      "We design with precision, controlling every line, joint, and material from shop drawing to final handover.",
    tag: "DESIGN",
    ghost: "PERFECTLY\nDESIGNED",
    Icon: PenTool,
    overview: { x: "0vw", y: "-19vh" },
  },
  {
    key: "planning",
    num: "02",
    label_th: "วางแผนอย่างรอบคอบ",
    label_en: "Careful Planning",
    short: "Carefully\nPlanned",
    desc_th:
      "เราสำรวจ ประเมิน และวางแผนทุกโครงการให้ครอบคลุมตั้งแต่โครงสร้าง งบประมาณ ลำดับงาน ไปจนถึงข้อจำกัดของหน้างานจริง",
    desc_en:
      "We survey, assess, and plan every project comprehensively, from structure and budget to site constraints.",
    tag: "STRATEGY",
    ghost: "CAREFULLY\nPLANNED",
    Icon: RefreshCw,
    overview: { x: "-17vw", y: "14vh" },
  },
  {
    key: "execution",
    num: "03",
    label_th: "ดำเนินงานอย่างชาญฉลาด",
    label_en: "Smart Execution",
    short: "Smartly\nExecuted",
    desc_th:
      "ทีมหน้างานควบคุมคุณภาพ ส่งมอบตรงเวลา และประสานการผลิตจนถึงติดตั้งให้จบในมาตรฐานเดียวกันทุกโครงการ",
    desc_en:
      "Our site team controls quality and delivers every project on time, from fabrication to final inspection.",
    tag: "DELIVERY",
    ghost: "SMARTLY\nEXECUTED",
    Icon: Sparkles,
    overview: { x: "17vw", y: "14vh" },
  },
];

// Per-pillar scroll phases: [zoomInStart, zoomInEnd, activeEnd, zoomOutEnd]
const PHASES = [
  [0.03, 0.12, 0.27, 0.33],
  [0.36, 0.44, 0.57, 0.63],
  [0.66, 0.74, 0.88, 0.97],
] as const;

const OVERVIEW_SCALE = 0.52;
const ACTIVE_SCALE = 1.74;
const FINAL_OVERVIEW_START = 0.95;

export default function StrategySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { lang } = useI18n();

  return (
    <section
      ref={containerRef}
      className="relative border-t border-white/[0.06] bg-[#050505]"
      style={{ height: "430vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <OrbitRings progress={scrollYProgress} />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,138,0,0.12),transparent_42%),linear-gradient(180deg,transparent_72%,#050505_100%)]" />

        <div className="absolute inset-0">
          {pillars.map((pillar, index) => (
            <StrategyCircle
              key={pillar.key}
              pillar={pillar}
              index={index}
              lang={lang}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <StrategyRail progress={scrollYProgress} lang={lang} />

        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

// ── Orbit rings ────────────────────────────────────────────────────────────────

function OrbitRings({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, 24]);
  const opacity = useTransform(
    progress,
    [0, 0.02, PHASES[0][1], PHASES[0][2], PHASES[0][3],
     PHASES[1][1], PHASES[1][2], PHASES[1][3],
     PHASES[2][1], PHASES[2][2], PHASES[2][3], FINAL_OVERVIEW_START, 1],
    [1, 1, 0.12, 0.12, 1, 0.12, 0.12, 1, 0.12, 0.12, 1, 1, 1]
  );
  return (
    <motion.div style={{ rotate, opacity }} className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff8a00]/10" />
      <div className="absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
    </motion.div>
  );
}

// ── Strategy circle ────────────────────────────────────────────────────────────

function StrategyCircle({
  pillar,
  index,
  lang,
  progress,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  lang: "th" | "en";
  progress: MotionValue<number>;
}) {
  const [zoomInStart, zoomInEnd, activeEnd, zoomOutEnd] = PHASES[index];
  const isFirst = index === 0;
  const isLast = index === pillars.length - 1;
  const FADE = 0.02;

  // ── Opacity: visible in initial overview, own phase, final overview ──────────
  let opKeys: number[];
  let opVals: number[];

  if (isFirst) {
    // Pillar 0: initial overview seamlessly transitions into own phase
    opKeys = [0, zoomOutEnd, zoomOutEnd + FADE, FINAL_OVERVIEW_START - FADE, FINAL_OVERVIEW_START, 1];
    opVals = [1, 1,          0,                 0,                            1,                    1];
  } else if (isLast) {
    // Last pillar: brief in overview, then hidden until own phase
    opKeys = [0, 0.02, 0.02 + FADE, zoomInStart - FADE, zoomInStart, 1];
    opVals = [1, 1,    0,           0,                   1,           1];
  } else {
    // Middle pillars
    opKeys = [
      0, 0.02, 0.02 + FADE,
      zoomInStart - FADE, zoomInStart,
      zoomOutEnd, zoomOutEnd + FADE,
      FINAL_OVERVIEW_START - FADE, FINAL_OVERVIEW_START, 1,
    ];
    opVals = [1, 1, 0, 0, 1, 1, 0, 0, 1, 1];
  }

  const opacity  = useTransform(progress, opKeys, opVals);
  const x        = useTransform(progress, [0, zoomInStart, zoomInEnd, activeEnd, zoomOutEnd], [pillar.overview.x, pillar.overview.x, "0vw", "0vw", pillar.overview.x]);
  const y        = useTransform(progress, [0, zoomInStart, zoomInEnd, activeEnd, zoomOutEnd], [pillar.overview.y, pillar.overview.y, "0vh", "0vh", pillar.overview.y]);
  const scale    = useTransform(progress, [0, zoomInStart, zoomInEnd, activeEnd, zoomOutEnd], [OVERVIEW_SCALE, OVERVIEW_SCALE, ACTIVE_SCALE, ACTIVE_SCALE, OVERVIEW_SCALE]);
  const iconRot  = useTransform(progress, [zoomInStart, zoomInEnd + 0.1], [0, index % 2 === 0 ? 28 : -28]);

  // Text visibility
  const summaryOp = useTransform(progress, [zoomInStart, zoomInStart + 0.05], [1, 0]);
  const detailOp  = useTransform(progress, [zoomInStart + 0.04, zoomInEnd, activeEnd - 0.04, activeEnd], [0, 1, 1, 0]);

  // Ghost text
  const ghostOp = useTransform(progress, [zoomInStart, zoomInEnd, activeEnd - 0.04, activeEnd], [0, 1, 1, 0]);
  const ghostX  = useTransform(progress, [zoomInStart, activeEnd], ["-8vw", "4vw"]);

  return (
    <>
      {/* Ghost text behind the active circle */}
      <motion.p
        style={{ opacity: ghostOp, x: ghostX }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-[55%] select-none whitespace-pre-line text-center text-[10vw] font-black italic leading-none tracking-normal text-white/[0.07] lg:block"
      >
        {pillar.ghost}
      </motion.p>

      {/* Circle */}
      <motion.article
        style={{ x, y, scale, opacity, zIndex: index + 2 }}
        className="absolute left-1/2 top-1/2 aspect-square w-[min(76vw,470px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff8a00]/75 bg-[radial-gradient(circle_at_42%_30%,rgba(255,164,47,0.22),rgba(113,52,0,0.92)_48%,rgba(16,12,8,0.98)_100%)] shadow-[0_36px_90px_rgba(0,0,0,0.60)] sm:w-[min(60vw,550px)] lg:w-[min(44vw,630px)]"
      >
        {/* Conic shimmer */}
        <motion.div
          style={{ rotate: iconRot }}
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(255,138,0,0.18),transparent_34%,rgba(255,255,255,0.05),transparent_70%)] opacity-60"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-[16%] text-center">
          {/* Icon */}
          <motion.div
            style={{ rotate: iconRot }}
            className="mb-5 flex h-16 w-16 items-center justify-center text-[#ffb45a] drop-shadow-[8px_10px_0_rgba(0,0,0,0.28)]"
          >
            <pillar.Icon strokeWidth={1.6} className="h-12 w-12" />
          </motion.div>

          {/* Summary title (overview) */}
          <motion.div style={{ opacity: summaryOp }}>
            <p className="mb-1 text-[10px] font-light uppercase tracking-widest text-[#ffb45a]/70">
              {pillar.num}
            </p>
            <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">
              {pillar.short.split("\n").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h3>
          </motion.div>

          {/* Detail (active) */}
          <motion.div
            style={{ opacity: detailOp }}
            className="absolute inset-x-[12%] top-1/2 -translate-y-[24%]"
          >
            <p className="mb-3 text-[11px] font-light uppercase tracking-widest text-[#ffb45a]/80">
              {pillar.num} / {pillar.tag}
            </p>
            <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">
              {pillar.short.split("\n").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h3>
            <p className="mx-auto mt-6 max-w-sm text-xs font-light leading-7 text-white/75 sm:text-sm">
              {lang === "th" ? pillar.desc_th : pillar.desc_en}
            </p>
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}

// ── Left rail ──────────────────────────────────────────────────────────────────

function StrategyRail({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
      <p className="mb-8 text-[10px] font-light uppercase tracking-widest text-white/25">
        Our Strategy
      </p>
      <div className="space-y-5 border-l border-white/10 pl-6">
        {pillars.map((pillar, index) => {
          const [s, , e] = PHASES[index];
          return (
            <RailItem
              key={pillar.key}
              pillar={pillar}
              lang={lang}
              progress={progress}
              start={s}
              end={e}
            />
          );
        })}
      </div>
    </div>
  );
}

function RailItem({
  pillar,
  lang,
  progress,
  start,
  end,
}: {
  pillar: (typeof pillars)[number];
  lang: "th" | "en";
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity  = useTransform(progress, [start - 0.04, start, end, end + 0.04], [0.25, 1, 1, 0.25]);
  const barScale = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="relative min-w-[200px]">
      <motion.span
        style={{ scaleY: barScale }}
        className="absolute -left-[25px] top-0 h-full w-px origin-top bg-[#ff8a00]"
      />
      <div className="flex gap-4">
        <span className="mt-1 text-xs font-light tabular-nums text-[#ff8a00]">{pillar.num}</span>
        <div>
          <p className="text-lg font-light leading-tight tracking-normal text-white">
            {lang === "th" ? pillar.label_th : pillar.label_en}
          </p>
          <p className="mt-1 text-[9px] font-light uppercase tracking-widest text-white/25">
            {pillar.tag}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Scroll hint ────────────────────────────────────────────────────────────────

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
    >
      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-[10px] font-light uppercase tracking-widest text-white/25"
      >
        ↓ Scroll
      </motion.span>
    </motion.div>
  );
}
