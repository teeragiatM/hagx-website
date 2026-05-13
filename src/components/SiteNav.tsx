"use client";

import LangSwitch from "@/components/LangSwitch";
import { useI18n } from "@/i18n/useI18n";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Text, Link } from "./ui";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/shop", key: "shop" },
  { href: "/clients", key: "clients" },
  { href: "/insights", key: "insights" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const { t } = useI18n("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return (
      pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/"
    );
  };

  return (
    <>
      <header className="header-wrapper">
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            scrolled ? "bg-background/95 backdrop-blur-xl" : "bg-transparent"
          }`}
        />
        <div className="header-container relative z-10">
          <Link href="/" aria-label="HAGX" onClick={() => setOpen(false)}>
            <img
              src="/images/hagx-logo.svg"
              alt="HAGX"
              width="76"
              height="19"
            />
          </Link>

          <nav className="header-nav-container">
            {navLinks.map((link) => (
              <Link
                color="gray"
                underline="none"
                uppercase
                weight={{ initial: "light" }}
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="header-nav-link"
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="h-4 w-px bg-white/15" />

            <LangSwitch />
            <Button
              asChild
              size={{ initial: "1" }}
              variant="outline"
              color="gray"
            >
              <a href="/contact">{t("contact_cta")}</a>
            </Button>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={t("menu_toggle")}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-[1.5px] w-5 origin-center bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 origin-center bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col  md:hidden"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/[0.06] px-[var(--site-inline-px)]">
              <Link href="/" onClick={() => setOpen(false)}>
                <img
                  src="/images/hagx-logo.svg"
                  alt="HAGX"
                  width="76"
                  height="19"
                  className="h-[19px] w-[76px]"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/40 hover:text-white"
              >
                {t("close")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-[var(--site-inline-px)]">
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-white/[0.06] py-5 text-3xl font-light tracking-tight transition-colors sm:text-4xl ${
                        isActive(link.href)
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="shrink-0 border-t border-white/[0.06] px-[var(--site-inline-px)] py-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-3 text-[9px] font-light uppercase tracking-widest text-white/25">
                    {t("contact_heading")}
                  </p>
                  <p className="text-xs font-light text-white/45">
                    contact@hagx.co
                  </p>
                  <p className="mt-1 text-xs font-light text-white/30">
                    {t("business_hours")}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[9px] font-light uppercase tracking-widest text-white/25">
                    {t("social_heading")}
                  </p>
                  <div className="flex gap-5 text-xs font-light text-white/45">
                    <a
                      href="https://line.me/ti/p/hagx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      LINE
                    </a>
                    <a
                      href="https://instagram.com/hagx.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      IG
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center border border-white/20 px-7 text-[11px] font-light uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-[#080808]"
                >
                  {t("contact_cta")}
                </Link>
                <LangSwitch />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
