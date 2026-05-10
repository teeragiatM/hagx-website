"use client";

import { useI18n } from "@/i18n/useI18n";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, toggle } = useI18n();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={`flex items-center gap-0.5 text-xs font-light tracking-normal text-white/40 transition-colors hover:text-white ${className}`}
    >
      <span className={lang === "th" ? "text-white" : "text-white/35"}>TH</span>
      <span className="mx-1 text-white/20">|</span>
      <span className={lang === "en" ? "text-white" : "text-white/35"}>EN</span>
    </button>
  );
}
