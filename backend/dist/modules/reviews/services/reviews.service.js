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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const reviews_repository_1 = require("../repositories/reviews.repository");
const orders_repository_1 = require("../../orders/repositories/orders.repository");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    repo;
    ordersRepo;
    prisma;
    constructor(repo, ordersRepo, prisma) {
        this.repo = repo;
        this.ordersRepo = ordersRepo;
        this.prisma = prisma;
    }
    toDto(r) {
        return { ...r, images: (0, helpers_1.parseJsonField)(r.images, []) };
    }
    async create(userId, dto) {
        const order = await this.ordersRepo.findById(dto.orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== userId)
            throw new common_1.ForbiddenException('Only buyer can review');
        if (order.status !== enums_1.ORDER_STATUS.COMPLETED)
            throw new common_1.BadRequestException('Order must be completed');
        const existing = await this.repo.findByOrder(dto.orderId);
        if (existing.length > 0)
            throw new common_1.BadRequestException('Review already submitted');
        const created = await this.repo.create({
            order: { connect: { id: order.id } },
            reviewer: { connect: { id: userId } },
            reviewee: { connect: { id: order.sellerId } },
            service: order.serviceId
                ? { connect: { id: order.serviceId } }
                : undefined,
            rating: dto.rating,
            comment: dto.comment,
            images: (0, helpers_1.stringifyJsonField)(dto.images || []),
            isAnonymous: dto.isAnonymous || false,
        });
        const agg = await this.repo.aggregateSellerRating(order.sellerId);
        await this.prisma.user.update({
            where: { id: order.sellerId },
            data: { rating: agg._avg.rating || 0, reviewCount: agg._count },
        });
        if (order.serviceId) {
            const svcAgg = await this.prisma.review.aggregate({
                where: { serviceId: order.serviceId },
                _avg: { rating: true },
                _count: true,
            });
            await this.prisma.service.update({
                where: { id: order.serviceId },
                data: { rating: svcAgg._avg.rating || 0, reviewCount: svcAgg._count },
            });
        }
        return this.toDto(created);
    }
    async getBySeller(sellerId) {
        const reviews = await this.repo.findBySeller(sellerId);
        return reviews.map((r) => this.toDto(r));
    }
    async getByService(serviceId) {
        const reviews = await this.repo.findByService(serviceId);
        return reviews.map((r) => this.toDto(r));
    }
    async update(id, userId, dto) {
        const r = await this.repo.findById(id);
        if (!r)
            throw new common_1.NotFoundException();
        if (r.reviewerId !== userId)
            throw new common_1.ForbiddenException();
        const updated = await this.repo.update(id, dto);
        return this.toDto(updated);
    }
    async delete(id, userId, role) {
        const r = await this.repo.findById(id);
        if (!r)
            throw new common_1.NotFoundException();
        if (r.reviewerId !== userId && role !== enums_1.ROLE.ADMIN)
            throw new common_1.ForbiddenException();
        await this.repo.delete(id);
        return { message: 'Review deleted' };
    }
    async reply(id, userId, dto) {
        const r = await this.repo.findById(id);
        if (!r)
            throw new common_1.NotFoundException();
        if (r.revieweeId !== userId)
            throw new common_1.ForbiddenException('Only the reviewed seller can reply');
        const updated = await this.repo.update(id, {
            reply: dto.reply,
            replyAt: new Date(),
        });
        return this.toDto(updated);
    }
    async markHelpful(id) {
        const r = await this.repo.findById(id);
        if (!r)
            throw new common_1.NotFoundException();
        const updated = await this.repo.update(id, {
            helpfulCount: { increment: 1 },
        });
        return this.toDto(updated);
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reviews_repository_1.ReviewsRepository,
        orders_repository_1.OrdersRepository,
        prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map