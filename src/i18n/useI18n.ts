"use client";

import "@/i18n/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Namespace =
  | "nav"
  | "footer"
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "shop"
  | "clients"
  | "contact";

export function useI18n(ns: Namespace = "home") {
  const { t: rawT, i18n } = useTranslation(ns);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    setMounted(true);
    const currentLang = i18n.language as "th" | "en";
    setLang(currentLang);
    // Set HTML lang attribute on mount
    document.documentElement.lang = currentLang;
    const onLangChanged = (lng: string) => {
      setLang(lng as "th" | "en");
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", onLangChanged);
    return () => {
      i18n.off("languageChanged", onLangChanged);
    };
  }, [i18n]);

  // Before hydration completes, force Thai so t() output matches server render
  const t = (key: string, opts?: Record<string, unknown>) =>
    mounted ? rawT(key, opts) : rawT(key, { lng: "th", ...opts });

  function toggle() {
    const newLang = lang === "th" ? "en" : "th";
    i18n.changeLanguage(newLang);
    // Update HTML lang attribute for SEO and accessibility
    document.documentElement.lang = newLang;
  }

  return { t, lang, toggle };
}
