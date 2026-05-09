// ─── Grid ─────────────────────────────────────────────────────────────────────
export { DataTableGrid } from "./grid";
export type { DataTableGridProps } from "./grid";

// ─── Toolbar (layout shell + context provider) ────────────────────────────────
export { DataTableProvider, DataTableToolbar } from "./toolbar";
export type { DataTableToolbarSlots } from "./toolbar";

// ─── Table-toolbar slot components ────────────────────────────────────────────
// Canonical path: @/components/ui/app/table-toolbar
// Also accessible from here for convenience.
export { DataTableColumnVisibility } from "./table-toolbar/column-visibility";
export { DataTableDensity } from "./table-toolbar/density-toggle";
export { DataTableExport } from "./table-toolbar/export-button";
export type { ExportScope } from "./table-toolbar/export-button";
export { DataTableFilterBar } from "./table-toolbar/filter-bar";
export type { FilterOperator, FilterRule } from "./table-toolbar/filter-bar";
export { DataTableFilterMenu } from "./table-toolbar/filter-menu";
export { DataTableSortMenu } from "./table-toolbar/sort-menu";
export { DataTableViewSwitcher } from "./table-toolbar/view-switcher";

// ─── Bottom-bar slot components ───────────────────────────────────────────────
export {
  DataTableImport,
  DataTablePageSize,
  DataTablePagination,
  DataTableRefresh,
  DataTableRowCount,
} from "./slots";

// ─── Bulk action bar ──────────────────────────────────────────────────────────
export { BulkActionBar } from "./bulk-action-bar";

// ─── Bulk edit dialog ─────────────────────────────────────────────────────────
export { BulkEditDialog } from "./bulk-edit-dialog";
export type { BulkEditField } from "./bulk-edit-dialog";

// ─── Card view ────────────────────────────────────────────────────────────────
export { DataTableCardView } from "./table-toolbar/card-view";
export type { DataTableCardViewProps } from "./table-toolbar/card-view";

// ─── Column helpers ───────────────────────────────────────────────────────────
export { col } from "./column-helpers";

// ─── Cell templates (use directly or via col.custom) ─────────────────────────
export {
  ActionCell,
  AvatarCell,
  BadgeCell,
  CurrencyCell,
  DateCell,
  TextCell,
} from "./cell-templates";
export type {
  ActionCellConfig,
  ActionItem,
  AvatarCellConfig,
  BadgeCellConfig,
  BaseCellProps,
  CurrencyCellConfig,
  DateCellConfig,
  TextCellConfig,
} from "./cell-templates";

// ─── Table engine hooks ───────────────────────────────────────────────────────
// Canonical path: @/components/ui/app/hooks
export { useTableActions, useTableQuery } from "./hooks";
export type {
  TableActionsOptions,
  TableQueryFetcher,
  TableRequestParams,
  TableResponse,
} from "./hooks";

// ─── Types ────────────────────────────────────────────────────────────────────
export type { ColumnDef } from "./types";
