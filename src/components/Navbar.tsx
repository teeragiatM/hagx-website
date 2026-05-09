"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "บริการ", href: "#services" },
  { label: "ผลงาน", href: "#portfolio" },
  { label: "ขั้นตอน", href: "#process" },
  { label: "ติดต่อ", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#" className="text-xl font-light tracking-[0.3em] text-slate-900 uppercase">
          HAGX
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-200 ${
                scrolled ? "text-slate-500 hover:text-slate-900" : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`text-xs tracking-[0.15em] uppercase font-light px-5 py-2.5 border transition-all duration-200 ${
              scrolled
                ? "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                : "border-white/60 text-white hover:bg-white hover:text-slate-900"
            }`}
          >
            สอบถามราคา
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col px-8 py-6 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs tracking-[0.15em] uppercase font-light text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-xs tracking-[0.15em] uppercase font-light px-5 py-2.5 border border-slate-900 text-slate-900 text-center"
              >
                สอบถามราคา
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
