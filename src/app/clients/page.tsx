import ClientsPageClient from "@/components/ClientsPageClient";
import { getCustomerReviews, toTestimonialItem } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients",
};

export const revalidate = 60;

export default async function ClientsPage() {
  const reviews = await getCustomerReviews();

  return (
    <ClientsPageClient
      reviewsTh={reviews.map((r) => toTestimonialItem(r, "th"))}
      reviewsEn={reviews.map((r) => toTestimonialItem(r, "en"))}
    />
  );
}
