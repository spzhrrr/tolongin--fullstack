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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("../services/orders.service");
const order_dto_1 = require("../dto/order.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    fromService(serviceId, buyerId, userRole, dto) {
        if (userRole !== enums_1.ROLE.USER) {
            throw new common_1.ForbiddenException('Hanya akun BUYER yang dapat membuat pesanan');
        }
        return this.ordersService.createFromService(buyerId, serviceId, dto);
    }
    fromApplication(applicationId, buyerId, userRole) {
        if (userRole !== enums_1.ROLE.USER) {
            throw new common_1.ForbiddenException('Hanya akun BUYER yang dapat membuat pesanan');
        }
        return this.ordersService.createFromApplication(buyerId, applicationId);
    }
    async listMine(userId, role, filter) {
        const f = (filter || 'all').toUpperCase();
        if (f === 'BUYER')
            return this.ordersService.listByBuyer(userId);
        if (f === 'SELLER')
            return this.ordersService.listBySeller(userId);
        const [buyer, seller] = await Promise.all([
            this.ordersService.listByBuyer(userId),
            this.ordersService.listBySeller(userId),
        ]);
        const map = new Map();
        [...buyer, ...seller].forEach((o) => map.set(o.id, o));
        return [...map.values()].sort((a, b) => new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime());
    }
    buyerOrders(buyerId) {
        return this.ordersService.listByBuyer(buyerId);
    }
    sellerOrders(sellerId) {
        return this.ordersService.listBySeller(sellerId);
    }
    detail(id, userId, role) {
        return this.ordersService.getById(id, userId, role);
    }
    accept(id, uid, role) {
        return this.ordersService.accept(id, uid, role);
    }
    start(id, uid, role) {
        return this.ordersService.start(id, uid, role);
    }
    submitReview(id, uid, role) {
        return this.ordersService.submitReview(id, uid, role);
    }
    revision(id, uid, role, dto) {
        return this.ordersService.requestRevision(id, uid, role, dto);
    }
    complete(id, uid, role) {
        return this.ordersService.complete(id, uid, role);
    }
    cancel(id, uid, role, dto) {
        return this.ordersService.cancel(id, uid, role, dto);
    }
    async setStatus(id, uid, role, body) {
        if (!body?.status)
            throw new common_1.BadRequestException('status required');
        const next = String(body.status).toUpperCase();
        switch (next) {
            case enums_1.ORDER_STATUS.ACCEPTED:
                return this.ordersService.accept(id, uid, role);
            case enums_1.ORDER_STATUS.IN_PROGRESS:
                return this.ordersService.start(id, uid, role);
            case enums_1.ORDER_STATUS.IN_REVIEW:
                return this.ordersService.submitReview(id, uid, role);
            case enums_1.ORDER_STATUS.REVISION_REQUESTED:
                return this.ordersService.requestRevision(id, uid, role, {
                    reason: body.reason || 'Mohon revisi',
                });
            case enums_1.ORDER_STATUS.COMPLETED:
                return this.ordersService.complete(id, uid, role);
            case enums_1.ORDER_STATUS.CANCELLED:
                return this.ordersService.cancel(id, uid, role, {
                    reason: body.reason,
                });
            default:
                throw new common_1.BadRequestException(`Unsupported status: ${next}`);
        }
    }
    timeline(id, uid, role) {
        return this.ordersService.getTimeline(id, uid, role);
    }
    invoice(id, uid, role) {
        return this.ordersService.getInvoice(id, uid, role);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)('service/:serviceId'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Create order from a service' }),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, order_dto_1.CreateOrderFromServiceDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "fromService", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)('application/:applicationId'),
    (0, swagger_1.ApiOperation)({
        summary: '[Buyer] Create order from an accepted application',
    }),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "fromApplication", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List my orders. Optional ?role=BUYER|SELLER|all (defaults to all when omitted; admin sees nothing here).',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "listMine", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Get)('buyer'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] My orders' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "buyerOrders", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Get)('seller'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Orders received' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "sellerOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order detail' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "detail", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Patch)(':id/accept'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Accept order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "accept", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Patch)(':id/start'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Start working on order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "start", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Patch)(':id/submit-review'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Submit work for buyer review' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "submitReview", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(':id/revision'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Request revision' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, order_dto_1.RevisionRequestDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "revision", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Complete order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "complete", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel order (subject to state machine)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, order_dto_1.CancelOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Generic state transition (frontend-friendly)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "setStatus", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get status timeline' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "timeline", null);
__decorate([
    (0, common_1.Get)(':id/invoice'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order invoice' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "invoice", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map