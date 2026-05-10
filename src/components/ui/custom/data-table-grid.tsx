/**
 * DataTableGrid — Div + CSS Grid based data table (Supabase-style).
 *
 * ทำไมไม่ใช้ <table>:
 *  - CSS Grid ให้ column alignment แบบ pixel-perfect โดยไม่ต้องง้อ browser table layout
 *  - Sticky header ทำได้ง่ายกว่า (ไม่มี table stacking context ขวางทาง)
 *  - Horizontal scroll + frozen columns ทำได้โดยไม่มี quirk
 *  - พร้อมรองรับ virtualization ในอนาคต (แค่ swap row renderer)
 *
 * Usage:
 *  ใส่ meta.width ใน ColumnDef เพื่อกำหนดความกว้าง:
 *  { accessorKey: "name", header: "ชื่อ", meta: { width: 240 } }
 *
 *  ถ้าไม่ใส่ width → column นั้นจะ flex-grow เติมช่องว่างที่เหลือ (1fr)
 */

import { cn } from "@/lib/utils";
import {
  type Column,
  type ColumnDef,
  type Table as TanstackTable,
  flexRender,
} from "@tanstack/react-table";
import { Text } from "@ui";
import { Loader2 } from "lucide-react";
// ─── Types ────────────────────────────────────────────────────────────────────

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** ความกว้างคอลัมน์เป็น px (ถ้าไม่ระบุ = 1fr) */
    width?: number;
    /** จัดชิดขวา (ตัวเลข, ราคา) */
    align?: "left" | "right" | "center";
    /** Frozen — ยังไม่ implement (placeholder สำหรับ Phase 2) */
    frozen?: boolean;
  }
}

// ─── Grid template ────────────────────────────────────────────────────────────

function getGridTemplate<T>(columns: Column<T, unknown>[]): string {
  return columns
    .map((col) => {
      const w = col.columnDef.meta?.width;
      return w ? `${w}px` : "1fr";
    })
    .join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GridHeader<T>({ table }: { table: TanstackTable<T> }) {
  const leafColumns = table.getVisibleLeafColumns();
  const gridTemplate = getGridTemplate(leafColumns);

  return (
    <div className="sticky top-0 z-10 border-b border-border backdrop-blur-sm bg-muted/60">
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="grid"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className={cn(
                "text-muted-foreground flex items-center truncate px-3 py-2 text-xs font-medium select-none",
                "border-border border-r last:border-r-0",
                header.column.columnDef.meta?.align === "right" &&
                  "justify-end",
                header.column.columnDef.meta?.align === "center" &&
                  "justify-center"
              )}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function GridRow<T>({
  row,
  gridTemplate,
  onClick,
  isSelected,
}: {
  row: import("@tanstack/react-table").Row<T>;
  gridTemplate: string;
  onClick?: (row: import("@tanstack/react-table").Row<T>) => void;
  isSelected?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-border grid border-b transition-colors last:border-b-0",
        onClick && "hover:bg-accent/40 cursor-pointer",
        isSelected && "bg-accent/60"
      )}
      style={{ gridTemplateColumns: gridTemplate }}
      onClick={() => onClick?.(row)}
    >
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          className={cn(
            "flex items-center truncate px-3 py-2 text-sm",
            "border-border border-r last:border-r-0",
            cell.column.columnDef.meta?.align === "right" && "justify-end",
            cell.column.columnDef.meta?.align === "center" && "justify-center"
          )}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type DataTableGridProps<T> = {
  table: TanstackTable<T>;
  /** Height of the grid viewport — default fills parent */
  height?: string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: import("@tanstack/react-table").Row<T>) => void;
  selectedId?: string | null;
  getRowId?: (row: T) => string;
};

export function DataTableGrid<T>({
  table,
  height = "100%",
  isLoading,
  emptyMessage = "ไม่มีข้อมูล",
  onRowClick,
  selectedId,
  getRowId,
}: DataTableGridProps<T>) {
  const leafColumns = table.getVisibleLeafColumns();
  const gridTemplate = getGridTemplate(leafColumns);
  const rows = table.getRowModel().rows;

  return (
    <div
      className="flex relative flex-col overflow-hidden text-[13px] font-mono border border-border rounded-md bg-background"
      style={{ height }}
    >
      {/* Sticky header */}
      <GridHeader table={table} />

      {/* Body — scrollable */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <Text
            color="gray"
            size={"1"}
            className="flex items-center justify-center gap-2 py-16"
          >
            <Loader2 className="size-4 animate-spin" />
            <span>กำลังโหลด...</span>
          </Text>
        ) : rows.length === 0 ? (
          <Text
            color="gray"
            size={"1"}
            className="flex items-center justify-center py-16"
          >
            {emptyMessage}
          </Text>
        ) : (
          rows.map((row) => {
            const rowId = getRowId ? getRowId(row.original) : row.id;
            return (
              <GridRow
                key={row.id}
                row={row}
                gridTemplate={gridTemplate}
                onClick={onRowClick}
                isSelected={selectedId != null && rowId === selectedId}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Re-export ColumnDef so callers don't need to import from tanstack directly ──
export type { ColumnDef };
