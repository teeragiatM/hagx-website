"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LangSwitch from "@/components/LangSwitch";
import { useI18n } from "@/i18n/useI18n";

const navLinks = [
  { href: "/",           label_en: "Home",       label_th: "หน้าหลัก" },
  { href: "/about",      label_en: "About Us",   label_th: "เกี่ยวกับ" },
  { href: "/services",   label_en: "Services",   label_th: "บริการ" },
  { href: "/portfolio",  label_en: "Projects",   label_th: "ผลงาน" },
  { href: "/shop",       label_en: "Shop",       label_th: "สินค้า" },
  { href: "/clients",   label_en: "Clients",   label_th: "ลูกค้า" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const { lang } = useI18n("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const label = (l: { label_en: string; label_th: string }) =>
    lang === "th" ? l.label_th : l.label_en;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-14">

          {/* Logo */}
          <Link href="/" aria-label="HAGX" onClick={() => setOpen(false)}>
            <Image src="/images/hagx-logo.svg" alt="HAGX" width={76} height={30} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-light uppercase tracking-[0.12em] transition-colors duration-200 ${
                  isActive(l.href) ? "text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {label(l)}
              </Link>
            ))}

            {/* divider */}
            <div className="h-4 w-px bg-white/15" />

            <LangSwitch />

            <Link
              href="/contact"
              className="inline-flex h-9 items-center border border-white/25 px-5 text-[11px] font-light uppercase tracking-[0.12em] text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#080808]"
            >
              Contact Us
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-[1.5px] w-5 bg-current origin-center transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-current origin-center transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#080808] md:hidden"
          >
            {/* top bar inside overlay */}
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/[0.06] px-6 sm:px-10">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image src="/images/hagx-logo.svg" alt="HAGX" width={76} height={30} />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[10px] font-light uppercase tracking-widest text-white/40 hover:text-white"
              >
                Close
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* nav links */}
            <nav className="flex flex-1 flex-col justify-center px-6 sm:px-10">
              <div className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-white/[0.06] py-5 text-3xl font-light tracking-tight transition-colors sm:text-4xl ${
                        isActive(l.href) ? "text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      {label(l)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* bottom info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="shrink-0 border-t border-white/[0.06] px-6 py-8 sm:px-10"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-3 text-[9px] font-light uppercase tracking-widest text-white/25">Contact</p>
                  <p className="text-xs font-light text-white/45">hello@hagx.co</p>
                  <p className="mt-1 text-xs font-light text-white/30">Mon–Sat · 09:00–18:00</p>
                </div>
                <div>
                  <p className="mb-3 text-[9px] font-light uppercase tracking-widest text-white/25">Social</p>
                  <div className="flex gap-5 text-xs font-light text-white/45">
                    <a href="https://line.me/ti/p/hagx" target="_blank" rel="noopener noreferrer" className="hover:text-white">LINE</a>
                    <a href="https://instagram.com/hagx.co" target="_blank" rel="noopener noreferrer" className="hover:text-white">IG</a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center border border-white/20 px-7 text-[11px] font-light uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-[#080808]"
                >
                  Contact Us
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
