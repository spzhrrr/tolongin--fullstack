import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class PaymentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.PaymentCreateInput): Prisma.Prisma__PaymentClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): Prisma.Prisma__PaymentClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUser(userId: string): Prisma.PrismaPromise<({
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
    update(id: string, data: Prisma.PaymentUpdateInput): Prisma.Prisma__PaymentClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByTransactionId(txId: string): Prisma.Prisma__PaymentClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
