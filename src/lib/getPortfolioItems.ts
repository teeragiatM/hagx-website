import { supabase, type PortfolioRow } from "@/lib/supabase";
import {
  localizePortfolioItem,
  localizePortfolioItems,
  type Locale,
  type LocalizedPortfolioItem,
} from "@/lib/localizePortfolio";

const TABLE = "portfolio_items";

// ── Fetch all published items ─────────────────────────────────────────────────

export async function getPortfolioItems(
  locale: Locale = "th"
): Promise<LocalizedPortfolioItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .order("year", { ascending: false });

  if (error) {
    console.error("[getPortfolioItems]", error.message);
    return [];
  }

  return localizePortfolioItems((data as PortfolioRow[]) ?? [], locale);
}

// ── Fetch single item by slug ─────────────────────────────────────────────────

export async function getPortfolioItemBySlug(
  slug: string,
  locale: Locale = "th"
): Promise<LocalizedPortfolioItem | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    if (error?.code !== "PGRST116") {
      // PGRST116 = "no rows" — expected for unknown slugs, don't log
      console.error("[getPortfolioItemBySlug]", error?.message);
    }
    return null;
  }

  return localizePortfolioItem(data as PortfolioRow, locale);
}

// ── Generate static params for [slug] routes ─────────────────────────────────

export async function getPortfolioSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("[getPortfolioSlugs]", error.message);
    return [];
  }

  return (data ?? []).map((r: Pick<PortfolioRow, "slug">) => ({ slug: r.slug }));
}
