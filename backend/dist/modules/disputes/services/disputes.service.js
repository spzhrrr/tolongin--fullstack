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
exports.DisputesService = void 0;
const common_1 = require("@nestjs/common");
const disputes_repository_1 = require("../repositories/disputes.repository");
const orders_repository_1 = require("../../orders/repositories/orders.repository");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
let DisputesService = class DisputesService {
    repo;
    ordersRepo;
    constructor(repo, ordersRepo) {
        this.repo = repo;
        this.ordersRepo = ordersRepo;
    }
    toDto(d) {
        return { ...d, evidence: (0, helpers_1.parseJsonField)(d.evidence, []) };
    }
    async create(userId, dto) {
        const order = await this.ordersRepo.findById(dto.orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== userId && order.sellerId !== userId)
            throw new common_1.ForbiddenException();
        if (await this.repo.findByOrder(dto.orderId))
            throw new common_1.BadRequestException('Dispute already exists for this order');
        const dispute = await this.repo.create({
            order: { connect: { id: dto.orderId } },
            raiser: { connect: { id: userId } },
            reason: dto.reason,
            description: dto.description,
            evidence: (0, helpers_1.stringifyJsonField)(dto.evidence || []),
            status: enums_1.DISPUTE_STATUS.PENDING,
        });
        await this.ordersRepo.update(order.id, { status: enums_1.ORDER_STATUS.DISPUTED });
        return this.toDto(dispute);
    }
    async findAll() {
        const items = await this.repo.findAll();
        return items.map((i) => this.toDto(i));
    }
    async findById(id) {
        const d = await this.repo.findById(id);
        if (!d)
            throw new common_1.NotFoundException();
        return this.toDto(d);
    }
    async resolve(id, adminId, dto) {
        const d = await this.repo.findById(id);
        if (!d)
            throw new common_1.NotFoundException();
        const updated = await this.repo.update(id, {
            status: enums_1.DISPUTE_STATUS.RESOLVED,
            resolution: dto.resolution,
            resolvedBy: adminId,
            resolvedAt: new Date(),
        });
        return this.toDto(updated);
    }
    async reject(id, adminId) {
        const d = await this.repo.findById(id);
        if (!d)
            throw new common_1.NotFoundException();
        const updated = await this.repo.update(id, {
            status: enums_1.DISPUTE_STATUS.REJECTED,
            resolvedBy: adminId,
            resolvedAt: new Date(),
        });
        return this.toDto(updated);
    }
};
exports.DisputesService = DisputesService;
exports.DisputesService = DisputesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [disputes_repository_1.DisputesRepository,
        orders_repository_1.OrdersRepository])
], DisputesService);
//# sourceMappingURL=disputes.service.js.map