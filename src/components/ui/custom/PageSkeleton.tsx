import { Skeleton } from "../core/skeleton";

// ─── Toolbar row ──────────────────────────────────────────────────────────────

function ToolbarSkeleton() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0">
      <Skeleton className="h-7 w-48 rounded-md" />
      <Skeleton className="h-7 w-56 rounded-md" />
      <div className="ml-auto flex gap-2">
        <Skeleton className="h-7 w-20 rounded-md" />
        <Skeleton className="h-7 w-24 rounded-md" />
      </div>
    </div>
  );
}

// ─── Table header ─────────────────────────────────────────────────────────────

function TableHeaderSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b bg-muted/20 shrink-0">
      <Skeleton className="h-3 w-3.5 rounded-sm" />
      <Skeleton className="h-3 w-[14%]" />
      <Skeleton className="h-3 w-[28%]" />
      <Skeleton className="h-3 w-[18%]" />
      <Skeleton className="h-3 w-[14%]" />
      <Skeleton className="h-3 w-[10%] ml-auto" />
    </div>
  );
}

// ─── Single data row ──────────────────────────────────────────────────────────

function TableRowSkeleton({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border-b"
      style={{ opacity }}
    >
      <Skeleton className="h-3.5 w-3.5 rounded-sm" />
      <Skeleton className="h-3.5 w-[14%]" />
      <Skeleton className="h-3.5 w-[28%]" />
      <Skeleton className="h-3.5 w-[18%]" />
      <Skeleton className="h-3.5 w-[14%]" />
      <Skeleton className="h-3.5 w-[10%] ml-auto" />
    </div>
  );
}

// ─── Footer / pagination ──────────────────────────────────────────────────────

function PaginationSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-t shrink-0">
      <Skeleton className="h-6 w-20 rounded-md" />
      <div className="ml-auto flex gap-2">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  );
}

// ─── Full page skeleton ───────────────────────────────────────────────────────

const ROW_COUNT = 14;

export function PageSkeleton() {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <ToolbarSkeleton />
      <TableHeaderSkeleton />

      {/* Rows — fade out toward bottom for a natural "content below fold" feel */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {Array.from({ length: ROW_COUNT }).map((_, i) => (
          <TableRowSkeleton
            key={i}
            opacity={1 - (i / ROW_COUNT) * 0.6}
          />
        ))}
      </div>

      <PaginationSkeleton />
    </div>
  );
}
