import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ServicesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(where: Prisma.ServiceWhereInput, skip: number, take: number, orderBy: Prisma.ServiceOrderByWithRelationInput): Promise<{
        items: ({
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
                icon: string | null;
            };
            seller: {
                id: string;
                name: string;
                avatar: string;
            };
        } & {
            id: string;
            createdAt: Date;
            rating: number;
            reviewCount: number;
            isActive: boolean;
            updatedAt: Date;
            title: string;
            description: string;
            price: number;
            priceType: string;
            deliveryTime: number;
            revisionCount: number;
            images: string;
            isFeatured: boolean;
            viewCount: number;
            orderCount: number;
            categoryId: string;
            sellerId: string;
        })[];
        total: number;
    }>;
    findById(id: string): Prisma.Prisma__ServiceClient<{
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
        };
        reviews: ({
            reviewer: {
                id: string;
                name: string;
                avatar: string;
            };
        } & {
            id: string;
            createdAt: Date;
            rating: number;
            updatedAt: Date;
            images: string;
            serviceId: string | null;
            comment: string;
            reply: string | null;
            replyAt: Date | null;
            isAnonymous: boolean;
            helpfulCount: number;
            orderId: string;
            revieweeId: string;
            reviewerId: string;
        })[];
        seller: {
            id: string;
            name: string;
            avatar: string;
            ktpVerified: boolean;
            rating: number;
        };
    } & {
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: Prisma.ServiceCreateInput): Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: Prisma.ServiceUpdateInput): Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findFeatured(): Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
        };
        seller: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    })[]>;
    findRecommended(): Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
        };
        seller: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    })[]>;
    incrementView(id: string): Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        images: string;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
