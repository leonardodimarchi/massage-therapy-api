export interface PaginatedItems<T> {
    page: number;
    pageCount: number;
    total: number;
    count: number;
    items: T[];
}