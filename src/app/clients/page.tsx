import ClientsPageClient from "./ClientsPageClient";
import { getCustomerReviews, toTestimonialItem } from "@/lib/supabase";

export const revalidate = 60;

export default async function ClientsPage() {
  const rows = await getCustomerReviews();
  const reviewsTh = rows.map((r) => toTestimonialItem(r, "th"));
  const reviewsEn = rows.map((r) => toTestimonialItem(r, "en"));

  return <ClientsPageClient reviewsTh={reviewsTh} reviewsEn={reviewsEn} />;
}
