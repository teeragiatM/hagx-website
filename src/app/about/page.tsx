"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const stats = [
  { n: "10+",  label: "Years of Experience" },
  { n: "120+", label: "Projects Completed" },
  { n: "50+",  label: "Industry Clients" },
  { n: "01",   label: "Integrated Team" },
];

const categories = [
  {
    n: "01",
    title: "Curtain Wall\n& Facade",
    desc: "ระบบ Curtain Wall และ Glass Facade สำหรับอาคารพาณิชย์และที่พักอาศัยทุกประเภท ด้วยวัสดุระดับสถาปัตยกรรม",
  },
  {
    n: "02",
    title: "Interior\nPartition",
    desc: "ระบบ Glass Partition แบบ Frameless และ Framed สำหรับสำนักงาน โรงแรม และพื้นที่เชิงพาณิชย์",
  },
  {
    n: "03",
    title: "Material\nSupply",
    desc: "จำหน่ายกระจก อลูมิเนียมโปรไฟล์ และฮาร์ดแวร์ระดับพรีเมียม ราคาโรงงาน สั่งตัดขนาดพิเศษได้",
  },
];

const pillars = [
  {
    n: "01",
    title: "Design",
    sub: "Bringing vision to life through seamless design.",
    desc: "เราออกแบบด้วยความแม่นยำ ควบคุมทุกรายละเอียดตั้งแต่ Shop Drawing จนถึงวันส่งมอบ ทุกเส้น ทุกรอยต่อ และทุกวัสดุมีเหตุผลรองรับ",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
        <rect x="10" y="10" width="60" height="60" rx="4" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
        <path d="M25 55 L40 20 L55 55" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 43 H50" stroke="#ff8a00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Plan",
    sub: "Comprehensive planning from structure to budget.",
    desc: "สำรวจ ประเมิน และวางแผนทุกโครงการให้ครอบคลุมตั้งแต่โครงสร้างจนถึงงบประมาณ ไม่มีเซอร์ไพรส์ ไม่มีทางลัด",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
        <circle cx="40" cy="40" r="28" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
        <path d="M40 22 V40 L52 48" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Execute",
    sub: "Precision fabrication and on-site control.",
    desc: "ผลิตในโรงงานมาตรฐาน ทีมช่างควบคุมหน้างานตลอด ตรวจสอบคุณภาพทุกจุดก่อนส่งมอบ",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
        <rect x="12" y="28" width="56" height="36" rx="3" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.08)" />
        <path d="M28 28 V20 Q28 12 40 12 Q52 12 52 20 V28" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="46" r="6" stroke="#ff8a00" strokeWidth="2" fill="rgba(255,138,0,0.2)" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Deliver",
    sub: "On time, every time — from handover to after-care.",
    desc: "ส่งมอบโครงการตรงเวลา พร้อมเอกสารครบ และทีม after-care สำหรับงานซ่อมบำรุงหลังส่งมอบ",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
        <path d="M14 40 L32 58 L66 24" stroke="#ff8a00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="28" stroke="#ff8a00" strokeWidth="1.5" fill="rgba(255,138,0,0.06)" strokeDasharray="4 3" />
      </svg>
    ),
  },
];

const clients = [
  "Property Developer A", "Architecture Studio", "Interior Design Co.",
  "Real Estate Group", "Construction Corp", "Design Build Ltd", "Premium Residences",
];

