import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ApplicationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ApplicationCreateInput): Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): Prisma.Prisma__ApplicationClient<{
        job: {
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
        };
        seller: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByJobAndSeller(jobId: string, sellerId: string): Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findBySeller(sellerId: string): Prisma.PrismaPromise<({
        job: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    })[]>;
    findByJob(jobId: string): Prisma.PrismaPromise<({
        seller: {
            id: string;
            name: string;
            avatar: string;
            ktpVerified: boolean;
            rating: number;
            reviewCount: number;
            completedOrders: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    })[]>;
    update(id: string, data: Prisma.ApplicationUpdateInput): Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
