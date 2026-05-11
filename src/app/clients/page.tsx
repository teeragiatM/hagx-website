"use client";

import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { MarqueeGrid, type MarqueeItem } from "@/components/ui/Marquee";
import { ReviewSection } from "@/components/ui/ReviewSection";

// ── Data ──────────────────────────────────────────────────────────────────────

// MarqueeItem shape: { id, label, sub? }
const clients: MarqueeItem[] = [
  { id: "scg",      label: "SCG",       sub: "Construction" },
  { id: "mqdc",     label: "MQDC",      sub: "Real Estate" },
  { id: "sansiri",  label: "Sansiri",   sub: "Real Estate" },
  { id: "origin",   label: "Origin",    sub: "Real Estate" },
  { id: "ap",       label: "AP Thailand", sub: "Real Estate" },
  { id: "cpn",      label: "Central Pattana", sub: "Retail" },
  { id: "tcc",      label: "TCC Group", sub: "Conglomerate" },
  { id: "dusit",    label: "Dusit",     sub: "Hospitality" },
  { id: "minor",    label: "Minor Hotels", sub: "Hospitality" },
  { id: "marriott", label: "Marriott",  sub: "Hospitality" },
  { id: "hilton",   label: "Hilton",    sub: "Hospitality" },
  { id: "ptt",      label: "PTT",       sub: "Energy" },
  { id: "egco",     label: "EGCO",      sub: "Energy" },
  { id: "true",     label: "True Corp", sub: "Telecom" },
  { id: "aia",      label: "AIA",       sub: "Insurance" },
  { id: "bdms",     label: "BDMS",      sub: "Healthcare" },
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ClientsPage() {

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* ── HERO + MARQUEE ─────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Our Clients"
        title={<>Trusted by leading<br /><span className="text-[#ff8a00]">brands across Thailand</span></>}
        subtitle="ผู้นำในธุรกิจอสังหาริมทรัพย์ โรงแรม ค้าปลีก และอุตสาหกรรม ไว้วางใจ HAGX ในงานกระจกและอลูมิเนียม"
        backgroundSlot={
          <MarqueeGrid
            items={clients}
            columns={5}
            columnSpeeds={[38, 44, 36, 50, 42]}
            className="h-full px-3"
          />
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
      <ReviewSection
        eyebrow="Client Stories"
        title="สิ่งที่ลูกค้าพูดถึงเรา"
        description="ความเชื่อมั่นที่สร้างจากผลงานจริง — ไม่ใช่คำสัญญา"
        items={testimonials}
      />

      {/* ── CLIENT GRID ────────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow mb-3">All Clients</p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">ลูกค้าของเรา</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {clients.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center justify-center gap-2 border border-white/[0.07] bg-[#0c0c0c] py-8 px-4 transition-colors hover:border-[#ff8a00]/30"
              >
                <span className="text-base font-bold text-white/70">{c.label}</span>
                <span className="text-[9px] font-light uppercase tracking-widest text-white/25">{c.sub}</span>
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
