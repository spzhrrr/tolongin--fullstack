import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class JobsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(where: Prisma.JobWhereInput, skip: number, take: number): Promise<{
        items: ({
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
                icon: string | null;
            };
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
        })[];
        total: number;
    }>;
    findById(id: string): Prisma.Prisma__JobClient<{
        category: {
            id: string;
            createdAt: Date;
            name: string;
            slug: string;
            icon: string | null;
        };
        applications: ({
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
        })[];
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: Prisma.JobCreateInput): Prisma.Prisma__JobClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: Prisma.JobUpdateInput): Prisma.Prisma__JobClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Prisma.Prisma__JobClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    incrementApplicationsCount(id: string): Prisma.Prisma__JobClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
