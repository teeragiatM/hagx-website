import type { PortfolioRow } from "@/lib/supabase";

export type Locale = "th" | "en";

/** UI-safe portfolio item — no raw *_th / *_en fields exposed */
export type LocalizedPortfolioItem = {
  id:          string;
  slug:        string;
  year:        string;
  cover_image: string;
  title:       string;
  description: string;
  location:    string;
  gallery:     string[];
  scope:       string;
  highlights:  string[];
  type:        string;
  category:    "installation" | "supply";
};

/**
 * Map a raw Supabase row to a locale-safe object.
 * *_th and *_en fields never reach UI components.
 */
export function localizePortfolioItem(
  row: PortfolioRow,
  locale: Locale
): LocalizedPortfolioItem {
  const isTh = locale === "th";
  return {
    id:          row.id,
    slug:        row.slug,
    year:        row.year,
    cover_image: row.cover_image,
    title:       isTh ? row.title_th       : row.title_en,
    description: isTh ? row.description_th : row.description_en,
    location:    isTh ? row.location_th    : row.location_en,
    gallery:     Array.isArray(row.gallery)    ? row.gallery    : [],
    scope:       row.scope,
    highlights:  Array.isArray(row.highlights) ? row.highlights : [],
    type:        row.type,
    category:    row.category,
  };
}

/** Convenience — map an array */
export function localizePortfolioItems(
  rows: PortfolioRow[],
  locale: Locale
): LocalizedPortfolioItem[] {
  return rows.map((r) => localizePortfolioItem(r, locale));
}
