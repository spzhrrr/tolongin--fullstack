import { IEmailService } from './email.interface';
export declare class MockEmailService implements IEmailService {
    private readonly logger;
    sendEmail({ to, subject }: {
        to: string;
        subject: string;
        html: string;
        text?: string;
    }): Promise<void>;
    sendOtp(to: string, otp: string): Promise<void>;
    sendPasswordReset(to: string, token: string, link: string): Promise<void>;
    sendVerificationEmail(to: string, otp: string): Promise<void>;
}
