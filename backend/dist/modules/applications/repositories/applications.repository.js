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
exports.ApplicationsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ApplicationsRepository = class ApplicationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.application.create({ data });
    }
    findById(id) {
        return this.prisma.application.findUnique({
            where: { id },
            include: {
                job: {
                    include: {
                        buyer: { select: { id: true, name: true, avatar: true } },
                    },
                },
                seller: { select: { id: true, name: true, avatar: true } },
            },
        });
    }
    findByJobAndSeller(jobId, sellerId) {
        return this.prisma.application.findUnique({
            where: { jobId_sellerId: { jobId, sellerId } },
        });
    }
    findBySeller(sellerId) {
        return this.prisma.application.findMany({
            where: { sellerId },
            include: { job: { include: { category: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findByJob(jobId) {
        return this.prisma.application.findMany({
            where: { jobId },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        ktpVerified: true,
                        rating: true,
                        reviewCount: true,
                        completedOrders: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    update(id, data) {
        return this.prisma.application.update({ where: { id }, data });
    }
    delete(id) {
        return this.prisma.application.delete({ where: { id } });
    }
};
exports.ApplicationsRepository = ApplicationsRepository;
exports.ApplicationsRepository = ApplicationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsRepository);
//# sourceMappingURL=applications.repository.js.map