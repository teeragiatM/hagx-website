"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { PenTool, RefreshCw, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useI18n } from "@/i18n/useI18n";

const pillars = [
  {
    key: "design",
    num: "01",
    label_th: "ออกแบบอย่างสมบูรณ์",
    label_en: "Design Integrity",
    short: "Perfectly Designed",
    desc_th:
      "เราออกแบบด้วยความแม่นยำ ควบคุมทุกเส้น รายละเอียด รอยต่อ และวัสดุให้มีเหตุผลรองรับตั้งแต่ Shop Drawing จนถึงวันส่งมอบ",
    desc_en:
      "We design with precision, controlling every line, joint, and material from shop drawing to final handover.",
    tag: "DESIGN",
    ghost: "PERFECTLY DESIGNED",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85",
    Icon: PenTool,
    overview: { x: "0vw", y: "-17vh" },
  },
  {
    key: "planning",
    num: "02",
    label_th: "วางแผนอย่างรอบคอบ",
    label_en: "Careful Planning",
    short: "Carefully Planned",
    desc_th:
      "เราสำรวจ ประเมิน และวางแผนทุกโครงการให้ครอบคลุมตั้งแต่โครงสร้าง งบประมาณ ลำดับงาน ไปจนถึงข้อจำกัดของหน้างานจริง",
    desc_en:
      "We survey, assess, and plan every project comprehensively, from structure and budget to site constraints.",
    tag: "STRATEGY",
    ghost: "CAREFULLY PLANNED",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1800&q=85",
    Icon: RefreshCw,
    overview: { x: "-17vw", y: "16vh" },
  },
  {
    key: "execution",
    num: "03",
    label_th: "ดำเนินงานอย่างชาญฉลาด",
    label_en: "Smart Execution",
    short: "Smartly Executed",
    desc_th:
      "ทีมหน้างานควบคุมคุณภาพ ส่งมอบตรงเวลา และประสานการผลิตจนถึงติดตั้งให้จบในมาตรฐานเดียวกันทุกโครงการ",
    desc_en:
      "Our site team controls quality and delivers every project on time, from fabrication to final inspection.",
    tag: "DELIVERY",
    ghost: "SMARTLY EXECUTED",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=85",
    Icon: Sparkles,
    overview: { x: "17vw", y: "16vh" },
  },
];

const sectionProgress = [0, 0.2, 0.38, 0.62, 0.84, 1];
const N = pillars.length;

