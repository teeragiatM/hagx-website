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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-slate-100 bg-white/95 py-4 backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <a
          href="#"
          className="text-xl font-light tracking-[0.3em] text-slate-900 uppercase"
        >
          HAGX
        </a>

        <nav className="hidden items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs font-light tracking-[0.15em] uppercase transition-colors duration-200 ${
                scrolled
                  ? 'text-slate-500 hover:text-slate-900'
                  : 'text-foreground-200 hover:text-foreground-100'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`border px-5 py-2.5 text-xs font-light tracking-[0.15em] uppercase transition-all duration-200 ${
              scrolled
                ? 'border-background-100 text-background-100 hover:bg-background-100 hover:text-foreground-100'
                : 'border-foreground-100/60 text-foreground-100 hover:bg-foreground-100 hover:text-background-100'
            }`}
          >
            สอบถามราคา
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`transition-colors md:hidden ${scrolled ? 'text-slate-900' : 'text-foreground-100'}`}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-5 px-8 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs font-light tracking-[0.15em] text-slate-500 uppercase transition-colors hover:text-slate-900"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="border border-slate-900 px-5 py-2.5 text-center text-xs font-light tracking-[0.15em] text-slate-900 uppercase"
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
