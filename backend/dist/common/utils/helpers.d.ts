export declare function parseJsonField<T = any>(value: string | null | undefined, defaultValue: T): T;
export declare function stringifyJsonField(value: any, defaultValue?: string): string;
export declare function paginate(page?: number, limit?: number): {
    take: number;
    skip: number;
};
export declare function buildPageMeta(total: number, page: number, limit: number): {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};
