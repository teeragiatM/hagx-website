/**
 * DataTableGrid — CSS Grid table with:
 *  - Sticky header + sticky __select__ column + sticky pinned columns
 *  - Column resize via drag handle
 *  - Skeleton rows during load (matches column count — no layout shift)
 *  - Empty state with optional "clear filters" action
 *  - Right-click ContextMenu per row (edit / select / delete)
 *  - Expand button (Maximize2) in the __select__ cell on hover
 */

"use no memo";

import { cn } from "@/lib/utils";
import { useTableSettings } from "@/stores/tableSettingsStore";
import {
  type Column,
  type Row,
  type Table as TanstackTable,
  flexRender,
} from "@tanstack/react-table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@ui";
import {
  FilterXIcon,
  Loader2Icon,
  Maximize2Icon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useDataTableKey } from "./context";

// ─── Density ─────────────────────────────────────────────────────────────────

const DENSITY_Y = {
  default: "py-2",
  comfortable: "py-3.5",
  compact: "py-1",
} as const;

const SELECT_COL = "__select__";

// ─── Grid template ────────────────────────────────────────────────────────────

function getGridTemplate<T>(
  columns: Column<T, unknown>[],
  widths: Record<string, number>
): string {
  return columns
    .map((col) => {
      const w = widths[col.id] ?? col.columnDef.meta?.width;
      return w ? `${w}px` : "minmax(120px, 1fr)";
    })
    .join(" ");
}

// ─── Sticky offset calculator ─────────────────────────────────────────────────
// __select__ is always sticky-left at position 0.
// Pinned columns follow immediately after, accumulating width.

function getStickyOffsets<T>(
  columns: Column<T, unknown>[],
  widths: Record<string, number>,
  pinnedColumns: string[]
): Record<string, number> {
  const offsets: Record<string, number> = {};
  let acc = 0;
  for (const col of columns) {
    if (col.id === SELECT_COL || pinnedColumns.includes(col.id)) {
      offsets[col.id] = acc;
      acc += widths[col.id] ?? col.columnDef.meta?.width ?? 120;
    }
  }
  return offsets;
}

// ─── Resize handle ────────────────────────────────────────────────────────────

