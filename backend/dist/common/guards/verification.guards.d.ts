import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class VerifiedContactGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean;
}
export declare class VerifiedKtpGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean;
}
export declare class VerifiedWithdrawalGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean;
}
