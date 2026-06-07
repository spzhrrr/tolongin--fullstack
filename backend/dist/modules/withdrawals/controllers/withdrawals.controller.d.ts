import { WithdrawalsService } from '../services/withdrawals.service';
import { CreateBankAccountDto, CreateWithdrawalDto } from '../dto/withdrawal.dto';
export declare class WithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    history(uid: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    create(uid: string, dto: CreateWithdrawalDto): Promise<{
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
    balance(uid: string): Promise<{
        balance: number;
    }>;
    bankAccounts(uid: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        createdAt: Date;
        bankName: string;
        accountNumber: string;
        accountName: string;
        isDefault: boolean;
        isVerified: boolean;
    }[]>;
    add(uid: string, dto: CreateBankAccountDto): import(".prisma/client").Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        createdAt: Date;
        bankName: string;
        accountNumber: string;
        accountName: string;
        isDefault: boolean;
        isVerified: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string, uid: string): Promise<{
        message: string;
    }>;
}
