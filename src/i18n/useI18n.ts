"use client";

import "@/i18n/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Namespace = "nav" | "footer" | "home" | "about" | "services" | "portfolio" | "shop" | "clients" | "contact";

export function useI18n(ns: Namespace = "home") {
  const { t, i18n } = useTranslation(ns);
  // Keep lang as "th" until client hydration is complete to prevent
  // server/client mismatch (server uses fallbackLng "th", client detects browser lang)
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    setLang(i18n.language as "th" | "en");
    const onLangChanged = (lng: string) => setLang(lng as "th" | "en");
    i18n.on("languageChanged", onLangChanged);
    return () => { i18n.off("languageChanged", onLangChanged); };
  }, [i18n]);

  function toggle() {
    i18n.changeLanguage(lang === "th" ? "en" : "th");
  }

  return { t, lang, toggle };
}
