"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type AdminAction = {
  label: string;
  href: string;
  accent?: boolean;
};

type Props = {
  actions: AdminAction[];
};

export default function AdminFab({ actions }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="fixed right-6 bottom-6 z-[300] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-1.5 mb-1"
          >
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                onClick={() => setOpen(false)}
                className={`flex h-9 items-center gap-2 border px-4 text-[10px] font-light tracking-widest uppercase backdrop-blur-sm transition-colors whitespace-nowrap ${
                  action.accent
                    ? "border-accent-500/60 bg-accent-500/15 text-accent-500 hover:bg-accent-500/25"
                    : "border-white/10 bg-black/60 text-foreground-200 hover:border-white/25 hover:text-foreground-100"
                }`}
              >
                <Plus className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                {action.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Admin actions"
        className="flex h-12 w-12 items-center justify-center border border-accent-500/70 bg-accent-500 text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 active:scale-95"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="h-5 w-5" strokeWidth={1.5} />
        </motion.div>
      </button>
    </div>
  );
}
