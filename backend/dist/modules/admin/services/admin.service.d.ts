import { AdminRepository } from '../repositories/admin.repository';
import { DisputesService } from '../../disputes/services/disputes.service';
import { RejectSellerDto, UpdateSettingsDto } from '../dto/admin.dto';
export declare class AdminService {
    private readonly repo;
    private readonly disputesService;
    constructor(repo: AdminRepository, disputesService: DisputesService);
    stats(): Promise<{
        users: number;
        services: number;
        jobs: number;
        orders: number;
        pendingSellers: number;
        pendingKyc: number;
        disputes: number;
        revenue: number;
    }>;
    users(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        role: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        ktpVerified: boolean;
        bankVerified: boolean;
        rating: number;
        completedOrders: number;
        balance: number;
        isActive: boolean;
        isBanned: boolean;
        bannedReason: string;
    }[]>;
    userDetail(id: string): Promise<any>;
    suspendUser(id: string, adminId: string): Promise<{
        message: string;
    }>;
    activateUser(id: string, adminId: string): Promise<{
        message: string;
    }>;
    pendingSellers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        ktpNumber: string;
        ktpPhoto: string;
        ktpSelfie: string;
        ktpSubmittedAt: Date;
    }[]>;
    approveSeller(userId: string, adminId: string): Promise<{
        message: string;
    }>;
    rejectSeller(userId: string, adminId: string, dto: RejectSellerDto): Promise<{
        message: string;
    }>;
    services(): import(".prisma/client").Prisma.PrismaPromise<({
        seller: {
            id: string;
            name: string;
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
    deleteService(id: string, adminId: string): Promise<{
        message: string;
    }>;
    jobs(): import(".prisma/client").Prisma.PrismaPromise<({
        buyer: {
            id: string;
            name: string;
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
    deleteJob(id: string, adminId: string): Promise<{
        message: string;
    }>;
    orders(): import(".prisma/client").Prisma.PrismaPromise<({
        seller: {
            id: string;
            name: string;
        };
        buyer: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        sellerId: string;
        deadline: Date | null;
        status: string;
        buyerId: string;
        amount: number;
        fee: number;
        totalAmount: number;
        notes: string | null;
        deliveryType: string;
        deliveryAddress: string | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
        cancellationReason: string | null;
        timeline: string;
        serviceId: string | null;
        applicationId: string | null;
    })[]>;
    disputes(): import(".prisma/client").Prisma.PrismaPromise<({
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            sellerId: string;
            deadline: Date | null;
            status: string;
            buyerId: string;
            amount: number;
            fee: number;
            totalAmount: number;
            notes: string | null;
            deliveryType: string;
            deliveryAddress: string | null;
            completedAt: Date | null;
            cancelledAt: Date | null;
            cancellationReason: string | null;
            timeline: string;
            serviceId: string | null;
            applicationId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        messages: string | null;
        description: string;
        status: string;
        orderId: string;
        reason: string;
        evidence: string | null;
        resolution: string | null;
        resolvedBy: string | null;
        resolvedAt: Date | null;
        raisedBy: string;
    })[]>;
    resolveDispute(id: string, adminId: string, resolution: string): Promise<any>;
    activity(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string | null;
        action: string;
        entity: string | null;
        entityId: string | null;
        metadata: string | null;
        createdAt: Date;
    }[]>;
    settings(): Promise<Record<string, string>>;
    updateSettings(dto: UpdateSettingsDto, adminId: string): Promise<Record<string, string>>;
}
