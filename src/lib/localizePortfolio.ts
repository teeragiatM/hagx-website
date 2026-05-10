import type { PortfolioRow } from "@/lib/supabase";

export type Locale = "th" | "en";

type LocalizedJsonLabel = {
  key?: string;
  th?: string;
  en?: string;
  label_th?: string;
  label_en?: string;
};

/** UI-safe portfolio item: no raw *_th / *_en fields exposed. */
export type LocalizedPortfolioItem = {
  id: string;
  slug: string;
  year: string;
  cover_image: string;
  title: string;
  description: string;
  location: string;
  gallery: string[];
  scope: string;
  highlights: string[];
  type: string;
  project_type: string;
  category: "installation" | "supply";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function localizeJsonLabel(value: unknown, locale: Locale): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (!isRecord(value)) return "";

  const label = value as LocalizedJsonLabel;
  const localized =
    locale === "th"
      ? label.label_th ?? label.th ?? label.label_en ?? label.en ?? label.key
      : label.label_en ?? label.en ?? label.label_th ?? label.th ?? label.key;

  return typeof localized === "string" ? localized : "";
}

function localizeJsonList(value: unknown, locale: Locale): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => localizeJsonLabel(item, locale)).filter(Boolean);
  }

  const label = localizeJsonLabel(value, locale);
  return label ? [label] : [];
}

/**
 * Map a raw Supabase row to a locale-safe object.
 * *_th and *_en fields never reach UI components.
 */
export function localizePortfolioItem(
  row: PortfolioRow,
  locale: Locale
): LocalizedPortfolioItem {
  const isTh = locale === "th";
  const projectType = row.project_type;
  const scope = localizeJsonList(row.scope, locale);

  return {
    id: row.id,
    slug: row.slug,
    year: row.year,
    cover_image: row.cover_image,
    title: isTh ? row.title_th : row.title_en,
    description: isTh ? row.description_th : row.description_en,
    location: isTh ? row.location_th : row.location_en,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    scope: scope.join(" | "),
    highlights: localizeJsonList(row.highlights, locale),
    type: projectType,
    project_type: projectType,
    category: row.category ?? (projectType === "supply" ? "supply" : "installation"),
  };
}

/** Convenience: map an array. */
export function localizePortfolioItems(
  rows: PortfolioRow[],
  locale: Locale
): LocalizedPortfolioItem[] {
  return rows.map((row) => localizePortfolioItem(row, locale));
}
