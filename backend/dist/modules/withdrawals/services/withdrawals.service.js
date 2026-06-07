"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsService = void 0;
const common_1 = require("@nestjs/common");
const withdrawals_repository_1 = require("./../repositories/withdrawals.repository");
let WithdrawalsService = class WithdrawalsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(sellerId, dto) {
        const acc = await this.repo.findBankAccountById(dto.bankAccountId);
        if (!acc || acc.userId !== sellerId)
            throw new common_1.NotFoundException('Bank account not found');
        const profile = await this.repo.findUser(sellerId);
        if (!profile)
            throw new common_1.BadRequestException('Seller profile not found');
        if (profile.balance < dto.amount)
            throw new common_1.BadRequestException('Saldo tidak mencukupi');
        const created = await this.repo.createWithdrawal({
            seller: { connect: { id: sellerId } },
            amount: dto.amount,
            bankName: acc.bankName,
            accountNumber: acc.accountNumber,
            accountName: acc.accountName,
        });
        await this.repo.updateBalance(sellerId, -dto.amount);
        return created;
    }
    listMine(sellerId) {
        return this.repo.findWithdrawalsBySeller(sellerId);
    }
    async balance(sellerId) {
        const profile = await this.repo.findUser(sellerId);
        return { balance: profile?.balance || 0 };
    }
    bankAccounts(userId) {
        return this.repo.findBankAccountsByUser(userId);
    }
    addBankAccount(userId, dto) {
        return this.repo.createBankAccount({
            user: { connect: { id: userId } },
            bankName: dto.bankName,
            accountNumber: dto.accountNumber,
            accountName: dto.accountName,
            isDefault: !!dto.isDefault,
        });
    }
    async deleteBankAccount(id, userId) {
        const acc = await this.repo.findBankAccountById(id);
        if (!acc)
            throw new common_1.NotFoundException();
        if (acc.userId !== userId)
            throw new common_1.ForbiddenException();
        await this.repo.deleteBankAccount(id);
        return { message: 'Bank account deleted' };
    }
};
exports.WithdrawalsService = WithdrawalsService;
exports.WithdrawalsService = WithdrawalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [withdrawals_repository_1.WithdrawalsRepository])
], WithdrawalsService);
//# sourceMappingURL=withdrawals.service.js.map