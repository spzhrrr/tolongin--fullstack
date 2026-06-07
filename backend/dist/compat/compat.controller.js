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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../common/decorators/public.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const auth_service_1 = require("../modules/auth/services/auth.service");
const chat_service_1 = require("../modules/chat/services/chat.service");
const admin_service_1 = require("../modules/admin/services/admin.service");
const orders_service_1 = require("../modules/orders/services/orders.service");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../common/constants/enums");
let CompatController = class CompatController {
    authService;
    chat;
    admin;
    orders;
    prisma;
    constructor(authService, chat, admin, orders, prisma) {
        this.authService = authService;
        this.chat = chat;
        this.admin = admin;
        this.orders = orders;
        this.prisma = prisma;
    }
    me(uid) {
        return this.authService.getProfile(uid);
    }
    updateMe(uid, body) {
        return this.authService.updateProfile(uid, body);
    }
    conversations(uid) {
        return this.chat.listConversations(uid);
    }
    startConv(uid, body) {
        return this.chat.startConversation(uid, body);
    }
    msgs(id, uid) {
        return this.chat.getMessages(id, uid);
    }
    sendMessage(uid, body) {
        return this.chat.sendMessage(body.conversationId, uid, body);
    }
    async stats(role) {
        if (role !== enums_1.ROLE.ADMIN)
            throw new common_1.ForbiddenException();
        return this.admin.stats();
    }
    async adminKyc(role, status) {
        if (role !== enums_1.ROLE.ADMIN)
            throw new common_1.ForbiddenException();
        if (!status || status === 'pending')
            return this.admin.pendingSellers();
        return this.prisma.user.findMany({
            where: status === 'verified'
                ? { ktpVerified: true }
                : { ktpRejectedReason: { not: null }, ktpVerified: false },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                ktpVerified: true,
                ktpVerifiedAt: true,
                ktpRejectedReason: true,
                ktpSubmittedAt: true,
            },
        });
    }
    async listFavs(uid) {
        const rows = await this.prisma.favorite.findMany({
            where: { userId: uid },
            include: {
                service: {
                    include: {
                        seller: { select: { id: true, name: true, avatar: true } },
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((r) => r.service);
    }
    async addFav(uid, serviceId) {
        await this.prisma.favorite.upsert({
            where: { userId_serviceId: { userId: uid, serviceId } },
            update: {},
            create: { userId: uid, serviceId },
        });
        return { ok: true };
    }
    async removeFav(uid, serviceId) {
        await this.prisma.favorite
            .delete({ where: { userId_serviceId: { userId: uid, serviceId } } })
            .catch(() => null);
        return { ok: true };
    }
    async myKyc(uid) {
        const u = await this.prisma.user.findUnique({
            where: { id: uid },
            select: {
                emailVerified: true,
                phoneVerified: true,
                ktpVerified: true,
                ktpVerifiedAt: true,
                ktpSubmittedAt: true,
                ktpRejectedReason: true,
                bankVerified: true,
            },
        });
        if (!u)
            return { status: 'NOT_SUBMITTED' };
        const status = u.ktpVerified
            ? 'VERIFIED'
            : u.ktpRejectedReason
                ? 'REJECTED'
                : u.ktpSubmittedAt
                    ? 'PENDING'
                    : 'NOT_SUBMITTED';
        return {
            status,
            emailVerified: u.emailVerified,
            phoneVerified: u.phoneVerified,
            ktpVerified: u.ktpVerified,
            bankVerified: u.bankVerified,
            rejectionReason: u.ktpRejectedReason,
            verifiedAt: u.ktpVerifiedAt,
            submittedAt: u.ktpSubmittedAt,
        };
    }
    async submitKyc(uid, body) {
        if (!body?.ktpPhoto || !body?.ktpSelfie) {
        }
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                ktpNumber: body?.ktpNumber || null,
                ktpPhoto: body?.ktpPhoto || null,
                ktpSelfie: body?.ktpSelfie || null,
                ktpSubmittedAt: new Date(),
                ktpVerified: false,
                ktpRejectedReason: null,
            },
        });
        return { status: 'PENDING' };
    }
    integrationsStatus() {
        return {
            email: { provider: 'mock', ready: true },
            sms: { provider: 'mock', ready: true },
            payment: { provider: 'mock', ready: true },
            storage: { provider: 'mock', ready: true },
        };
    }
    midtransConfig() {
        return {
            enabled: false,
            mock: true,
            clientKey: null,
            isProduction: false,
        };
    }
    async demoPay(uid, role, orderId) {
        return this.orders.accept(orderId, uid, role).catch(() => ({ ok: true }));
    }
    async genericCreateOrder(uid, body) {
        if (body?.serviceId) {
            return this.orders.createFromService(uid, body.serviceId, body);
        }
        if (body?.applicationId) {
            return this.orders.createFromApplication(uid, body.applicationId);
        }
        return { error: 'Provide serviceId or applicationId' };
    }
};
exports.CompatController = CompatController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('auth/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Alias for /auth/profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Put)('users/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Alias for PUT /auth/profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "updateMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('conversations'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "conversations", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('conversations'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "startConv", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('conversations/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "msgs", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message (body: {conversationId, content})' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "sendMessage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('admin/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Alias for /admin/dashboard/stats' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "stats", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('admin/kyc'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "adminKyc", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('favorites'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "listFavs", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('favorites/:serviceId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "addFav", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Delete)('favorites/:serviceId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "removeFav", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Get)('kyc/me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "myKyc", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('kyc/submit'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "submitKyc", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('integrations/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "integrationsStatus", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('payments/midtrans/config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompatController.prototype, "midtransConfig", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('payments/demo/confirm/:orderId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "demoPay", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)('orders'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generic order creation (body: { serviceId | applicationId, notes?, deliveryType?, deliveryAddress? })',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompatController.prototype, "genericCreateOrder", null);
exports.CompatController = CompatController = __decorate([
    (0, swagger_1.ApiTags)('Compat'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        chat_service_1.ChatService,
        admin_service_1.AdminService,
        orders_service_1.OrdersService,
        prisma_service_1.PrismaService])
], CompatController);
//# sourceMappingURL=compat.controller.js.map