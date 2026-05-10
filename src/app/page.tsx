"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import StrategySection from "@/components/StrategySection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// ── Preloader ────────────────────────────────────────────────────────────────
function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(onDone, 400); }
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

function Reveal({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
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

// ── Data ─────────────────────────────────────────────────────────────────────

const aboutTabs = [
  {
    id: "who-we-are",
    label: "Who We Are",
    eyebrow: "about us",
    title: "Transform a Space for Work into a Space for Life",
    description:
      "HAGX คือทีมออกแบบ ผลิต และติดตั้งระบบกระจก-อลูมิเนียมสำหรับอาคารที่ต้องการความแม่นยำ สะอาด และมีมาตรฐานระดับสถาปัตยกรรม",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
    stats: [
      ["10+", "Years of technical experience"],
      ["120+", "Projects completed"],
      ["01", "Integrated specialist team"],
    ],
  },
  {
    id: "our-values",
    label: "Our Values",
    eyebrow: "our values",
    title: "Precision, restraint, and responsibility in every detail",
    description:
      "เราให้ความสำคัญกับเส้นสายที่นิ่ง งานติดตั้งที่ตรวจสอบได้ และวัสดุที่เหมาะกับการใช้งานจริง เพื่อให้ผลลัพธ์เรียบร้อยตั้งแต่วันแรกจนถึงระยะยาว",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
    values: [
      ["01", "Precision", "ควบคุมระยะ แนว และรอยต่ออย่างเป็นระบบ"],
      ["02", "Reliability", "สื่อสารชัดเจนและรับผิดชอบทุกขั้นตอน"],
      ["03", "Performance", "เลือกวัสดุให้เหมาะกับอาคาร แสง และการใช้งาน"],
    ],
  },
  {
    id: "our-team",
    label: "Our Team",
    eyebrow: "our team",
    title: "One team from survey to installation",
    description:
      "ทีมหน้างาน ช่างผลิต และผู้ควบคุมงานทำงานร่วมกันตั้งแต่การอ่านแบบ สำรวจพื้นที่ ผลิตชิ้นงาน ไปจนถึงเก็บรายละเอียดก่อนส่งมอบ",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
    roles: ["Survey Team", "Fabrication", "Site Supervisor", "Installation Crew"],
  },
  {
    id: "founders",
    label: "Founders",
    eyebrow: "founders",
    title: "Built by people who understand material, site, and architecture",
    description:
      "HAGX ถูกสร้างจากประสบการณ์หน้างานจริง เพื่อเชื่อมช่องว่างระหว่างงานออกแบบ วัสดุ และการติดตั้งให้จบในมาตรฐานเดียว",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=90",
    founders: ["Technical Direction", "Project Management", "Architectural Coordination"],
  },
];

const portfolio = [
  { title: "Curtain Wall System", sub: "อาคารสำนักงาน 12 ชั้น กรุงเทพ", desc: "ระบบ Curtain Wall แบบ Unitized สำหรับอาคารสำนักงานพรีเมียม ใช้กระจก Low-E Double Glazing พร้อมโปรไฟล์ Thermal Break ควบคุมทุกขั้นตอนโดยทีม HAGX", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90", span: "lg:row-span-2 min-h-[540px]" },
  { title: "Glass Facade", sub: "วิลล่าพักอาศัย Hua Hin", desc: "Facade กระจกเต็มบาน พร้อมระบบบานเปิดและบานเลื่อนรอบบ้าน เน้นวิวทะเลและแสงธรรมชาติ ออกแบบให้สอดคล้องกับโครงสร้างคอนกรีตเดิม", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90", span: "min-h-[360px]" },
  { title: "Interior Partition", sub: "สำนักงานพรีเมียม สีลม", desc: "ระบบ Glass Partition แบบ Frameless พร้อมบานเลื่อนและฝ้าเพดานเชื่อมต่อ เพื่อการแบ่งพื้นที่ทำงานที่ยืดหยุ่นและสวยงาม", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=90", span: "min-h-[360px]" },
];

const testimonials = [
  { client: "Property Developer, Bangkok", project: "CURTAIN WALL · GLASS FACADE · PROJECT MANAGEMENT", quote: "ทีม HAGX ดูแลโครงการตั้งแต่ขั้นตอนออกแบบจนส่งมอบ การสื่อสารชัดเจนและงานเสร็จตรงเวลา ระบบ Curtain Wall ทำงานได้อย่างสมบูรณ์แบบ ไม่มีปัญหาหลังส่งมอบ", logo: "PA" },
  { client: "Interior Design Studio, Silom", project: "GLASS PARTITION · SLIDING SYSTEM", quote: "วัสดุคุณภาพดีมาก ทีมช่างมีความชำนาญและทำงานได้สะอาดเรียบร้อย ลูกค้าของเราประทับใจมากกับผลงานที่ได้รับ จะกลับมาใช้บริการอีกแน่นอน", logo: "DS" },
  { client: "Real Estate Group, Hua Hin", project: "GLASS FACADE · ALUMINIUM SYSTEM", quote: "ผลงานออกมาดีเกินคาด ทีมเข้าใจ vision ของเราและแปลงมันเป็นงานจริงได้อย่างแม่นยำ ระบบกระจกทั้งหมดทำให้บ้านดูโมเดิร์นมากขึ้น", logo: "RG" },
];


const brands = ["YKK AP", "Dow Corning", "Guardian Glass", "AGC Glass", "Schuco", "Reynaers", "Pilkington", "Technal"];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeAbout, setActiveAbout] = useState(0);
  const { t } = useI18n();
  const [activeProject, setActiveProject] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const currentAbout = aboutTabs[activeAbout];

  return (
    <>
      <AnimatePresence>{!loaded && <Preloader onDone={() => setLoaded(true)} />}</AnimatePresence>
      <SiteNav />

      <main className="bg-[#080808] text-white">

        {/* ── HERO ── */}
        <section className="relative min-h-screen overflow-hidden" aria-label="HAGX hero">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2200&q=90"
            alt="วิลล่าสมัยใหม่ระบบกระจก Full-height — HAGX Premium Glass Bangkok"
            fill priority sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#080808] to-transparent" />

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
                {t("hero.title").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br className="hidden sm:block" />}</span>
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
        <section id="about" className="relative border-y border-white/[0.06] bg-[#080808]">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[49%_51%]">
            <div className="border-white/[0.06] px-6 py-20 sm:px-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:border-r lg:px-10">
              <div className="mb-10">
                <p className="mb-8 text-sm font-light uppercase tracking-normal text-[#ff8a00] sm:text-base">
                  About Us
                </p>
                <h2 className="max-w-3xl text-5xl font-light leading-[1.16] tracking-tight text-white sm:text-6xl lg:text-[4.7vw]">
                  Transform A Space for Work, Into A Space for Life
                </h2>
                <p className="mt-8 max-w-2xl text-sm font-light leading-8 text-white/55 sm:text-base">
                  HAGX คือทีมออกแบบ ผลิต และติดตั้งระบบกระจก-อลูมิเนียมสำหรับอาคารที่ต้องการความแม่นยำ สะอาด และมีมาตรฐานระดับสถาปัตยกรรม
                </p>
              </div>

              <nav aria-label="About sections" className="mb-12 flex flex-wrap gap-x-10 gap-y-5">
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
                      index === activeAbout ? "text-[#ff8a00]" : "text-white/38 hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`h-0 w-0 border-y-[7px] border-l-[9px] border-y-transparent drop-shadow-[0_0_10px_rgba(255,138,0,0.8)] transition-colors ${
                        index === activeAbout ? "border-l-[#ff8a00]" : "border-l-[#ff8a00]/70"
                      }`}
                      aria-hidden="true"
                    />
                    {tab.label}
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
                  alt={`${currentAbout.label} — HAGX`}
                  fill
                  sizes="(min-width: 1024px) 49vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/10 to-transparent" />
              </motion.div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-px bg-[#ff8a00]/80 lg:block" />
              <motion.div
                className="pointer-events-none sticky top-1/2 z-30 ml-[-13px] hidden h-6 w-6 rounded-full bg-[#ff8a00] shadow-[0_0_0_16px_rgba(255,138,0,0.16),0_0_32px_rgba(255,138,0,0.55)] lg:block"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

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
                        Who We Are
                      </p>
                      <div className="space-y-8">
                        {tab.stats.map(([number, label]) => (
                          <div key={label} className="grid items-center gap-5 sm:grid-cols-[1fr_220px]">
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
                        Our Values
                      </p>
                      <div className="overflow-hidden rounded-2xl border border-[#ff8a00]/45 bg-white/[0.04] shadow-2xl shadow-black/40">
                        {tab.values.map(([number, title, text]) => (
                          <div
                            key={title}
                            className="grid min-h-36 grid-cols-[1fr_auto] gap-8 border-b border-black/30 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-7 last:border-b-0 sm:p-9"
                          >
                            <div>
                              <h3 className="text-2xl font-light text-[#ff8a00]">{title}</h3>
                              <p className="mt-5 max-w-sm text-base font-light leading-7 text-white/62">{text}</p>
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
                        Our Team
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
                          <div key={founder} className="relative h-[420px] bg-white/[0.04]">
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
                        Meet Our Founders
                      </p>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {false && false && (
        <Reveal className="border-y border-white/[0.06] bg-[#080808]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-32">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="mb-10">
                <p className="mb-5 text-xs font-light uppercase tracking-widest text-white/35">
                  {currentAbout.eyebrow}
                </p>
                <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  {currentAbout.title}
                </h2>
                <p className="mt-6 max-w-lg text-sm font-light leading-8 text-white/45">
                  {currentAbout.description}
                </p>
              </div>

              <div className="relative mb-8 grid overflow-hidden border border-white/[0.08] bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-1">
                <motion.div
                  className="absolute left-0 top-0 hidden h-1/4 w-px bg-white sm:block lg:h-1/4"
                  animate={{ y: `${activeAbout * 100}%` }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                {aboutTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveAbout(index)}
                    className={`group flex items-center gap-4 border-white/[0.06] px-5 py-4 text-left text-xs font-light uppercase tracking-normal transition-colors ${
                      index === activeAbout ? "text-white" : "text-white/35 hover:text-white/70"
                    } ${index < aboutTabs.length - 1 ? "border-b" : ""}`}
                  >
                    <span
                      className={`h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent transition-colors ${
                        index === activeAbout ? "border-l-white" : "border-l-white/25"
                      }`}
                      aria-hidden="true"
                    />
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={currentAbout.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[360px] overflow-hidden bg-white/5 sm:h-[460px]"
              >
                <Image
                  src={currentAbout.image}
                  alt={`${currentAbout.label} — HAGX`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-transparent" />
              </motion.div>
            </div>

            <div className="space-y-5 lg:pt-24">
              <motion.article
                key={`${currentAbout.id}-intro`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="border border-white/[0.08] bg-white/[0.03] p-7 sm:p-9"
              >
                <p className="mb-8 text-xs font-light uppercase tracking-widest text-white/35">
                  {currentAbout.label}
                </p>
                <p className="text-2xl font-light leading-snug text-white/85 sm:text-3xl">
                  งานกระจกที่ดีต้องไม่ใช่แค่สวย แต่ต้องแม่นยำ แข็งแรง และทำให้อาคารใช้งานได้ดีขึ้นในทุกวัน
                </p>
              </motion.article>

              {currentAbout.stats && (
                <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
                  {currentAbout.stats?.map(([number, label]) => (
                    <div key={label} className="bg-[#080808] p-7">
                      <p className="text-5xl font-semibold tracking-tight">{number}</p>
                      <p className="mt-4 text-xs font-light uppercase leading-5 text-white/35">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {currentAbout.values && (
                <div className="space-y-3">
                  {currentAbout.values?.map(([number, title, text]) => (
                    <article key={title} className="flex gap-6 border border-white/[0.08] bg-white/[0.03] p-6">
                      <p className="text-xs font-light text-white/25">{number}</p>
                      <div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="mt-2 text-sm font-light leading-7 text-white/45">{text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {currentAbout.roles && (
                <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                  {currentAbout.roles?.map((role, index) => (
                    <div key={role} className="bg-[#080808] p-7">
                      <p className="text-xs font-light text-white/25">{String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-8 text-xl font-semibold">{role}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentAbout.founders && (
                <div className="space-y-3">
                  {currentAbout.founders?.map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-white/[0.08] py-6">
                      <p className="text-xl font-light">{item}</p>
                      <span className="h-px w-12 bg-white/20" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
        )}

        {/* ── WHAT WE DO ── */}
        <section className="bg-[#080808]">
          {/* intro */}
          <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-32">
            <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#ff8a00]">What We Do</p>
            <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Precision Glass &amp; Aluminium,<br className="hidden sm:block" /> From Survey to Handover
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-8 text-white/45">
              HAGX ให้บริการครบวงจรตั้งแต่สำรวจหน้างาน ออกแบบ ผลิต และติดตั้ง — พร้อมจำหน่ายวัสดุพรีเมียมสำหรับทีมที่ต้องการสั่งซื้อแยก
            </p>
          </div>

          {[
            {
              n: "01",
              title: "SURVEY",
              image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
              items: ["Pre-site Survey & Measurement", "Structural Compatibility Assessment", "System Recommendation Report"],
              flip: false,
            },
            {
              n: "02",
              title: "DESIGN",
              image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
              items: ["Design Consultation & Development", "Shop Drawing & Material Scheduling", "Custom Facade & Partition Planning"],
              flip: true,
            },
            {
              n: "03",
              title: "FABRICATION",
              image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=90",
              items: ["In-house Aluminium Fabrication", "Tempered & Laminated Glass Cutting", "Quality Control Before Delivery"],
              flip: false,
            },
            {
              n: "04",
              title: "INSTALLATION",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
              items: ["Curtain Wall & Facade Install", "Interior Partition & Sliding Doors", "Reinstatement & Maintenance Works"],
              flip: true,
            },
            {
              n: "05",
              title: "SUPPLY",
              image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=90",
              items: ["กระจก Tempered / Laminated / Low-E", "อลูมิเนียมโปรไฟล์ทุกระบบ", "ฮาร์ดแวร์ Stainless & Structural Silicone"],
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
              <div className={`flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 lg:py-20 ${s.flip ? "lg:items-end lg:text-right" : ""}`}>
                <p className="mb-4 text-sm font-light text-[#ff8a00]">{s.n}</p>
                <h3 className="mb-8 text-6xl font-bold leading-none tracking-tighter text-white sm:text-7xl lg:text-[8vw]">
                  {s.title}
                </h3>
                <ul className={`space-y-4 ${s.flip ? "lg:items-end" : ""}`}>
                  {s.items.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm font-light text-white/55 ${s.flip ? "lg:flex-row-reverse" : ""}`}>
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
        <section id="portfolio" className="border-t border-white/[0.06] bg-[#080808] py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="mb-16">
              <p className="mb-3 text-xs font-light uppercase tracking-widest text-[#ff8a00]">hagx</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Projects That Define<br />Our Craft
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[220px_1fr_110px] lg:items-end">
              <div>
                <p className="mb-2 text-xs font-light uppercase tracking-widest text-[#ff8a00]">{portfolio[activeProject].title}</p>
                <h3 className="mb-4 text-xl font-light text-white/85">{portfolio[activeProject].sub}</h3>
                <p className="mb-6 text-sm font-light leading-7 text-white/45">{portfolio[activeProject].desc}</p>
                <Link href="#contact" className="text-xs font-light uppercase tracking-normal text-white/40 underline underline-offset-4 hover:text-white">
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
                      i === activeProject ? "border-[#ff8a00] opacity-100" : "border-white/10 opacity-45 hover:opacity-70"
                    }`}
                  >
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="110px" />
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
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                  Trusted<br />Partnership
                </h2>
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
                  <p className="mt-6 text-sm font-light text-white/40">— {testimonials[activeTestimonial].client}</p>
                </motion.div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/50 transition-colors hover:border-white hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)}
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
                  {["Property Developer A", "Architecture Studio", "Interior Design Co.", "Real Estate Group", "Construction Corp", "Design Build Ltd", "Premium Residences"].map((brand) => (
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

        {/* ── CTA ── */}
        <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0d0a08] py-32 lg:py-44">
          {/* floating project images */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[4%] top-[8%] h-36 w-52 -rotate-6 overflow-hidden border border-white/10 shadow-2xl sm:h-44 sm:w-64">
              <Image src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="260px" />
            </div>
            <div className="absolute left-[36%] top-[4%] h-32 w-48 rotate-2 overflow-hidden border border-white/10 shadow-2xl sm:h-40 sm:w-56">
              <Image src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="220px" />
            </div>
            <div className="absolute right-[4%] top-[6%] h-36 w-52 rotate-4 overflow-hidden border border-white/10 shadow-2xl sm:h-44 sm:w-64">
              <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="260px" />
            </div>
            <div className="absolute bottom-[8%] left-[3%] h-40 w-56 rotate-3 overflow-hidden border border-white/10 shadow-2xl sm:h-48 sm:w-64">
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="260px" />
            </div>
            <div className="absolute bottom-[6%] left-[38%] h-36 w-52 -rotate-2 overflow-hidden border border-white/10 shadow-2xl sm:h-44 sm:w-60">
              <Image src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="240px" />
            </div>
            <div className="absolute bottom-[10%] right-[3%] h-40 w-56 -rotate-4 overflow-hidden border border-white/10 shadow-2xl sm:h-48 sm:w-64">
              <Image src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80" alt="" fill className="object-cover opacity-55" sizes="260px" />
            </div>
          </div>

          {/* dark vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.92) 100%)" }}
          />

          {/* center content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#ff8a00]">{t("cta.eyebrow")}</p>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-8 text-white/45">
              {t("cta.desc")}
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-14 items-center bg-[#ff8a00] px-10 text-sm font-light uppercase tracking-normal text-white transition-colors hover:bg-[#e07a00]"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>

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
