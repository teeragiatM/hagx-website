import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PortfolioClient from "@/components/PortfolioClient";
import { getPortfolioItems } from "@/lib/getPortfolioItems";

export const metadata: Metadata = {
  title: "Portfolio | HAGX",
  description:
    "HAGX portfolio of architectural glass and aluminium projects across Thailand, including curtain wall, facade, partition, railing, and material supply work.",
  openGraph: {
    title: "HAGX Portfolio | Architectural Glass & Aluminium Projects",
    description:
      "HAGX portfolio of architectural glass and aluminium projects across Thailand, including curtain wall, facade, partition, railing, and material supply work.",
  },
};

// Revalidate every 60s for fresh portfolio content
export const revalidate = 60;

export default async function PortfolioPage() {
  // Server-side fetch, no client waterfall or loading spinner
  const [items, itemsEn] = await Promise.all([
    getPortfolioItems("th"),
    getPortfolioItems("en"),
  ]);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      {/*
        PortfolioClient owns all interactive UI:
        - Thailand map with animated pins
        - Filter sidebar (type / category / location)
        - Animated project grid with AnimatePresence
        Items are already localized; no *_th / *_en fields reach the component.
      */}
      <PortfolioClient items={items} itemsEn={itemsEn} />

      <SiteFooter />
    </main>
  );
}
