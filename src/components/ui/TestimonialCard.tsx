"use client";

import { motion } from "framer-motion";
import {
  MediaCardBody,
  MediaCardEyebrow,
  MediaCardTitle,
  MediaCardExcerpt,
} from "./MediaCard";

export type TestimonialItem = {
  client: string;
  project: string;
  scope: string;
  quote: string;
};

export function TestimonialCard({
  item,
  isFocus = true,
}: {
  item: TestimonialItem;
  isFocus?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0.72 }}
      animate={{ opacity: isFocus ? 1 : 0.52 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="ui-testimonial-card relative flex h-full min-h-[420px] flex-col overflow-hidden border border-white/[0.07] bg-background-200"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(219,88,40,0.12), transparent 62%)",
        }}
      />
      <MediaCardBody className="relative justify-between">
        <div>
          <div className="mb-5 inline-flex items-center border border-accent-500/30 px-4 py-2">
            <span className="text-base font-bold text-accent-500">{item.client}</span>
          </div>
          <MediaCardEyebrow>{item.scope}</MediaCardEyebrow>
          <MediaCardTitle className="mb-4 text-xl font-semibold group-hover:text-foreground-100">
            {item.project}
          </MediaCardTitle>
          <MediaCardExcerpt className="mb-0 line-clamp-none text-sm leading-7 text-foreground-300">
            {item.quote}
          </MediaCardExcerpt>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <span className="h-0.5 w-6 bg-accent-500" />
          <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">
            {item.client}
          </span>
        </div>
      </MediaCardBody>
    </motion.article>
  );
}
