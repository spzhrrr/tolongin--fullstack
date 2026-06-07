import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationType } from '../../../common/constants/enums';
export declare class NotificationsService {
    private readonly repo;
    constructor(repo: NotificationsRepository);
    notify(userId: string, type: NotificationType, title: string, body: string, data?: object, actionUrl?: string): import(".prisma/client").Prisma.Prisma__NotificationClient<{
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
    list(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    unread(userId: string): import(".prisma/client").Prisma.PrismaPromise<number>;
    markRead(id: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    delete(id: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
