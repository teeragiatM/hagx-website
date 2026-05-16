"use client";

import { signInWithEmail } from "@/lib/auth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Hard redirect — same pattern as logout, avoids router/auth-state race
        window.location.href = "/admin";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090807] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-xs font-light tracking-[0.3em] text-foreground-400 uppercase">HAGX</p>
          <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground-100">Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-light tracking-widest text-foreground-400 uppercase">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm font-light text-foreground-100 outline-none placeholder:text-foreground-400 focus:border-accent-500/60 focus:bg-white/[0.06]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-light tracking-widest text-foreground-400 uppercase">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm font-light text-foreground-100 outline-none placeholder:text-foreground-400 focus:border-accent-500/60 focus:bg-white/[0.06]"
            />
          </div>

          {error && (
            <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-light text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 border border-accent-500/60 bg-accent-500/10 py-3 text-[11px] font-light tracking-widest text-accent-500 uppercase transition-all hover:bg-accent-500 hover:text-black disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
