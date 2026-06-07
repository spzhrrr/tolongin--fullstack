import type { PriceType } from '../../../common/constants/enums';
export declare class CreateServiceDto {
    title: string;
    description: string;
    categoryId: string;
    price: number;
    priceType?: PriceType;
    deliveryTime: number;
    revisionCount?: number;
    images?: string[];
}
export declare class UpdateServiceDto {
    title?: string;
    description?: string;
    categoryId?: string;
    price?: number;
    priceType?: PriceType;
    deliveryTime?: number;
    revisionCount?: number;
    images?: string[];
    isActive?: boolean;
}
export declare class ServiceQueryDto {
    q?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
