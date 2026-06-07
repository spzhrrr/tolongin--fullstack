"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AdminRepository = class AdminRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async stats() {
        const [users, services, jobs, orders, pendingKyc, disputes, completedOrders,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.service.count(),
            this.prisma.job.count(),
            this.prisma.order.count(),
            this.prisma.user.count({
                where: { ktpSubmittedAt: { not: null }, ktpVerified: false, ktpRejectedReason: null },
            }),
            this.prisma.dispute.count({ where: { status: 'PENDING' } }),
            this.prisma.order.findMany({
                where: { status: 'COMPLETED' },
                select: { totalAmount: true },
            }),
        ]);
        const revenue = completedOrders.reduce((s, o) => s + o.totalAmount, 0);
        return {
            users,
            services,
            jobs,
            orders,
            pendingSellers: pendingKyc,
            pendingKyc,
            disputes,
            revenue,
        };
    }
    listUsers() {
        return this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                role: true,
                isActive: true,
                isBanned: true,
                bannedReason: true,
                emailVerified: true,
                phoneVerified: true,
                ktpVerified: true,
                bankVerified: true,
                balance: true,
                rating: true,
                completedOrders: true,
                createdAt: true,
            },
        });
    }
    findUser(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    updateUser(id, data) {
        return this.prisma.user.update({ where: { id }, data });
    }
    pendingKyc() {
        return this.prisma.user.findMany({
            where: {
                ktpSubmittedAt: { not: null },
                ktpVerified: false,
                ktpRejectedReason: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                ktpNumber: true,
                ktpPhoto: true,
                ktpSelfie: true,
                ktpSubmittedAt: true,
            },
            orderBy: { ktpSubmittedAt: 'asc' },
        });
    }
    approveKyc(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ktpVerified: true,
                ktpVerifiedAt: new Date(),
                ktpRejectedReason: null,
            },
        });
    }
    rejectKyc(userId, reason) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ktpVerified: false,
                ktpRejectedReason: reason,
            },
        });
    }
    listServices() {
        return this.prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
            include: { seller: { select: { id: true, name: true } } },
        });
    }
    deleteService(id) {
        return this.prisma.service.delete({ where: { id } });
    }
    listJobs() {
        return this.prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
            include: { buyer: { select: { id: true, name: true } } },
        });
    }
    deleteJob(id) {
        return this.prisma.job.delete({ where: { id } });
    }
    listOrders() {
        return this.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                buyer: { select: { id: true, name: true } },
                seller: { select: { id: true, name: true } },
            },
        });
    }
    listDisputes() {
        return this.prisma.dispute.findMany({
            orderBy: { createdAt: 'desc' },
            include: { order: true },
        });
    }
    listActivity() {
        return this.prisma.activityLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
    }
    getSettings() {
        return this.prisma.platformSetting.findMany();
    }
    upsertSetting(key, value) {
        return this.prisma.platformSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
    }
    logActivity(userId, action, entity, entityId, metadata) {
        return this.prisma.activityLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                metadata: metadata ? JSON.stringify(metadata) : null,
            },
        });
    }
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminRepository);
//# sourceMappingURL=admin.repository.js.map