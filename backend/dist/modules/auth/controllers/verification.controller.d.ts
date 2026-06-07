import { PrismaService } from '../../../prisma/prisma.service';
import type { IEmailService } from '../../../integrations/email/email.interface';
import type { ISmsService } from '../../../integrations/sms/sms.interface';
export declare class VerificationController {
    private readonly prisma;
    private readonly email;
    private readonly sms;
    constructor(prisma: PrismaService, email: IEmailService, sms: ISmsService);
    status(uid: string): Promise<{
        email: string;
        phone: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        ktpVerified: boolean;
        ktpRejectedReason: string;
        ktpSubmittedAt: Date;
        bankVerified: boolean;
    }>;
    emailRequest(uid: string): Promise<{
        ok: boolean;
        message: string;
        demoOtp?: undefined;
    } | {
        ok: boolean;
        demoOtp: string;
        message?: undefined;
    }>;
    emailConfirm(uid: string, body: {
        otp: string;
    }): Promise<{
        ok: boolean;
    }>;
    phoneRequest(uid: string, body: {
        phone?: string;
    }): Promise<{
        ok: boolean;
        message: string;
        demoOtp?: undefined;
    } | {
        ok: boolean;
        demoOtp: string;
        message?: undefined;
    }>;
    phoneConfirm(uid: string, body: {
        otp: string;
    }): Promise<{
        ok: boolean;
    }>;
    submitKtp(uid: string, body: {
        ktpNumber?: string;
        ktpPhoto?: string;
        ktpSelfie?: string;
    }): Promise<{
        ok: boolean;
        status: string;
    }>;
    verifyBank(uid: string): Promise<{
        ok: boolean;
    }>;
}
