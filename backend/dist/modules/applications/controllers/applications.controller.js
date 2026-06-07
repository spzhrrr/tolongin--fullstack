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
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const applications_service_1 = require("../services/applications.service");
const application_dto_1 = require("../dto/application.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
const verification_guards_1 = require("../../../common/guards/verification.guards");
let ApplicationsController = class ApplicationsController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    apply(sellerId, dto) {
        return this.applicationsService.apply(sellerId, dto);
    }
    mySeller(sellerId) {
        return this.applicationsService.getMySellerApplications(sellerId);
    }
    forJob(jobId, buyerId) {
        return this.applicationsService.getJobApplications(jobId, buyerId);
    }
    update(id, sellerId, dto) {
        return this.applicationsService.update(id, sellerId, dto);
    }
    withdraw(id, sellerId) {
        return this.applicationsService.withdraw(id, sellerId);
    }
    accept(id, buyerId) {
        return this.applicationsService.accept(id, buyerId);
    }
    reject(id, buyerId, dto) {
        return this.applicationsService.reject(id, buyerId, dto);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.UseGuards)(verification_guards_1.VerifiedContactGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Apply to a job (requires email+phone verified)',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "apply", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Get)('seller'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] My applications' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "mySeller", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Get)('job/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Applications received for a job' }),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "forJob", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Update my pending application' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Withdraw application' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "withdraw", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(':id/accept'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Accept application' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "accept", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Reject application' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, application_dto_1.RejectApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "reject", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, swagger_1.ApiTags)('Applications'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map