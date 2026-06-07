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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("../services/jobs.service");
const job_dto_1 = require("../dto/job.dto");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const enums_1 = require("../../../common/constants/enums");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    findAll(query) {
        return this.jobsService.findAll(query);
    }
    findOne(id) {
        return this.jobsService.findById(id);
    }
    create(buyerId, dto) {
        return this.jobsService.create(buyerId, dto);
    }
    update(id, userId, role, dto) {
        return this.jobsService.update(id, userId, role, dto);
    }
    delete(id, userId, role) {
        return this.jobsService.delete(id, userId, role);
    }
    close(id, userId) {
        return this.jobsService.close(id, userId);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List jobs with filter & pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.JobQueryDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job detail with applications' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Post a new job' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, job_dto_1.CreateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer/Admin] Update job' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer/Admin] Delete job' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, roles_decorator_1.Roles)(enums_1.ROLE.USER),
    (0, common_1.Post)(':id/close'),
    (0, swagger_1.ApiOperation)({ summary: '[Buyer] Close job' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "close", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map