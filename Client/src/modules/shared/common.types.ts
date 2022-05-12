export interface PaginationInfo {
  limit: number;
  page: number;
  totalCount: number;
  pageCount: number;
}

export type PaginationParams = Pick<PaginationInfo, 'page'>;

export interface ListResponse<T> extends PaginationInfo {
  map(arg0: (o: any) => JSX.Element): import('react').ReactNode;
  filter(arg0: (o: any) => JSX.Element): import('react').ReactNode;
  sort(arg0: (o: any) => JSX.Element): import('react').ReactNode;
  // docs: T[];
  posts: T[];
  // data: T[];
}
