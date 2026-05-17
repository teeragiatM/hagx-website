import { getArticles } from "@/lib/supabase";
import InsightsPageClient from "./InsightsPageClient";

export const revalidate = 60;

export default async function InsightsPage() {
  const articles = await getArticles();
  return <InsightsPageClient articles={articles} />;
}
