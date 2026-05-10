/**
 * useTableQuery — standardized data-fetching hook for all DataTable pages.
 *
 * Every table in the app should use this hook instead of calling
 * domain queries directly. This guarantees:
 *  - Uniform caching strategy (staleTime, keepPreviousData)
 *  - Consistent query key shape → easy invalidation
 *  - Automatic global error toast on any fetch failure
 *  - Single place to add future features (logging, retry, etc.)
 *
 * Usage:
 *   const { data, isLoading, isFetching, refetch } = useTableQuery(
 *     ["employees", tenantId],
 *     createEmployeeQueryFetcher(tenantId),
 *     { pageIndex, pageSize, search, filters: { status } },
 *     { enabled: !!tenantId },
 *   );
 *
 *   // Response shape (always):
 *   data?.data             // T[]
 *   data?.meta.totalCount  // number | -1 if count RPC unavailable
 *
 * Error handling:
 *   Any fetch failure triggers a toast automatically.
 *   The raw error is still returned in `error` so pages can show
 *   inline error states if needed.
 */

import { showToast } from "@/lib/toast";
import type { TableQueryFetcher, TableRequestParams } from "@/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import { useEffect } from "react";

export type { TableRequestParams, TableResponse, TableQueryFetcher } from "@/types/pagination";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTableQuery<T>(
  /** Stable base key array (e.g. ["employees", tenantId]). Params are appended automatically. */
  baseKey: QueryKey,
  /** Domain fetcher — must satisfy TableQueryFetcher<T>. */
  fetcher: TableQueryFetcher<T>,
  /** Current table params (pagination, search, filters, sorting). */
  params: TableRequestParams,
  options?: {
    enabled?:     boolean;
    staleTime?:   number;
    /** Override the default error title (default: "โหลดข้อมูลล้มเหลว"). */
    errorTitle?:  string;
    /** Set to false to suppress automatic error toast. Default: true. */
    errorToast?:  boolean;
  },
) {
  const result = useQuery({
    queryKey: [
      ...(Array.isArray(baseKey) ? baseKey : [baseKey]),
      params.pageIndex,
      params.pageSize,
      params.search  ?? null,
      params.sorting ?? null,
      params.filters ?? null,
    ],
    queryFn:         () => fetcher(params),
    enabled:         options?.enabled ?? true,
    staleTime:       options?.staleTime ?? 30_000,
    placeholderData: keepPreviousData,
  });

  // ── Automatic error toast ────────────────────────────────────────────────────
  // Runs once per distinct error object so the toast doesn't re-fire on
  // every render. Pages that want custom error UI can pass errorToast: false.
  const { isError, error } = result;
  useEffect(() => {
    if (isError && error && options?.errorToast !== false) {
      showToast.error(error, options?.errorTitle ?? "โหลดข้อมูลล้มเหลว");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return result;
}
