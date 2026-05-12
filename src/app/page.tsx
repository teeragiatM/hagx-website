import HomePageClient from "@/components/HomePageClient";
import { getPortfolioItems } from "@/lib/getPortfolioItems";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HAGX | Premium Glass & Aluminium Systems",
  description:
    "HAGX — ผู้เชี่ยวชาญด้านงานกระจกและอลูมิเนียมคุณภาพสูง ครบวงจรตั้งแต่ออกแบบ ผลิต ติดตั้ง และจัดหาวัสดุ",
};

export const revalidate = 60;

export default async function HomePage() {
  const [latestItemsTh, latestItemsEn] = await Promise.all([
    getPortfolioItems("th"),
    getPortfolioItems("en"),
  ]);

  return (
    <HomePageClient
      latestItemsTh={latestItemsTh.slice(0, 3)}
      latestItemsEn={latestItemsEn.slice(0, 3)}
    />
  );
}
