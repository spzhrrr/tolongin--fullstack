import { Role } from '../../../common/constants/enums';
export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    type?: 'access' | 'refresh';
    jti?: string;
}
export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: PublicUser;
}
export interface PublicUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    phone: string | null;
    avatar: string | null;
    bio?: string | null;
    isActive: boolean;
    isBanned?: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    ktpVerified: boolean;
    bankVerified: boolean;
    ktpRejectedReason?: string | null;
    ktpSubmittedAt?: Date | null;
    rating?: number;
    reviewCount?: number;
    totalOrders?: number;
    completedOrders?: number;
    balance?: number;
    createdAt: Date;
}
