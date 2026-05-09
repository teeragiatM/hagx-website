/**
 * Base interface every cell template must accept.
 *
 * TData   — the row's full data type (row.original)
 * TConfig — template-specific config object
 *
 * Usage with col.custom():
 *   col.custom<Employee>({
 *     accessorKey: "status",
 *     cell: ({ getValue, row }) => (
 *       <BadgeCell value={getValue()} rowData={row.original} config={{ map: STATUS_MAP }} />
 *     ),
 *   })
 */
export type BaseCellProps<TData = unknown, TConfig = unknown> = {
  /** The cell's own value (from getValue() or accessorKey). */
  value: unknown;
  /** The full row data object (row.original). */
  rowData: TData;
  /** Extra Tailwind classes passed from the column definition. */
  className?: string;
  /** Template-specific configuration (e.g., badge color map, date format). */
  config?: TConfig;
};
