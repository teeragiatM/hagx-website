/**
 * DataTableViewSwitcher — Table / Card mode toggle.
 * Persists choice to Zustand store per table key.
 */

import { useDataTableKey } from "../context";
import { cn } from "@/lib/utils";
import { useTableSettings } from "@/stores/tableSettingsStore";
import { LayoutGridIcon, TableIcon } from "lucide-react";

export function DataTableViewSwitcher() {
  const { viewMode, setViewMode } = useTableSettings(useDataTableKey());

  return (
    <div className="flex items-center h-6 overflow-hidden border border-border rounded-md">
      <button
        onClick={() => setViewMode("table")}
        title="Table view"
        className={cn(
          "flex h-full w-7 items-center justify-center transition-colors",
          viewMode === "table"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
        )}
      >
        <TableIcon className="size-3.5" />
      </button>
      <button
        onClick={() => setViewMode("card")}
        title="Card view"
        className={cn(
          "flex h-full w-7 items-center justify-center transition-colors",
          viewMode === "card"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
        )}
      >
        <LayoutGridIcon className="size-3.5" />
      </button>
    </div>
  );
}
