/**
 * DataTableColumnVisibility
 *
 * Rules:
 *  __select__ (index 0) — always first, only eye toggle allowed, no pin/drag
 *  Pinned group         — ordered, drag-to-reorder within group
 *  Unpinned group       — ordered, drag-to-reorder within group
 *
 * Button label: "Columns (8) · 📌 (2)"
 */

import { useDataTableKey } from "../context";
import { cn } from "@/lib/utils";
import { useTableSettings } from "@/stores/tableSettingsStore";
import type { Table } from "@tanstack/react-table";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@ui";
import {
  Columns3Icon,
  EyeIcon,
  EyeOffIcon,
  GripVerticalIcon,
  LockIcon,
  PinIcon,
  PinOffIcon,
} from "lucide-react";
import { useState } from "react";

// ─── Drag helpers ─────────────────────────────────────────────────────────────

function useDnd(list: string[], onReorder: (newOrder: string[]) => void) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  return {
    draggingId,
    dragOverId,
    handlers: (id: string) => ({
      draggable: true as const,
      onDragStart: () => setDraggingId(id),
      onDragEnd: () => {
        setDraggingId(null);
        setDragOverId(null);
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverId(id);
      },
      onDrop: () => {
        if (!draggingId || draggingId === id) return;
        const next = [...list];
        const from = next.indexOf(draggingId);
        const to = next.indexOf(id);
        if (from < 0 || to < 0) return;
        next.splice(from, 1);
        next.splice(to, 0, draggingId);
        onReorder(next);
        setDraggingId(null);
        setDragOverId(null);
      },
    }),
  };
}

// ─── Column item ─────────────────────────────────────────────────────────────

