"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ── per-page namespaces ────────────────────────────────────────────────────────
import thNav       from "./locales/th/nav.json";
import thFooter    from "./locales/th/footer.json";
import thHome      from "./locales/th/home.json";
import thAbout     from "./locales/th/about.json";
import thServices  from "./locales/th/services.json";
import thPortfolio from "./locales/th/portfolio.json";
import thShop      from "./locales/th/shop.json";
import thClients   from "./locales/th/clients.json";
import thContact   from "./locales/th/contact.json";

import enNav       from "./locales/en/nav.json";
import enFooter    from "./locales/en/footer.json";
import enHome      from "./locales/en/home.json";
import enAbout     from "./locales/en/about.json";
import enServices  from "./locales/en/services.json";
import enPortfolio from "./locales/en/portfolio.json";
import enShop      from "./locales/en/shop.json";
import enClients   from "./locales/en/clients.json";
import enContact   from "./locales/en/contact.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        th: {
          nav:       thNav,
          footer:    thFooter,
          home:      thHome,
          about:     thAbout,
          services:  thServices,
          portfolio: thPortfolio,
          shop:      thShop,
          clients:   thClients,
          contact:   thContact,
        },
        en: {
          nav:       enNav,
          footer:    enFooter,
          home:      enHome,
          about:     enAbout,
          services:  enServices,
          portfolio: enPortfolio,
          shop:      enShop,
          clients:   enClients,
          contact:   enContact,
        },
      },
      defaultNS: "home",
      fallbackLng: "th",
      supportedLngs: ["th", "en"],
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "hagx_lang",
      },
      interpolation: { escapeValue: false },
    });
}

export default i18n;
