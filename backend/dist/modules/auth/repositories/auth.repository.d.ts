import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, User, PasswordReset } from '@prisma/client';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    createPasswordReset(userId: string, token: string, expiresAt: Date): Promise<PasswordReset>;
    findValidPasswordReset(token: string): Promise<PasswordReset | null>;
    markPasswordResetUsed(id: string): Promise<PasswordReset>;
    saveEmailOtp(userId: string, otp: string, expiresAt: Date): Promise<void>;
}
