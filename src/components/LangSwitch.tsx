"use client";

import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, toggle } = useI18n();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={cn(
        "flex cursor-pointer items-center gap-1.5 text-xs font-light transition-colors",
        className
      )}
    >
      <span className={lang === "th" ? "text-foreground" : "text-foreground-200 hover:text-foreground"}>
        ไทย
      </span>
      <span className="text-subtle">/</span>
      <span className={lang === "en" ? "text-foreground" : "text-foreground-200 hover:text-foreground"}>
        EN
      </span>
    </button>
  );
}
