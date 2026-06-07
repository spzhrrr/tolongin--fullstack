"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailService = void 0;
const common_1 = require("@nestjs/common");
let MockEmailService = class MockEmailService {
    logger = new common_1.Logger('MockEmailService');
    async sendEmail({ to, subject }) {
        this.logger.log(`📧 [MOCK] email -> ${to} | subject="${subject}"`);
    }
    async sendOtp(to, otp) {
        this.logger.log(`📧 [MOCK] OTP -> ${to} : ${otp}`);
    }
    async sendPasswordReset(to, token, link) {
        this.logger.log(`📧 [MOCK] PWD-RESET -> ${to} token=${token} link=${link}`);
    }
    async sendVerificationEmail(to, otp) {
        this.logger.log(`📧 [MOCK] VERIFY-EMAIL -> ${to} otp=${otp}`);
    }
};
exports.MockEmailService = MockEmailService;
exports.MockEmailService = MockEmailService = __decorate([
    (0, common_1.Injectable)()
], MockEmailService);
//# sourceMappingURL=mock-email.service.js.map