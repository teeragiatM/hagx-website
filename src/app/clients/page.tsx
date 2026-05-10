"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// ── Data ──────────────────────────────────────────────────────────────────────

const clients = [
  { name: "SCG",               logo: "SCG",      sector: "Construction" },
  { name: "MQDC",              logo: "MQDC",     sector: "Real Estate" },
  { name: "Sansiri",           logo: "Sansiri",  sector: "Real Estate" },
  { name: "Origin Property",   logo: "Origin",   sector: "Real Estate" },
  { name: "AP Thailand",       logo: "AP",       sector: "Real Estate" },
  { name: "Central Pattana",   logo: "CPN",      sector: "Retail" },
  { name: "TCC Group",         logo: "TCC",      sector: "Conglomerate" },
  { name: "Dusit International", logo: "Dusit",  sector: "Hospitality" },
  { name: "Minor Hotels",      logo: "Minor",    sector: "Hospitality" },
  { name: "Marriott Thailand", logo: "Marriott", sector: "Hospitality" },
  { name: "Hilton Phuket",     logo: "Hilton",   sector: "Hospitality" },
  { name: "PTT",               logo: "PTT",      sector: "Energy" },
  { name: "EGCO Group",        logo: "EGCO",     sector: "Energy" },
  { name: "True Corporation",  logo: "True",     sector: "Telecom" },
  { name: "AIA Thailand",      logo: "AIA",      sector: "Insurance" },
  { name: "Bangkok Hospital",  logo: "BDMS",     sector: "Healthcare" },
];

const testimonials = [
  {
    client: "MQDC",
    project: "Whizdom 101 Tower",
    scope: "CURTAIN WALL | FABRICATION",
    quote: "ทีม HAGX ส่งมอบงาน Curtain Wall คุณภาพสูงตรงตามแบบและตามกำหนดเวลา การประสานงานดีเยี่ยม ทำให้โครงการดำเนินไปได้อย่างราบรื่น",
    bg: "#1a1a2e",
    accent: "#ff8a00",
  },
  {
    client: "Dusit International",
    project: "Dusit Thani Maldives",
    scope: "DESIGN | SUPPLY | INSTALL",
    quote: "HAGX delivered exceptional façade glazing work that met our international hospitality standards. Their attention to detail and technical expertise set them apart from other contractors.",
    bg: "#1c1408",
    accent: "#c8a000",
  },
  {
    client: "Central Pattana",
    project: "Central World Renovation",
    scope: "SUPPLY | INSTALLATION",
    quote: "วัสดุกระจกและอลูมิเนียมที่ HAGX จัดหาให้มีคุณภาพระดับพรีเมียม ทุกชิ้นงานผ่าน QC อย่างเข้มงวด ทำให้ทีมของเราทำงานได้อย่างมั่นใจ",
    bg: "#0d1a0d",
    accent: "#00a651",
  },
  {
    client: "Origin Property",
    project: "Notting Hill Sukhumvit",
    scope: "GLASS RAILING | FACADE",
    quote: "ราวกันตกกระจกและ Facade ที่ HAGX ติดตั้งให้สวยงามมาก ลูกค้าของเราประทับใจมาก และส่งมอบงานได้เร็วกว่ากำหนด",
    bg: "#1a0a1a",
    accent: "#9b59b6",
  },
  {
    client: "PTT",
    project: "PTT HQ Office Tower",
    scope: "CURTAIN WALL | LOW-E IGU",
    quote: "HAGX's Low-E double glazing system significantly reduced our building's cooling load. Technical documentation and testing reports were thorough and professional.",
    bg: "#0a1a0a",
    accent: "#00843d",
  },
  {
    client: "AIA Thailand",
    project: "AIA Capital Center",
    scope: "GLASS PARTITION | INTERIOR",
    quote: "ระบบ Partition กระจกที่ HAGX ออกแบบและติดตั้งเหมาะสมกับสำนักงานของเราอย่างลงตัว ทั้งฟังก์ชันและความสวยงาม",
    bg: "#1a0808",
    accent: "#e63946",
  },
];

const stats = [
  { value: "10+", label: "ปีประสบการณ์", sub: "Years of Experience" },
  { value: "120+", label: "โครงการสำเร็จ", sub: "Projects Completed" },
  { value: "50+", label: "ลูกค้าองค์กร", sub: "Corporate Clients" },
  { value: "15+", label: "จังหวัดทั่วไทย", sub: "Provinces Nationwide" },
];

// ── Vertical Marquee Column ───────────────────────────────────────────────────

