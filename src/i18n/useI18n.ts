"use client";

import "@/i18n/config";
import { useEffect, useState } from "react";
import { useTranslation, TFuncReturn } from "react-i18next";

type Namespace = "nav" | "footer" | "home" | "about" | "services" | "portfolio" | "shop" | "clients" | "contact";

export function useI18n(ns: Namespace = "home") {
  const { t: rawT, i18n } = useTranslation(ns);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    setMounted(true);
    setLang(i18n.language as "th" | "en");
    const onLangChanged = (lng: string) => setLang(lng as "th" | "en");
    i18n.on("languageChanged", onLangChanged);
    return () => { i18n.off("languageChanged", onLangChanged); };
  }, [i18n]);

  // Before hydration completes, force Thai so t() output matches server render
  const t: typeof rawT = mounted
    ? rawT
    : (key: any, opts?: any) => rawT(key, { lng: "th", ...opts });

  function toggle() {
    i18n.changeLanguage(lang === "th" ? "en" : "th");
  }

  return { t, lang, toggle };
}
