import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PortfolioClient from "@/components/PortfolioClient";
import { getPortfolioItems } from "@/lib/getPortfolioItems";

export const metadata: Metadata = {
  title: "Portfolio | HAGX",
  description:
    "ผลงานติดตั้งระบบกระจกและอลูมิเนียมของ HAGX — Curtain Wall, Facade, Partition และงาน Supply ทั่วประเทศไทย",
  openGraph: {
    title: "HAGX Portfolio — Architectural Glass & Aluminium Projects",
    description:
      "Browse HAGX's completed projects across Thailand: curtain wall systems, glass facades, interior partitions, and premium material supply.",
  },
};

// Revalidate every 60 s — fresh enough for a portfolio, no cold-start delay
export const revalidate = 60;

export default async function PortfolioPage() {
  // Server-side fetch — no client waterfall, no loading spinner
  const items = await getPortfolioItems("th");

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/*
        PortfolioClient owns all interactive UI:
        — Thailand map with animated pins
        — Filter sidebar (type / category / location)
        — Animated project grid with AnimatePresence
        Items are already localized; no *_th / *_en fields reach the component.
      */}
      <PortfolioClient items={items} />

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] px-8 py-24 sm:px-14">
        <div className="mx-auto max-w-[1500px] text-center">
          <p className="eyebrow mb-3">Start a Project</p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            มีโครงการในใจแล้ว?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm font-light leading-8 text-white/40">
            ประเมินแนวทาง วัสดุ และงบประมาณเบื้องต้น โดยไม่มีค่าใช้จ่าย
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact"  className="btn btn-primary">ติดต่อทีม HAGX</Link>
            <Link href="/shop"     className="btn btn-secondary">ดูวัสดุ</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
