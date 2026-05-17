import { getProductCategories, getProducts } from "@/lib/supabase";
import ShopPageClient from "./ShopPageClient";

export const revalidate = 60;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);
  return <ShopPageClient products={products} categories={categories} />;
}
