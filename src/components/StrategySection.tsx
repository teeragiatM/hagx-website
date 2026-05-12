"use client";

import { useI18n } from "@/i18n/useI18n";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PILLARS = [
  {
    num: "01",
    tag: "ANALYZE",
    titleTh: "วิเคราะห์",
    titleEn: "Analyze",
    descTh:
      "วิเคราะห์โจทย์สถาปนิกและข้อจำกัดหน้างานอย่างละเอียด ก่อนกำหนดระบบที่เหมาะสมที่สุดสำหรับแต่ละโครงการ",
    descEn:
      "We analyze architectural briefs and site constraints in detail before defining the most suitable system for each project.",
    color: "#4f946b",
    circle: { cx: 260, cy: 165, expandedCx: 260, expandedCy: -14 },
    icon: "◎",
  },
  {
    num: "02",
    tag: "FABRICATE",
    titleTh: "ผลิต",
    titleEn: "Fabricate",
    descTh:
      "ประกอบบานด้วยเครื่องจักรและทดสอบระบบ Pre-engineering ก่อนส่งถึงหน้างาน เพื่อความแม่นยำและคุณภาพสูงสุด",
    descEn:
      "Panels are machine-fabricated and pre-engineering tested before delivery to ensure precision and quality.",
    color: "#c6bd8a",
    circle: { cx: 191, cy: 285, expandedCx: 52, expandedCy: 346 },
    icon: "⌖",
  },
  {
    num: "03",
    tag: "INSTALL",
    titleTh: "ติดตั้ง",
    titleEn: "Install",
    descTh:
      "ติดตั้งด้วยมาตรฐานความปลอดภัยและทีมช่างฝีมือประณีต ตรวจสอบทุกจุดก่อนส่งมอบงาน",
    descEn:
      "Installed with safety discipline and refined workmanship, with every point checked before handover.",
    color: "#9fcad0",
    circle: { cx: 329, cy: 285, expandedCx: 468, expandedCy: 346 },
    icon: "△",
  },
] as const;

const BENEFITS = [
  {
    label: "Seamless Integration",
    descTh: "การทำงานสอดประสานตั้งแต่แบบร่างจนถึงวันส่งมอบ",
    descEn: "A coordinated workflow from first drawing to final handover.",
  },
  {
    label: "Uncompromised Quality",
    descTh: "มาตรฐานที่ไม่ยอมลดละ ทั้งวัสดุ งานผลิต และงานติดตั้ง",
    descEn:
      "Standards that do not compromise across materials, fabrication, and installation.",
  },
  {
    label: "Client-Centric Success",
    descTh: "ผลลัพธ์ของโครงการคือหลักฐานความสำเร็จของระบบการทำงานของเรา",
    descEn: "The project outcome is the proof of how our system works.",
  },
] as const;

const FINALE = 0.92;

