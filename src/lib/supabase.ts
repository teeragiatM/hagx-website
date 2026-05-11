import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function hasSupabaseConfig() {
  return Boolean(url && key);
}

export function getSupabaseClient() {
  if (!url || !key) return null;
  client ??= createClient(url, key);
  return client;
}


export type PortfolioRow = {
  id: string;
  slug: string;
  year: string;
  cover_image: string;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  location_th: string;
  location_en: string;
  gallery: string[];
  scope: unknown;
  highlights: unknown;
  project_type: string;
  category?: "installation" | "supply";
  status: "published" | "draft" | "archived";
  created_at: string;
  updated_at: string;
};
