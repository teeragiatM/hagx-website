"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth";
import { useI18n } from "@/i18n/useI18n";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@ui";
import LoginModal from "@shared/LoginModal";

export default function AuthButton() {
  const { user, profile, loading } = useAuth();
  const { t } = useI18n("nav");
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Show login button immediately — don't wait for session check to avoid skeleton hang
  if (!user) {
    return (
      <>
        <Button
          size={{ initial: "1" }}
          variant="ghost"
          onClick={() => setLoginOpen(true)}
        >
          {t("login_cta")}
        </Button>
        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSuccess={() => {
            setLoginOpen(false);
            router.push("/admin");
          }}
        />
      </>
    );
  }

  const displayName =
    profile?.first_name
      ? profile.first_name
      : user.email?.split("@")[0] ?? "User";

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-2 text-[11px] font-light tracking-widest text-foreground-200 uppercase transition-colors hover:text-foreground-100"
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] text-foreground-200 uppercase">
            {displayName[0]}
          </span>
        )}
        <span className="hidden sm:inline">{displayName}</span>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 z-50 mt-2 w-44 border border-white/[0.08] bg-[#0c0c0c] py-1"
            >
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push('/admin');
                }}
                className="w-full px-4 py-2.5 text-left text-[10px] font-light tracking-widest text-foreground-300 uppercase transition-colors hover:bg-border-overlay hover:text-foreground-100"
              >
                {t('admin')}
              </button>
              <button
                onClick={async () => {
                  setDropdownOpen(false);
                  await signOut();
                  router.push('/');
                }}
                className="w-full px-4 py-2.5 text-left text-[10px] font-light tracking-widest text-foreground-300 uppercase transition-colors hover:bg-border-overlay hover:text-foreground-100"
              >
                {t('logout')}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
