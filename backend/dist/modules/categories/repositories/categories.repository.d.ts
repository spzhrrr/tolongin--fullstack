import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }[]>;
    findById(id: string): Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findBySlug(slug: string): Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: Prisma.CategoryCreateInput): Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: Prisma.CategoryUpdateInput): Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findServicesInCategory(id: string): Prisma.PrismaPromise<({
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
    findJobsInCategory(id: string): Prisma.PrismaPromise<({
        buyer: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        skills: string;
        updatedAt: Date;
        title: string;
        description: string;
        viewCount: number;
        categoryId: string;
        budget: number;
        budgetType: string;
        deadline: Date | null;
        location: string | null;
        isOnline: boolean;
        status: string;
        applicationsCount: number;
        buyerId: string;
    })[]>;
}
