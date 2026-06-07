import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ReviewsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ReviewCreateInput): Prisma.Prisma__ReviewClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): Prisma.Prisma__ReviewClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByOrder(orderId: string): Prisma.PrismaPromise<{
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
    }[]>;
    findBySeller(sellerId: string): Prisma.PrismaPromise<({
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
    findByService(serviceId: string): Prisma.PrismaPromise<({
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
    update(id: string, data: Prisma.ReviewUpdateInput): Prisma.Prisma__ReviewClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Prisma.Prisma__ReviewClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    aggregateSellerRating(sellerId: string): Prisma.PrismaPromise<Prisma.GetReviewAggregateType<{
        where: {
            revieweeId: string;
        };
        _avg: {
            rating: true;
        };
        _count: true;
    }>>;
}
