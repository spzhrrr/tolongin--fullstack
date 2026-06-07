import { PaymentsService } from '../services/payments.service';
import { CreatePaymentDto } from '../dto/payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(userId: string, dto: CreatePaymentDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        transactionId: string | null;
        paymentUrl: string | null;
        expiresAt: Date | null;
        updatedAt: Date;
        status: string;
        amount: number;
        fee: number;
        totalAmount: number;
        orderId: string;
        method: string;
        paidAt: Date | null;
    }>;
    status(id: string, uid: string): Promise<{
        id: string;
        status: string;
        paidAt: Date;
    }>;
    history(uid: string): import(".prisma/client").Prisma.PrismaPromise<({
        order: {
            id: string;
            title: string;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        transactionId: string | null;
        paymentUrl: string | null;
        expiresAt: Date | null;
        updatedAt: Date;
        status: string;
        amount: number;
        fee: number;
        totalAmount: number;
        orderId: string;
        method: string;
        paidAt: Date | null;
    })[]>;
    methods(): {
        code: "BANK_TRANSFER" | "CREDIT_CARD" | "GOPAY" | "OVO" | "DANA" | "VIRTUAL_ACCOUNT";
        name: string;
    }[];
    webhook(provider: string, body: any): Promise<{
        ok: boolean;
        provider?: undefined;
    } | {
        ok: boolean;
        provider: string;
    }>;
}
