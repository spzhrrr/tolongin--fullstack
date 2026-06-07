import { PaymentsRepository } from '../repositories/payments.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import { CreatePaymentDto } from '../dto/payment.dto';
export declare class PaymentsService {
    private readonly repo;
    private readonly ordersRepo;
    constructor(repo: PaymentsRepository, ordersRepo: OrdersRepository);
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
    checkStatus(id: string, userId: string): Promise<{
        id: string;
        status: string;
        paidAt: Date;
    }>;
    history(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    getMethods(): {
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
