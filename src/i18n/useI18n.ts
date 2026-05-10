"use client";

import "@/i18n/config";
import { useTranslation } from "react-i18next";

type Namespace = "nav" | "footer" | "home" | "about" | "services" | "portfolio" | "shop" | "clients" | "contact";

export function useI18n(ns: Namespace = "home") {
  const { t, i18n } = useTranslation(ns);

  function toggle() {
    i18n.changeLanguage(i18n.language === "th" ? "en" : "th");
  }

  return { t, lang: i18n.language as "th" | "en", toggle };
}
