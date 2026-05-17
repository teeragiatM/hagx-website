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

function applyLangClass(lang: string) {
  const html = document.documentElement;
  html.lang = lang;
  html.classList.toggle("thai", lang === "th");
  html.classList.toggle("latin", lang === "en");
}

export function useI18n(ns: Namespace = "home") {
  const { t: rawT, i18n } = useTranslation(ns);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    setMounted(true);
    const currentLang = i18n.language as "th" | "en";
    setLang(currentLang);
    applyLangClass(currentLang);
    const onLangChanged = (lng: string) => {
      setLang(lng as "th" | "en");
      applyLangClass(lng);
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
    i18n.changeLanguage(lang === "th" ? "en" : "th");
  }

  return { t, lang, toggle };
}
