import { IPaymentService, PaymentCreateParams, PaymentCreateResult } from './payment.interface';
export declare class MockPaymentService implements IPaymentService {
    private readonly logger;
    createPayment(p: PaymentCreateParams): Promise<PaymentCreateResult>;
    verifyWebhook(_payload: unknown): boolean;
    getStatus(transactionId: string): Promise<"COMPLETED">;
}
