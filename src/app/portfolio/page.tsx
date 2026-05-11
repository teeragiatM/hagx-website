import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
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

      <CtaSection
        eyebrow="Start a Project"
        title="มีโครงการในใจแล้ว?"
        description="ประเมินแนวทาง วัสดุ และงบประมาณเบื้องต้น โดยไม่มีค่าใช้จ่าย"
        primaryAction={{ href: "/contact", label: "ติดต่อทีม HAGX" }}
        secondaryAction={{ href: "/shop", label: "ดูวัสดุ" }}
      />

      <SiteFooter />
    </main>
  );
}
