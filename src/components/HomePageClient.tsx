"use client";

import CtaSection from "@/components/CtaSection";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import StrategySection from "@/components/StrategySection";
import { AppSection } from "@/components/ui/section";
import { StickySplitSection } from "@/components/ui/sticky-split";
import { hagxStats, hagxValues } from "@/content/hagx";
import { useI18n } from "@/i18n/useI18n";
import type { LocalizedPortfolioItem } from "@/lib/localizePortfolio";
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
      <div className={isReverse ? "lg:col-start-2 lg:text-right" : ""}>
        <p className="mb-8 text-3xl font-light leading-none text-[#DB5828] sm:text-4xl">
          {step.n}
        </p>
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
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#DB5828]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

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
        <div className="absolute right-8 top-8 text-xl font-bold tracking-tight text-[#DB5828]">
          hagx
        </div>
      </motion.div>
    </motion.article>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

// aboutTabs is now built inside the component using t() + lang (see below)

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
    title: "Consultation & Survey",
    titleTh: "ปรึกษาและสำรวจ",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "ไม่ว่าคุณจะมีแบบมาแล้วหรือเริ่มจากศูนย์ เราพร้อมเป็นคู่คิดในการให้คำปรึกษา วิเคราะห์ความต้องการ และเข้าสำรวจหน้างานจริง เพื่อความแม่นยำสูงสุดในการวางแผนโครงการ",
    ],
    itemsEn: [
      "Whether you start with a finished design or just an idea, we act as your strategic partner, offering expert advice, analyzing requirements, and conducting on-site surveys for maximum planning precision.",
    ],
  },
  {
    n: "02",
    title: "Design & Engineering",
    titleTh: "พัฒนาแบบและวิศวกรรม",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
    itemsTh: [
      "เราเปลี่ยนไอเดียให้เป็นรูปธรรมด้วยการจัดทำ Shop Drawing พัฒนาแบบขยาย และวางแผนวัสดุ (BOQ) เพื่อให้มั่นใจว่าทุกดีไซน์สามารถใช้งานได้จริง แข็งแรง และสวยงามตามมาตรฐานสากล",
    ],
    itemsEn: [
      "We transform concepts into reality through detailed Shop Drawings and material planning (BOQ). We ensure every design is technically feasible, structurally sound, and aesthetically aligned with international standards.",
    ],
  },
  {
    n: "03",
    title: "Fabrication & Pre-Testing",
    titleTh: "ผลิตและทดสอบ",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    itemsTh: [
      "ชิ้นงานอลูมิเนียมและกระจกถูกผลิตในโรงงานของเราเอง ภายใต้ระบบควบคุมคุณภาพที่เข้มงวด พร้อมการทดสอบระบบ (Pre-test) เพื่อตรวจสอบความสมบูรณ์ก่อนนำไปติดตั้งหน้างาน",
    ],
    itemsEn: [
      "All aluminum and glass components are manufactured in our own facility under strict quality control. Our rigorous pre-testing process ensures system integrity before delivery to the site.",
    ],
  },
  {
    n: "04",
    title: "Professional Installation",
    titleTh: "การติดตั้งอย่างมืออาชีพ",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
    itemsTh: [
      "ทีมงานเทคนิคเฉพาะทางเข้าดำเนินการติดตั้งตามแผนงานที่วางไว้ โดยเน้นความสะอาดเรียบร้อย ความปลอดภัย และความแม่นยำระดับมิลลิเมตร ให้ตรงตามแบบที่กำหนดอย่างไม่มีที่ติ",
    ],
    itemsEn: [
      "Our specialized technical teams execute the installation with surgical precision. We focus on cleanliness, safety, and millimeter-level accuracy to ensure the final result perfectly matches the architectural intent.",
    ],
  },
  {
    n: "05",
    title: "QC & Material Supply",
    titleTh: "ตรวจสอบและส่งมอบ",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
    itemsTh: [
      "ตรวจสอบคุณภาพ (QC) ครั้งสุดท้ายก่อนส่งมอบงาน พร้อมบริการจัดหาวัสดุและอุปกรณ์ฮาร์ดแวร์คุณภาพสูง รวมถึงการดูแลหลังการขายและการรับประกัน เพื่อให้คุณมั่นใจในระยะยาว",
    ],
    itemsEn: [
      "Final Quality Control (QC) is conducted before official handover. We also provide premium hardware supply and reliable after-sales support, including warranties to ensure your long-term peace of mind.",
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
type HomePageClientProps = {
  latestItemsTh: LocalizedPortfolioItem[];
  latestItemsEn: LocalizedPortfolioItem[];
};

export default function HomePageClient({
  latestItemsTh,
  latestItemsEn,
}: HomePageClientProps) {
  const [loaded, setLoaded] = useState(false);
  const { t, lang } = useI18n();
  const [activeProject, setActiveProject] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const portfolio = (lang === "th" ? latestItemsTh : latestItemsEn).map(
    (item) => ({
      title: item.title,
      sub: item.location,
      desc: item.description,
      image: item.cover_image,
      slug: item.slug,
      scope: item.scope,
    }),
  );

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
      image: "/images/team/hagx_team.png",
      roles: t("about_intro.sections.team.roles", {
        returnObjects: true,
      }) as unknown as string[],
    },
    {
      id: "founders",
      image: "/images/team/Panya_Sukyoo.png",
      founders: [
        {
          name: "Panya Sukyoo",
          image: "/images/team/Panya_Sukyoo.png",
        },
        {
          name: "Chanyanat MooPayak",
          image: "/images/team/Chanyanat_Moopayak.png",
        },
      ],
    },
  ];

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
          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-[var(--site-inline-px)] pb-24 pt-32 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="max-w-5xl"
            >
              <p className="mb-6 text-xs font-light uppercase tracking-widest text-white/40">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-[5rem]">
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
        <StickySplitSection
          id="about"
          items={aboutTabs}
          pinnedSide="left"
          ariaLabel="About sections"
          renderNavLabel={(tab) =>
            t(`about_intro.tabs.${getAboutSectionKey(tab.id)}`)
          }
          renderPinned={() => (
            <SectionHeader
              eyebrow={t("about_intro.eyebrow")}
              heading={t("about_intro.title")}
              description={t("about_intro.description")}
              layout="stack"
              className="mb-10 text-left [&_h2]:mx-0 [&_h2]:max-w-3xl [&_h2]:text-left [&_h2]:leading-[1.16] [&_h2]:tracking-tight lg:[&_h2]:text-[clamp(3.5rem,4.7vw,5.8rem)] [&_p]:text-left sm:[&_p]:text-base"
            />
          )}
          renderPinnedFooter={({ activeItem }) => {
            const activeKey = getAboutSectionKey(activeItem.id);

            return (
              <motion.div
                key={activeItem.image}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-2 h-[180px] overflow-hidden border-b border-[#DB5828]/60 bg-white/5 sm:h-[240px] lg:h-[24vh]"
              >
                <Image
                  src={activeItem.image}
                  alt={`${t(`about_intro.tabs.${activeKey}`)} - HAGX`}
                  fill
                  sizes="(min-width: 1024px) 49vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/10 to-transparent" />
              </motion.div>
            );
          }}
          renderItem={(tab) => (
            <>
              {tab.stats && (
                <div className="w-full">
                  <p className="mb-10 text-sm font-light uppercase tracking-normal text-[#DB5828] sm:text-base">
                    {t("about_intro.sections.who.eyebrow")}
                  </p>
                  <div className="space-y-8">
                    {tab.stats.map(([number, label]) => (
                      <div
                        key={label}
                        className="grid items-center gap-5 sm:grid-cols-[1fr_220px]"
                      >
                        <p className="text-[24vw] font-light leading-none tracking-tighter text-[#DB5828] sm:text-[12rem] lg:text-[10vw]">
                          {number}
                        </p>
                        <p className="max-w-[220px] text-3xl font-light leading-tight text-[#DB5828]">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab.values && (
                <div className="w-full">
                  <p className="mb-12 text-sm font-light uppercase tracking-normal text-[#DB5828] sm:text-base">
                    {t("about_intro.sections.values.eyebrow")}
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-[#DB5828]/45 bg-white/[0.04] shadow-2xl shadow-black/40">
                    {tab.values.map(([number, title, text]) => (
                      <div
                        key={title}
                        className="grid min-h-36 grid-cols-[1fr_auto] gap-8 border-b border-black/30 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-7 last:border-b-0 sm:p-9"
                      >
                        <div>
                          <h3 className="text-2xl font-light text-[#DB5828]">
                            {title}
                          </h3>
                          <p className="mt-5 max-w-sm text-base font-light leading-7 text-white/62">
                            {text}
                          </p>
                        </div>
                        <p className="text-7xl font-light leading-none text-[#DB5828]/45 sm:text-8xl">
                          {number}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab.roles && (
                <div className="relative w-full overflow-hidden py-10">
                  <p className="absolute left-0 top-0 text-[18vw] font-bold leading-none tracking-tighter text-[#DB5828]/35">
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
                <div className="relative w-full overflow-hidden bg-[#050505] px-2 pb-16 pt-8 sm:px-6 sm:pb-20">
                  <div className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(219,88,40,0.72)_0%,rgba(142,68,0,0.38)_34%,rgba(8,8,8,0)_72%)] blur-sm" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />

                  <div className="relative mx-auto grid max-w-5xl gap-px border-x border-[#DB5828]/20 bg-[#DB5828]/25 sm:grid-cols-2">
                    {tab.founders.map((founder) => (
                      <div
                        key={founder.name}
                        className="relative h-[440px] overflow-hidden bg-[#050505]/30 sm:h-[560px]"
                      >
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="z-10 object-cover object-top opacity-100"
                        />
                        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/8 to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#050505] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#050505] to-transparent" />
                        <p className="absolute bottom-10 left-8 z-30 text-base font-light text-white/55 sm:text-lg">
                          {founder.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p
                    className="relative z-30 mx-auto mt-[-10px] max-w-4xl text-center text-[clamp(4rem,9vw,8.8rem)] font-black leading-[0.78] text-[#7c3400]"
                    style={{
                      WebkitTextStroke: "1px rgba(219, 88, 40, 0.55)",
                      textShadow:
                        "0 0 18px rgba(219,88,40,0.26), 0 12px 24px rgba(0,0,0,0.72)",
                    }}
                  >
                    {lang === "th"
                      ? "พบกับผู้ก่อตั้งของเรา"
                      : "Meet Our Founders"}
                  </p>
                </div>
              )}
            </>
          )}
        />

        {/* ── WHAT WE DO ── */}
        <AppSection.Root
          spacing="none"
          border="y"
          background="bg-[#050505]"
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:140px_140px] opacity-25" />

          <motion.div
            className="relative mx-auto max-w-7xl px-[var(--site-inline-px)] py-20 text-center lg:py-28"
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

          <AppSection.Container
            width="lg"
            className="relative px-[var(--site-inline-px)] pb-16 lg:pb-28"
          >
            <div className="overflow-hidden">
              {processSteps.map((step, index) => (
                <ProcessStepCard
                  key={step.n}
                  step={step}
                  index={index}
                  lang={lang}
                />
              ))}
            </div>
          </AppSection.Container>
        </AppSection.Root>

        <section className="hidden bg-[#080808]" aria-hidden="true">
          {/* intro */}
          <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-32">
            <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#DB5828]">
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
                <p className="mb-4 text-sm font-light text-[#DB5828]">{s.n}</p>
                <h3 className="mb-8 text-6xl font-bold leading-none tracking-tighter text-white sm:text-7xl lg:text-[8vw]">
                  {s.title}
                </h3>
                <ul className={`space-y-4 ${s.flip ? "lg:items-end" : ""}`}>
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm font-light text-white/55 ${s.flip ? "lg:flex-row-reverse" : ""}`}
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DB5828]" />
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

        {/* ── LATEST PROJECTS ── */}
        <AppSection.Root
          id="portfolio"
          border="top"
        >
          <AppSection.Container>
            <SectionHeader
              eyebrow={lang === "th" ? "ผลงานล่าสุด" : "Latest Projects"}
              heading={
                lang === "th"
                  ? "ผลงานที่สะท้อน\nความเป็นเรา"
                  : "Projects That Define\nOur Craft"
              }
              layout="split"
              className="mb-16 [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight sm:[&_h2]:text-5xl"
            />

            {portfolio.length > 0 && (
              <div className="grid gap-8 lg:grid-cols-[220px_1fr_110px] lg:items-end">
                <div>
                  <p className="mb-2 text-xs font-light uppercase tracking-widest text-[#DB5828]">
                    {portfolio[activeProject]?.scope}
                  </p>
                  <h3 className="mb-4 text-xl font-light text-white/85">
                    {portfolio[activeProject]?.title}
                  </h3>
                  <p className="mb-2 text-xs font-light text-white/35">
                    {portfolio[activeProject]?.sub}
                  </p>
                  <p className="mb-6 text-sm font-light leading-7 text-white/45">
                    {portfolio[activeProject]?.desc}
                  </p>
                  <Link
                    href={`/portfolio/${portfolio[activeProject]?.slug}`}
                    className="text-xs font-light uppercase tracking-normal text-white/40 underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {lang === "th" ? "ดูโปรเจกต์" : "View Project"}
                  </Link>
                </div>

                <Link
                  href={`/portfolio/${portfolio[activeProject]?.slug}`}
                  className="group block"
                >
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-[300px] overflow-hidden border border-white/[0.06] lg:h-[460px]"
                  >
                    <Image
                      src={portfolio[activeProject]?.image}
                      alt={portfolio[activeProject]?.title}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </Link>

                <div className="flex flex-row gap-2 lg:flex-col">
                  {portfolio.map((p, i) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setActiveProject(i)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden border transition-all lg:h-24 lg:w-full ${
                        i === activeProject
                          ? "border-[#DB5828] opacity-100"
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
            )}

            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="inline-flex h-12 items-center border border-white/20 px-8 text-xs font-light uppercase tracking-normal text-white/60 transition-colors hover:border-white hover:text-white"
              >
                {lang === "th" ? "ดูผลงานทั้งหมด" : "View All Projects"}
              </Link>
            </div>
          </AppSection.Container>
        </AppSection.Root>

        {/* ── TRUSTED PARTNERSHIP ── */}
        <AppSection.Root border="top">
          <AppSection.Container>
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
                    <div className="flex h-12 w-12 items-center justify-center border border-[#DB5828]/30 bg-[#DB5828]/10 text-xs font-semibold text-[#DB5828]">
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
          </AppSection.Container>

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
        </AppSection.Root>

        <CtaSection
          eyebrow={t("cta.eyebrow")}
          title={t("cta.title")}
          description={t("cta.desc")}
          primaryAction={{ href: "/contact", label: t("cta.button") }}
          secondaryAction={{ href: "/shop", label: "ดูวัสดุ" }}
          className="bg-[#0d0a08]"
        />

        {/* ── BRAND MARQUEE ── */}
        <AppSection.Root
          aria-label="HAGX material partners"
          spacing="xs"
          border="y"
          className="overflow-hidden"
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
        </AppSection.Root>

        {/* ── FOOTER ── */}
      </main>
      <SiteFooter />
    </>
  );
}
