/**
 * DataTable — shared types
 */

import type { ColumnDef as TanstackColumnDef } from "@tanstack/react-table";

// ─── Augment ColumnMeta ───────────────────────────────────────────────────────

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** Initial width in px. User can resize from here. */
    width?: number;
    /** Text alignment */
    align?: "left" | "right" | "center";
    /** Freeze column to left (future phase) */
    frozen?: boolean;
    /** Column display type — drives cell renderer defaults */
    type?: "text" | "number" | "date" | "badge" | "boolean" | "avatar" | "action" | "custom";
  }
}

// ─── Column templates ─────────────────────────────────────────────────────────
// Pre-built column factories that produce consistent cell renderers.

export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<
  TData,
  TValue
>;

// ─── Toolbar / Footer slot types ─────────────────────────────────────────────

export type DataTableSlot = React.ReactNode;

export interface DataTableToolbarSlots {
  /** Left side — search, filters */
  start?: DataTableSlot;
  /** Right side — actions (add, export, etc.) */
  end?: DataTableSlot;
  /** Replaces entire toolbar */
  override?: DataTableSlot;
}

export interface DataTableFooterSlots {
  /** Left side — pagination, row count */
  start?: DataTableSlot;
  /** Right side — page size, refresh */
  end?: DataTableSlot;
  /** Replaces entire footer */
  override?: DataTableSlot;
}
