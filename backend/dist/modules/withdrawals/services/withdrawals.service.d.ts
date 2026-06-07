import { WithdrawalsRepository } from './../repositories/withdrawals.repository';
import { CreateWithdrawalDto, CreateBankAccountDto } from '../dto/withdrawal.dto';
export declare class WithdrawalsService {
    private readonly repo;
    constructor(repo: WithdrawalsRepository);
    create(sellerId: string, dto: CreateWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        transactionId: string | null;
        ktpRejectedReason: string | null;
        updatedAt: Date;
        sellerId: string;
        status: string;
        amount: number;
        bankName: string;
        accountNumber: string;
        accountName: string;
        processedAt: Date | null;
        processedBy: string | null;
    }>;
    listMine(sellerId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        transactionId: string | null;
        ktpRejectedReason: string | null;
        updatedAt: Date;
        sellerId: string;
        status: string;
        amount: number;
        bankName: string;
        accountNumber: string;
        accountName: string;
        processedAt: Date | null;
        processedBy: string | null;
    }[]>;
    balance(sellerId: string): Promise<{
        balance: number;
    }>;
    bankAccounts(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        createdAt: Date;
        bankName: string;
        accountNumber: string;
        accountName: string;
        isDefault: boolean;
        isVerified: boolean;
    }[]>;
    addBankAccount(userId: string, dto: CreateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        createdAt: Date;
        bankName: string;
        accountNumber: string;
        accountName: string;
        isDefault: boolean;
        isVerified: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteBankAccount(id: string, userId: string): Promise<{
        message: string;
    }>;
}