function ResizeHandle({
  columnId,
  onResize,
}: {
  columnId: string;
  onResize: (id: string, delta: number) => void;
}) {
  const startX = useRef<number>(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startX.current = e.clientX;

      const onMove = (ev: MouseEvent) => {
        onResize(columnId, ev.clientX - startX.current);
        startX.current = ev.clientX;
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [columnId, onResize]
  );

  return (
    <div
      className="absolute top-0 right-0 z-10 w-1 h-full cursor-col-resize select-none touch-none hover:bg-accent active:bg-accent/80"
      onMouseDown={onMouseDown}
    />
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow({ gridTemplate }: { gridTemplate: string }) {
  return (
    <div
      className="grid border-b border-border last:border-b-0"
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {gridTemplate.split(" ").map((_, i) => (
        <div
          key={i}
          className="flex items-center px-3 py-2 border-border border-r last:border-r-0"
        >
          <div className="h-3.5 rounded bg-muted animate-pulse w-3/4" />
        </div>
      ))}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function GridHeader<T>({
  table,
  widths,
  pinnedColumns,
  density,
  onResize,
}: {
  table: TanstackTable<T>;
  widths: Record<string, number>;
  pinnedColumns: string[];
  density: keyof typeof DENSITY_Y;
  onResize: (id: string, delta: number) => void;
}) {
  const leafColumns = table.getVisibleLeafColumns();
  const gridTemplate = getGridTemplate(leafColumns, widths);
  const stickyLeft = getStickyOffsets(leafColumns, widths, pinnedColumns);

  return (
    <div
      data-slot="data-table-header"
      className="sticky top-0 z-40 border-b border-border backdrop-blur-sm bg-muted/70"
    >
      {table.getHeaderGroups().map((hg) => (
        <div
          key={hg.id}
          className="grid"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {hg.headers.map((header) => {
            const isSelectCol = header.column.id === SELECT_COL;
            const isPinned =
              !isSelectCol && pinnedColumns.includes(header.column.id);
            const isSticky = isSelectCol || isPinned;
            const canSort = header.column.getCanSort();
            const canResize = header.column.columnDef.enableResizing !== false;
            const sorted = header.column.getIsSorted();
            const sortIndex = header.column.getSortIndex();
            const leftPx = stickyLeft[header.column.id];

            return (
              <div
                key={header.id}
                className={cn(
                  "relative flex items-center gap-1 px-3",
                  DENSITY_Y[density],
                  "text-muted-foreground truncate text-xs font-medium select-none",
                  "border-border border-r last:border-r-0",
                  header.column.columnDef.meta?.align === "right" &&
                    "justify-end",
                  header.column.columnDef.meta?.align === "center" &&
                    "justify-center",
                  canSort && "hover:text-foreground cursor-pointer",
                  isSticky &&
                    "bg-muted/90 sticky shadow-[1px_0_0_0_hsl(var(--border))]",
                  isSelectCol && "z-30",
                  isPinned && "z-20"
                )}
                style={
                  isSticky && leftPx !== undefined
                    ? { left: leftPx }
                    : undefined
                }
                onClick={
                  canSort ? header.column.getToggleSortingHandler() : undefined
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                {sorted && (
                  <span className="shrink-0 text-[10px] opacity-70">
                    {sorted === "asc" ? "↑" : "↓"}
                    {sortIndex >= 0 && (
                      <sup className="ml-px">{sortIndex + 1}</sup>
                    )}
                  </span>
                )}

                {canResize && (
                  <ResizeHandle
                    columnId={header.column.id}
                    onResize={onResize}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Body row ─────────────────────────────────────────────────────────────────

function GridRow<T>({
  row,
  gridTemplate,
  pinnedColumns,
  stickyLeft,
  density,
  onExpand,
  onDelete,
  isSelected,
}: {
  row: Row<T>;
  gridTemplate: string;
  pinnedColumns: string[];
  stickyLeft: Record<string, number>;
  density: keyof typeof DENSITY_Y;
  onExpand?: (row: Row<T>) => void;
  onDelete?: (row: T) => void;
  isSelected?: boolean;
}) {
  const highlighted = isSelected || row.getIsSelected();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            "group border-border grid border-b transition-colors last:border-b-0",
            "hover:bg-accent/20",
            highlighted && "bg-accent/40"
          )}
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {row.getVisibleCells().map((cell) => {
            const isSelectCell = cell.column.id === SELECT_COL;
            const isPinned =
              !isSelectCell && pinnedColumns.includes(cell.column.id);
            const isSticky = isSelectCell || isPinned;
            const leftPx = stickyLeft[cell.column.id];

            return (
              <div
                key={cell.id}
                className={cn(
                  "flex min-w-0 items-center truncate text-sm",
                  isSelectCell ? "gap-1 px-1.5" : "px-3",
                  DENSITY_Y[density],
                  "border-border border-r last:border-r-0",
                  cell.column.columnDef.meta?.align === "right" &&
                    "justify-end",
                  cell.column.columnDef.meta?.align === "center" &&
                    "justify-center",
                  isSticky &&
                    "bg-background sticky shadow-[1px_0_0_0_hsl(var(--border))]",
                  isSelectCell && "z-20",
                  isPinned && "z-10",
                  highlighted && isSticky && "bg-accent/40"
                )}
                style={
                  isSticky && leftPx !== undefined
                    ? { left: leftPx }
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}

                {/* Expand button — only in select cell, visible on row hover */}
                {isSelectCell && onExpand && (
                  <button
                    type="button"
                    tabIndex={0}
                    title="เปิดดูรายละเอียด"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExpand(row);
                    }}
                    className={cn(
                      "shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                      "flex size-5.5 items-center justify-center rounded",
                      "hover:border-border hover:bg-muted border border-transparent",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Maximize2Icon className="size-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </ContextMenuTrigger>

      {/* Right-click context menu */}
      <ContextMenuContent className="w-48">
        {onExpand && (
          <ContextMenuItem onClick={() => onExpand(row)}>
            <PencilIcon className="size-3.5" />
            แก้ไขข้อมูล
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => row.toggleSelected(!row.getIsSelected())}
        >
          {row.getIsSelected() ? "ยกเลิกเลือก" : "เลือกรายการนี้"}
        </ContextMenuItem>
        {onDelete && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              variant="destructive"
              onClick={() => onDelete(row.original)}
            >
              <Trash2Icon className="size-3.5" />
              ลบรายการ
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export type DataTableGridProps<T> = {
  table: TanstackTable<T>;
  /** True on initial load — shows full skeleton rows. */
  isLoading?: boolean;
  /** True during background refetch — shows translucent spinner overlay over existing rows. */
  isFetching?: boolean;
  emptyMessage?: string;
  /** Show "Clear filters" button in empty state when filters are active */
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  /** Called when expand button or context-menu "แก้ไขข้อมูล" is clicked */
  onRowClick?: (row: Row<T>) => void;
  /** If provided, shows "ลบรายการ" in context menu */
  onRowDelete?: (row: T) => void;
  selectedId?: string | null;
  getRowId?: (row: T) => string;
};

const SKELETON_ROWS = 8;

export function DataTableGrid<T>({
  table,
  isLoading,
  isFetching,
  emptyMessage = "ไม่มีข้อมูล",
  hasActiveFilters,
  onClearFilters,
  onRowClick,
  onRowDelete,
  selectedId,
  getRowId,
}: DataTableGridProps<T>) {
  const { pinnedColumns, density } = useTableSettings(useDataTableKey());

  const [widths, setWidths] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const col of table.getAllLeafColumns()) {
      const w = col.columnDef.meta?.width;
      if (w) init[col.id] = w;
    }
    return init;
  });

  const handleResize = useCallback((id: string, delta: number) => {
    setWidths((prev) => ({
      ...prev,
      [id]: Math.max(40, (prev[id] ?? 120) + delta),
    }));
  }, []);

  const leafColumns = table.getVisibleLeafColumns();
  const gridTemplate = getGridTemplate(leafColumns, widths);
  const stickyLeft = getStickyOffsets(leafColumns, widths, pinnedColumns);
  const rows = table.getRowModel().rows;

  // Show overlay spinner when refetching (keepPreviousData keeps rows visible)
  // but NOT on initial load (skeleton handles that case).
  const showOverlay = isFetching && !isLoading;

  return (
    <div
      data-slot="data-table"
      className="flex relative flex-col h-full overflow-hidden text-xs rounded-md bg-background"
    >
      {/* Translucent refetch overlay — appears on page transitions, not initial load */}
      {showOverlay && (
        <div className="flex absolute inset-0 z-20 items-center justify-center rounded-md backdrop-blur-[1px] pointer-events-none bg-background/50">
          <div className="flex items-center gap-2 px-3 py-1.5 border rounded-full shadow-sm bg-background/80 border-border/50">
            <Loader2Icon className="size-3.5 text-muted-foreground animate-spin" />
            <span className="text-[11px] text-muted-foreground">
              กำลังโหลด...
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <GridHeader
            table={table}
            widths={widths}
            pinnedColumns={pinnedColumns}
            density={density}
            onResize={handleResize}
          />

          {isLoading ? (
            Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <SkeletonRow key={i} gridTemplate={gridTemplate} />
            ))
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
              <FilterXIcon className="size-8 opacity-30" />
              <p className="text-sm">{emptyMessage}</p>
              {hasActiveFilters && onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-accent text-xs underline underline-offset-2 transition-colors hover:text-accent/80"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>
          ) : (
            rows.map((row) => {
              const rowId = getRowId ? getRowId(row.original) : row.id;
              return (
                <GridRow
                  key={row.id}
                  row={row}
                  gridTemplate={gridTemplate}
                  pinnedColumns={pinnedColumns}
                  stickyLeft={stickyLeft}
                  density={density}
                  onExpand={
                    onRowClick as ((row: Row<unknown>) => void) | undefined
                  }
                  onDelete={onRowDelete as ((row: unknown) => void) | undefined}
                  isSelected={selectedId != null && rowId === selectedId}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
