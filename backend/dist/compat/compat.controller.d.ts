import { AuthService } from '../modules/auth/services/auth.service';
import { ChatService } from '../modules/chat/services/chat.service';
import { AdminService } from '../modules/admin/services/admin.service';
import { OrdersService } from '../modules/orders/services/orders.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class CompatController {
    private readonly authService;
    private readonly chat;
    private readonly admin;
    private readonly orders;
    private readonly prisma;
    constructor(authService: AuthService, chat: ChatService, admin: AdminService, orders: OrdersService, prisma: PrismaService);
    me(uid: string): Promise<import("../modules/auth/interfaces/auth.interface").PublicUser>;
    updateMe(uid: string, body: any): Promise<import("../modules/auth/interfaces/auth.interface").PublicUser>;
    conversations(uid: string): Promise<any[]>;
    startConv(uid: string, body: any): Promise<any>;
    msgs(id: string, uid: string): Promise<{
        attachment: any;
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        conversationId: string;
        senderId: string;
    }[]>;
    sendMessage(uid: string, body: any): Promise<{
        attachment: any;
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        conversationId: string;
        senderId: string;
    }>;
    stats(role: string): Promise<{
        users: number;
        services: number;
        jobs: number;
        orders: number;
        pendingSellers: number;
        pendingKyc: number;
        disputes: number;
        revenue: number;
    }>;
    adminKyc(role: string, status?: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        ktpNumber: string;
        ktpPhoto: string;
        ktpSelfie: string;
        ktpSubmittedAt: Date;
    }[] | {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        ktpVerified: boolean;
        ktpVerifiedAt: Date;
        ktpRejectedReason: string;
        ktpSubmittedAt: Date;
    }[]>;
    listFavs(uid: string): Promise<({
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
    addFav(uid: string, serviceId: string): Promise<{
        ok: boolean;
    }>;
    removeFav(uid: string, serviceId: string): Promise<{
        ok: boolean;
    }>;
    myKyc(uid: string): Promise<{
        status: string;
        emailVerified?: undefined;
        phoneVerified?: undefined;
        ktpVerified?: undefined;
        bankVerified?: undefined;
        rejectionReason?: undefined;
        verifiedAt?: undefined;
        submittedAt?: undefined;
    } | {
        status: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        ktpVerified: boolean;
        bankVerified: boolean;
        rejectionReason: string;
        verifiedAt: Date;
        submittedAt: Date;
    }>;
    submitKyc(uid: string, body: any): Promise<{
        status: string;
    }>;
    integrationsStatus(): {
        email: {
            provider: string;
            ready: boolean;
        };
        sms: {
            provider: string;
            ready: boolean;
        };
        payment: {
            provider: string;
            ready: boolean;
        };
        storage: {
            provider: string;
            ready: boolean;
        };
    };
    midtransConfig(): {
        enabled: boolean;
        mock: boolean;
        clientKey: any;
        isProduction: boolean;
    };
    demoPay(uid: string, role: string, orderId: string): Promise<any>;
    genericCreateOrder(uid: string, body: any): Promise<any>;
}
