export interface PaginatedResponse<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      last_page: number;
    };
  }