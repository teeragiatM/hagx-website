"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export default function FadeUp({
  children,
  delay = 0,
  distance = 32,
  className,
  once = true,
}: FadeUpProps) {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: 0.25 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
