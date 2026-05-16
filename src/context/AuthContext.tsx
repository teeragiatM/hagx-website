"use client";

import { getSupabaseClient } from "@/lib/supabase";
import { getProfile, type Profile } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Fallback: force loading=false after 3s in case Supabase hangs (e.g. invalid key)
    const timeout = setTimeout(() => setLoading(false), 3000);

    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      clearTimeout(timeout);
      if (error) console.error("[AuthContext] getSession error:", error.message);
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile(await getProfile(session.user.id));
      }
      setLoading(false);
    }).catch((err) => {
      clearTimeout(timeout);
      console.error("[AuthContext] getSession threw:", err);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile(await getProfile(session.user.id));
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
