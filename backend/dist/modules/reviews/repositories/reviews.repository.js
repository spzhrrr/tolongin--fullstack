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
exports.ReviewsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ReviewsRepository = class ReviewsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.review.create({ data });
    }
    findById(id) {
        return this.prisma.review.findUnique({ where: { id } });
    }
    findByOrder(orderId) {
        return this.prisma.review.findMany({ where: { orderId } });
    }
    findBySeller(sellerId) {
        return this.prisma.review.findMany({
            where: { revieweeId: sellerId },
            include: { reviewer: { select: { id: true, name: true, avatar: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findByService(serviceId) {
        return this.prisma.review.findMany({
            where: { serviceId },
            include: { reviewer: { select: { id: true, name: true, avatar: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    update(id, data) {
        return this.prisma.review.update({ where: { id }, data });
    }
    delete(id) {
        return this.prisma.review.delete({ where: { id } });
    }
    aggregateSellerRating(sellerId) {
        return this.prisma.review.aggregate({
            where: { revieweeId: sellerId },
            _avg: { rating: true },
            _count: true,
        });
    }
};
exports.ReviewsRepository = ReviewsRepository;
exports.ReviewsRepository = ReviewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsRepository);
//# sourceMappingURL=reviews.repository.js.map