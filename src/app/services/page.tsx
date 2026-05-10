"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// ── Data ─────────────────────────────────────────────────────────────────────

const installation = [
  {
    n: "01",
    title: "Pre-Site Survey",
    sub: "สำรวจและประเมินพื้นที่",
    desc: "ทีม HAGX ลงสำรวจพื้นที่จริง วัดระยะ ประเมินโครงสร้าง และออกรายงานแนะนำระบบที่เหมาะสมก่อนเริ่มงานทุกครั้ง",
    items: ["Pre-site Survey & Measurement", "Structural Compatibility Report", "System & Material Recommendation"],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
  },
  {
    n: "02",
    title: "Design & Shop Drawing",
    sub: "ออกแบบและวาดแบบก่อสร้าง",
    desc: "จัดทำ Shop Drawing ครบถ้วน พร้อมประสานงานกับสถาปนิกและผู้รับเหมาหลักเพื่อให้งานตรงตามแบบ 100%",
    items: ["Design Consultation", "Shop Drawing Production", "Material Schedule & BOM", "Architect Coordination"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  },
  {
    n: "03",
    title: "In-house Fabrication",
    sub: "ผลิตในโรงงานของ HAGX",
    desc: "ผลิตชิ้นงานอลูมิเนียมและกระจกในโรงงานของ HAGX เอง ควบคุมคุณภาพทุกชิ้นก่อนส่งหน้างาน ไม่ใช้ Outsource",
    items: ["Aluminium Profile Fabrication", "Tempered & Laminated Glass Cutting", "CNC Precision Machining", "QC Before Delivery"],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
  },
  {
    n: "04",
    title: "On-site Installation",
    sub: "ติดตั้งโดยทีม HAGX",
    desc: "ทีมช่างประจำหน้างานตลอดโครงการ ควบคุมการติดตั้ง ตรวจสอบรอยต่อ และส่งมอบงานตามมาตรฐานสถาปัตยกรรม",
    items: ["Curtain Wall & Unitized System", "Glass Facade & Cladding", "Interior Partition & Sliding", "Reinstatement & After-care"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
];

const supply = [
  {
    n: "05",
    title: "Glass Supply",
    sub: "จำหน่ายกระจกทุกประเภท",
    desc: "จำหน่ายกระจก Tempered, Laminated, Low-E, และ Insulated ในขนาดมาตรฐานและตัดพิเศษ พร้อมใบรับรองคุณภาพ",
    items: ["Tempered Glass (ESG)", "Laminated Safety Glass (VSG)", "Low-E Double Glazing (IGU)", "Frosted & Decorative Glass"],
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
  },
  {
    n: "06",
    title: "Aluminium Profile",
    sub: "อลูมิเนียมโปรไฟล์ทุกระบบ",
    desc: "โปรไฟล์อลูมิเนียมสำหรับระบบ Curtain Wall, Sliding, Casement และ Partition ทุกแบรนด์ ราคาโรงงาน",
    items: ["Curtain Wall Profiles", "Sliding & Casement Systems", "Partition & Storefront Frames", "Custom Extrusion Available"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    n: "07",
    title: "Hardware & Accessories",
    sub: "ฮาร์ดแวร์และอุปกรณ์เสริม",
    desc: "ฮาร์ดแวร์ Stainless Steel และ Structural Silicone จากแบรนด์ชั้นนำ พร้อมอะไหล่สำรองและบริการให้คำแนะนำ",
    items: ["Patch Fittings & Spider Clamps", "Stainless Steel Hardware", "Structural & Weather Sealant", "Door & Window Handles"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80",
  },
];

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ s }: { s: typeof installation[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden border border-white/[0.07] bg-[#0c0c0c]"
      style={{ minHeight: 380 }}
    >
      {/* image */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <Image
          src={s.image}
          alt={s.title}
          fill
          sizes="(min-width:1024px) 25vw, 50vw"
          className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
        <span className="absolute left-5 top-5 text-xs font-light text-white/30">{s.n}</span>
      </div>

      {/* base info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 text-lg font-semibold leading-tight text-white">{s.title}</h3>
        <p className="mb-4 text-xs font-light text-[#ff8a00]">{s.sub}</p>

        {/* expandable */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mb-4 text-xs font-light leading-6 text-white/45">{s.desc}</p>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-light text-white/35">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#ff8a00]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-4">
          <span className="text-[10px] font-light uppercase tracking-widest text-white/20 transition-colors group-hover:text-[#ff8a00]">
            Hover to explore →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[60vh] items-center justify-between overflow-hidden border-b border-white/[0.06] px-8 pt-32 pb-16 sm:px-14 lg:px-20">
        {/* bg glow */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 60%, rgba(100,40,0,0.4) 0%, transparent 70%)" }} />

        <h1 className="relative z-10 text-[12vw] font-bold leading-none tracking-tighter text-white lg:text-[9vw]">Our</h1>

        {/* 3D CSS Cube */}
        <div className="relative z-10 shrink-0" style={{ perspective: "600px" }}>
          <motion.div
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d", width: 180, height: 180 }}
            className="relative"
          >
            {[
              { transform: "rotateY(0deg)   translateZ(90px)", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&q=70" },
              { transform: "rotateY(90deg)  translateZ(90px)", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=70" },
              { transform: "rotateY(180deg) translateZ(90px)", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&q=70" },
              { transform: "rotateY(270deg) translateZ(90px)", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=70" },
              { transform: "rotateX(90deg)  translateZ(90px)", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&q=70" },
              { transform: "rotateX(-90deg) translateZ(90px)", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70" },
            ].map((face, i) => (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden border border-white/10"
                style={{ transform: face.transform, backfaceVisibility: "hidden" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={face.img} alt="" className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-[#ff8a00]/10" />
              </div>
            ))}
          </motion.div>
        </div>

        <h1 className="relative z-10 text-[12vw] font-bold leading-none tracking-tighter text-[#ff8a00] lg:text-[9vw]">Services</h1>
      </section>

      {/* ── SECTION 1: INSTALLATION & FABRICATION ── */}
      <section className="border-b border-white/[0.06]">
        <div className="container-site section-py">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-3">Installation Work</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                งานรับเหมาและติดตั้ง
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/40 lg:text-right">
              บริการครบวงจรตั้งแต่สำรวจ ออกแบบ ผลิต และติดตั้ง — ดูแลโดยทีม HAGX เอง ไม่ใช้ Subcontractor
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {installation.map((s) => <ServiceCard key={s.n} s={s} />)}
          </div>

          <div className="mt-10 flex gap-4">
            <Link href="/contact" className="btn btn-primary">ขอใบเสนอราคาโครงการ</Link>
            <Link href="/portfolio" className="btn btn-secondary">ดูผลงาน</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SUPPLY & SALES ── */}
      <section>
        <div className="container-site section-py">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-3">Supply & Sales</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                จำหน่ายวัสดุพรีเมียม
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/40 lg:text-right">
              สั่งซื้อกระจก อลูมิเนียม และฮาร์ดแวร์แบบแยกชิ้น ราคาโรงงาน สั่งตัดขนาดพิเศษได้
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supply.map((s) => <ServiceCard key={s.n} s={s} />)}
          </div>

          <div className="mt-10 flex gap-4">
            <Link href="/shop" className="btn btn-primary">ดูสินค้าทั้งหมด</Link>
            <Link href="/contact" className="btn btn-secondary">สอบถามราคา</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
