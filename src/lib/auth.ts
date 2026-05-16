import { getSupabaseClient } from "./supabase";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  created_at: string | null;
  is_dev: boolean | null;
};

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      data: null,
      error: { message: "Supabase is not configured — check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY" },
    };
  }
  console.log("[auth] signInWithPassword →", email);
  const result = await supabase.auth.signInWithPassword({ email, password });
  console.log("[auth] signInWithPassword result:", result.error?.message ?? "OK");
  return result;
}

export async function signOut() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) console.error("[auth] getProfile error:", error.message);
  return data ?? null;
}
