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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const withdrawals_service_1 = require("../services/withdrawals.service");
const withdrawal_dto_1 = require("../dto/withdrawal.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
const verification_guards_1 = require("../../../common/guards/verification.guards");
let WithdrawalsController = class WithdrawalsController {
    withdrawalsService;
    constructor(withdrawalsService) {
        this.withdrawalsService = withdrawalsService;
    }
    history(uid) {
        return this.withdrawalsService.listMine(uid);
    }
    create(uid, dto) {
        return this.withdrawalsService.create(uid, dto);
    }
    balance(uid) {
        return this.withdrawalsService.balance(uid);
    }
    bankAccounts(uid) {
        return this.withdrawalsService.bankAccounts(uid);
    }
    add(uid, dto) {
        return this.withdrawalsService.addBankAccount(uid, dto);
    }
    remove(id, uid) {
        return this.withdrawalsService.deleteBankAccount(id, uid);
    }
};
exports.WithdrawalsController = WithdrawalsController;
__decorate([
    (0, common_1.Get)('seller'),
    (0, swagger_1.ApiOperation)({ summary: 'Withdrawal history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "history", null);
__decorate([
    (0, common_1.UseGuards)(verification_guards_1.VerifiedWithdrawalGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Request withdrawal (requires KTP + bank verified)',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, withdrawal_dto_1.CreateWithdrawalDto]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('balance'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Get current balance' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "balance", null);
__decorate([
    (0, common_1.Get)('bank-accounts'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] List bank accounts' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "bankAccounts", null);
__decorate([
    (0, common_1.Post)('bank-accounts'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Add bank account' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, withdrawal_dto_1.CreateBankAccountDto]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)('bank-accounts/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Delete bank account' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WithdrawalsController.prototype, "remove", null);
exports.WithdrawalsController = WithdrawalsController = __decorate([
    (0, swagger_1.ApiTags)('Withdrawals'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Controller)('withdrawals'),
    __metadata("design:paramtypes", [withdrawals_service_1.WithdrawalsService])
], WithdrawalsController);
//# sourceMappingURL=withdrawals.controller.js.map