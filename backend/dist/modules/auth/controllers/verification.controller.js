"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = __importStar(require("bcrypt"));
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const prisma_service_1 = require("../../../prisma/prisma.service");
const email_interface_1 = require("../../../integrations/email/email.interface");
const sms_interface_1 = require("../../../integrations/sms/sms.interface");
function generateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
}
let VerificationController = class VerificationController {
    prisma;
    email;
    sms;
    constructor(prisma, email, sms) {
        this.prisma = prisma;
        this.email = email;
        this.sms = sms;
    }
    async status(uid) {
        const u = await this.prisma.user.findUnique({
            where: { id: uid },
            select: {
                emailVerified: true,
                phoneVerified: true,
                ktpVerified: true,
                ktpRejectedReason: true,
                ktpSubmittedAt: true,
                bankVerified: true,
                email: true,
                phone: true,
            },
        });
        return u;
    }
    async emailRequest(uid) {
        const u = await this.prisma.user.findUnique({ where: { id: uid } });
        if (!u)
            throw new common_1.BadRequestException('User not found');
        if (u.emailVerified)
            return { ok: true, message: 'Email sudah terverifikasi' };
        const otp = generateOtp();
        const hash = await bcrypt.hash(otp, 8);
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                emailOtpHash: hash,
                emailOtpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });
        await this.email.sendOtp(u.email, otp);
        return { ok: true, demoOtp: otp };
    }
    async emailConfirm(uid, body) {
        const u = await this.prisma.user.findUnique({ where: { id: uid } });
        if (!u || !u.emailOtpHash || !u.emailOtpExpiresAt)
            throw new common_1.BadRequestException('OTP tidak ditemukan, silakan request ulang');
        if (u.emailOtpExpiresAt < new Date())
            throw new common_1.BadRequestException('OTP kedaluwarsa');
        const ok = await bcrypt.compare(String(body?.otp || ''), u.emailOtpHash);
        if (!ok)
            throw new common_1.BadRequestException('OTP salah');
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                emailVerified: true,
                emailVerifiedAt: new Date(),
                emailOtpHash: null,
                emailOtpExpiresAt: null,
            },
        });
        return { ok: true };
    }
    async phoneRequest(uid, body) {
        const u = await this.prisma.user.findUnique({ where: { id: uid } });
        if (!u)
            throw new common_1.BadRequestException('User not found');
        const phone = (body?.phone || u.phone || '').trim();
        if (!phone)
            throw new common_1.BadRequestException('Nomor telepon belum diisi');
        if (u.phoneVerified && phone === u.phone)
            return { ok: true, message: 'Nomor sudah terverifikasi' };
        const otp = generateOtp();
        const hash = await bcrypt.hash(otp, 8);
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                phone,
                phoneOtpHash: hash,
                phoneOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
                phoneVerified: false,
            },
        });
        await this.sms.sendOtp(phone, otp);
        return { ok: true, demoOtp: otp };
    }
    async phoneConfirm(uid, body) {
        const u = await this.prisma.user.findUnique({ where: { id: uid } });
        if (!u || !u.phoneOtpHash || !u.phoneOtpExpiresAt)
            throw new common_1.BadRequestException('OTP tidak ditemukan, silakan request ulang');
        if (u.phoneOtpExpiresAt < new Date())
            throw new common_1.BadRequestException('OTP kedaluwarsa');
        const ok = await bcrypt.compare(String(body?.otp || ''), u.phoneOtpHash);
        if (!ok)
            throw new common_1.BadRequestException('OTP salah');
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                phoneVerified: true,
                phoneVerifiedAt: new Date(),
                phoneOtpHash: null,
                phoneOtpExpiresAt: null,
            },
        });
        return { ok: true };
    }
    async submitKtp(uid, body) {
        if (!body?.ktpNumber || !body?.ktpPhoto || !body?.ktpSelfie) {
            throw new common_1.BadRequestException('Lengkapi nomor KTP, foto KTP, dan selfie dengan KTP');
        }
        await this.prisma.user.update({
            where: { id: uid },
            data: {
                ktpNumber: body.ktpNumber,
                ktpPhoto: body.ktpPhoto,
                ktpSelfie: body.ktpSelfie,
                ktpSubmittedAt: new Date(),
                ktpVerified: false,
                ktpRejectedReason: null,
            },
        });
        return { ok: true, status: 'PENDING' };
    }
    async verifyBank(uid) {
        const ba = await this.prisma.bankAccount.findFirst({
            where: { userId: uid },
        });
        if (!ba)
            throw new common_1.BadRequestException('Tambah rekening bank dulu di Profil > Penghasilan');
        await this.prisma.user.update({
            where: { id: uid },
            data: { bankVerified: true },
        });
        return { ok: true };
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my verification status' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "status", null);
__decorate([
    (0, common_1.Post)('email/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Send OTP to email (mock)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "emailRequest", null);
__decorate([
    (0, common_1.Post)('email/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm email OTP' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "emailConfirm", null);
__decorate([
    (0, common_1.Post)('phone/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Send OTP to phone (mock)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "phoneRequest", null);
__decorate([
    (0, common_1.Post)('phone/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm phone OTP' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "phoneConfirm", null);
__decorate([
    (0, common_1.Post)('ktp/submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Submit KTP for verification' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "submitKtp", null);
__decorate([
    (0, common_1.Post)('bank/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark bank account as verified (mock)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyBank", null);
exports.VerificationController = VerificationController = __decorate([
    (0, swagger_1.ApiTags)('Verification'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Controller)('verification'),
    __param(1, (0, common_1.Inject)(email_interface_1.EMAIL_SERVICE)),
    __param(2, (0, common_1.Inject)(sms_interface_1.SMS_SERVICE)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, Object])
], VerificationController);
//# sourceMappingURL=verification.controller.js.map