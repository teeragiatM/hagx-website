"use client";

import { useI18n } from "@/i18n/useI18n";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SectionHeaderRoot,
  SectionHeaderEyebrow,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "@/components/SectionHeader";

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
    <div ref={containerRef} className="relative" style={{ height: "470vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto h-full pt-[var(--header-height)]">
          <SectionHeaderRoot layout="split">
            <div>
              <SectionHeaderEyebrow>
                {lang === "th"
                  ? "กลยุทธ์เชิงบูรณาการของเรา"
                  : "Our Integrated Strategy"}
              </SectionHeaderEyebrow>
              <SectionHeaderHeading>
                {t("strategy.title")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
              </SectionHeaderHeading>
            </div>
            <SectionHeaderDescription>
              {lang === "th"
                ? "ที่ HAGX เราผสาน 3 หัวใจหลัก เพื่อผลลัพธ์ที่แม่นยำทุกโครงการ"
                : "At HAGX, three core disciplines work together to deliver precise outcomes on every project."}
            </SectionHeaderDescription>
          </SectionHeaderRoot>

          <div className="absolute inset-x-0 mx-auto aspect-square w-[min(86vw,980px)]">
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
        </div>

        <ScrollHint progress={scrollYProgress} />
      </div>
    </div>
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
