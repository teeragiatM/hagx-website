"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n/useI18n";

// ── Content ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    num: "01",
    tag: "ANALYZE",
    title_th: "วิเคราะห์",
    title_en: "Analyze",
    desc_th:
      "วิเคราะห์โจทย์สถาปนิกและข้อจำกัดหน้างานอย่างละเอียด ก่อนกำหนดระบบที่เหมาะสมที่สุดสำหรับแต่ละโครงการ",
    desc_en:
      "Deep-dive into architectural briefs and site constraints before defining the optimal system for each project.",
  },
  {
    num: "02",
    tag: "FABRICATE",
    title_th: "ผลิต",
    title_en: "Fabricate",
    desc_th:
      "ประกอบบานด้วยเครื่องจักรและทดสอบระบบ Pre-engineering ก่อนส่งถึงหน้างาน เพื่อความแม่นยำและคุณภาพสูงสุด",
    desc_en:
      "Machine-assembled with pre-engineering system testing before reaching the site for maximum precision.",
  },
  {
    num: "03",
    tag: "INSTALL",
    title_th: "ติดตั้ง",
    title_en: "Install",
    desc_th:
      "ติดตั้งด้วยมาตรฐานความปลอดภัยและทีมช่างฝีมือประณีต ตรวจสอบทุกจุดก่อนส่งมอบงาน",
    desc_en:
      "Installed to safety standards by skilled craftsmen, with every joint inspected before handover.",
  },
] as const;

const BENEFITS = [
  {
    label: "Seamless Integration",
    desc_th: "การทำงานสอดประสานตั้งแต่แบบร่างจนถึงวันส่งมอบ",
    desc_en: "Coordinated workflow from design brief to final handover.",
  },
  {
    label: "Uncompromised Quality",
    desc_th: "มาตรฐานที่ไม่ยอมลดละ ทั้งวัสดุและฝีมือช่าง",
    desc_en: "Standards that never compromise on material or craftsmanship.",
  },
  {
    label: "Client-Centric Success",
    desc_th: "ความสำเร็จของโครงการคุณ คือเครื่องพิสูจน์กลยุทธ์ของเรา",
    desc_en: "Your project's success is the proof of our strategy.",
  },
] as const;

// ── SVG geometry ───────────────────────────────────────────────────────────────

const R = 100;           // ring radius
const CY = 150;          // vertical center
const CXS = [110, 260, 410] as const;
const SPACING = CXS[1] - CXS[0];  // 150
const IY = Math.sqrt(R * R - (SPACING / 2) ** 2); // ≈ 66

// Intersection points between adjacent rings
const INT_PTS = [
  { x: (CXS[0] + CXS[1]) / 2, y: CY - IY, pair: 0 },
  { x: (CXS[0] + CXS[1]) / 2, y: CY + IY, pair: 0 },
  { x: (CXS[1] + CXS[2]) / 2, y: CY - IY, pair: 1 },
  { x: (CXS[1] + CXS[2]) / 2, y: CY + IY, pair: 1 },
];

// ── Scroll phases ──────────────────────────────────────────────────────────────

const PH = [
  { s: 0.04, fi: 0.11, fo: 0.32, e: 0.37 },
  { s: 0.37, fi: 0.44, fo: 0.61, e: 0.66 },
  { s: 0.66, fi: 0.73, fo: 0.85, e: 0.90 },
] as const;

const FINALE = 0.91;

