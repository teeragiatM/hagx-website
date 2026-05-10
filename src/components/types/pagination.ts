/**
 * pagination.ts — System-wide pagination contract.
 *
 * Rules:
 *  - Every list query MUST use ListParams — no domain defines its own pagination shape.
 *  - Every list RPC MUST accept p_limit / p_offset derived from this schema.
 *  - Every list response MUST return PaginatedResult<T> when total count is known.
 */

export type SortOrder = "asc" | "desc";

export type ListParams = {
  page: number;
  pageSize: number;
  search?: string | null;
  sort?: string;
  order?: SortOrder;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

/** Derive SQL LIMIT / OFFSET from ListParams */
export function toSqlPagination(params: ListParams): { limit: number; offset: number } {
  return {
    limit:  params.pageSize,
    offset: (params.page - 1) * params.pageSize,
  };
}

/** Default params — use as initialState for any list page */
export const DEFAULT_LIST_PARAMS: ListParams = {
  page:     1,
  pageSize: 20,
  search:   null,
  sort:     undefined,
  order:    "asc",
};

// ─── Table Engine Contract ────────────────────────────────────────────────────
//
// All DataTable pages must funnel their data-fetching through this contract.
// This keeps every table in the app structurally identical to the framework.

/**
 * Standard request parameters emitted by useTableQuery.
 * pageIndex is 0-based (same as TanStack Table's PaginationState).
 */
export type TableRequestParams = {
  pageIndex: number;
  pageSize:  number;
  search?:   string;
  /** Arbitrary key-value filters forwarded to the domain fetcher. */
  filters?:  Record<string, unknown>;
  sorting?:  Array<{ id: string; desc: boolean }>;
};

/**
 * Standard response shape every domain fetcher must return.
 * totalCount === -1 means count is unavailable (graceful degradation).
 */
export type TableResponse<T> = {
  data: T[];
  meta: { totalCount: number };
};

/** Signature every domain must implement to plug into useTableQuery. */
export type TableQueryFetcher<T> = (
  params: TableRequestParams,
) => Promise<TableResponse<T>>;
