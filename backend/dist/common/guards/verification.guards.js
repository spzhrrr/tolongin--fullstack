"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedWithdrawalGuard = exports.VerifiedKtpGuard = exports.VerifiedContactGuard = void 0;
const common_1 = require("@nestjs/common");
let VerifiedContactGuard = class VerifiedContactGuard {
    canActivate(ctx) {
        const user = ctx.switchToHttp().getRequest().user;
        if (!user)
            throw new common_1.ForbiddenException('Login terlebih dahulu');
        if (!user.emailVerified || !user.phoneVerified) {
            throw new common_1.ForbiddenException({
                message: 'Verifikasi email dan nomor telepon diperlukan untuk aksi ini',
                code: 'VERIFICATION_REQUIRED',
                requiredLevel: 'CONTACT',
                missing: {
                    email: !user.emailVerified,
                    phone: !user.phoneVerified,
                },
            });
        }
        return true;
    }
};
exports.VerifiedContactGuard = VerifiedContactGuard;
exports.VerifiedContactGuard = VerifiedContactGuard = __decorate([
    (0, common_1.Injectable)()
], VerifiedContactGuard);
let VerifiedKtpGuard = class VerifiedKtpGuard {
    canActivate(ctx) {
        const user = ctx.switchToHttp().getRequest().user;
        if (!user)
            throw new common_1.ForbiddenException('Login terlebih dahulu');
        if (!user.ktpVerified) {
            throw new common_1.ForbiddenException({
                message: 'Verifikasi KTP diperlukan untuk menjual jasa',
                code: 'VERIFICATION_REQUIRED',
                requiredLevel: 'KTP',
            });
        }
        return true;
    }
};
exports.VerifiedKtpGuard = VerifiedKtpGuard;
exports.VerifiedKtpGuard = VerifiedKtpGuard = __decorate([
    (0, common_1.Injectable)()
], VerifiedKtpGuard);
let VerifiedWithdrawalGuard = class VerifiedWithdrawalGuard {
    canActivate(ctx) {
        const user = ctx.switchToHttp().getRequest().user;
        if (!user)
            throw new common_1.ForbiddenException('Login terlebih dahulu');
        if (!user.ktpVerified || !user.bankVerified) {
            throw new common_1.ForbiddenException({
                message: 'Verifikasi KTP dan rekening bank diperlukan untuk menarik dana',
                code: 'VERIFICATION_REQUIRED',
                requiredLevel: 'BANK',
                missing: {
                    ktp: !user.ktpVerified,
                    bank: !user.bankVerified,
                },
            });
        }
        return true;
    }
};
exports.VerifiedWithdrawalGuard = VerifiedWithdrawalGuard;
exports.VerifiedWithdrawalGuard = VerifiedWithdrawalGuard = __decorate([
    (0, common_1.Injectable)()
], VerifiedWithdrawalGuard);
//# sourceMappingURL=verification.guards.js.map