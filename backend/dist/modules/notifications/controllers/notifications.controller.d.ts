import { NotificationsService } from '../services/notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(uid: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    unread(uid: string): Promise<{
        count: number;
    }>;
    read(id: string, uid: string): Promise<{
        ok: boolean;
    }>;
    readAll(uid: string): Promise<{
        ok: boolean;
    }>;
    delete(id: string, uid: string): Promise<{
        ok: boolean;
    }>;
}
