import { ISmsService } from './sms.interface';
export declare class MockSmsService implements ISmsService {
    private readonly logger;
    sendOtp(phone: string, otp: string): Promise<void>;
    sendSms(phone: string, message: string): Promise<void>;
}
