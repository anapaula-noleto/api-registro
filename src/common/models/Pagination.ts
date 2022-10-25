export interface Pagination {
  page?: number;
  per?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
}
