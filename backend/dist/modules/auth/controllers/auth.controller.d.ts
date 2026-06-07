import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from '../dto/password.dto';
import { AuthResponse } from '../interfaces/auth.interface';
declare class RefreshDto {
    refreshToken?: string;
}
declare class LogoutDto {
    refreshToken?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<AuthResponse>;
    login(dto: LoginDto, res: Response): Promise<AuthResponse>;
    refresh(dto: RefreshDto, req: Request, res: Response): Promise<AuthResponse>;
    logout(auth: string | undefined, body: LogoutDto | undefined, req: Request, res: Response): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<import("../interfaces/auth.interface").PublicUser>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("../interfaces/auth.interface").PublicUser>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        resetToken?: string;
        demoMode: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    sendVerification(userId: string): Promise<{
        demoMode: boolean;
        link?: string;
    }>;
}
export {};
