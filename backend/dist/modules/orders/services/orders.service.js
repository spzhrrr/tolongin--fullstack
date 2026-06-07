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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("../repositories/orders.repository");
const services_repository_1 = require("../../services/repositories/services.repository");
const applications_service_1 = require("../../applications/services/applications.service");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
const PLATFORM_FEE_RATE = 0.05;
let OrdersService = class OrdersService {
    repo;
    servicesRepo;
    applicationsService;
    constructor(repo, servicesRepo, applicationsService) {
        this.repo = repo;
        this.servicesRepo = servicesRepo;
        this.applicationsService = applicationsService;
    }
    toDto(o) {
        return { ...o, timeline: (0, helpers_1.parseJsonField)(o.timeline, []) };
    }
    roleFor(userId, order, userRole) {
        if (userRole === enums_1.ROLE.ADMIN)
            return 'admin';
        if (userId === order.buyerId)
            return 'buyer';
        if (userId === order.sellerId)
            return 'seller';
        return null;
    }
    async transition(orderId, userId, userRole, nextStatus, note) {
        const o = await this.repo.findById(orderId);
        if (!o)
            throw new common_1.NotFoundException('Order not found');
        const role = this.roleFor(userId, o, userRole);
        if (!role)
            throw new common_1.ForbiddenException();
        const current = o.status;
        const allowed = enums_1.ORDER_TRANSITIONS[current]?.[role] || [];
        if (!allowed.includes(nextStatus)) {
            throw new common_1.BadRequestException(`Transition not allowed: ${current} -> ${nextStatus} (role: ${role})`);
        }
        const timeline = (0, helpers_1.parseJsonField)(o.timeline, []);
        timeline.push({
            status: nextStatus,
            at: new Date().toISOString(),
            by: userId,
            note,
        });
        const data = {
            status: nextStatus,
            timeline: (0, helpers_1.stringifyJsonField)(timeline),
        };
        if (nextStatus === enums_1.ORDER_STATUS.COMPLETED)
            data.completedAt = new Date();
        if (nextStatus === enums_1.ORDER_STATUS.CANCELLED) {
            data.cancelledAt = new Date();
            if (note)
                data.cancellationReason = note;
        }
        const updated = await this.repo.update(orderId, data);
        return this.toDto(updated);
    }
    async createFromService(buyerId, serviceId, dto) {
        const s = await this.servicesRepo.findById(serviceId);
        if (!s)
            throw new common_1.NotFoundException('Service not found');
        if (!s.isActive)
            throw new common_1.BadRequestException('Service is not active');
        if (s.sellerId === buyerId)
            throw new common_1.BadRequestException('Cannot order your own service');
        const fee = +(s.price * PLATFORM_FEE_RATE).toFixed(2);
        const totalAmount = +(s.price + fee).toFixed(2);
        const timeline = [
            {
                status: enums_1.ORDER_STATUS.WAITING_CONFIRMATION,
                at: new Date().toISOString(),
                by: buyerId,
            },
        ];
        const created = await this.repo.create({
            buyer: { connect: { id: buyerId } },
            seller: { connect: { id: s.sellerId } },
            service: { connect: { id: s.id } },
            title: s.title,
            amount: s.price,
            fee,
            totalAmount,
            status: enums_1.ORDER_STATUS.WAITING_CONFIRMATION,
            notes: dto.notes,
            deliveryType: dto.deliveryType || 'DIGITAL',
            deliveryAddress: dto.deliveryAddress,
            timeline: (0, helpers_1.stringifyJsonField)(timeline),
        });
        return this.toDto(created);
    }
    async createFromApplication(buyerId, applicationId) {
        const app = await this.applicationsService.findById(applicationId);
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        if (app.job.buyerId !== buyerId)
            throw new common_1.ForbiddenException();
        if (app.status !== enums_1.APPLICATION_STATUS.ACCEPTED)
            throw new common_1.BadRequestException('Application not accepted');
        const fee = +(app.proposedPrice * PLATFORM_FEE_RATE).toFixed(2);
        const totalAmount = +(app.proposedPrice + fee).toFixed(2);
        const timeline = [
            {
                status: enums_1.ORDER_STATUS.WAITING_CONFIRMATION,
                at: new Date().toISOString(),
                by: buyerId,
            },
        ];
        const created = await this.repo.create({
            buyer: { connect: { id: buyerId } },
            seller: { connect: { id: app.sellerId } },
            application: { connect: { id: app.id } },
            title: app.job.title,
            amount: app.proposedPrice,
            fee,
            totalAmount,
            status: enums_1.ORDER_STATUS.WAITING_CONFIRMATION,
            timeline: (0, helpers_1.stringifyJsonField)(timeline),
        });
        return this.toDto(created);
    }
    async getById(id, userId, userRole) {
        const o = await this.repo.findById(id);
        if (!o)
            throw new common_1.NotFoundException('Order not found');
        if (userRole !== enums_1.ROLE.ADMIN &&
            o.buyerId !== userId &&
            o.sellerId !== userId) {
            throw new common_1.ForbiddenException();
        }
        return this.toDto(o);
    }
    async listByBuyer(buyerId) {
        const items = await this.repo.findByBuyer(buyerId);
        return items.map((i) => this.toDto(i));
    }
    async listBySeller(sellerId) {
        const items = await this.repo.findBySeller(sellerId);
        return items.map((i) => this.toDto(i));
    }
    accept(id, userId, userRole) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.ACCEPTED);
    }
    start(id, userId, userRole) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.IN_PROGRESS);
    }
    submitReview(id, userId, userRole) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.IN_REVIEW);
    }
    requestRevision(id, userId, userRole, dto) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.REVISION_REQUESTED, dto.reason);
    }
    complete(id, userId, userRole) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.COMPLETED);
    }
    cancel(id, userId, userRole, dto) {
        return this.transition(id, userId, userRole, enums_1.ORDER_STATUS.CANCELLED, dto.reason);
    }
    async getTimeline(id, userId, userRole) {
        const o = await this.getById(id, userId, userRole);
        return o.timeline;
    }
    async getInvoice(id, userId, userRole) {
        const o = await this.getById(id, userId, userRole);
        return {
            orderId: o.id,
            title: o.title,
            buyer: o.buyer,
            seller: o.seller,
            amount: o.amount,
            fee: o.fee,
            total: o.totalAmount,
            status: o.status,
            issuedAt: o.createdAt,
            paidAt: o.completedAt,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        services_repository_1.ServicesRepository,
        applications_service_1.ApplicationsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map