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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("../repositories/admin.repository");
const disputes_service_1 = require("../../disputes/services/disputes.service");
let AdminService = class AdminService {
    repo;
    disputesService;
    constructor(repo, disputesService) {
        this.repo = repo;
        this.disputesService = disputesService;
    }
    stats() {
        return this.repo.stats();
    }
    async users() {
        const items = await this.repo.listUsers();
        return items;
    }
    async userDetail(id) {
        const u = await this.repo.findUser(id);
        if (!u)
            throw new common_1.NotFoundException();
        const { password, emailOtpHash, phoneOtpHash, ...rest } = u;
        return rest;
    }
    async suspendUser(id, adminId) {
        await this.repo.updateUser(id, { isActive: false });
        await this.repo.logActivity(adminId, 'SUSPEND_USER', 'User', id);
        return { message: 'User suspended' };
    }
    async activateUser(id, adminId) {
        await this.repo.updateUser(id, { isActive: true });
        await this.repo.logActivity(adminId, 'ACTIVATE_USER', 'User', id);
        return { message: 'User activated' };
    }
    pendingSellers() {
        return this.repo.pendingKyc();
    }
    async approveSeller(userId, adminId) {
        await this.repo.approveKyc(userId);
        await this.repo.logActivity(adminId, 'APPROVE_KYC', 'User', userId);
        return { message: 'KYC approved' };
    }
    async rejectSeller(userId, adminId, dto) {
        await this.repo.rejectKyc(userId, dto.reason);
        await this.repo.logActivity(adminId, 'REJECT_KYC', 'User', userId, { reason: dto.reason });
        return { message: 'KYC rejected' };
    }
    services() {
        return this.repo.listServices();
    }
    async deleteService(id, adminId) {
        await this.repo.deleteService(id);
        await this.repo.logActivity(adminId, 'DELETE_SERVICE', 'Service', id);
        return { message: 'Service deleted' };
    }
    jobs() {
        return this.repo.listJobs();
    }
    async deleteJob(id, adminId) {
        await this.repo.deleteJob(id);
        await this.repo.logActivity(adminId, 'DELETE_JOB', 'Job', id);
        return { message: 'Job deleted' };
    }
    orders() {
        return this.repo.listOrders();
    }
    disputes() {
        return this.repo.listDisputes();
    }
    async resolveDispute(id, adminId, resolution) {
        return this.disputesService.resolve(id, adminId, { resolution });
    }
    activity() {
        return this.repo.listActivity();
    }
    async settings() {
        const all = await this.repo.getSettings();
        return all.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    }
    async updateSettings(dto, adminId) {
        const updates = [];
        Object.entries(dto).forEach(([k, v]) => v !== undefined && updates.push({ key: k, value: String(v) }));
        await Promise.all(updates.map((u) => this.repo.upsertSetting(u.key, u.value)));
        await this.repo.logActivity(adminId, 'UPDATE_SETTINGS', 'PlatformSettings', undefined, dto);
        return this.settings();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        disputes_service_1.DisputesService])
], AdminService);
//# sourceMappingURL=admin.service.js.map