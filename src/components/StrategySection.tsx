"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";

const pillars = [
  {
    key: "p1",
    num: "01",
    label_th: "ออกแบบอย่างสมบูรณ์",
    label_en: "Design Integrity",
    desc_th: "เราออกแบบด้วยความแม่นยำ ควบคุมทุกรายละเอียดตั้งแต่ Shop Drawing จนถึงวันส่งมอบ ทุกเส้น ทุกรอยต่อ และทุกวัสดุมีเหตุผลรองรับ",
    desc_en: "We design with precision, controlling every detail from Shop Drawing to final handover. Every line, joint, and material is deliberate.",
    tag: "DESIGN",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
  },
  {
    key: "p2",
    num: "02",
    label_th: "วางแผนอย่างรอบคอบ",
    label_en: "Careful Planning",
    desc_th: "สำรวจ ประเมิน และวางแผนทุกโครงการให้ครอบคลุมตั้งแต่โครงสร้างจนถึงงบประมาณ ไม่มีเซอร์ไพรส์ ไม่มีทางลัด",
    desc_en: "We survey, assess, and plan every project comprehensively — from structure to budget. No surprises, no shortcuts.",
    tag: "STRATEGY",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1600&q=85",
  },
  {
    key: "p3",
    num: "03",
    label_th: "ดำเนินการอย่างชาญฉลาด",
    label_en: "Smart Execution",
    desc_th: "ทีมงานควบคุมหน้างาน ตรวจสอบคุณภาพ และส่งมอบโครงการตรงเวลาทุกครั้ง จากการผลิตจนถึงการส่งมอบ",
    desc_en: "Our site team controls quality and delivers every project on time, every time. From fabrication to final handover.",
    tag: "DELIVERY",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=85",
  },
];

const N = pillars.length;

export default function StrategySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { lang } = useI18n();

  return (
    <div
      ref={containerRef}
      className="relative border-t border-white/[0.06]"
      style={{ height: `${N * 100 + 20}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080808]">
        <div className="grid h-full lg:grid-cols-[380px_1fr]">

          {/* ── LEFT: stacked titles ── */}
          <div className="relative flex flex-col justify-center border-r border-white/[0.06] px-8 lg:px-12">
            {/* section label */}
            <p className="mb-10 text-[10px] font-light uppercase tracking-widest text-white/25">
              Our Strategy
            </p>

            <div className="space-y-0">
              {pillars.map((p, i) => (
                <PillarTab
                  key={p.key}
                  p={p}
                  i={i}
                  lang={lang}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* scroll hint */}
            <ScrollHint progress={scrollYProgress} />
          </div>

          {/* ── RIGHT: content panels stacked, clipped ── */}
          <div className="relative overflow-hidden">
            {pillars.map((p, i) => (
              <ContentPanel
                key={p.key}
                p={p}
                i={i}
                lang={lang}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Left tab ──────────────────────────────────────────────────────────────────
function PillarTab({
  p, i, lang, progress,
}: {
  p: (typeof pillars)[0];
  i: number;
  lang: "th" | "en";
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [s, e] = [i / N, (i + 1) / N];

  const isActive_opacity = useTransform(progress, [s - 0.01, s, e, e + 0.01], [0.28, 1, 1, 0.28]);
  const barScaleY = useTransform(progress, [s, e], [0, 1]);
  const numColor = useTransform(progress, [s - 0.01, s, e, e + 0.01], ["rgba(255,255,255,0.2)", "rgba(255,138,0,1)", "rgba(255,138,0,1)", "rgba(255,255,255,0.2)"]);

  return (
    <motion.div
      style={{ opacity: isActive_opacity }}
      className="group relative flex cursor-default items-start gap-5 border-b border-white/[0.06] py-7 last:border-b-0"
    >
      {/* active bar */}
      <div className="absolute left-0 top-0 w-[2px] h-full origin-top overflow-hidden">
        <motion.div
          style={{ scaleY: barScaleY }}
          className="h-full w-full origin-top bg-[#ff8a00]"
        />
      </div>

      {/* number */}
      <motion.span
        style={{ color: numColor }}
        className="mt-1 text-xs font-light tabular-nums"
      >
        {p.num}
      </motion.span>

      {/* title */}
      <div>
        <p className="text-xl font-light leading-snug tracking-tight text-white lg:text-2xl">
          {lang === "th" ? p.label_th : p.label_en}
        </p>
        <p className="mt-1 text-[10px] font-light uppercase tracking-widest text-white/25">
          {p.tag}
        </p>
      </div>
    </motion.div>
  );
}

// ── Right panel ───────────────────────────────────────────────────────────────
function ContentPanel({
  p, i, lang, progress,
}: {
  p: (typeof pillars)[0];
  i: number;
  lang: "th" | "en";
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [s, e] = [i / N, (i + 1) / N];

  const opacity = useTransform(progress, [s - 0.04, s, e - 0.06, e], [0, 1, 1, 0]);

  const titleY = useTransform(progress, [s - 0.04, s, e - 0.06, e], ["40px", "0px", "0px", "-30px"]);
  const descY = useTransform(progress, [s, s + 0.06, e - 0.06, e], ["24px", "0px", "0px", "-16px"]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0"
    >
      {/* image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/30 to-transparent" />

      {/* content */}
      <div className="relative flex h-full flex-col justify-end px-10 pb-16 pt-10 lg:px-16 lg:pb-20">

        {/* big ghost number */}
        <p
          className="pointer-events-none select-none absolute right-8 top-1/2 -translate-y-1/2 text-[20vw] font-black leading-none tracking-tighter text-white/[0.04]"
          aria-hidden
        >
          {p.num}
        </p>

        {/* title */}
        <motion.h2
          style={{ y: titleY }}
          className="mb-6 text-[8vw] font-bold leading-[0.9] tracking-tighter text-white lg:text-[5.5vw]"
        >
          {(lang === "th" ? p.label_th : p.label_en).split(" ").map((word, wi) => (
            <span key={wi} className="block">{word}</span>
          ))}
        </motion.h2>

        {/* desc */}
        <motion.p
          style={{ y: descY }}
          className="max-w-sm text-sm font-light leading-8 text-white/50 lg:max-w-md"
        >
          {lang === "th" ? p.desc_th : p.desc_en}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ── Scroll hint ───────────────────────────────────────────────────────────────
function ScrollHint({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const op = useTransform(progress, [0, 0.12], [1, 0]);
  return (
    <motion.div style={{ opacity: op }} className="absolute bottom-10 left-8 lg:left-12 flex items-center gap-3">
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="text-white/20 text-xs"
      >
        ↓
      </motion.div>
      <span className="text-[9px] font-light uppercase tracking-widest text-white/20">Scroll</span>
    </motion.div>
  );
}
