/**
 * DataTableContext — provides a tableKey to all child toolbar/grid components.
 * Wrap the entire table area with <DataTableProvider tableKey="employees">.
 */

import { createContext, useContext } from "react";

export const DataTableContext = createContext<string>("default");

/** Returns the current tableKey from the nearest DataTableProvider. */
export function useDataTableKey(): string {
  return useContext(DataTableContext);
}
