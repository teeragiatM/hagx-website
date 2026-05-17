import HomePageClient from "@sections/HomePageClient";
import { getPortfolioItems } from "@/lib/getPortfolioItems";
import { getCustomerReviews, toTestimonialItem } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HAGX | Premium Glass & Aluminium Systems",
  description:
    "HAGX — ผู้เชี่ยวชาญด้านงานกระจกและอลูมิเนียมคุณภาพสูง ครบวงจรตั้งแต่ออกแบบ ผลิต ติดตั้ง และจัดหาวัสดุ",
};

export const revalidate = 60;

export default async function HomePage() {
  const [latestItemsTh, latestItemsEn, reviews] = await Promise.all([
    getPortfolioItems("th"),
    getPortfolioItems("en"),
    getCustomerReviews(true),
  ]);

  return (
    <HomePageClient
      latestItemsTh={latestItemsTh.slice(0, 29)}
      latestItemsEn={latestItemsEn.slice(0, 29)}
      reviewsTh={reviews.map((r) => toTestimonialItem(r, "th"))}
      reviewsEn={reviews.map((r) => toTestimonialItem(r, "en"))}
    />
  );
}