const journey = [
  {
    n: "01",
    phase: "Foundation",
    title: "The Birth of Precision",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=85",
    body: [
      "HAGX Studio ก่อตั้งขึ้นด้วยวิสัยทัศน์ที่ต้องการยกระดับงานติดตั้งกระจกและอลูมิเนียมในไทยให้มีมาตรฐานเทียบเท่าระดับสากล",
      "เริ่มต้นจากการเป็นทีมออกแบบสถาปัตยกรรมและที่ปรึกษาด้านวัสดุ ทำให้เราเข้าใจลึกถึงหัวใจของงานโครงสร้างและดีไซน์",
    ],
  },
  {
    n: "02",
    phase: "Professional Team & Factory",
    title: "Strength from Within: In-house Expertise",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1100&q=85",
    body: [
      "เราขยายศักยภาพโดยการจัดตั้ง in-house installation team และโรงงานประกอบของตนเอง เพื่อตัดปัญหาการใช้ outsource และควบคุมคุณภาพงานฝีมือให้ได้ตามมาตรฐาน HAGX 100%",
      "เริ่มต้นการนำระบบ pre-engineering test มาใช้ในไลน์ผลิต เพื่อตรวจสอบความสมบูรณ์ของสินค้าก่อนส่งมอบถึงหน้างาน",
    ],
  },
  {
    n: "03",
    phase: "Official Partnership",
    title: "Beyond Installation: A Trusted Partner",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1100&q=85",
    body: [
      "ก้าวขึ้นสู่การเป็น official distributor อย่างเป็นทางการให้กับแบรนด์วัสดุชั้นนำระดับประเทศ อาทิ SCG",
      "ขยายกลุ่มสินค้าครอบคลุมงานฝ้าเพดาน ผนังเบา และอุปกรณ์ฮาร์ดแวร์ครบวงจร เพื่อตอบโจทย์ลูกค้าแบบ one-stop service",
    ],
  },
  {
    n: "04",
    phase: "Tech-Driven Future",
    title: "Innovation & National Scale",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1100&q=85",
    body: [
      "HAGX ในปัจจุบันไม่ได้เป็นเพียงผู้รับเหมา แต่เป็นผู้เล่นหลักในตลาดงานกระจกและอลูมิเนียมที่ขับเคลื่อนด้วยระบบบริหารจัดการที่แม่นยำ",
      "พร้อมให้บริการจัดส่งวัสดุและรับเหมาติดตั้งโครงการขนาดใหญ่ ครอบคลุมทั่วประเทศไทย ด้วยความเร็วและความน่าเชื่อถือที่พิสูจน์แล้วจากหน้างานจริง",
    ],
  },
];

