/**
 * DataTableFilterBar — Supabase-style inline filter bar.
 *
 * • Active rules render as editable chips [column] [operator] [value] [×]
 * • Freeform input at the end: type to search columns → select to add rule
 * • Operator and value are inline auto-width inputs; changes apply immediately
 * • Uses Popover (portal) for column suggestions to avoid overflow clipping
 */

import { cn } from "@/lib/utils";
import type { Column, Table } from "@tanstack/react-table";
import {
  Calendar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@ui";
import { format } from "date-fns";
import { CalendarIcon, SearchIcon, XIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { FilterOperator, FilterRule } from "./filter-menu";

// ─── Re-export for convenience ────────────────────────────────────────────────
export type { FilterOperator, FilterRule };

// ─── Operator data ────────────────────────────────────────────────────────────

type OpEntry = { op: FilterOperator; label: string; symbol: string };

const OPERATOR_GROUPS: { group: string; ops: OpEntry[] }[] = [
  {
    group: "COMPARISON",
    ops: [
      { op: "=", label: "Equals", symbol: "=" },
      { op: "<>", label: "Not equal", symbol: "<>" },
      { op: ">", label: "Greater than", symbol: ">" },
      { op: "<", label: "Less than", symbol: "<" },
      { op: ">=", label: "Greater or equal", symbol: ">=" },
      { op: "<=", label: "Less or equal", symbol: "<=" },
    ],
  },
  {
    group: "PATTERN MATCHING",
    ops: [
      { op: "~~", label: "Like", symbol: "~~" },
      { op: "~~*", label: "iLike", symbol: "~~*" },
    ],
  },
  {
    group: "SET & NULL CHECKS",
    ops: [
      { op: "in", label: "In list", symbol: "in" },
      { op: "is", label: "Is", symbol: "is" },
    ],
  },
];

const ALL_OPS = OPERATOR_GROUPS.flatMap((g) => g.ops);
const getOpEntry = (op: FilterOperator) => ALL_OPS.find((o) => o.op === op);

// ─── Auto-width input ─────────────────────────────────────────────────────────

function AutoInput({
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  onKeyDown,
  inputRef,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  className?: string;
}) {
  return (
    <div className="inline-block relative min-w-[4px]">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoComplete="off"
        data-1p-ignore="true"
        data-lpignore="true"
        className={cn(
          "absolute inset-0 w-full border-none bg-transparent px-1 py-0 text-xs",
          "focus:shadow-none focus:ring-0 focus:outline-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "placeholder:text-muted-foreground",
          className
        )}
      />
      <span
        aria-hidden
        className={cn(
          "invisible block shrink-0 px-1 text-xs whitespace-pre",
          className
        )}
      >
        {value || placeholder || "\u00a0"}
      </span>
    </div>
  );
}

// ─── Operator picker ──────────────────────────────────────────────────────────

function OperatorPicker({
  value,
  onChange,
}: {
  value: FilterOperator;
  onChange: (op: FilterOperator) => void;
}) {
  const [open, setOpen] = useState(false);
  const entry = getOpEntry(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen(true)}
          className="flex items-center px-1 h-full text-foreground text-xs font-mono rounded cursor-pointer hover:bg-accent/10 focus:outline-none"
        >
          {entry?.symbol ?? value}
        </button>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        className="p-0 w-64"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="py-1 max-h-72 overflow-y-auto">
          {OPERATOR_GROUPS.map((g, gi) => (
            <div key={g.group}>
              {gi > 0 && <div className="my-1 h-px bg-border" />}
              <div className="px-2 py-1.5 text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                {g.group}
              </div>
              {g.ops.map((o) => (
                <div
                  key={o.op}
                  role="option"
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 px-2 py-1.5 text-xs select-none",
                    value === o.op
                      ? "bg-accent/30 text-foreground"
                      : "hover:bg-accent/10 text-foreground"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(o.op);
                    setOpen(false);
                  }}
                >
                  <span>{o.label}</span>
                  <span className="px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono rounded bg-muted">
                    {o.symbol}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ─── Value input inside chip ──────────────────────────────────────────────────

function ChipValueInput({
  operator,
  colType,
  value,
  onChange,
}: {
  operator: FilterOperator;
  colType?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [calOpen, setCalOpen] = useState(false);

  if (operator === "is") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            tabIndex={-1}
            className="flex items-center px-1 h-full text-foreground text-xs cursor-pointer hover:text-foreground/80 focus:outline-none"
          >
            {value || <span className="text-muted-foreground">select…</span>}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => onChange("null")}>
            null
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onChange("not null")}>
            not null
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (colType === "date") {
    const parsed = value ? new Date(value) : undefined;
    return (
      <Popover open={calOpen} onOpenChange={setCalOpen}>
        <PopoverAnchor asChild>
          <button
            tabIndex={-1}
            onClick={() => setCalOpen(true)}
            className="flex items-center gap-1 px-1 h-full text-foreground text-xs cursor-pointer hover:text-foreground/80 focus:outline-none"
          >
            <CalendarIcon className="size-3 text-muted-foreground" />
            {value ? (
              format(new Date(value), "dd/MM/yyyy")
            ) : (
              <span className="text-muted-foreground">pick date</span>
            )}
          </button>
        </PopoverAnchor>
        <PopoverContent align="start" className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={parsed}
            onSelect={(d) => {
              if (d) {
                onChange(format(d, "yyyy-MM-dd"));
                setCalOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <AutoInput
      value={value}
      placeholder={operator === "in" ? "a, b, c" : "value"}
      onChange={onChange}
    />
  );
}

// ─── Single filter chip ───────────────────────────────────────────────────────

function FilterChip<T>({
  rule,
  columns,
  onChange,
  onRemove,
}: {
  rule: FilterRule;
  columns: Column<T, unknown>[];
  onChange: (updated: FilterRule) => void;
  onRemove: () => void;
}) {
  const col = columns.find((c) => c.id === rule.columnId);
  const colType = col?.columnDef.meta?.type;

  const getColLabel = (id: string) => {
    const c = columns.find((x) => x.id === id);
    if (!c) return id;
    const h = c.columnDef.header;
    return typeof h === "string" ? h : id;
  };

  return (
    <div className="flex items-stretch h-6.5 shrink-0 overflow-hidden border border-border rounded bg-muted">
      {/* Column label → dropdown to change column */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            tabIndex={-1}
            className="flex items-center pl-2 pr-1 h-full shrink-0 text-muted-foreground text-xs whitespace-nowrap transition-colors cursor-pointer hover:text-foreground focus:outline-none"
          >
            {getColLabel(rule.columnId)}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-60 overflow-auto">
          {columns.map((c) => {
            const h = c.columnDef.header;
            const label = typeof h === "string" ? h : c.id;
            return (
              <DropdownMenuItem
                key={c.id}
                onSelect={() =>
                  onChange({ ...rule, columnId: c.id, value: "" })
                }
              >
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Operator */}
      <OperatorPicker
        value={rule.operator}
        onChange={(op) => onChange({ ...rule, operator: op, value: "" })}
      />

      {/* Value */}
      <div className="flex items-center max-w-[160px]">
        <ChipValueInput
          operator={rule.operator}
          colType={colType}
          value={rule.value}
          onChange={(v) => onChange({ ...rule, value: v })}
        />
      </div>

      {/* Remove */}
      <button
        tabIndex={-1}
        aria-label={`Remove ${rule.columnId} filter`}
        onMouseDown={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="px-1 h-full text-muted-foreground transition-colors cursor-pointer hover:text-foreground focus:outline-none"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export type DataTableFilterBarProps<T> = {
  table: Table<T>;
  filterRules: FilterRule[];
  onFilterRulesChange: (rules: FilterRule[]) => void;
  className?: string;
};

export function DataTableFilterBar<T>({
  table,
  filterRules,
  onFilterRulesChange,
  className,
}: DataTableFilterBarProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filterable = table
    .getAllLeafColumns()
    .filter((c) => c.id !== "__select__");

  const q = inputValue.trim().toLowerCase();
  const matchedColumns = filterable.filter((c) => {
    const h = c.columnDef.header;
    const label = typeof h === "string" ? h : c.id;
    return (
      !q || label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  });

  const handleAdd = useCallback(
    (columnId: string) => {
      onFilterRulesChange([
        ...filterRules,
        { columnId, operator: "~~*", value: "" },
      ]);
      setInputValue("");
      setSuggestOpen(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    },
    [filterRules, onFilterRulesChange]
  );

  const handleChange = (index: number, updated: FilterRule) => {
    onFilterRulesChange(filterRules.map((r, i) => (i === index ? updated : r)));
  };

  const handleRemove = (index: number) => {
    onFilterRulesChange(filterRules.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSuggestOpen(false);
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "" && filterRules.length > 0) {
      handleRemove(filterRules.length - 1);
    }
  };

  return (
    <Popover open={suggestOpen}>
      <PopoverAnchor asChild>
        <div
          ref={containerRef}
          className={cn(
            "border-input bg-background relative flex min-h-8 flex-1 cursor-text items-center gap-1 rounded-md border px-1.5",
            "focus-within:ring-ring transition-shadow focus-within:ring-1",
            className
          )}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
              inputRef.current?.focus();
            }
          }}
        >
          {/* Search icon */}
          <SearchIcon className="ml-0.5 size-3.5 shrink-0 text-muted-foreground" />

          {/* Filter chips */}
          <div
            className="flex flex-wrap flex-1 items-center gap-1 py-0.5 min-w-0"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                e.preventDefault();
                inputRef.current?.focus();
              }
            }}
          >
            {filterRules.map((rule, i) => (
              <FilterChip
                key={i}
                rule={rule}
                columns={filterable}
                onChange={(updated) => handleChange(i, updated)}
                onRemove={() => handleRemove(i)}
              />
            ))}

            {/* Freeform input — always shows suggestion list when focused */}
            <AutoInput
              inputRef={inputRef}
              value={inputValue}
              placeholder={
                filterRules.length === 0
                  ? "Search or filter..."
                  : "Add filter..."
              }
              onChange={(v) => {
                setInputValue(v);
                setSuggestOpen(true);
              }}
              onFocus={() => setSuggestOpen(true)}
              onBlur={(e) => {
                // Close only when focus leaves the entire filter bar (not into a chip/button)
                if (!containerRef.current?.contains(e.relatedTarget as Node)) {
                  setSuggestOpen(false);
                }
              }}
              onKeyDown={handleKeyDown}
              className="min-w-28"
            />
          </div>

          {/* Clear all */}
          {filterRules.length > 0 && (
            <button
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                onFilterRulesChange([]);
              }}
              className="p-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
              aria-label="Clear all filters"
            >
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      </PopoverAnchor>

      {/* Column suggestion dropdown — portal avoids overflow clipping */}
      <PopoverContent
        align="start"
        className="p-0 w-52"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          // Close only if interaction is outside the filter bar container
          if (!containerRef.current?.contains(e.target as Node)) {
            setSuggestOpen(false);
          }
        }}
      >
        {matchedColumns.length === 0 ? (
          <div className="px-2 py-3 text-center text-muted-foreground text-xs">
            No columns found
          </div>
        ) : (
          <>
            <div className="px-2 py-1.5 text-[10px] text-muted-foreground font-mono tracking-wider border-b border-border uppercase">
              Filter by column
            </div>
            <div className="py-1 max-h-60 overflow-y-auto">
              {matchedColumns.map((c) => {
                const h = c.columnDef.header;
                const label = typeof h === "string" ? h : c.id;
                return (
                  <div
                    key={c.id}
                    className="px-2 py-1.5 text-foreground text-xs cursor-pointer select-none hover:bg-accent/20"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleAdd(c.id);
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
