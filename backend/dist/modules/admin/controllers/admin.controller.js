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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("../services/admin.service");
const admin_dto_1 = require("../dto/admin.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    stats() {
        return this.adminService.stats();
    }
    users() {
        return this.adminService.users();
    }
    userDetail(id) {
        return this.adminService.userDetail(id);
    }
    suspend(id, admin) {
        return this.adminService.suspendUser(id, admin);
    }
    activate(id, admin) {
        return this.adminService.activateUser(id, admin);
    }
    pendingSellers() {
        return this.adminService.pendingSellers();
    }
    approveSeller(id, admin) {
        return this.adminService.approveSeller(id, admin);
    }
    rejectSeller(id, admin, dto) {
        return this.adminService.rejectSeller(id, admin, dto);
    }
    services() {
        return this.adminService.services();
    }
    deleteService(id, admin) {
        return this.adminService.deleteService(id, admin);
    }
    jobs() {
        return this.adminService.jobs();
    }
    deleteJob(id, admin) {
        return this.adminService.deleteJob(id, admin);
    }
    orders() {
        return this.adminService.orders();
    }
    disputes() {
        return this.adminService.disputes();
    }
    resolveDispute(id, admin, body) {
        return this.adminService.resolveDispute(id, admin, body.resolution);
    }
    activity() {
        return this.adminService.activity();
    }
    settings() {
        return this.adminService.settings();
    }
    updateSettings(dto, admin) {
        return this.adminService.updateSettings(dto, admin);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'List all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "users", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "userDetail", null);
__decorate([
    (0, common_1.Post)('users/:id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspend user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "suspend", null);
__decorate([
    (0, common_1.Post)('users/:id/activate'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "activate", null);
__decorate([
    (0, common_1.Get)('sellers/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Pending seller verifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "pendingSellers", null);
__decorate([
    (0, common_1.Post)('sellers/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve seller' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveSeller", null);
__decorate([
    (0, common_1.Post)('sellers/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject seller' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, admin_dto_1.RejectSellerDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "rejectSeller", null);
__decorate([
    (0, common_1.Get)('services'),
    (0, swagger_1.ApiOperation)({ summary: 'List all services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "services", null);
__decorate([
    (0, common_1.Delete)('services/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete service' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Get)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'List all jobs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "jobs", null);
__decorate([
    (0, common_1.Delete)('jobs/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete job' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'List all orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "orders", null);
__decorate([
    (0, common_1.Get)('disputes'),
    (0, swagger_1.ApiOperation)({ summary: 'List all disputes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "disputes", null);
__decorate([
    (0, common_1.Post)('disputes/:id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve dispute' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resolveDispute", null);
__decorate([
    (0, common_1.Get)('activity-log'),
    (0, swagger_1.ApiOperation)({ summary: 'Activity log' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "activity", null);
__decorate([
    (0, common_1.Get)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "settings", null);
__decorate([
    (0, common_1.Put)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Update platform settings' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.UpdateSettingsDto, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateSettings", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.ADMIN),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map