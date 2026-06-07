import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from '../dto/password.dto';
import { AuthResponse, JwtPayload, PublicUser } from '../interfaces/auth.interface';
import { User } from '@prisma/client';
import { TokenBlacklistService } from '../../../common/services/token-blacklist.service';
import { AuditLogService } from '../../../common/services/audit-log.service';
import type { IEmailService } from '../../../integrations/email/email.interface';
import type { ISmsService } from '../../../integrations/sms/sms.interface';
export declare class AuthService {
    private readonly repo;
    private readonly jwtService;
    private readonly config;
    private readonly blacklist;
    private readonly audit;
    private readonly email;
    private readonly sms;
    private readonly logger;
    constructor(repo: AuthRepository, jwtService: JwtService, config: ConfigService, blacklist: TokenBlacklistService, audit: AuditLogService, email: IEmailService, sms: ISmsService);
    toPublic(u: User): PublicUser;
    private secret;
    private signAccess;
    private signRefresh;
    private buildTokens;
    sendVerificationEmail(userId: string): Promise<{
        demoMode: boolean;
        link?: string;
    }>;
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    refresh(refreshToken: string): Promise<AuthResponse>;
    logout(accessToken?: string, refreshToken?: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<PublicUser>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<PublicUser>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        resetToken?: string;
        demoMode: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    validateUser(payload: JwtPayload): Promise<User | null>;
}
