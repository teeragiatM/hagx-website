"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-border py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Main navigation">
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-widest gold-gradient">HAGX</span>
          <span className="hidden sm:block text-[10px] tracking-[0.2em] text-muted uppercase font-medium">
            Aluminium & Glass
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-content hover:bg-surface rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-gold-400 text-zinc-950 hover:bg-gold-500 transition-colors duration-200"
          >
            Get a Quote
          </a>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg text-muted hover:text-content hover:bg-surface transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-muted hover:text-content hover:bg-surface rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm font-semibold rounded-lg bg-gold-400 text-zinc-950 hover:bg-gold-500 text-center transition-colors"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
