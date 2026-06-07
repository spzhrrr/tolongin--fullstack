import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class NotificationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.NotificationCreateInput): Prisma.Prisma__NotificationClient<{
        data: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        type: string;
        body: string;
        actionUrl: string | null;
        isRead: boolean;
        readAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUser(userId: string): Prisma.PrismaPromise<{
        data: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        type: string;
        body: string;
        actionUrl: string | null;
        isRead: boolean;
        readAt: Date | null;
    }[]>;
    markRead(id: string, userId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
    markAllRead(userId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
    unreadCount(userId: string): Prisma.PrismaPromise<number>;
    delete(id: string, userId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
