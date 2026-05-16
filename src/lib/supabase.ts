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


export type CustomerReviewRow = {
  id: string;
  client_name: string;
  client_type: string | null;
  location: string | null;
  logo_initials: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  project: string;
  scope: string | null;
  quote_th: string | null;
  quote_en: string | null;
  rating: number | null;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export async function getCustomerReviews(featuredOnly = false): Promise<CustomerReviewRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("website_customer_reviews")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) {
    console.error("[getCustomerReviews]", error.message);
    return [];
  }
  return data ?? [];
}

export function toTestimonialItem(
  row: CustomerReviewRow,
  lang: "th" | "en"
) {
  return {
    client: [row.client_name, row.location].filter(Boolean).join(", "),
    project: row.project,
    scope: row.scope ?? "",
    quote: (lang === "th" ? row.quote_th : row.quote_en) ?? row.quote_th ?? row.quote_en ?? "",
  };
}

export type ArticleRow = {
  id: string;
  slug: string;
  title_th: string;
  title_en: string;
  category: string | null;
  excerpt_th: string | null;
  excerpt_en: string | null;
  body_th: string | null;
  body_en: string | null;
  cover_image: string | null;
  gallery: string[] | null;
  reading_time: number | null;
  author: string | null;
  tags: string[] | null;
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getArticles(): Promise<ArticleRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('website_articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  if (error) { console.error('[getArticles]', error.message); return []; }
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('website_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}

// ── Admin CRUD ────────────────────────────────────────────────────────────────

export async function getArticlesAdmin(): Promise<{ data: ArticleRow[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('website_articles')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}

export async function upsertArticle(row: Partial<ArticleRow> & { id?: string }): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { error: 'No Supabase client' };
  const { error } = await supabase.from('website_articles').upsert(row);
  return { error: error?.message ?? null };
}

export async function getCustomerReviewsAdmin(): Promise<{ data: CustomerReviewRow[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('website_customer_reviews')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}

export async function upsertReview(row: Partial<CustomerReviewRow> & { id?: string }): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { error: 'No Supabase client' };
  const { error } = await supabase.from('website_customer_reviews').upsert(row);
  return { error: error?.message ?? null };
}

export async function getPortfolioAdmin(): Promise<{ data: PortfolioRow[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('year', { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}

export async function upsertPortfolioItem(row: Partial<PortfolioRow> & { id?: string }): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { error: 'No Supabase client' };
  const { error } = await supabase.from('portfolio_items').upsert(row);
  return { error: error?.message ?? null };
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