function MarqueeColumn({ items, reverse = false, speed = 40 }: {
  items: typeof clients;
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden" style={{ height: "100%" }}>
      <motion.div
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-3"
      >
        {doubled.map((c, i) => (
          <div
            key={i}
            className="flex h-20 shrink-0 items-center justify-center border border-[#ff8a00]/25 bg-[#0c0c0c] px-5 transition-colors hover:border-[#ff8a00]/60 hover:bg-[#0f0f0f]"
          >
            <span className="text-sm font-semibold tracking-wide text-white/70">{c.logo}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Testimonial Carousel ──────────────────────────────────────────────────────

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const visible = [
    testimonials[(active - 1 + testimonials.length) % testimonials.length],
    testimonials[active],
    testimonials[(active + 1) % testimonials.length],
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {visible.map((t, i) => (
          <motion.div
            key={`${active}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between p-8"
            style={{ backgroundColor: t.bg, minHeight: 420 }}
          >
            {/* Client logo placeholder */}
            <div>
              <div
                className="mb-6 inline-flex items-center justify-center border px-4 py-2"
                style={{ borderColor: `${t.accent}40` }}
              >
                <span className="text-lg font-bold" style={{ color: t.accent }}>{t.client}</span>
              </div>
              <p className="mb-3 text-[10px] font-light uppercase tracking-widest" style={{ color: `${t.accent}99` }}>
                {t.scope}
              </p>
              <h3 className="mb-6 text-xl font-semibold leading-tight text-white">{t.project}</h3>
              <p className="text-sm font-light leading-7 text-white/60">{t.quote}</p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <span className="h-0.5 w-6" style={{ backgroundColor: t.accent }} />
              <span className="text-[10px] font-light uppercase tracking-widest text-white/30">{t.client}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white"
        >
          ←
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-1 transition-all duration-300"
              style={{ width: i === active ? 24 : 8, backgroundColor: i === active ? "#ff8a00" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const col1 = clients.slice(0, 6);
  const col2 = clients.slice(4, 10);
  const col3 = clients.slice(8, 14);
  const col4 = clients.slice(2, 8);
  const col5 = clients.slice(10, 16);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* ── HERO + MARQUEE ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Vertical marquee columns — full height background */}
        <div className="absolute inset-0 flex gap-3 px-3 pt-0" style={{ height: "100%" }}>
          {[
            { items: col1, reverse: false, speed: 38 },
            { items: col2, reverse: true,  speed: 44 },
            { items: col3, reverse: false, speed: 36 },
            { items: col4, reverse: true,  speed: 50 },
            { items: col5, reverse: false, speed: 42 },
          ].map((col, i) => (
            <div key={i} className="flex-1" style={{ height: "100%" }}>
              <MarqueeColumn items={col.items} reverse={col.reverse} speed={col.speed} />
            </div>
          ))}
        </div>

        {/* Dark gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-transparent" />

        {/* Center text */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 text-center sm:px-14">
          <p className="eyebrow mb-4">Our Clients</p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Trusted by leading<br />
            <span className="text-[#ff8a00]">brands across Thailand</span>
          </h1>
          <p className="max-w-lg text-sm font-light leading-8 text-white/40">
            ผู้นำในธุรกิจอสังหาริมทรัพย์ โรงแรม ค้าปลีก และอุตสาหกรรม<br />
            ไว้วางใจ HAGX ในงานกระจกและอลูมิเนียม
          </p>
        </div>
      </section>

      {/* ── STATS (orange bg) ──────────────────────────────────────────────── */}
      <section className="bg-[#ff8a00] px-8 py-20 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-2 gap-px bg-white/20 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col items-start bg-[#ff8a00] px-10 py-12">
                <p className="mb-2 text-5xl font-bold leading-none text-white lg:text-6xl">{s.value}</p>
                <p className="mb-1 text-base font-semibold text-white">{s.label}</p>
                <p className="text-xs font-light text-white/70">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                Places That Inspire.<br />Designs That Endure.
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/70">
              ทุกโครงการคือการสร้างมาตรฐานใหม่ — ด้วยวัสดุพรีเมียม<br />และทีมงานที่มีความเชี่ยวชาญระดับสากล
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-3">Client Stories</p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">สิ่งที่ลูกค้าพูดถึงเรา</h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/40 lg:text-right">
              ความเชื่อมั่นที่สร้างจากผลงานจริง — ไม่ใช่คำสัญญา
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── CLIENT GRID ────────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow mb-3">All Clients</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">ลูกค้าของเรา</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center justify-center gap-2 border border-white/[0.07] bg-[#0c0c0c] py-8 px-4 transition-colors hover:border-[#ff8a00]/30"
              >
                <span className="text-base font-bold text-white/70">{c.logo}</span>
                <span className="text-[9px] font-light uppercase tracking-widest text-white/25">{c.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px] text-center">
          <p className="eyebrow mb-3">Join Our Clients</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">พร้อมเริ่มโครงการของคุณ?</h2>
          <p className="mx-auto mb-10 max-w-md text-sm font-light leading-8 text-white/40">
            ติดต่อทีม HAGX เพื่อรับคำปรึกษาและใบเสนอราคา — ฟรี ไม่มีข้อผูกมัด
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="btn btn-primary">ติดต่อเรา</Link>
            <Link href="/portfolio" className="btn btn-secondary">ดูผลงาน</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
