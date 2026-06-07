export interface ISmsService {
    sendOtp(phone: string, otp: string): Promise<void>;
    sendSms(phone: string, message: string): Promise<void>;
}
export declare const SMS_SERVICE: unique symbol;
