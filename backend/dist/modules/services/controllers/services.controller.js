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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_service_1 = require("../services/services.service");
const service_dto_1 = require("../dto/service.dto");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
const verification_guards_1 = require("../../../common/guards/verification.guards");
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    findAll(query) {
        return this.servicesService.findAll(query);
    }
    featured() {
        return this.servicesService.featured();
    }
    recommended() {
        return this.servicesService.recommended();
    }
    findOne(id) {
        return this.servicesService.findById(id);
    }
    create(sellerId, dto) {
        return this.servicesService.create(sellerId, dto);
    }
    update(id, userId, role, dto) {
        return this.servicesService.update(id, userId, role, dto);
    }
    delete(id, userId, role) {
        return this.servicesService.delete(id, userId, role);
    }
    toggle(id, userId) {
        return this.servicesService.toggleActive(id, userId);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List active services with filter, search, pagination',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.ServiceQueryDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "featured", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('recommended'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top-rated recommended services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "recommended", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get service detail with reviews' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.UseGuards)(verification_guards_1.VerifiedKtpGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new service (requires KTP-verified user)',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller/Admin] Update service (owner or admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller/Admin] Delete service' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(':id/toggle-active'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Activate / deactivate service' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "toggle", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('Services'),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map