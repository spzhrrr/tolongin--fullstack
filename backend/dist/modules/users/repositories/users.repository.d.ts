import { PrismaService } from '../../../prisma/prisma.service';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        role: string;
        emailVerified: boolean;
        emailVerifiedAt: Date | null;
        phoneVerified: boolean;
        phoneVerifiedAt: Date | null;
        emailOtpHash: string | null;
        emailOtpExpiresAt: Date | null;
        phoneOtpHash: string | null;
        phoneOtpExpiresAt: Date | null;
        ktpNumber: string | null;
        ktpPhoto: string | null;
        ktpSelfie: string | null;
        ktpVerified: boolean;
        ktpVerifiedAt: Date | null;
        ktpRejectedReason: string | null;
        ktpSubmittedAt: Date | null;
        bankVerified: boolean;
        bio: string | null;
        skills: string;
        rating: number;
        reviewCount: number;
        totalOrders: number;
        completedOrders: number;
        balance: number;
        isActive: boolean;
        isBanned: boolean;
        bannedReason: string | null;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findServices(sellerId: string): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
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
    findReviews(revieweeId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
