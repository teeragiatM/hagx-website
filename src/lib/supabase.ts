import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !key) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
}

// Single shared client — safe for Server Components (no auth state)
export const supabase = createClient(url, key);

// ── Row type matching the PostgreSQL table ────────────────────────────────────
export type PortfolioRow = {
  id:             string;
  slug:           string;
  year:           string;
  cover_image:    string;
  title_th:       string;
  title_en:       string;
  description_th: string;
  description_en: string;
  location_th:    string;
  location_en:    string;
  gallery:        string[];   // jsonb — array of image URLs
  scope:          string;
  highlights:     string[];   // jsonb — array of bullet strings
  type:           string;     // e.g. "curtain-wall" | "facade" | ...
  category:       "installation" | "supply";
  status:         "published" | "draft" | "archived";
  created_at:     string;
  updated_at:     string;
};
