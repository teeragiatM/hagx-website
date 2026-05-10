/**
 * DataTableCardView — Card/Grid layout for table rows.
 *
 * Each row → one card:
 *  - First non-select, non-action column = card title (larger)
 *  - Remaining visible columns = key/value pairs
 *  - Row click works the same as table mode
 *  - Selected row gets accent ring
 *
 * Used alongside DataTableGrid; parent chooses which to render based on viewMode.
 */

"use no memo";

import { cn } from "@/lib/utils";
import { type Row, type Table, flexRender } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";

export type DataTableCardViewProps<T> = {
  table: Table<T>;
  isLoading?: boolean;
  onRowClick?: (row: Row<T>) => void;
  selectedId?: string | null;
  getRowId?: (row: T) => string;
};

const SKELETON_CARDS = 6;

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
      <div className="h-4 rounded bg-muted animate-pulse w-2/3" />
      <div className="space-y-2">
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="h-3 rounded bg-muted animate-pulse" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export function DataTableCardView<T>({
  table,
  isLoading,
  onRowClick,
  selectedId,
  getRowId,
}: DataTableCardViewProps<T>) {
  const rows = table.getRowModel().rows;
  const visibleCols = table.getVisibleLeafColumns().filter(
    (c) => c.id !== "__select__",
  );

  const titleCol = visibleCols[0];
  const detailCols = visibleCols.slice(1);

  return (
    <div className="flex-1 overflow-auto p-4">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          ไม่มีข้อมูล
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {rows.map((row) => {
              const rowId = getRowId ? getRowId(row.original) : row.id;
              const isSelected =
                (selectedId != null && rowId === selectedId) || row.getIsSelected();

              return (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "rounded-lg border border-border bg-card p-4 flex flex-col gap-2 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-accent/10",
                    isSelected && "ring-2 ring-accent border-accent bg-accent/5",
                  )}
                >
                  {/* Title */}
                  {titleCol && (
                    <div className="font-medium text-sm text-foreground truncate">
                      {flexRender(
                        titleCol.columnDef.cell,
                        row
                          .getVisibleCells()
                          .find((c) => c.column.id === titleCol.id)!
                          .getContext(),
                      )}
                    </div>
                  )}

                  {/* Detail rows */}
                  <div className="space-y-1 mt-1">
                    {detailCols.map((col) => {
                      const cell = row
                        .getVisibleCells()
                        .find((c) => c.column.id === col.id);
                      if (!cell) return null;
                      const label =
                        typeof col.columnDef.header === "string"
                          ? col.columnDef.header
                          : col.id;
                      return (
                        <div key={col.id} className="flex items-center justify-between gap-2 min-w-0">
                          <span className="text-[11px] text-muted-foreground shrink-0">{label}</span>
                          <span className="text-xs truncate text-right">
                            {flexRender(col.columnDef.cell, cell.getContext())}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
