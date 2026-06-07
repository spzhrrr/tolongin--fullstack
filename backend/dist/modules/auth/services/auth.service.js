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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const auth_repository_1 = require("../repositories/auth.repository");
const token_blacklist_service_1 = require("../../../common/services/token-blacklist.service");
const audit_log_service_1 = require("../../../common/services/audit-log.service");
const email_interface_1 = require("../../../integrations/email/email.interface");
const sms_interface_1 = require("../../../integrations/sms/sms.interface");
const BCRYPT_ROUNDS = 12;
let AuthService = AuthService_1 = class AuthService {
    repo;
    jwtService;
    config;
    blacklist;
    audit;
    email;
    sms;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(repo, jwtService, config, blacklist, audit, email, sms) {
        this.repo = repo;
        this.jwtService = jwtService;
        this.config = config;
        this.blacklist = blacklist;
        this.audit = audit;
        this.email = email;
        this.sms = sms;
    }
    toPublic(u) {
        return {
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            phone: u.phone,
            avatar: u.avatar,
            bio: u.bio,
            isActive: u.isActive,
            isBanned: u.isBanned,
            emailVerified: u.emailVerified ?? false,
            phoneVerified: u.phoneVerified ?? false,
            ktpVerified: u.ktpVerified ?? false,
            bankVerified: u.bankVerified ?? false,
            ktpRejectedReason: u.ktpRejectedReason,
            ktpSubmittedAt: u.ktpSubmittedAt,
            rating: u.rating ?? 0,
            reviewCount: u.reviewCount ?? 0,
            totalOrders: u.totalOrders ?? 0,
            completedOrders: u.completedOrders ?? 0,
            balance: u.balance ?? 0,
            createdAt: u.createdAt,
        };
    }
    secret() {
        return this.config.get('app.jwt.secret') || 'change-me';
    }
    signAccess(u) {
        const payload = {
            sub: u.id,
            email: u.email,
            role: u.role,
            type: 'access',
            jti: (0, crypto_1.randomUUID)(),
        };
        return this.jwtService.sign(payload, {
            secret: this.secret(),
            expiresIn: this.config.get('app.jwt.accessExpiresIn') || '15m',
        });
    }
    signRefresh(u) {
        const payload = {
            sub: u.id,
            email: u.email,
            role: u.role,
            type: 'refresh',
            jti: (0, crypto_1.randomUUID)(),
        };
        return this.jwtService.sign(payload, {
            secret: this.secret(),
            expiresIn: this.config.get('app.jwt.refreshExpiresIn') || '7d',
        });
    }
    buildTokens(u) {
        return {
            token: this.signAccess(u),
            refreshToken: this.signRefresh(u),
            user: this.toPublic(u),
        };
    }
    async sendVerificationEmail(userId) {
        const user = await this.repo.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.emailVerified)
            throw new common_1.BadRequestException('Email sudah terverifikasi');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await this.repo.saveEmailOtp(userId, otp, expiresAt);
        const mockLink = `http://localhost:3000/verify-email?token=${otp}`;
        this.logger.log(`[MOCK EMAIL] Link verifikasi: ${mockLink}`);
        this.logger.log(`[MOCK EMAIL] Kode OTP: ${otp}`);
        await this.email.sendVerificationEmail(user.email, otp);
        return {
            demoMode: true,
            link: mockLink,
        };
    }
    async register(dto) {
        const existing = await this.repo.findByEmail(dto.email);
        if (existing)
            throw new common_1.ConflictException('Email sudah terdaftar');
        const hashed = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
        const user = await this.repo.createUser({
            email: dto.email.toLowerCase(),
            password: hashed,
            name: dto.name,
            phone: dto.phone,
            role: 'USER',
        });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.email.sendVerificationEmail(user.email, otp);
        if (user.phone)
            await this.sms.sendOtp(user.phone, otp);
        await this.audit.log(user.id, 'USER_REGISTERED', 'User', user.id, {
            email: user.email,
            role: user.role,
        });
        return this.buildTokens(user);
    }
    async login(dto) {
        const user = await this.repo.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Email atau password salah');
        const ok = await bcrypt.compare(dto.password, user.password);
        if (!ok)
            throw new common_1.UnauthorizedException('Email atau password salah');
        if (!user.isActive)
            throw new common_1.ForbiddenException('Akun Anda telah dinonaktifkan');
        await this.audit.log(user.id, 'USER_LOGIN', 'User', user.id);
        return this.buildTokens(user);
    }
    async refresh(refreshToken) {
        if (!refreshToken)
            throw new common_1.UnauthorizedException('Missing refresh token');
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.secret(),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        if (payload.type !== 'refresh')
            throw new common_1.UnauthorizedException('Not a refresh token');
        if (payload.jti && this.blacklist.has(payload.jti))
            throw new common_1.UnauthorizedException('Refresh token has been revoked');
        const user = await this.repo.findById(payload.sub);
        if (!user || !user.isActive)
            throw new common_1.UnauthorizedException();
        return this.buildTokens(user);
    }
    async logout(accessToken, refreshToken) {
        for (const t of [accessToken, refreshToken]) {
            if (!t)
                continue;
            try {
                const p = this.jwtService.verify(t, { secret: this.secret() });
                if (p?.jti && p?.exp)
                    this.blacklist.add(p.jti, p.exp);
            }
            catch {
            }
        }
        return { message: 'Logout berhasil' };
    }
    async getProfile(userId) {
        const u = await this.repo.findById(userId);
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return this.toPublic(u);
    }
    async updateProfile(userId, dto) {
        const updated = await this.repo.updateUser(userId, { ...dto });
        await this.audit.log(userId, 'PROFILE_UPDATED', 'User', userId, dto);
        return this.toPublic(updated);
    }
    async changePassword(userId, dto) {
        const u = await this.repo.findById(userId);
        if (!u)
            throw new common_1.NotFoundException('User not found');
        const ok = await bcrypt.compare(dto.oldPassword, u.password);
        if (!ok)
            throw new common_1.BadRequestException('Password lama tidak sesuai');
        const hashed = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
        await this.repo.updateUser(userId, { password: hashed });
        await this.audit.log(userId, 'PASSWORD_CHANGED', 'User', userId);
    }
    async forgotPassword(dto) {
        const u = await this.repo.findByEmail(dto.email);
        if (!u)
            return { demoMode: true };
        const token = (0, crypto_1.randomBytes)(24).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.repo.createPasswordReset(u.id, token, expiresAt);
        const link = `https://tolongin.local/reset-password?token=${token}`;
        await this.email.sendPasswordReset(u.email, token, link);
        await this.audit.log(u.id, 'PASSWORD_RESET_REQUESTED', 'User', u.id);
        this.logger.log(`Password reset token for ${u.email}: ${token}`);
        return { resetToken: token, demoMode: true };
    }
    async resetPassword(dto) {
        const reset = await this.repo.findValidPasswordReset(dto.token);
        if (!reset)
            throw new common_1.BadRequestException('Token tidak valid atau sudah kedaluwarsa');
        const hashed = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
        await this.repo.updateUser(reset.userId, { password: hashed });
        await this.repo.markPasswordResetUsed(reset.id);
        await this.audit.log(reset.userId, 'PASSWORD_RESET', 'User', reset.userId);
    }
    async validateUser(payload) {
        if (payload.type && payload.type !== 'access')
            return null;
        if (payload.jti && this.blacklist.has(payload.jti))
            return null;
        const u = await this.repo.findById(payload.sub);
        if (!u || !u.isActive)
            return null;
        return u;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(email_interface_1.EMAIL_SERVICE)),
    __param(6, (0, common_1.Inject)(sms_interface_1.SMS_SERVICE)),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        config_1.ConfigService,
        token_blacklist_service_1.TokenBlacklistService,
        audit_log_service_1.AuditLogService, Object, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map