import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditLogService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(userId: string | null, action: string, entity?: string, entityId?: string, metadata?: Record<string, unknown>): Promise<void>;
}