export default function StrategySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { lang } = useI18n();

  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const circlesOpacity = useTransform(scrollYProgress, [0.14, 0.22], [0, 1]);
  const circlesRotate = useTransform(scrollYProgress, [0.18, 1], [0, 18]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative border-t border-white/[0.06] bg-[#050505]"
      style={{ height: "520vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <motion.div style={{ opacity: introOpacity, scale: introScale }} className="absolute inset-0">
          <IntroStrategy progress={scrollYProgress} lang={lang} />
        </motion.div>

        <motion.div
          style={{ opacity: circlesOpacity, rotate: circlesRotate }}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff8a00]/10" />
          <div className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        </motion.div>

        <motion.div
          style={{ opacity: circlesOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,138,0,0.14),transparent_42%),linear-gradient(180deg,transparent_72%,#050505_100%)]"
        />

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

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-6 hidden items-center gap-3 text-[9px] font-light uppercase tracking-widest text-white/25 lg:flex"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>Scroll</span>
        </motion.div>

        <div className="absolute right-6 top-8 hidden origin-right rotate-90 items-center gap-3 text-xs font-light text-white/55 lg:flex">
          <span>Skip Section</span>
          <span className="-rotate-90 text-lg">↓</span>
        </div>
      </div>
    </section>
  );
}

function IntroStrategy({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  const active = pillars[2];
  const imageOpacity = useTransform(progress, [0, 0.16, 0.2], [0.44, 0.38, 0]);
  const titleY = useTransform(progress, [0, 0.2], ["0px", "-54px"]);

  return (
    <div className="grid h-full lg:grid-cols-[360px_1fr] xl:grid-cols-[420px_1fr]">
      <div className="relative z-10 hidden flex-col justify-center border-r border-white/[0.06] bg-[#050505]/95 px-10 lg:flex xl:px-12">
        <p className="mb-10 text-[10px] font-light uppercase tracking-widest text-white/25">
          Our Strategy
        </p>
        <div>
          {pillars.map((pillar, index) => (
            <div
              key={pillar.key}
              className={`relative flex gap-5 border-b border-white/[0.06] py-7 last:border-b-0 ${
                index === 2 ? "text-white" : "text-white/35"
              }`}
            >
              {index === 2 && <span className="absolute left-0 top-0 h-full w-px bg-[#ff8a00]" />}
              <span className="mt-1 text-xs font-light tabular-nums text-[#ff8a00]">{pillar.num}</span>
              <div>
                <p className="text-2xl font-light leading-snug tracking-normal">
                  {lang === "th" ? pillar.label_th : pillar.label_en}
                </p>
                <p className="mt-2 text-[10px] font-light uppercase tracking-widest text-white/25">
                  {pillar.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
          <Image
            src={active.image}
            alt=""
            fill
            sizes="100vw"
            priority={false}
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/45 via-[#050505]/30 to-[#050505]/70" />
        <p className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 select-none text-[24vw] font-black leading-none tracking-normal text-white/[0.04]">
          03
        </p>
        <motion.div
          style={{ y: titleY }}
          className="relative flex h-full flex-col justify-center px-8 pt-16 sm:px-12 lg:px-20 xl:px-24"
        >
          <p className="mb-5 text-xs font-light uppercase tracking-widest text-[#ff8a00] lg:hidden">
            Our Strategy
          </p>
          <h2 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
            Smart<br />Execution
          </h2>
          <p className="mt-10 max-w-md text-sm font-light leading-8 text-white/55">
            {lang === "th" ? active.desc_th : active.desc_en}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

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
  const step = index + 1;
  const start = sectionProgress[step];
  const mid = sectionProgress[step + 1] ?? 1;
  const end = sectionProgress[step + 2] ?? 1;

  const nextX = index === N - 1 ? pillar.overview.x : pillars[index + 1].overview.x;
  const nextY = index === N - 1 ? pillar.overview.y : pillars[index + 1].overview.y;

  const x = useTransform(progress, [0.18, start, mid, end], [pillar.overview.x, "0vw", "0vw", nextX]);
  const y = useTransform(progress, [0.18, start, mid, end], [pillar.overview.y, "1vh", "1vh", nextY]);
  const scale = useTransform(progress, [0.18, start, mid, end], [0.82, 1.72, 1.72, 0.82]);
  const opacity = useTransform(progress, [0.12, 0.18, start, mid, end], [0, 1, 1, 1, index === N - 1 ? 1 : 0.28]);
  const rotate = useTransform(progress, [0.18, 1], [0, index % 2 === 0 ? 34 : -34]);
  const detailOpacity = useTransform(progress, [start, start + 0.04, mid - 0.04, mid], [0, 1, 1, 0]);
  const summaryOpacity = useTransform(progress, [0.18, start - 0.02, start + 0.04], [1, 1, 0]);
  const ghostOpacity = useTransform(progress, [start, start + 0.04, mid - 0.04, mid], [0, 1, 1, 0]);
  const ghostX = useTransform(progress, [start, mid], ["-10vw", "5vw"]);
  const circleZ = index + 2;

  return (
    <>
      <motion.p
        style={{ opacity: ghostOpacity, x: ghostX }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[11vw] font-black italic leading-none tracking-normal text-white/[0.07] lg:block"
      >
        {pillar.ghost}
      </motion.p>

      <motion.article
        style={{ x, y, scale, opacity, zIndex: circleZ }}
        className="absolute left-1/2 top-1/2 aspect-square w-[min(74vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff8a00]/80 bg-[radial-gradient(circle_at_42%_30%,rgba(255,164,47,0.22),rgba(113,52,0,0.92)_48%,rgba(16,12,8,0.98)_100%)] shadow-[0_36px_90px_rgba(0,0,0,0.58)] sm:w-[min(58vw,540px)] lg:w-[min(42vw,620px)]"
      >
        <motion.div
          style={{ rotate }}
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(255,138,0,0.18),transparent_34%,rgba(255,255,255,0.05),transparent_70%)] opacity-60"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-[16%] text-center">
          <motion.div
            style={{ rotate }}
            className="mb-6 flex h-16 w-16 items-center justify-center text-[#ffb45a] drop-shadow-[10px_12px_0_rgba(0,0,0,0.26)]"
          >
            <pillar.Icon strokeWidth={1.7} className="h-12 w-12" />
          </motion.div>

          <motion.div style={{ opacity: summaryOpacity }}>
            <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">
              {pillar.short.split(" ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h3>
          </motion.div>

          <motion.div
            style={{ opacity: detailOpacity }}
            className="absolute inset-x-[14%] top-1/2 -translate-y-[22%]"
          >
            <p className="mb-4 text-[11px] font-light uppercase tracking-widest text-[#ffb45a]/80">
              {pillar.num} / {pillar.tag}
            </p>
            <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">
              {pillar.short.split(" ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h3>
            <p className="mx-auto mt-7 max-w-md text-xs font-light leading-7 text-white/78 sm:text-sm">
              {lang === "th" ? pillar.desc_th : pillar.desc_en}
            </p>
          </motion.div>
        </div>
      </motion.article>

    </>
  );
}

function StrategyRail({
  progress,
  lang,
}: {
  progress: MotionValue<number>;
  lang: "th" | "en";
}) {
  return (
    <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
      <p className="mb-8 text-[10px] font-light uppercase tracking-widest text-white/25">Our Strategy</p>
      <div className="space-y-5 border-l border-white/10 pl-6">
        {pillars.map((pillar, index) => {
          const s = sectionProgress[index + 1];
          const e = sectionProgress[index + 2] ?? 1;
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
  const opacity = useTransform(progress, [start - 0.03, start, end, end + 0.03], [0.3, 1, 1, 0.3]);
  const barScale = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="relative min-w-[210px]">
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
