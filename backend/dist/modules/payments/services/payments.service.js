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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const payments_repository_1 = require("../repositories/payments.repository");
const orders_repository_1 = require("../../orders/repositories/orders.repository");
const enums_1 = require("../../../common/constants/enums");
let PaymentsService = class PaymentsService {
    repo;
    ordersRepo;
    constructor(repo, ordersRepo) {
        this.repo = repo;
        this.ordersRepo = ordersRepo;
    }
    async create(userId, dto) {
        const order = await this.ordersRepo.findById(dto.orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.buyerId !== userId)
            throw new common_1.ForbiddenException();
        if (order.status !== enums_1.ORDER_STATUS.WAITING_CONFIRMATION) {
            throw new common_1.BadRequestException('Order is not awaiting payment');
        }
        const payment = await this.repo.create({
            order: { connect: { id: order.id } },
            user: { connect: { id: userId } },
            amount: order.amount,
            fee: order.fee,
            totalAmount: order.totalAmount,
            method: dto.method,
            status: enums_1.PAYMENT_STATUS.PENDING,
            transactionId: 'DEMO-' + Date.now(),
            paymentUrl: `https://demo-pay.tolongin.com/${order.id}`,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return payment;
    }
    async checkStatus(id, userId) {
        const p = await this.repo.findById(id);
        if (!p)
            throw new common_1.NotFoundException();
        if (p.userId !== userId)
            throw new common_1.ForbiddenException();
        return { id: p.id, status: p.status, paidAt: p.paidAt };
    }
    history(userId) {
        return this.repo.findByUser(userId);
    }
    getMethods() {
        return enums_1.PAYMENT_METHOD_VALUES.map((m) => ({
            code: m,
            name: m.replace('_', ' '),
        }));
    }
    async webhook(provider, body) {
        const txId = body?.transactionId || body?.order_id;
        if (!txId)
            return { ok: false };
        const payment = await this.repo.findByTransactionId(txId);
        if (!payment)
            return { ok: false };
        if (body?.status === 'success' ||
            body?.transaction_status === 'settlement') {
            await this.repo.update(payment.id, {
                status: enums_1.PAYMENT_STATUS.COMPLETED,
                paidAt: new Date(),
            });
            await this.ordersRepo.update(payment.orderId, {
                status: enums_1.ORDER_STATUS.ACCEPTED,
            });
        }
        return { ok: true, provider };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payments_repository_1.PaymentsRepository,
        orders_repository_1.OrdersRepository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map