function ColItem({
  id: _id,
  label,
  visible,
  onToggleVisible,
  pinned,
  onPin,
  onUnpin,
  locked = false,
  dragHandlers,
  isDragging = false,
  isDragOver = false,
}: {
  id: string;
  label: string;
  visible: boolean;
  onToggleVisible: () => void;
  pinned: boolean;
  onPin?: () => void;
  onUnpin?: () => void;
  locked?: boolean;
  dragHandlers?: ReturnType<ReturnType<typeof useDnd>["handlers"]>;
  isDragging?: boolean;
  isDragOver?: boolean;
}) {
  return (
    <div
      {...(dragHandlers ?? {})}
      className={cn(
        "flex items-center gap-1 rounded px-1.5 py-1.5 transition-colors select-none",
        isDragOver && "border-primary bg-accent/20 border-t-2",
        isDragging ? "opacity-40" : "hover:bg-accent/30"
      )}
    >
      {/* Drag handle or locked icon */}
      {locked ? (
        <LockIcon className="size-3 shrink-0 text-muted-foreground/40" />
      ) : dragHandlers ? (
        <GripVerticalIcon className="size-3 shrink-0 cursor-grab text-muted-foreground/40" />
      ) : (
        <span className="size-3 shrink-0" /> /* spacer */
      )}

      {/* Eye toggle */}
      <button
        title={visible ? "ซ่อนคอลัมน์" : "แสดงคอลัมน์"}
        onClick={onToggleVisible}
        className="p-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
      >
        {visible ? (
          <EyeIcon className="size-3.5" />
        ) : (
          <EyeOffIcon className="size-3.5 opacity-60" />
        )}
      </button>

      {/* Label */}
      <span
        className={cn(
          "flex-1 truncate text-xs",
          !visible && "text-muted-foreground line-through"
        )}
      >
        {label}
      </span>

      {/* Pin / Unpin / lock indicator */}
      {locked ? null : pinned ? (
        <button
          title="ถอดหมุด"
          onClick={onUnpin}
          className="p-0.5 shrink-0 text-accent transition-colors hover:text-accent/70"
        >
          <PinOffIcon className="size-3" />
        </button>
      ) : (
        <button
          title="ปักหมุดคอลัมน์"
          onClick={onPin}
          className="p-0.5 shrink-0 text-muted-foreground transition-colors hover:text-accent"
        >
          <PinIcon className="size-3" />
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DataTableColumnVisibility<T>({ table }: { table: Table<T> }) {
  const {
    pinnedColumns,
    unpinnedOrder,
    pinColumn,
    unpinColumn,
    reorderPinned,
    reorderUnpinned,
  } = useTableSettings(useDataTableKey());

  // DnD for pinned section
  const pinnedDnd = useDnd(pinnedColumns, reorderPinned);
  // DnD for unpinned section
  const unpinnedDnd = useDnd(unpinnedOrder, reorderUnpinned);

  // All columns — split into select / pinned / unpinned
  const allCols = table.getAllLeafColumns();
  const selectCol = allCols.find((c) => c.id === "__select__");
  const dataCols = allCols.filter((c) => c.id !== "__select__");

  const visibleCount = dataCols.filter((c) => c.getIsVisible()).length;
  const pinnedCount = pinnedColumns.filter((id) =>
    dataCols.some((c) => c.id === id)
  ).length;

  const getLabel = (colId: string): string => {
    const col = allCols.find((c) => c.id === colId);
    if (!col) return colId;
    const h = col.columnDef.header;
    return typeof h === "string" ? h : col.id;
  };

  // Ordered pinned cols (filtered to those that exist in current table)
  const pinnedCols = pinnedColumns.filter((id) =>
    dataCols.some((c) => c.id === id)
  );
  // Unpinned cols — respect unpinnedOrder then original order for remainder
  const unpinnedIds = dataCols
    .filter((c) => !pinnedColumns.includes(c.id))
    .map((c) => c.id);
  const unpinnedCols = [
    ...unpinnedOrder.filter((id) => unpinnedIds.includes(id)),
    ...unpinnedIds.filter((id) => !unpinnedOrder.includes(id)),
  ];

  // "Toggle all" toggles data columns only
  const allVisible = dataCols.every((c) => c.getIsVisible());
  const someVisible = dataCols.some((c) => c.getIsVisible());
  const toggleAll = () =>
    dataCols.forEach((c) => c.toggleVisibility(!allVisible));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className={cn(
            "gap-1.5 text-xs",
            (visibleCount < dataCols.length || pinnedCount > 0) &&
              "border-accent/60 text-accent"
          )}
        >
          <Columns3Icon className="size-3" />
          <span>Columns</span>
          <span className="text-muted-foreground">({visibleCount})</span>
          {pinnedCount > 0 && (
            <>
              <span className="text-muted-foreground/50">·</span>
              <PinIcon className="size-3 text-accent" />
              <span className="text-muted-foreground">({pinnedCount})</span>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-2 w-60">
        <div className="space-y-0.5">
          {/* ── Toggle all data columns ───────────────────────────── */}
          <button
            onClick={toggleAll}
            className="flex items-center gap-2 px-2 py-1.5 w-full rounded transition-colors hover:bg-accent/30"
          >
            {allVisible ? (
              <EyeIcon className="size-3.5 shrink-0 text-foreground" />
            ) : someVisible ? (
              <EyeIcon className="size-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <EyeOffIcon className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            <span className="flex-1 text-left text-xs font-medium">
              แสดงทั้งหมด
            </span>
          </button>

          <div className="my-1 h-px bg-border" />

          {/* ── Fixed: Select column ──────────────────────────────── */}
          {selectCol && (
            <>
              <p className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                <LockIcon className="size-2.5" />
                Fixed
              </p>
              <ColItem
                id="__select__"
                label="Select (Checkbox)"
                visible={selectCol.getIsVisible()}
                onToggleVisible={() =>
                  selectCol.toggleVisibility(!selectCol.getIsVisible())
                }
                pinned={false}
                locked
              />
              <div className="my-1 h-px bg-border" />
            </>
          )}

          {/* ── Pinned section ────────────────────────────────────── */}
          {pinnedCols.length > 0 && (
            <>
              <p className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                <PinIcon className="size-2.5 text-accent" />
                <span className="text-accent">Pinned</span>
                <span className="ml-auto">ลากเพื่อเรียงลำดับ</span>
              </p>
              {pinnedCols.map((id) => {
                const col = dataCols.find((c) => c.id === id);
                return (
                  <ColItem
                    key={id}
                    id={id}
                    label={getLabel(id)}
                    visible={col?.getIsVisible() ?? true}
                    onToggleVisible={() =>
                      col?.toggleVisibility(!col.getIsVisible())
                    }
                    pinned
                    onUnpin={() => unpinColumn(id)}
                    dragHandlers={pinnedDnd.handlers(id)}
                    isDragging={pinnedDnd.draggingId === id}
                    isDragOver={
                      pinnedDnd.dragOverId === id && pinnedDnd.draggingId !== id
                    }
                  />
                );
              })}
              <div className="my-1 h-px bg-border" />
            </>
          )}

          {/* ── Unpinned section ──────────────────────────────────── */}
          {unpinnedCols.length > 0 && (
            <>
              {pinnedCols.length > 0 && (
                <p className="px-2 py-0.5 text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                  Normal — ลากเพื่อเรียงลำดับ
                </p>
              )}
              {unpinnedCols.map((id) => {
                const col = dataCols.find((c) => c.id === id);
                return (
                  <ColItem
                    key={id}
                    id={id}
                    label={getLabel(id)}
                    visible={col?.getIsVisible() ?? true}
                    onToggleVisible={() =>
                      col?.toggleVisibility(!col.getIsVisible())
                    }
                    pinned={false}
                    onPin={() => pinColumn(id)}
                    dragHandlers={unpinnedDnd.handlers(id)}
                    isDragging={unpinnedDnd.draggingId === id}
                    isDragOver={
                      unpinnedDnd.dragOverId === id &&
                      unpinnedDnd.draggingId !== id
                    }
                  />
                );
              })}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
