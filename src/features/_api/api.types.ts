export type PagePagination = {
  has_next?: boolean;
  has_previous?: boolean;
  page?: number;
  size?: number;
  total_elements?: number;
  total_pages?: number;
};
export type ApiResponse<T = unknown, M = unknown> = {
  data: T;
  meta: M;
  status?: any;
};

export type PageParams = {
  filter: Record<string, any>;
  page: number;
  search: unknown;
  size: number;
  sort: Record<string, any>;
};

export type ResponseList<TData> = ApiResponse<TData[], PagePagination>;
