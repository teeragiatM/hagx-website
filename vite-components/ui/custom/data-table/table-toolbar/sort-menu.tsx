/**
 * DataTableSortMenu — Supabase-style multi-column sort panel.
 *
 * - Shows all active sorts as draggable rows (sort by / then by)
 * - Toggle asc/desc per rule
 * - Remove individual rule
 * - Pick additional columns from dropdown
 * - Apply / clear all
 */

import { cn } from "@/lib/utils";
import type { SortingState, Table } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from "@ui";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  GripVerticalIcon,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";

// ─── Sort rule row ────────────────────────────────────────────────────────────

function SortRuleRow({
  index,
  columnId,
  desc,
  label,
  onToggleDir,
  onRemove,
}: {
  index: number;
  columnId: string;
  desc: boolean;
  label: string;
  onToggleDir: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <GripVerticalIcon className="size-3.5 shrink-0 text-muted-foreground cursor-grab" />

      <div className="flex-1 min-w-0">
        <span className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground text-xs">
            {index === 0 ? "sort by" : "then by"}
          </span>
          <span className="text-xs font-medium truncate">{label}</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <label className="text-muted-foreground text-xs">ascending:</label>
        <Switch
          checked={!desc}
          onCheckedChange={() => onToggleDir(columnId)}
          className="w-[32px] h-[18px]"
        />
      </div>

      <Button
        variant="ghost"
        size="2" iconOnly
        className="size-6 shrink-0"
        onClick={() => onRemove(columnId)}
      >
        <XIcon className="size-3" />
      </Button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DataTableSortMenu<T>({ table }: { table: Table<T> }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<SortingState>([]);
  const openRef = useRef(false);

  const handleOpenChange = (v: boolean) => {
    if (v && !openRef.current) {
      setDraft(table.getState().sorting);
    }
    openRef.current = v;
    setOpen(v);
  };

  const activeSortIds = new Set(draft.map((s) => s.id));

  const availableColumns = table
    .getAllLeafColumns()
    .filter(
      (col) =>
        col.getCanSort() &&
        !activeSortIds.has(col.id) &&
        col.id !== "__select__"
    );

  const getLabel = (id: string) => {
    const col = table.getColumn(id);
    if (!col) return id;
    const h = col.columnDef.header;
    return typeof h === "string" ? h : id;
  };

  const handleAdd = (columnId: string) => {
    setDraft((prev) => [...prev, { id: columnId, desc: false }]);
  };

  const handleToggleDir = (columnId: string) => {
    setDraft((prev) =>
      prev.map((s) => (s.id === columnId ? { ...s, desc: !s.desc } : s))
    );
  };

  const handleRemove = (columnId: string) => {
    setDraft((prev) => prev.filter((s) => s.id !== columnId));
  };

  const handleApply = () => {
    table.setSorting(draft);
    setOpen(false);
  };

  const handleClear = () => {
    setDraft([]);
    table.setSorting([]);
    setOpen(false);
  };

  const activeCount = table.getState().sorting.length;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className={cn(
            "gap-1.5 text-xs",
            activeCount > 0 && "border-accent text-accent"
          )}
        >
          <ArrowUpDownIcon className="size-3" />
          Sort
          {activeCount > 0 && (
            <span className="px-1 ml-0.5 text-[10px] rounded-full tabular-nums bg-accent/20">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-96">
        <div className="py-2 space-y-0">
          {draft.length === 0 ? (
            <div className="px-3 py-3 text-muted-foreground text-xs">
              ยังไม่มีการ Sort — เลือกคอลัมด้านล่าง
            </div>
          ) : (
            draft.map((rule, i) => (
              <SortRuleRow
                key={rule.id}
                index={i}
                columnId={rule.id}
                desc={rule.desc}
                label={getLabel(rule.id)}
                onToggleDir={handleToggleDir}
                onRemove={handleRemove}
              />
            ))
          )}

          <div className="mx-3 my-1 h-px bg-border" />

          <div className="flex items-center justify-between gap-2 px-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="1"
                  className="text-xs border-dashed"
                  disabled={availableColumns.length === 0}
                >
                  {draft.length === 0 ? "เลือกคอลัม" : "เพิ่มคอลัม"}
                  <ChevronDownIcon className="ml-1 size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-60 overflow-auto"
              >
                {availableColumns.map((col) => (
                  <DropdownMenuItem
                    key={col.id}
                    onClick={() => handleAdd(col.id)}
                  >
                    {getLabel(col.id)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                Apply sorting
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
