"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import TestimonialCarousel from "@/components/TestimonialCarousel";
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
      <PageHero
        eyebrow="Our Clients"
        title={<>Trusted by leading<br /><span className="text-[#ff8a00]">brands across Thailand</span></>}
        subtitle="ผู้นำในธุรกิจอสังหาริมทรัพย์ โรงแรม ค้าปลีก และอุตสาหกรรม ไว้วางใจ HAGX ในงานกระจกและอลูมิเนียม"
        backgroundSlot={
          <div className="flex h-full gap-3 px-3">
            {[
              { items: col1, reverse: false, speed: 38 },
              { items: col2, reverse: true,  speed: 44 },
              { items: col3, reverse: false, speed: 36 },
              { items: col4, reverse: true,  speed: 50 },
              { items: col5, reverse: false, speed: 42 },
            ].map((col, i) => (
              <div key={i} className="flex-1 h-full">
                <MarqueeColumn items={col.items} reverse={col.reverse} speed={col.speed} />
              </div>
            ))}
          </div>
        }
      />

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
          <div className="hidden">
            <div>
              <p className="eyebrow mb-3">Client Stories</p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">สิ่งที่ลูกค้าพูดถึงเรา</h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/40 lg:text-right">
              ความเชื่อมั่นที่สร้างจากผลงานจริง — ไม่ใช่คำสัญญา
            </p>
          </div>
          <TestimonialCarousel
            eyebrow="Client Stories"
            title="สิ่งที่ลูกค้าพูดถึงเรา"
            description="ความเชื่อมั่นที่สร้างจากผลงานจริง - ไม่ใช่คำสัญญา"
            items={testimonials}
            className="-mx-8 -my-24 sm:-mx-14"
          />
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

      <CtaSection
        eyebrow="Join Our Clients"
        title="พร้อมเริ่มโครงการของคุณ?"
        description="ติดต่อทีม HAGX เพื่อรับคำปรึกษาและใบเสนอราคา ฟรี ไม่มีข้อผูกมัด"
        primaryAction={{ href: "/contact", label: "ติดต่อเรา" }}
        secondaryAction={{ href: "/portfolio", label: "ดูผลงาน" }}
      />

      <SiteFooter />
    </main>
  );
}
