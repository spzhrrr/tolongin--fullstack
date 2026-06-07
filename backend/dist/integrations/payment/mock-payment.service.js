"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPaymentService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let MockPaymentService = class MockPaymentService {
    logger = new common_1.Logger('MockPaymentService');
    async createPayment(p) {
        const transactionId = `MOCK-${Date.now()}-${(0, crypto_1.randomBytes)(4).toString('hex').toUpperCase()}`;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const paymentUrl = `https://mock-payment.tolongin.local/pay/${transactionId}`;
        this.logger.log(`💳 [MOCK] payment created for order=${p.orderId} amount=${p.amount} txn=${transactionId}`);
        return { transactionId, paymentUrl, expiresAt };
    }
    verifyWebhook(_payload) {
        return true;
    }
    async getStatus(transactionId) {
        this.logger.log(`💳 [MOCK] status check ${transactionId}`);
        return 'COMPLETED';
    }
};
exports.MockPaymentService = MockPaymentService;
exports.MockPaymentService = MockPaymentService = __decorate([
    (0, common_1.Injectable)()
], MockPaymentService);
//# sourceMappingURL=mock-payment.service.js.map