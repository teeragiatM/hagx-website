/**
 * DataTableFilterMenu — Supabase-style multi-rule filter panel.
 *
 * Each rule: [column] [operator] [value]
 * Operators grouped by: COMPARISON / PATTERN MATCHING / SET & NULL CHECKS
 * Value input adapts to column type:
 *   - date column  → Calendar picker
 *   - "is" op      → null / not null dropdown
 *   - "in" op      → comma-separated text
 *   - others       → plain text input
 */

import { cn } from "@/lib/utils";
import type { Column, Table } from "@tanstack/react-table";
import {
  Button,
  Calendar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDownIcon,
  FilterIcon,
  GripVerticalIcon,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterOperator =
  | "="
  | "<>"
  | ">"
  | "<"
  | ">="
  | "<="
  | "~~"
  | "~~*"
  | "in"
  | "is";

export type FilterRule = {
  columnId: string;
  operator: FilterOperator;
  value: string;
};

// ─── Operator definitions ─────────────────────────────────────────────────────

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

function getOpLabel(op: FilterOperator) {
  for (const g of OPERATOR_GROUPS) {
    const found = g.ops.find((o) => o.op === op);
    if (found) return found.label;
  }
  return op;
}

// ─── Operator picker popover ─────────────────────────────────────────────────

function OperatorPicker({
  value,
  onChange,
}: {
  value: FilterOperator;
  onChange: (op: FilterOperator) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className="justify-between gap-1 px-2 min-w-20 text-xs"
        >
          <span className="truncate">{getOpLabel(value)}</span>
          <ChevronDownIcon className="size-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-72 min-w-55">
        <div className="py-1 max-h-75 overflow-y-auto">
          {OPERATOR_GROUPS.map((g, gi) => (
            <div key={g.group}>
              {gi > 0 && <div className="my-1 h-px bg-border" />}
              <div className="px-2 py-1.5 text-muted-foreground text-xs font-mono">
                {g.group}
              </div>
              {g.ops.map((o) => (
                <div
                  key={o.op}
                  role="option"
                  className={cn(
                    "relative flex cursor-pointer items-center justify-between gap-2 px-2 py-1.5 text-xs outline-none select-none",
                    value === o.op
                      ? "bg-accent/40 text-foreground"
                      : "hover:bg-accent/20 text-foreground"
                  )}
                  onClick={() => {
                    onChange(o.op);
                    setOpen(false);
                  }}
                >
                  <span>{o.label}</span>
                  <span className="px-1.5 py-0.5 ml-auto text-muted-foreground font-mono rounded bg-muted">
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

// ─── Value input ──────────────────────────────────────────────────────────────

function ValueInput({
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

  // "is" → null / not null picker
  if (operator === "is") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="1"
            className="justify-between px-2 min-w-[100px] text-xs"
          >
            {value || "เลือก..."}
            <ChevronDownIcon className="ml-1 size-3 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onChange("null")}>
            null
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChange("not null")}>
            not null
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // date column → Calendar
  if (colType === "date") {
    const parsed = value ? new Date(value) : undefined;
    return (
      <Popover open={calOpen} onOpenChange={setCalOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="1"
            className="justify-start gap-1.5 px-2 min-w-[110px] text-xs"
          >
            <CalendarIcon className="size-3 shrink-0 text-muted-foreground" />
            {value ? format(new Date(value), "dd/MM/yyyy") : "เลือกวัน..."}
          </Button>
        </PopoverTrigger>
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

  // default → text input
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={operator === "in" ? "a, b, c" : "value..."}
      className="flex-1 min-w-[100px] text-xs"
    />
  );
}

// ─── Single filter row ────────────────────────────────────────────────────────

function FilterRuleRow<T>({
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
    <div className="flex items-center gap-1.5 px-3 py-1.5">
      <GripVerticalIcon className="size-3.5 shrink-0 text-muted-foreground cursor-grab" />

      {/* Column picker */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="1"
            className="justify-between gap-1 px-2 min-w-[100px] text-xs"
          >
            <span className="truncate">{getColLabel(rule.columnId)}</span>
            <ChevronDownIcon className="size-3 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-60 overflow-auto">
          {columns.map((c) => {
            const h = c.columnDef.header;
            const label = typeof h === "string" ? h : c.id;
            return (
              <DropdownMenuItem
                key={c.id}
                onClick={() => onChange({ ...rule, columnId: c.id })}
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
      <ValueInput
        operator={rule.operator}
        colType={colType}
        value={rule.value}
        onChange={(v) => onChange({ ...rule, value: v })}
      />

      <Button
        iconOnly
        variant="ghost"
        className="size-6 shrink-0"
        onClick={onRemove}
      >
        <XIcon className="size-3" />
      </Button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export type DataTableFilterMenuProps<T> = {
  table: Table<T>;
  filterRules: FilterRule[];
  onFilterRulesChange: (rules: FilterRule[]) => void;
};

export function DataTableFilterMenu<T>({
  table,
  filterRules,
  onFilterRulesChange,
}: DataTableFilterMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterRule[]>([]);
  const openedRef = useRef(false);

  const filterable = table
    .getAllLeafColumns()
    .filter((c) => c.id !== "__select__");

  const handleOpen = (v: boolean) => {
    if (v && !openedRef.current) setDraft(filterRules);
    openedRef.current = v;
    setOpen(v);
  };

  const handleAdd = () => {
    const first = filterable[0];
    if (!first) return;
    setDraft((prev) => [
      ...prev,
      { columnId: first.id, operator: "=", value: "" },
    ]);
  };

  const handleChange = (index: number, updated: FilterRule) => {
    setDraft((prev) => prev.map((r, i) => (i === index ? updated : r)));
  };

  const handleRemove = (index: number) => {
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApply = () => {
    onFilterRulesChange(
      draft.filter((r) => r.value !== "" || r.operator === "is")
    );
    setOpen(false);
  };

  const handleClear = () => {
    setDraft([]);
    onFilterRulesChange([]);
    setOpen(false);
  };

  const activeCount = filterRules.length;

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className={cn(
            "gap-1.5 text-xs",
            activeCount > 0 && "border-accent text-accent"
          )}
        >
          <FilterIcon className="size-3" />
          Filter
          {activeCount > 0 && (
            <span className="px-1 ml-0.5 text-[10px] rounded-full tabular-nums bg-accent/20">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-auto min-w-[480px]">
        <div className="py-2 space-y-0">
          {draft.length === 0 ? (
            <div className="px-3 py-3 text-muted-foreground text-xs">
              ยังไม่มี Filter — กด "เพิ่ม Filter" เพื่อเริ่ม
            </div>
          ) : (
            draft.map((rule, i) => (
              <FilterRuleRow
                key={i}
                rule={rule}
                columns={filterable}
                onChange={(updated) => handleChange(i, updated)}
                onRemove={() => handleRemove(i)}
              />
            ))
          )}

          <div className="mx-3 my-1 h-px bg-border" />

          <div className="flex items-center justify-between gap-2 px-3">
            <Button
              variant="outline"
              size="1"
              className="text-xs border-dashed"
              onClick={handleAdd}
            >
              + เพิ่ม Filter
            </Button>

            <div className="flex items-center gap-1.5">
              {(draft.length > 0 || activeCount > 0) && (
                <Button
                  variant="ghost"
                  size="1"
                  className="text-xs"
                  onClick={handleClear}
                >
                  ล้างทั้งหมด
                </Button>
              )}
              <Button
                size="1"
                className="text-xs"
                onClick={handleApply}
                disabled={draft.length === 0 && activeCount === 0}
              >
                Apply filter
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
