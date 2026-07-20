// Common Shared Types

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Status = "active" | "inactive" | "pending" | "archived";

export type SortDirection = "asc" | "desc";

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}
