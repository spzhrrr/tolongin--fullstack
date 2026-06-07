export declare class CreateWithdrawalDto {
    amount: number;
    bankAccountId: string;
}
export declare class CreateBankAccountDto {
    bankName: string;
    accountNumber: string;
    accountName: string;
    isDefault?: boolean;
}
