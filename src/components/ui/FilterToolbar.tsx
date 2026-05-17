"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, SlidersHorizontal } from "lucide-react";
import { Sheet } from "./Sheet";

// ── Types ─────────────────────────────────────────────────────────────────────

export type FilterOption = { value: string; label: string };

export type FilterGroup = {
  key: string;
  label: string;
  type: "multi" | "toggle";
  options?: FilterOption[];
};

export type FilterValues = Record<string, string[] | boolean>;

export type SortConfig = {
  value: string;
  onChange: (v: string) => void;
  options: FilterOption[];
};

export type FilterToolbarProps = {
  groups: FilterGroup[];
  values: FilterValues;
  onChange: (key: string, value: string[] | boolean) => void;
  onClear: () => void;
  search?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
  sort?: SortConfig;
  resultCount?: number;
  totalCount?: number;
  chipLabel?: (key: string, value: string) => string;
  className?: string;
};

// ── Checkbox ──────────────────────────────────────────────────────────────────

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-sm font-light text-foreground-300 transition-colors hover:text-foreground-100">
      <span
        onClick={onChange}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-accent-500 bg-accent-500" : "border-border-300"
        )}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

// ── Active chip ───────────────────────────────────────────────────────────────

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-2 border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-[10px] font-light text-accent-500">
      {label}
      <button onClick={onRemove} className="leading-none opacity-60 transition-opacity hover:opacity-100" aria-label={`ลบ ${label}`}>
        ×
      </button>
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function FilterToolbar({
  groups,
  values,
  onChange,
  onClear,
  search,
  onSearch,
  searchPlaceholder = "ค้นหา...",
  sort,
  resultCount,
  totalCount,
  chipLabel,
  className,
}: FilterToolbarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeCount = groups.reduce((acc, g) => {
    const v = values[g.key];
    if (g.type === "multi") return acc + (Array.isArray(v) ? v.length : 0);
    if (g.type === "toggle") return acc + (v ? 1 : 0);
    return acc;
  }, 0);

  const hasAny = activeCount > 0 || !!search;

  const chips: { key: string; value: string; label: string }[] = [];
  for (const g of groups) {
    const v = values[g.key];
    if (g.type === "multi" && Array.isArray(v)) {
      for (const val of v) {
        const opt = g.options?.find((o) => o.value === val);
        chips.push({ key: g.key, value: val, label: chipLabel ? chipLabel(g.key, val) : (opt?.label ?? val) });
      }
    }
    if (g.type === "toggle" && v === true) {
      chips.push({ key: g.key, value: "__toggle__", label: g.label });
    }
  }

  const removeChip = (key: string, value: string, type: "multi" | "toggle") => {
    if (type === "toggle") onChange(key, false);
    else {
      const curr = (values[key] as string[]) ?? [];
      onChange(key, curr.filter((v) => v !== value));
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* ── Top bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {resultCount !== undefined && (
            <p className="text-sm font-light text-foreground-400">
              <span className="text-foreground-100">{resultCount}</span>
              {totalCount !== undefined && <span> / {totalCount}</span>}
            </p>
          )}

          {onSearch !== undefined && (
            <input
              type="text"
              value={search ?? ""}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 border border-border-300 bg-transparent px-3 text-xs font-light text-foreground-200 placeholder:text-foreground-400 focus:border-accent-500/60 focus:outline-none"
            />
          )}

          {/* Filter trigger */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 border border-border-300 px-3 py-1.5 text-[10px] font-light tracking-widest text-foreground-300 uppercase transition-colors hover:border-foreground-100/50 hover:text-foreground-100"
          >
            <SlidersHorizontal size={12} strokeWidth={1.5} />
            Filter
            {activeCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-medium text-foreground-100">
                {activeCount}
              </span>
            )}
          </button>

          {hasAny && (
            <button
              onClick={() => { onClear(); onSearch?.(""); }}
              className="text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors hover:text-foreground-100"
            >
              ล้างทั้งหมด ×
            </button>
          )}
        </div>

        {/* Sort */}
        {sort && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">เรียง</span>
            {sort.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => sort.onChange(opt.value)}
                className={cn(
                  "text-[10px] font-light tracking-widest uppercase transition-colors",
                  sort.value === opt.value ? "text-accent-500" : "text-foreground-400 hover:text-foreground-100"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Active chips ── */}
      {(chips.length > 0 || search) && (
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => {
            const g = groups.find((g) => g.key === c.key)!;
            return (
              <Chip key={`${c.key}-${c.value}`} label={c.label} onRemove={() => removeChip(c.key, c.value, g.type)} />
            );
          })}
          {search && (
            <span className="flex items-center gap-2 px-3 py-1 text-[10px] font-light text-foreground-400">
              "{search}"
              <button onClick={() => onSearch?.("")} className="leading-none">×</button>
            </span>
          )}
        </div>
      )}

      {/* ── Filter Sheet ── */}
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filter"
        footerSlot={
          <div className="px-6 py-4">
            <button
              onClick={() => setSheetOpen(false)}
              className="w-full border border-accent-500 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase transition-colors hover:bg-accent-500 hover:text-background-100"
            >
              ดูผลลัพธ์{resultCount !== undefined ? ` (${resultCount})` : ""}
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {activeCount > 0 && (
            <button onClick={onClear} className="text-[10px] font-light tracking-widest text-accent-500 uppercase hover:text-foreground-100">
              ล้างทั้งหมด
            </button>
          )}
          {groups.map((g) => (
            <div key={g.key}>
              <p className="mb-3 border-b border-white/[0.08] pb-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">
                {g.label}
              </p>
              {g.type === "multi" && g.options && (
                <div className="space-y-2">
                  {g.options.map((opt) => {
                    const arr = (values[g.key] as string[]) ?? [];
                    return (
                      <FilterCheck
                        key={opt.value}
                        label={opt.label}
                        checked={arr.includes(opt.value)}
                        onChange={() => onChange(g.key, arr.includes(opt.value) ? arr.filter((v) => v !== opt.value) : [...arr, opt.value])}
                      />
                    );
                  })}
                </div>
              )}
              {g.type === "toggle" && (
                <FilterCheck label={g.label} checked={values[g.key] === true} onChange={() => onChange(g.key, !values[g.key])} />
              )}
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
