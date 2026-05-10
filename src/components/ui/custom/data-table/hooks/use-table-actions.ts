/**
 * useTableActions — bulk-action state management for DataTable pages.
 *
 * Encapsulates the open/close state of BulkEditDialog and the wiring
 * between "select rows → bulk edit / delete" user flows.
 *
 * The hook does NOT call any APIs itself — it delegates to the caller's
 * `onBulkUpdate` / `onBulkDelete` callbacks so pages keep full control
 * over their mutation logic.
 *
 * Usage:
 *   const {
 *     bulkEditOpen, setBulkEditOpen, bulkEditRows,
 *     handleBulkEdit, handleBulkSave, handleBulkDelete,
 *   } = useTableActions<Employee>({
 *     onBulkUpdate: (ids, patch) => bulkMutation.mutate({ ids, patch }),
 *     onBulkDelete: (rows)       => deleteMutation.mutate(rows.map(r => r.id)),
 *   });
 */

import { useState } from "react";

export type TableActionsOptions<TData> = {
  /** Called when the user confirms a bulk edit. Receives selected IDs + patch. */
  onBulkUpdate?: (ids: string[], patch: Record<string, unknown>) => void;
  /** Called when the user confirms a bulk delete. Receives full row objects. */
  onBulkDelete?: (rows: TData[]) => void;
};

export function useTableActions<TData>({
  onBulkUpdate,
  onBulkDelete,
}: TableActionsOptions<TData> = {}) {
  const [bulkEditOpen, setBulkEditOpen] = useState(false);
  const [bulkEditRows, setBulkEditRows] = useState<TData[]>([]);

  /** Open BulkEditDialog pre-populated with the given rows. */
  const handleBulkEdit = (rows: TData[]) => {
    setBulkEditRows(rows);
    setBulkEditOpen(true);
  };

  /** Called when the user clicks "Save" in BulkEditDialog. */
  const handleBulkSave = (ids: string[], patch: Record<string, unknown>) => {
    onBulkUpdate?.(ids, patch);
    setBulkEditOpen(false);
  };

  /** Called when the user confirms a bulk delete action. */
  const handleBulkDelete = (rows: TData[]) => {
    onBulkDelete?.(rows);
  };

  return {
    bulkEditOpen,
    setBulkEditOpen,
    bulkEditRows,
    handleBulkEdit,
    handleBulkSave,
    handleBulkDelete,
  };
}
