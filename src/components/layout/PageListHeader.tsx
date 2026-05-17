"use client";

import { Search, SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spacer } from "@ui/Spacer";

export type PageListTab = { value: string; label: string };

export type PageListHeaderProps = {
  title: string;
  /** Pill-style category tabs */
  tabs?: PageListTab[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  allLabel?: string;
  search?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
  /** Called when the filter icon button is clicked */
  onFilterOpen?: () => void;
  /** Highlights filter button when any filter is active */
  filterActive?: boolean;
  /** View mode toggle — pass current value + setter to show Grid/List buttons */
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  /** Sort options shown as pill buttons next to view toggle */
  sortOptions?: { value: string; label: string }[];
  sort?: string;
  onSortChange?: (value: string) => void;
  className?: string;
};

export function PageListHeader({
  title,
  tabs,
  activeTab = "ALL",
  onTabChange,
  allLabel = "ทั้งหมด",
  search = "",
  onSearch,
  searchPlaceholder = "ค้นหา...",
  onFilterOpen,
  filterActive = false,
  viewMode,
  onViewModeChange,
  sortOptions,
  sort,
  onSortChange,
  className,
}: PageListHeaderProps) {
  return (
    <div className={cn("border-b border-white/[0.06] pb-8", className)}>
      <Spacer h={78} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category tabs */}
        {tabs && tabs.length > 0 && (
          <nav className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => onTabChange?.("ALL")}
              className={`rounded-full px-3.5 py-1 text-xs font-light transition-colors ${
                activeTab === "ALL"
                  ? "bg-foreground-100 text-[#0a0a0a]"
                  : "text-foreground-400 hover:text-foreground-100"
              }`}
            >
              {allLabel}
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(activeTab === tab.value ? "ALL" : tab.value)}
                className={`rounded-full px-3.5 py-1 text-xs font-light transition-colors ${
                  activeTab === tab.value
                    ? "bg-foreground-100 text-[#0a0a0a]"
                    : "text-foreground-400 hover:text-foreground-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Search + filter button */}
        {(onSearch || onFilterOpen) && (
          <div className="flex shrink-0 items-center gap-2">
            {onSearch && (
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-foreground-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-8 w-48 rounded-full border border-white/10 bg-white/[0.04] pl-8 pr-3 text-xs text-foreground-100 placeholder:text-foreground-400 focus:border-white/20 focus:outline-none sm:w-56"
                />
                {search && (
                  <button
                    onClick={() => onSearch("")}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-foreground-400 hover:text-foreground-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
            {sortOptions && sortOptions.length > 0 && onSortChange && (
              <div className="flex items-center gap-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onSortChange(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-light tracking-widest uppercase transition-colors",
                      sort === opt.value
                        ? "bg-foreground-100 text-[#0a0a0a]"
                        : "text-foreground-400 hover:text-foreground-100"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {viewMode && onViewModeChange && (
              <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04]">
                <button
                  onClick={() => onViewModeChange("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    viewMode === "grid" ? "text-foreground-100" : "text-foreground-400 hover:text-foreground-200"
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onViewModeChange("list")}
                  aria-label="List view"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    viewMode === "list" ? "text-foreground-100" : "text-foreground-400 hover:text-foreground-200"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {onFilterOpen && (
              <button
                onClick={onFilterOpen}
                aria-label="เปิดตัวกรอง"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                  filterActive
                    ? "border-accent-500/60 bg-accent-500/10 text-accent-500"
                    : "border-white/10 bg-white/[0.04] text-foreground-400 hover:text-foreground-100"
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