// ── Main ───────────────────────────────────────────────────────────────────────

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
      style={{ height: "480vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(255,138,0,0.07),transparent_65%)]" />

        {/* Desktop layout: left text | center rings */}
        <div className="relative flex h-full items-center justify-center gap-0">
          <TextColumn progress={scrollYProgress} lang={lang} />

          <div className="w-full max-w-[560px] shrink-0 px-4">
            <RingsSVG progress={scrollYProgress} lang={lang} />
          </div>

          {/* balance spacer */}
          <div className="hidden w-[300px] shrink-0 xl:block" />
        </div>

        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

// ── Text column (left) ─────────────────────────────────────────────────────────

function TextColumn({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  const headingOp = useTransform(progress, [0, 0.02, PH[0].s, PH[0].fi], [0, 1, 1, 1]);

  return (
    <div className="hidden w-[300px] shrink-0 xl:block">
      <motion.p
        style={{ opacity: headingOp }}
        className="mb-2 text-[10px] font-light uppercase tracking-widest text-white/30"
      >
        Our Integrated Strategy
      </motion.p>
      <motion.p
        style={{ opacity: headingOp }}
        className="mb-10 text-sm font-light leading-7 text-white/50"
      >
        {lang === "th"
          ? "ที่ HAGX เราผสาน 3 หัวใจหลัก เพื่อผลลัพธ์ที่แม่นยำทุกโครงการ"
          : "At HAGX we integrate 3 core principles for flawless results every time."}
      </motion.p>

      {PILLARS.map((p, i) => (
        <PillarItem key={p.num} pillar={p} index={i} progress={progress} lang={lang} />
      ))}

      <FinaleList progress={progress} lang={lang} />
    </div>
  );
}

function PillarItem({
  pillar,
  index,
  progress,
  lang,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  const { s, fi, fo, e } = PH[index];
  const op = useTransform(progress, [Math.max(0, s - 0.02), fi, fo, e], [0, 1, 1, 0]);
  const x  = useTransform(progress, [Math.max(0, s - 0.02), fi], ["24px", "0px"]);

  return (
    <motion.div style={{ opacity: op, x }} className="absolute">
      <p className="mb-1 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
        {pillar.num} / {pillar.tag}
      </p>
      <h3 className="text-3xl font-bold leading-tight text-white">
        {lang === "th" ? pillar.title_th : pillar.title_en}
      </h3>
      <p className="mt-4 max-w-xs text-sm font-light leading-7 text-white/55">
        {lang === "th" ? pillar.desc_th : pillar.desc_en}
      </p>
    </motion.div>
  );
}

function FinaleList({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  const op = useTransform(progress, [FINALE, FINALE + 0.06, 1], [0, 1, 1]);
  const y  = useTransform(progress, [FINALE, FINALE + 0.08], ["20px", "0px"]);

  return (
    <motion.div style={{ opacity: op, y }} className="absolute space-y-4">
      <p className="mb-6 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
        Seamless · Quality · Success
      </p>
      {BENEFITS.map((b) => (
        <div key={b.label}>
          <p className="text-sm font-semibold text-white">{b.label}</p>
          <p className="text-xs font-light leading-6 text-white/45">
            {lang === "th" ? b.desc_th : b.desc_en}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

// ── SVG rings ──────────────────────────────────────────────────────────────────

function RingsSVG({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  return (
    <svg viewBox="0 0 520 300" className="h-auto w-full" aria-hidden>
      <defs>
        <filter id="rg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dg" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dim base rings */}
      {CXS.map((cx, i) => (
        <circle key={i} cx={cx} cy={CY} r={R}
          fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
      ))}

      {/* Active ring overlays (one component each to allow hook calls) */}
      <ActiveRing progress={progress} cx={CXS[0]} index={0} />
      <ActiveRing progress={progress} cx={CXS[1]} index={1} />
      <ActiveRing progress={progress} cx={CXS[2]} index={2} />

      {/* Dim base intersection dots */}
      {INT_PTS.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="rgba(255,255,255,0.08)" />
      ))}

      {/* Active intersection glow dots */}
      <IntersectionDots progress={progress} />

      {/* Ring labels (inside each ring) */}
      {PILLARS.map((p, i) => (
        <RingLabel key={p.num} progress={progress} cx={CXS[i]} pillar={p} index={i} lang={lang} />
      ))}

      {/* Finale: HAGX logo at center ring */}
      <FinaleLogo progress={progress} />
    </svg>
  );
}

// ── Active ring (separate component for hook isolation) ────────────────────────

function ActiveRing({
  progress,
  cx,
  index,
}: {
  progress: MotionValue<number>;
  cx: number;
  index: number;
}) {
  const { s, fi, fo, e } = PH[index];
  const activeOp  = useTransform(progress, [Math.max(0, s - 0.01), fi, fo, e], [0, 1, 1, 0]);
  const finaleOp  = useTransform(progress, [FINALE, FINALE + 0.07, 1], [0, 1, 1]);

  return (
    <>
      <motion.circle cx={cx} cy={CY} r={R}
        fill="none" stroke="#ff8a00" strokeWidth="2.5"
        style={{ opacity: activeOp }} filter="url(#rg)" />
      <motion.circle cx={cx} cy={CY} r={R}
        fill="none" stroke="#ff8a00" strokeWidth="2"
        style={{ opacity: finaleOp }} filter="url(#rg)" />
    </>
  );
}

// ── Intersection glow dots ─────────────────────────────────────────────────────

function IntersectionDots({ progress }: { progress: MotionValue<number> }) {
  // Left pair (between ring 0 & 1): lit during ring0, ring1, and finale
  const leftOp = useTransform(
    progress,
    [PH[0].s, PH[0].fi, PH[1].fo, PH[1].e, FINALE, FINALE + 0.07, 1],
    [0, 1, 1, 0, 0, 1, 1]
  );
  // Right pair (between ring 1 & 2): lit during ring1, ring2, and finale
  const rightOp = useTransform(
    progress,
    [PH[1].s, PH[1].fi, PH[2].fo, PH[2].e, FINALE, FINALE + 0.07, 1],
    [0, 1, 1, 0, 0, 1, 1]
  );

  return (
    <>
      {INT_PTS.map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x} cy={pt.y} r={6}
          fill="#ff8a00"
          filter="url(#dg)"
          style={{ opacity: pt.pair === 0 ? leftOp : rightOp }}
        />
      ))}
    </>
  );
}

// ── Ring label (pillar title inside ring) ──────────────────────────────────────

function RingLabel({
  progress,
  cx,
  pillar,
  index,
  lang,
}: {
  progress: MotionValue<number>;
  cx: number;
  pillar: (typeof PILLARS)[number];
  index: number;
  lang: "th" | "en";
}) {
  const { s, fi, fo, e } = PH[index];

  // Summary label: visible when NOT active
  const summaryOp = useTransform(
    progress,
    [0, Math.max(0, s - 0.01), s + 0.05, fo, e],
    [1, 1, 0, 0, 1]
  );
  // Finale: hide label when finale fires
  const finaleHide = useTransform(progress, [FINALE - 0.02, FINALE + 0.04], [1, 0]);

  return (
    <>
      {/* Ring number (always dim) */}
      <motion.text
        x={cx} y={CY - R + 22}
        textAnchor="middle"
        fill="rgba(255,138,0,0.5)"
        fontSize="11"
        fontWeight="300"
        fontFamily="var(--font-anuphan),sans-serif"
        style={{ opacity: summaryOp }}
      >
        {pillar.num}
      </motion.text>

      {/* Ring title */}
      <motion.text
        x={cx} y={CY + 6}
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        fontSize="13"
        fontWeight="600"
        fontFamily="var(--font-anuphan),sans-serif"
        letterSpacing="0.04em"
        style={{ opacity: summaryOp }}
      >
        {lang === "th" ? pillar.title_th : pillar.title_en}
      </motion.text>

      {/* Tag below */}
      <motion.text
        x={cx} y={CY + 22}
        textAnchor="middle"
        fill="rgba(255,255,255,0.22)"
        fontSize="8"
        fontWeight="300"
        fontFamily="var(--font-anuphan),sans-serif"
        letterSpacing="0.12em"
        style={{ opacity: summaryOp }}
      >
        {pillar.tag}
      </motion.text>
    </>
  );
}

// ── Finale logo ────────────────────────────────────────────────────────────────

function FinaleLogo({ progress }: { progress: MotionValue<number> }) {
  const op    = useTransform(progress, [FINALE, FINALE + 0.07, 1], [0, 1, 1]);
  const scale = useTransform(progress, [FINALE, FINALE + 0.1], [0.6, 1]);

  return (
    <motion.g
      style={{ opacity: op, scale }}
      transform={`translate(${CXS[1]}, ${CY})`}
    >
      <image
        href="/images/hagx-logo.svg"
        x={-38} y={-10}
        width="76" height="19"
      />
    </motion.g>
  );
}

// ── Scroll hint ────────────────────────────────────────────────────────────────

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const op = useTransform(progress, [0, 0.04], [1, 0]);
  return (
    <motion.div
      style={{ opacity: op }}
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