export default function AboutPage() {
  const [active, setActive] = useState(0);
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 45%"],
  });
  const timelineDotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20 text-center sm:px-10">
        {/* radial orange glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(120,50,0,0.55) 0%, rgba(8,8,8,0) 70%)",
          }}
        />
        {/* arc shape bottom */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[38vh] w-[160vw] -translate-x-1/2 rounded-t-[50%]"
          style={{ background: "rgba(40,14,0,0.45)" }}
        />

        <div className="relative z-10 max-w-5xl">
          <p className="mb-8 text-xs font-light uppercase tracking-widest text-white/50">About Us</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Precise glass and aluminium solutions<br className="hidden sm:block" />
            <span className="text-white/35">for architecture that demands reliability</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-8 text-white/40">
            HAGX เชี่ยวชาญในการส่งมอบโซลูชันงานกระจกและอลูมิเนียมสถาปัตยกรรมที่เปี่ยมด้วยความแม่นยำ ยึดมั่นในมาตรฐานวิศวกรรม และส่งมอบงานตรงต่อเวลา
          </p>
        </div>

        {/* client logos */}
        <div className="relative z-10 mt-20 w-full">
          <p className="mb-6 text-[10px] font-light uppercase tracking-widest text-white/25">
            Trusted by leading developers &amp; architects
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <span key={c} className="text-xs font-light uppercase tracking-widest text-white/20">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/[0.06]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
          {stats.map(({ n, label }) => (
            <div key={label} className="px-10 py-14 lg:px-16">
              <p className="text-6xl font-bold leading-none text-[#ff8a00] lg:text-7xl">{n}</p>
              <p className="mt-4 text-xs font-light uppercase tracking-widest text-white/35">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EFFICIENT. RELIABLE. ── */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[340px_1fr]">
          {/* left */}
          <div className="border-white/[0.06] px-10 py-16 lg:border-r lg:px-14 lg:py-20">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Precise.<br />Reliable.<br />
              <span className="text-[#ff8a00]">HAGX.</span>
            </h2>
            <p className="mt-8 text-sm font-light leading-8 text-white/40">
              HAGX เชี่ยวชาญในการส่งมอบโซลูชันงานกระจกและอลูมิเนียมสถาปัตยกรรมที่เปี่ยมด้วยความแม่นยำ เรายึดมั่นในมาตรฐานวิศวกรรมและการส่งมอบงานที่ตรงต่อเวลา เพราะเราเชื่อว่าความสำเร็จของโครงการเริ่มต้นจากรายละเอียดที่ถูกต้อง
            </p>
          </div>

          {/* right — category cards */}
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.n}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className={`relative flex flex-col justify-between overflow-hidden px-8 py-10 ${
                  i === 0
                    ? "bg-gradient-to-b from-[#7a3500] to-[#3a1600]"
                    : "bg-[#0c0c0c]"
                }`}
                style={
                  i === 0
                    ? { boxShadow: "0 0 60px rgba(255,138,0,0.2) inset" }
                    : {}
                }
              >
                <div>
                  <p className={`mb-4 text-3xl font-light ${i === 0 ? "text-white/40" : "text-white/15"}`}>
                    {cat.n}
                  </p>
                  <h3 className={`text-2xl font-bold leading-tight ${i === 0 ? "text-white" : "text-white/30"}`}>
                    {cat.title.split("\n").map((l, j) => <span key={j} className="block">{l}</span>)}
                  </h3>
                </div>
                <p className={`mt-6 text-sm font-light leading-7 ${i === 0 ? "text-white/65" : "text-white/25"}`}>
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE HAGX JOURNEY ── */}
      <section ref={timelineRef} className="relative overflow-hidden border-b border-white/[0.06] px-4 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:140px_140px] opacity-25" />

        <div className="relative mx-auto max-w-[1500px]">
          <div className="sticky top-20 z-20 mb-14 grid gap-6 bg-[#080808]/80 py-4 backdrop-blur-md lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">The HAGX Journey</p>
              <h2 className="text-4xl font-light leading-none tracking-normal text-white sm:text-5xl lg:text-6xl">
                From studio discipline to national scale
              </h2>
            </div>
            <p className="max-w-xl text-xs font-light leading-7 text-white/45 lg:ml-auto lg:text-right">
              A timeline of how HAGX grew from architectural thinking into a fully integrated glass, aluminium, manufacturing, and material supply partner.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-white/[0.08] lg:left-1/2" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-5 top-0 h-full w-px origin-top bg-[#ff8a00]/70 lg:left-1/2"
            />
            <motion.div
              style={{ top: timelineDotTop }}
              className="pointer-events-none absolute left-5 z-20 h-4 w-4 -translate-x-1/2 rounded-full border border-[#ff8a00] bg-[#080808] shadow-[0_0_28px_rgba(255,138,0,0.9)] lg:left-1/2"
            >
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a00]" />
            </motion.div>

            <div className="space-y-12 lg:space-y-16">
              {journey.map((item, index) => {
                const isReverse = index % 2 === 1;

                return (
                  <motion.article
                    key={item.n}
                    initial={{ opacity: 0, x: isReverse ? 30 : -30, y: 18 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative grid gap-6 pl-14 lg:grid-cols-2 lg:gap-12 lg:pl-0 ${
                      isReverse ? "lg:[&>*:first-child]:col-start-2" : ""
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0.72, opacity: 0.45 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-[0.94rem] top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#ff8a00]/60 bg-[#080808] text-[9px] font-light text-[#ff8a00] shadow-[0_0_18px_rgba(255,138,0,0.3)] lg:left-1/2 lg:-translate-x-1/2"
                    >
                      {item.n}
                    </motion.div>

                    <div className={isReverse ? "lg:col-start-2" : ""}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, clipPath: "inset(16% 0 16% 0)" }}
                        whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-[1.55/1] overflow-hidden border border-white/[0.08] bg-[#111] lg:max-w-[520px]"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover opacity-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <p className="absolute bottom-4 left-4 text-[10px] font-light uppercase tracking-widest text-white/45">
                          {item.phase}
                        </p>
                      </motion.div>
                    </div>

                    <div className={`flex items-center ${isReverse ? "lg:col-start-1 lg:row-start-1 lg:text-right" : ""}`}>
                      <div className={isReverse ? "lg:ml-auto" : ""}>
                        <p className="mb-3 text-[10px] font-light uppercase tracking-widest text-[#ff8a00]">
                          {item.phase}
                        </p>
                        <h3 className="max-w-lg text-2xl font-light leading-tight text-white sm:text-3xl">
                          {item.title}
                        </h3>
                        <div className="mt-5 space-y-3">
                          {item.body.map((text) => (
                            <p key={text} className="max-w-lg text-xs font-light leading-7 text-white/50">
                              {text}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPREHENSIVE STATEMENT ── */}
      <section className="border-b border-white/[0.06] px-8 py-24 text-center sm:px-12 lg:py-32">
        <p className="mb-6 text-xs font-light uppercase tracking-widest text-[#ff8a00]">Integrated Solutions</p>
        <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          บริการครบวงจรสำหรับทุกความต้องการด้านกระจกและอลูมิเนียม
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-8 text-white/40">
          เป้าหมายของเราคือทุกโครงการต้องตรงตาม Function, Budget, Design และ Quality ที่กำหนดไว้
        </p>
        <div className="mx-auto mt-10 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#ff8a00]/60 to-transparent" />
      </section>

      {/* ── PILLARS ACCORDION ── */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          {/* left: icon + counter */}
          <div
            className="relative flex items-center justify-center border-white/[0.06] px-10 py-20 lg:sticky lg:top-0 lg:h-screen lg:border-r"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(80,30,0,0.4) 0%, rgba(8,8,8,0) 70%)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 text-center"
              >
                {pillars[active].icon}
                <p className="text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                  {pillars[active].n} / {String(pillars.length).padStart(2, "0")}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* nav arrows */}
            <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              <button
                onClick={() => setActive((p) => Math.max(0, p - 1))}
                disabled={active === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
              >↑</button>
              <button
                onClick={() => setActive((p) => Math.min(pillars.length - 1, p + 1))}
                disabled={active === pillars.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white disabled:opacity-20"
              >↓</button>
            </div>
          </div>

          {/* right: accordion list */}
          <div className="divide-y divide-white/[0.06]">
            {pillars.map((p, i) => (
              <button
                key={p.n}
                type="button"
                onClick={() => setActive(i)}
                className={`group w-full px-10 py-10 text-left transition-colors duration-300 lg:px-14 ${
                  i === active ? "bg-[#0f0a05]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <p className={`mb-2 text-xs font-light uppercase tracking-widest transition-colors ${i === active ? "text-[#ff8a00]" : "text-white/25"}`}>
                      {p.n}
                    </p>
                    <h3 className={`text-3xl font-bold tracking-tight transition-colors sm:text-4xl ${i === active ? "text-white" : "text-white/30"}`}>
                      {p.title}
                    </h3>
                    <AnimatePresence>
                      {i === active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="mt-4 text-base font-light leading-relaxed text-white/55">{p.sub}</p>
                          <p className="mt-3 max-w-md text-sm font-light leading-8 text-white/35">{p.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className={`mt-1 text-2xl transition-transform duration-300 ${i === active ? "rotate-45 text-[#ff8a00]" : "text-white/20"}`}>+</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 py-20 sm:px-12 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-light uppercase tracking-widest text-[#ff8a00]">เริ่มต้น</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">พร้อมเริ่มโครงการของคุณ?</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex h-12 items-center bg-[#ff8a00] px-8 text-xs font-light uppercase tracking-normal text-white hover:bg-[#e07a00]">
              ติดต่อทีม HAGX
            </Link>
            <Link href="/portfolio" className="inline-flex h-12 items-center border border-white/20 px-8 text-xs font-light uppercase tracking-normal text-white/60 hover:border-white/50 hover:text-white">
              ดูผลงาน
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
