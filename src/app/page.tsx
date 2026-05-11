"use client";

import CtaSection from "@/components/CtaSection";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import StrategySection from "@/components/StrategySection";
import { hagxStats, hagxValues } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Preloader ────────────────────────────────────────────────────────────────
function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(onDone, 400);
      }
      setProgress(Math.min(p, 100));
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full">
        <p className="mb-4 text-xs font-light uppercase tracking-widest text-white/30">
          Loading — {Math.round(progress)}%
        </p>
        <div className="preloader-bar-wrap">
          <div className="preloader-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

const premiumTextGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const premiumTextItem: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: premiumEase },
  },
};

function Reveal({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

type ProcessStep = {
  n: string;
  title: string;
  titleTh: string;
  image: string;
  itemsTh: string[];
  itemsEn: string[];
};

function ProcessStepCard({
  step,
  index,
  lang,
}: {
  step: ProcessStep;
  index: number;
  lang: "th" | "en";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isReverse = index % 2 === 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const imageY = useTransform(smoothProgress, [0, 1], [-72, 72]);
  const imageInnerY = useTransform(smoothProgress, [0, 1], [46, -46]);
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.18, 1.08, 1.18],
  );
  const textY = useTransform(smoothProgress, [0, 1], [52, -52]);
  const numberY = useTransform(smoothProgress, [0, 1], [88, -88]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`grid min-h-[700px] items-center gap-10 border-t border-white/[0.07] px-6 py-20 first:border-t-0 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-24 xl:px-16 ${
        isReverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <motion.div
        style={{ y: textY }}
        className={isReverse ? "lg:col-start-2 lg:text-right" : ""}
      >
        <motion.p
          style={{ y: numberY }}
          className="mb-8 text-3xl font-light leading-none text-[#ff8a00] sm:text-4xl"
        >
          {step.n}
        </motion.p>
        <h3 className="text-[clamp(3.75rem,11vw,8rem)] font-light leading-[0.9] tracking-normal text-white">
          {lang === "th" ? step.titleTh : step.title}
        </h3>
        <ul className={`mt-10 space-y-5 ${isReverse ? "lg:ml-auto" : ""}`}>
          {(lang === "th" ? step.itemsTh : step.itemsEn).map((item) => (
            <li
              key={item}
              className={`flex max-w-xl items-center gap-5 text-sm font-light leading-7 text-white/65 sm:text-base ${
                isReverse ? "lg:ml-auto lg:flex-row-reverse" : ""
              }`}
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#ff8a00]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        style={{ y: imageY }}
        className={`relative mx-auto aspect-[1.02/1] w-full max-w-[560px] overflow-hidden bg-white ${
          isReverse ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        <motion.div
          className="absolute inset-[-14%]"
          style={{ y: imageInnerY, scale: imageScale }}
        >
          <Image
            src={step.image}
            alt={`HAGX ${step.title}`}
            fill
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-y-0 right-0 w-[46%] bg-[#f4f0e8]/90 mix-blend-screen" />
        <div className="absolute inset-y-0 right-0 w-[46%] bg-[radial-gradient(circle_at_30%_30%,transparent_0_18%,rgba(0,0,0,0.22)_19%,transparent_20%),repeating-linear-gradient(125deg,rgba(0,0,0,0.28)_0_1px,transparent_1px_8px)] opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/15" />
        <motion.div
          style={{ y: numberY }}
          className="absolute right-8 top-8 text-xl font-bold tracking-tight text-[#ff8a00]"
        >
          hagx
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

// aboutTabs is now built inside the component using t() + lang (see below)

const portfolio = [
  {
    title: "Curtain Wall System",
    sub: "อาคารสำนักงาน 12 ชั้น กรุงเทพ",
    desc: "ระบบ Curtain Wall แบบ Unitized สำหรับอาคารสำนักงานพรีเมียม ใช้กระจก Low-E Double Glazing พร้อมโปรไฟล์ Thermal Break ควบคุมทุกขั้นตอนโดยทีม HAGX",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
    span: "lg:row-span-2 min-h-[540px]",
  },
  {
    title: "Glass Facade",
    sub: "วิลล่าพักอาศัย Hua Hin",
    desc: "Facade กระจกเต็มบาน พร้อมระบบบานเปิดและบานเลื่อนรอบบ้าน เน้นวิวทะเลและแสงธรรมชาติ ออกแบบให้สอดคล้องกับโครงสร้างคอนกรีตเดิม",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
    span: "min-h-[360px]",
  },
  {
    title: "Interior Partition",
    sub: "สำนักงานพรีเมียม สีลม",
    desc: "ระบบ Glass Partition แบบ Frameless พร้อมบานเลื่อนและฝ้าเพดานเชื่อมต่อ เพื่อการแบ่งพื้นที่ทำงานที่ยืดหยุ่นและสวยงาม",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=90",
    span: "min-h-[360px]",
  },
];

const testimonials = [
  {
    client: "Property Developer, Bangkok",
    project: "CURTAIN WALL · GLASS FACADE · PROJECT MANAGEMENT",
    quote:
      "ทีม HAGX ดูแลโครงการตั้งแต่ขั้นตอนออกแบบจนส่งมอบ การสื่อสารชัดเจนและงานเสร็จตรงเวลา ระบบ Curtain Wall ทำงานได้อย่างสมบูรณ์แบบ ไม่มีปัญหาหลังส่งมอบ",
    logo: "PA",
  },
  {
    client: "Interior Design Studio, Silom",
    project: "GLASS PARTITION · SLIDING SYSTEM",
    quote:
      "วัสดุคุณภาพดีมาก ทีมช่างมีความชำนาญและทำงานได้สะอาดเรียบร้อย ลูกค้าของเราประทับใจมากกับผลงานที่ได้รับ จะกลับมาใช้บริการอีกแน่นอน",
    logo: "DS",
  },
  {
    client: "Real Estate Group, Hua Hin",
    project: "GLASS FACADE · ALUMINIUM SYSTEM",
    quote:
      "ผลงานออกมาดีเกินคาด ทีมเข้าใจ vision ของเราและแปลงมันเป็นงานจริงได้อย่างแม่นยำ ระบบกระจกทั้งหมดทำให้บ้านดูโมเดิร์นมากขึ้น",
    logo: "RG",
  },
];

const brands = [
  "YKK AP",
  "Dow Corning",
  "Guardian Glass",
  "AGC Glass",
  "Schuco",
  "Reynaers",
  "Pilkington",
  "Technal",
];

const processSteps = [
  {
    n: "01",
    title: "SURVEY",
    titleTh: "สำรวจ",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "สำรวจหน้างานและวัดขนาด",
      "ประเมินความเข้ากันได้ของโครงสร้าง",
      "จัดทำรายงานแนะนำระบบที่เหมาะสม",
    ],
    itemsEn: [
      "Pre-site survey and measurement",
      "Structural compatibility assessment",
      "System recommendation report",
    ],
  },
  {
    n: "02",
    title: "DESIGN",
    titleTh: "ออกแบบ",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
    itemsTh: [
      "ให้คำปรึกษาและพัฒนาแบบ",
      "จัดทำแบบก่อสร้างและตารางวัสดุ",
      "วางแผนผนังกระจกและฉากกั้นแบบกำหนดเอง",
    ],
    itemsEn: [
      "Design consultation and development",
      "Shop drawing and material scheduling",
      "Custom facade and partition planning",
    ],
  },
  {
    n: "03",
    title: "FABRICATION",
    titleTh: "ผลิต",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "ผลิตอลูมิเนียมในโรงงานของเรา",
      "ตัดกระจกนิรภัยและกระจกหลายชั้น",
      "ตรวจสอบคุณภาพก่อนส่งมอบ",
    ],
    itemsEn: [
      "In-house aluminium fabrication",
      "Tempered and laminated glass cutting",
      "Quality control before delivery",
    ],
  },
  {
    n: "04",
    title: "INSTALLATION",
    titleTh: "ติดตั้ง",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
    itemsTh: [
      "ติดตั้งระบบผนังกระจกและผิวอาคาร",
      "ติดตั้งฉากกั้นและประตูบานเลื่อน",
      "งานซ่อมแซมและบำรุงรักษา",
    ],
    itemsEn: [
      "Curtain wall and facade install",
      "Interior partition and sliding doors",
      "Reinstatement and maintenance works",
    ],
  },
  {
    n: "05",
    title: "SUPPLY",
    titleTh: "จัดหาวัสดุ",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
    itemsTh: [
      "กระจกนิรภัย / หลายชั้น / Low-E / กระจกกันความร้อน",
      "อลูมิเนียมโปรไฟล์ทุกระบบ",
      "ฮาร์ดแวร์สแตนเลสและซิลิโคนโครงสร้าง",
    ],
    itemsEn: [
      "Tempered, laminated, Low-E and insulated glass",
      "Aluminium profiles for every system",
      "Stainless hardware and structural silicone",
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeAbout, setActiveAbout] = useState(0);
  const { t, lang } = useI18n();
  const [activeProject, setActiveProject] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const getAboutSectionKey = (id: string) => {
    if (id === "who-we-are") return "who";
    if (id === "our-values") return "values";
    if (id === "our-team") return "team";
    return "founders";
  };

  // Build tabs dynamically so labels + roles respond to lang changes
  const aboutTabs = [
    {
      id: "who-we-are",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
      stats: hagxStats.map(
        ({ n, labelTh, labelEn }) =>
          [n, lang === "th" ? labelTh : labelEn] as const,
      ),
    },
    {
      id: "our-values",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
      values: hagxValues.map(
        ({ n, title, titleTh, subTh, subEn }) =>
          [
            n,
            lang === "th" ? titleTh : title,
            lang === "th" ? subTh : subEn,
          ] as const,
      ),
    },
    {
      id: "our-team",
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
      roles: t("about_intro.sections.team.roles", {
        returnObjects: true,
      }) as unknown as string[],
    },
    {
      id: "founders",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=90",
      founders: t("about_intro.sections.founders.roles", {
        returnObjects: true,
      }) as unknown as string[],
    },
  ];

  const currentAbout = aboutTabs[activeAbout];
  const currentAboutKey = getAboutSectionKey(currentAbout.id);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      <SiteNav />

      <main className="bg-[#080808] text-white">
        {/* ── HERO ── */}
        <section
          className="hero-bottom-shadow relative min-h-screen overflow-hidden"
          aria-label="HAGX hero"
        >
          <Image
            src="/images/20241030_135650.jpg"
            alt="วิลล่าสมัยใหม่ระบบกระจก Full-height — HAGX Premium Glass Bangkok"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-8 sm:pb-32 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="max-w-5xl"
            >
              <p className="mb-6 text-xs font-light uppercase tracking-widest text-white/40">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-[5.5rem]">
                {t("hero.title")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br className="hidden sm:block" />}
                    </span>
                  ))}
              </h1>
              <p className="mt-7 max-w-xl text-base font-light leading-8 text-white/55 sm:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center bg-white px-8 text-xs font-light uppercase tracking-normal text-[#080808] transition-colors hover:bg-white/85"
                >
                  {t("hero.cta_primary")}
                </Link>
                <Link
                  href="#about"
                  className="inline-flex h-12 items-center border border-white/20 px-8 text-xs font-light uppercase tracking-normal text-white/60 transition-colors hover:border-white/50 hover:text-white"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT US ── */}
        <section
          id="about"
          className="relative border-y border-white/[0.06] bg-[#080808]"
        >
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[49%_51%]">
            <div className="border-white/[0.06] px-6 py-20 sm:px-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:border-r lg:px-10">
              <SectionHeader
                eyebrow={t("about_intro.eyebrow")}
                heading={t("about_intro.title")}
                description={t("about_intro.description")}
                layout="stack"
                className="mb-10 text-left [&_h2]:mx-0 [&_h2]:max-w-3xl [&_h2]:text-left [&_h2]:leading-[1.16] [&_h2]:tracking-tight lg:[&_h2]:text-[4.7vw] [&_p]:text-left sm:[&_p]:text-base"
              />

              <nav
                aria-label="About sections"
                className="mb-12 flex flex-wrap gap-x-10 gap-y-5"
              >
                {aboutTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveAbout(index);
                      document.getElementById(tab.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className={`group inline-flex items-center gap-4 text-base font-light transition-colors sm:text-lg ${
                      index === activeAbout
                        ? "text-[#ff8a00]"
                        : "text-white/38 hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`h-0 w-0 border-y-[7px] border-l-[9px] border-y-transparent drop-shadow-[0_0_10px_rgba(255,138,0,0.8)] transition-colors ${
                        index === activeAbout
                          ? "border-l-[#ff8a00]"
                          : "border-l-[#ff8a00]/70"
                      }`}
                      aria-hidden="true"
                    />
                    {t(`about_intro.tabs.${getAboutSectionKey(tab.id)}`)}
                  </button>
                ))}
              </nav>

              <motion.div
                key={currentAbout.image}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[260px] overflow-hidden border-b border-[#ff8a00]/60 bg-white/5 sm:h-[330px] lg:h-[30vh]"
              >
                <Image
                  src={currentAbout.image}
                  alt={`${t(`about_intro.tabs.${currentAboutKey}`)} — HAGX`}
                  fill
                  sizes="(min-width: 1024px) 49vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/10 to-transparent" />
              </motion.div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-px bg-[#ff8a00]/80 lg:block" />

              {aboutTabs.map((tab, index) => (
                <motion.article
                  id={tab.id}
                  key={tab.id}
                  onViewportEnter={() => setActiveAbout(index)}
                  viewport={{ amount: 0.55 }}
                  className="flex min-h-screen items-center px-6 py-20 sm:px-10 lg:px-20"
                >
                  {tab.stats && (
                    <div className="w-full">
                      <p className="mb-10 text-sm font-light uppercase tracking-normal text-[#ff8a00] sm:text-base">
                        {t("about_intro.sections.who.eyebrow")}
                      </p>
                      <div className="space-y-8">
                        {tab.stats.map(([number, label]) => (
                          <div
                            key={label}
                            className="grid items-center gap-5 sm:grid-cols-[1fr_220px]"
                          >
                            <p className="text-[24vw] font-light leading-none tracking-tighter text-[#ff8a00] sm:text-[12rem] lg:text-[10vw]">
                              {number}
                            </p>
                            <p className="max-w-[220px] text-3xl font-light leading-tight text-[#ff8a00]">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab.values && (
                    <div className="w-full">
                      <p className="mb-12 text-sm font-light uppercase tracking-normal text-[#ff8a00] sm:text-base">
                        {t("about_intro.sections.values.eyebrow")}
                      </p>
                      <div className="overflow-hidden rounded-2xl border border-[#ff8a00]/45 bg-white/[0.04] shadow-2xl shadow-black/40">
                        {tab.values.map(([number, title, text]) => (
                          <div
                            key={title}
                            className="grid min-h-36 grid-cols-[1fr_auto] gap-8 border-b border-black/30 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-7 last:border-b-0 sm:p-9"
                          >
                            <div>
                              <h3 className="text-2xl font-light text-[#ff8a00]">
                                {title}
                              </h3>
                              <p className="mt-5 max-w-sm text-base font-light leading-7 text-white/62">
                                {text}
                              </p>
                            </div>
                            <p className="text-7xl font-light leading-none text-[#ff8a00]/45 sm:text-8xl">
                              {number}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab.roles && (
                    <div className="relative w-full overflow-hidden py-10">
                      <p className="absolute left-0 top-0 text-[18vw] font-bold leading-none tracking-tighter text-[#ff8a00]/35">
                        {t("about_intro.sections.team.eyebrow")}
                      </p>
                      <div className="relative mt-32">
                        <div className="relative h-[360px] overflow-hidden sm:h-[520px]">
                          <Image
                            src={tab.image}
                            alt="HAGX team"
                            fill
                            sizes="(min-width: 1024px) 51vw, 100vw"
                            className="object-cover opacity-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-light uppercase text-white/55">
                          {tab.roles.map((role) => (
                            <span key={role}>{role}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {tab.founders && (
                    <div className="relative w-full overflow-hidden py-10">
                      <div className="grid gap-px bg-[#ff8a00]/20 sm:grid-cols-3">
                        {tab.founders.map((founder, founderIndex) => (
                          <div
                            key={founder}
                            className="relative h-[420px] bg-white/[0.04]"
                          >
                            <Image
                              src={tab.image}
                              alt={founder}
                              fill
                              sizes="(min-width: 1024px) 17vw, 33vw"
                              className={`object-cover opacity-70 ${
                                founderIndex === 0
                                  ? "object-left"
                                  : founderIndex === 1
                                    ? "object-center"
                                    : "object-right"
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#ff8a00]/15" />
                            <p className="absolute bottom-8 left-6 text-xl font-light text-white/80">
                              {founder}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-[-12px] text-[18vw] font-bold leading-[0.85] tracking-tighter text-[#ff8a00]/38">
                        {lang === "th" ? "ทีมผู้ก่อตั้ง" : "Meet Our Founders"}
                      </p>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#050505]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:140px_140px] opacity-25" />

          <motion.div
            className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-10 lg:py-28"
            variants={premiumTextGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div variants={premiumTextItem}>
              <SectionHeader
                eyebrow={t("whatwedo.eyebrow")}
                heading={t("whatwedo.title")}
                description={t("whatwedo.desc")}
                layout="stack"
                className="mb-0 [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight sm:[&_h2]:text-5xl lg:[&_h2]:text-6xl [&_p:last-child]:text-white/45"
              />
            </motion.div>
          </motion.div>

          <div className="relative mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 lg:px-10 lg:pb-28">
            <div className="overflow-hidden border border-white/[0.08] bg-black/35 shadow-[0_0_80px_rgba(255,138,0,0.06)]">
              {processSteps.map((step, index) => (
                <ProcessStepCard
                  key={step.n}
                  step={step}
                  index={index}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="hidden bg-[#080808]" aria-hidden="true">
          {/* intro */}
          <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-32">
            <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#ff8a00]">
              What We Do
            </p>
            <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Precision Glass &amp; Aluminium,
              <br className="hidden sm:block" /> From Survey to Handover
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-8 text-white/45">
              HAGX ให้บริการครบวงจรตั้งแต่สำรวจหน้างาน ออกแบบ ผลิต และติดตั้ง —
              พร้อมจำหน่ายวัสดุพรีเมียมสำหรับทีมที่ต้องการสั่งซื้อแยก
            </p>
          </div>

          {[
            {
              n: "01",
              title: "SURVEY",
              image:
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
              items: [
                "Pre-site Survey & Measurement",
                "Structural Compatibility Assessment",
                "System Recommendation Report",
              ],
              flip: false,
            },
            {
              n: "02",
              title: "DESIGN",
              image:
                "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
              items: [
                "Design Consultation & Development",
                "Shop Drawing & Material Scheduling",
                "Custom Facade & Partition Planning",
              ],
              flip: true,
            },
            {
              n: "03",
              title: "FABRICATION",
              image:
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
              items: [
                "In-house Aluminium Fabrication",
                "Tempered & Laminated Glass Cutting",
                "Quality Control Before Delivery",
              ],
              flip: false,
            },
            {
              n: "04",
              title: "INSTALLATION",
              image:
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
              items: [
                "Curtain Wall & Facade Install",
                "Interior Partition & Sliding Doors",
                "Reinstatement & Maintenance Works",
              ],
              flip: true,
            },
            {
              n: "05",
              title: "SUPPLY",
              image:
                "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
              items: [
                "กระจก Tempered / Laminated / Low-E",
                "อลูมิเนียมโปรไฟล์ทุกระบบ",
                "ฮาร์ดแวร์ Stainless & Structural Silicone",
              ],
              flip: false,
            },
          ].map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`flex min-h-[480px] flex-col border-t border-white/[0.06] lg:flex-row ${s.flip ? "lg:flex-row-reverse" : ""}`}
            >
              {/* image */}
              <div className="relative h-[300px] shrink-0 lg:h-auto lg:w-1/2">
                <Image
                  src={s.image}
                  alt={`HAGX ${s.title}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#080808]/60" />
              </div>

              {/* content */}
              <div
                className={`flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 lg:py-20 ${s.flip ? "lg:items-end lg:text-right" : ""}`}
              >
                <p className="mb-4 text-sm font-light text-[#ff8a00]">{s.n}</p>
                <h3 className="mb-8 text-6xl font-bold leading-none tracking-tighter text-white sm:text-7xl lg:text-[8vw]">
                  {s.title}
                </h3>
                <ul className={`space-y-4 ${s.flip ? "lg:items-end" : ""}`}>
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm font-light text-white/55 ${s.flip ? "lg:flex-row-reverse" : ""}`}
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff8a00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ── STRATEGY ── */}
        <StrategySection />

        {/* ── PROJECTS ── */}
        <section
          id="portfolio"
          className="border-t border-white/[0.06] bg-[#080808] py-24 lg:py-36"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionHeader
              eyebrow={t("projects.eyebrow")}
              heading={t("projects.title")}
              layout="split"
              className="mb-16 [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight sm:[&_h2]:text-5xl"
            />

            <div className="grid gap-8 lg:grid-cols-[220px_1fr_110px] lg:items-end">
              <div>
                <p className="mb-2 text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                  {portfolio[activeProject].title}
                </p>
                <h3 className="mb-4 text-xl font-light text-white/85">
                  {portfolio[activeProject].sub}
                </h3>
                <p className="mb-6 text-sm font-light leading-7 text-white/45">
                  {portfolio[activeProject].desc}
                </p>
                <Link
                  href="#contact"
                  className="text-xs font-light uppercase tracking-normal text-white/40 underline underline-offset-4 hover:text-white"
                >
                  View Project
                </Link>
              </div>

              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[300px] overflow-hidden border border-white/[0.06] lg:h-[460px]"
              >
                <Image
                  src={portfolio[activeProject].image}
                  alt={portfolio[activeProject].title}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-85"
                />
              </motion.div>

              <div className="flex flex-row gap-2 lg:flex-col">
                {portfolio.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveProject(i)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden border transition-all lg:h-24 lg:w-full ${
                      i === activeProject
                        ? "border-[#ff8a00] opacity-100"
                        : "border-white/10 opacity-45 hover:opacity-70"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="110px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED PARTNERSHIP ── */}
        <section className="border-t border-white/[0.06] bg-[#080808] py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-[320px_1fr] lg:items-start">
              <div>
                <SectionHeader
                  heading={t("partnership.title")}
                  layout="stack"
                  className="mb-0 text-left [&_h2]:mx-0 [&_h2]:text-left [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight sm:[&_h2]:text-5xl"
                />
                <Link
                  href="#portfolio"
                  className="mt-8 inline-flex h-12 items-center border border-white/20 px-6 text-xs font-light uppercase tracking-normal text-white transition-colors hover:border-white hover:bg-white hover:text-[#080808]"
                >
                  See all Works
                </Link>
              </div>

              <div>
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-white/[0.08] bg-white/[0.02] p-8 lg:p-12"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border border-[#ff8a00]/30 bg-[#ff8a00]/10 text-xs font-semibold text-[#ff8a00]">
                      {testimonials[activeTestimonial].logo}
                    </div>
                    <p className="text-xs font-light uppercase tracking-widest text-white/30">
                      {testimonials[activeTestimonial].project}
                    </p>
                  </div>
                  <blockquote className="text-lg font-light leading-8 text-white/75">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>
                  <p className="mt-6 text-sm font-light text-white/40">
                    — {testimonials[activeTestimonial].client}
                  </p>
                </motion.div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTestimonial(
                        (p) =>
                          (p - 1 + testimonials.length) % testimonials.length,
                      )
                    }
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/50 transition-colors hover:border-white hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTestimonial((p) => (p + 1) % testimonials.length)
                    }
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/50 transition-colors hover:border-white hover:text-white"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 overflow-hidden border-t border-white/[0.06] pt-10">
            <div className="marquee-track">
              {[0, 1].map((gi) => (
                <div key={gi} className="flex items-center">
                  {[
                    "Property Developer A",
                    "Architecture Studio",
                    "Interior Design Co.",
                    "Real Estate Group",
                    "Construction Corp",
                    "Design Build Ltd",
                    "Premium Residences",
                  ].map((brand) => (
                    <span
                      key={`${gi}-${brand}`}
                      className="mx-12 whitespace-nowrap text-xs font-light uppercase tracking-widest text-white/20"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection
          eyebrow={t("cta.eyebrow")}
          title={t("cta.title")}
          description={t("cta.desc")}
          primaryAction={{ href: "/contact", label: t("cta.button") }}
          secondaryAction={{ href: "/shop", label: "ดูวัสดุ" }}
          className="bg-[#0d0a08]"
        />

        {/* ── BRAND MARQUEE ── */}
        <section
          aria-label="HAGX material partners"
          className="overflow-hidden border-y border-white/[0.06] bg-[#080808] py-5"
        >
          <div className="marquee-track">
            {[0, 1].map((gi) => (
              <div key={gi} className="flex items-center">
                {brands.map((brand) => (
                  <span
                    key={`${gi}-${brand}`}
                    className="mx-12 whitespace-nowrap text-xs font-light uppercase tracking-widest text-white/20"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
      </main>
      <SiteFooter />
    </>
  );
}
