/**
 * DataTableToolbar — reusable toolbar shell with start/end slots.
 * DataTableProvider — wraps the full table area so all child components share one tableKey.
 *
 * Usage:
 *   <DataTableProvider tableKey="employees">
 *     <DataTableToolbar start={...} end={...} />
 *     <DataTableGrid ... />
 *     <DataTableToolbar className="border-b-0 border-t" start={...} end={...} />
 *   </DataTableProvider>
 */

import { DataTableContext } from "./context";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function DataTableProvider({
  tableKey = "default",
  children,
}: {
  tableKey?: string;
  children: ReactNode;
}) {
  return (
    <DataTableContext.Provider value={tableKey}>
      {children}
    </DataTableContext.Provider>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

export type DataTableToolbarSlots = {
  start?: ReactNode;
  end?: ReactNode;
  /** Replaces entire toolbar content */
  override?: ReactNode;
  className?: string;
};

export function DataTableToolbar({
  start,
  end,
  override,
  className,
}: DataTableToolbarSlots) {
  if (override) return <>{override}</>;
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        "flex items-center justify-between gap-2",
        "h-9 min-h-9 shrink-0 px-2",
        "overflow-x-auto",
        className
      )}
    >
      <div className="flex items-center gap-1.5 min-w-0">{start}</div>
      <div className="flex items-center gap-1.5 shrink-0">{end}</div>
    </div>
  );
}

// ─── Built-in slot re-exports ─────────────────────────────────────────────────

export {
  DataTablePageSize,
  DataTablePagination,
  DataTableRefresh,
  DataTableRowCount,
} from "./slots";
