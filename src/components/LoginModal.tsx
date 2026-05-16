"use client";

import { signInWithEmail } from "@/lib/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/useI18n";
import { useState } from "react";
import { Button } from "./ui";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  const { t } = useI18n("nav");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithEmail(email, password);

      if (result.error) {
        console.error("[LoginModal] signIn error:", result.error);
        setError(result.error.message);
        return;
      }

      console.log("[LoginModal] signIn success, user:", result.data?.user?.email);
      setEmail("");
      setPassword("");
      onSuccess ? onSuccess() : onClose();
    } catch (err: unknown) {
      console.error("[LoginModal] signIn threw:", err);
      setError(
        err instanceof Error ? err.message : "Login failed — check console"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="login-panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[60] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 border border-white/[0.08] bg-[#0c0c0c] p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-light uppercase tracking-widest text-foreground-400">
                {t("login_heading")}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-foreground-400 transition-colors hover:text-foreground-100"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">
                  {t("login_email")}
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border border-white/[0.10] bg-transparent px-3 text-sm font-light text-foreground-100 placeholder:text-foreground-400 focus:border-border-300 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">
                  {t("login_password")}
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 border border-white/[0.10] bg-transparent px-3 text-sm font-light text-foreground-100 placeholder:text-foreground-400 focus:border-border-300 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] font-light text-red-400">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                disabled={loading}
                className="mt-2 w-full"
              >
                {loading ? t("login_loading") : t("login_submit")}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
