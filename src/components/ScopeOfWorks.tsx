"use client";

import { BorderGrid, BorderGridCell } from "@/components/ui/BorderGrid";

export interface ScopeCategory {
  id: string;
  title: string;
  items: string[];
}

interface ScopeOfWorksProps {
  eyebrow: string;
  subtitle: string;
  footer: string;
  categories: ScopeCategory[];
}

export default function ScopeOfWorks({ eyebrow, subtitle, footer, categories }: ScopeOfWorksProps) {
  return (
    <section className="border-b border-white/[0.06] px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto">
        <div className="mb-10 flex flex-wrap items-baseline gap-3">
          <p className="text-[10px] font-light tracking-widest text-accent-500 uppercase">
            {eyebrow}
          </p>
          <span className="hidden h-px flex-1 bg-white/[0.06] sm:block" />
          <p className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">
            {subtitle}
          </p>
        </div>

        <BorderGrid cols={4}>
          {categories.map((cat, i) => (
            <BorderGridCell key={cat.id} index={i} bg="#0a0a0a">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-light tracking-[0.2em] text-accent-500/70 uppercase">
                    {cat.id}
                  </p>
                  <h3 className="text-foreground text-sm leading-snug font-light sm:text-base">
                    {cat.title}
                  </h3>
                </div>
                <div className="mt-1 h-px w-8 shrink-0 bg-[#E15F31]/30" />
              </div>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#E15F31]/60" />
                    <p className="text-[11px] leading-[1.75] font-light whitespace-pre-line text-foreground-300">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </BorderGridCell>
          ))}
        </BorderGrid>

        <p className="mt-5 text-center text-[10px] leading-relaxed font-light text-foreground-400">
          {footer.split(' — ')[0]} —{' '}
          <span className="text-foreground-400">{footer.split(' — ')[1]}</span>
        </p>
      </div>
    </section>
  );
}