export default function StrategySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { t, lang } = useI18n();

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.48, 0.66, 1],
    [0, 0, -120, -120, -240, -240],
  );
  const counterRotate = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.48, 0.66, 1],
    [0, 0, 120, 120, 240, 240],
  );
  const clusterY = useTransform(
    scrollYProgress,
    [0, 0.24, 1],
    ["0vh", "58vh", "58vh"],
  );

  const expandProgress = scrollYProgress;
  const descProgress = scrollYProgress;

  return (
    <section
      ref={containerRef}
      className="relative border-t border-white/[0.06] bg-[#050505]"
      style={{ height: "470vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_52%_48%,rgba(255,138,0,0.08),transparent_68%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:120px_120px] opacity-35" />

        <div className="relative mx-auto h-full max-w-[1500px] px-6 py-10 sm:px-10 lg:px-16">
          <div className="grid gap-10 pt-6 lg:grid-cols-[1.35fr_0.85fr] lg:pt-10">
            <div>
              <p className="mb-5 text-[10px] font-light uppercase tracking-widest text-[#DB5828]">
                {lang === "th"
                  ? "กลยุทธ์เชิงบูรณาการของเรา"
                  : "Our Integrated Strategy"}
              </p>
              <h2 className="max-w-4xl text-5xl font-light leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-[5.8rem]">
                {t("strategy.title")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
              </h2>
            </div>
            <p className="max-w-md text-sm font-light leading-8 text-white/55 lg:pt-8">
              {lang === "th"
                ? "ที่ HAGX เราผสาน 3 หัวใจหลัก เพื่อผลลัพธ์ที่แม่นยำทุกโครงการ"
                : "At HAGX, three core disciplines work together to deliver precise outcomes on every project."}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-[-18vh] mx-auto aspect-square w-[min(86vw,980px)]">
            <div className="relative h-full w-full">
              <motion.div
                className="absolute inset-0"
                style={{ rotate, y: clusterY, transformOrigin: "50% 53%" }}
              >
                <StrategyGraphic
                  progress={expandProgress}
                  descProgress={descProgress}
                  counterRotate={counterRotate}
                  lang={lang}
                />
              </motion.div>
            </div>
          </div>

          <FinaleOverlay progress={scrollYProgress} lang={lang} />
        </div>

        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

function StrategyGraphic({
  progress,
  descProgress,
  counterRotate,
  lang,
}: {
  progress: MotionValue<number>;
  descProgress: MotionValue<number>;
  counterRotate: MotionValue<number>;
  lang: "th" | "en";
}) {
  return (
    <svg
      viewBox="0 0 520 420"
      className="h-full w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <filter id="triangleGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {PILLARS.map((pillar, index) => (
        <CirclePiece
          key={pillar.num}
          pillar={pillar}
          index={index}
          progress={progress}
          descProgress={descProgress}
          counterRotate={counterRotate}
          lang={lang}
        />
      ))}
    </svg>
  );
}

function CirclePiece({
  pillar,
  index,
  progress,
  descProgress,
  counterRotate,
  lang,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  progress: MotionValue<number>;
  descProgress: MotionValue<number>;
  counterRotate: MotionValue<number>;
  lang: "th" | "en";
}) {
  const cx = useTransform(
    progress,
    [0, 0.2, 1],
    [pillar.circle.cx, pillar.circle.expandedCx, pillar.circle.expandedCx],
  );
  const cy = useTransform(
    progress,
    [0, 0.2, 1],
    [pillar.circle.cy, pillar.circle.expandedCy, pillar.circle.expandedCy],
  );
  const radius = useTransform(progress, [0, 0.2, 1], [78, 168, 168]);
  // foreignObject covers the full circle area so flexbox centers content
  const foOffset = useTransform(radius, (v) => -v);
  const foDiameter = useTransform(radius, (v) => v * 2);
  const descOpacity = useTransform(descProgress, [0.2, 0.26], [0, 1]);
  const descDisplay = useTransform(descProgress, (v) =>
    v >= 0.19 ? "block" : "none",
  );

  return (
    <motion.g
      style={{
        x: cx,
        y: cy,
        transformOrigin: "0px 0px",
      }}
      filter={index === 0 ? "url(#triangleGlow)" : undefined}
    >
      <motion.circle
        cx={0}
        cy={0}
        r={radius}
        fill={pillar.color}
        fillOpacity="0.72"
        stroke="rgba(255,138,0,0.72)"
        strokeWidth="1.5"
      />
      <motion.g
        style={{
          rotate: counterRotate,
          transformOrigin: "0px 0px",
        }}
      >
        <motion.foreignObject
          x={foOffset}
          y={foOffset}
          width={foDiameter}
          height={foDiameter}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            className="flex flex-col items-center justify-center gap-1 overflow-hidden text-center font-sans text-white"
          >
            <span className="text-2xl leading-none">{pillar.icon}</span>
            <p className="text-[10px] font-light uppercase tracking-widest text-white/55">
              {pillar.num} / {pillar.tag}
            </p>
            <p className="text-sm font-light text-white/92">
              {lang === "th" ? pillar.titleTh : pillar.titleEn}
            </p>
            <motion.p
              style={{ opacity: descOpacity, display: descDisplay }}
              className="mt-1 max-w-[70%] text-[9px] font-light leading-relaxed text-white/70"
            >
              {lang === "th" ? pillar.descTh : pillar.descEn}
            </motion.p>
          </div>
        </motion.foreignObject>
      </motion.g>
    </motion.g>
  );
}

function FinaleOverlay({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  const opacity = useTransform(progress, [FINALE, 0.98], [0, 1]);
  const y = useTransform(progress, [FINALE, 0.98], ["28px", "0px"]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute bottom-10 left-6 right-6 z-20 mx-auto max-w-5xl sm:left-10 sm:right-10 lg:left-16 lg:right-16"
    >
      <p className="mb-4 text-[10px] font-light uppercase tracking-widest text-[#DB5828]">
        Seamless · Quality · Success
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.label}
            className="border border-white/[0.08] bg-[#080808]/55 p-5 backdrop-blur-md"
          >
            <p className="text-sm font-semibold text-white">{benefit.label}</p>
            <p className="mt-2 text-xs font-light leading-6 text-white/45">
              {lang === "th" ? benefit.descTh : benefit.descEn}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);

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
        Scroll
      </motion.span>
    </motion.div>
  );
}
