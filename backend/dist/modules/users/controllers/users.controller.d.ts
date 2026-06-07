import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(id: string): Promise<any>;
    getServices(id: string): Promise<{
        images: string[];
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
        };
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
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }[]>;
    getReviews(id: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
}
