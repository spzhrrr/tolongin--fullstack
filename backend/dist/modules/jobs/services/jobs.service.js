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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const jobs_repository_1 = require("../repositories/jobs.repository");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
let JobsService = class JobsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    toDto(j) {
        return { ...j, skills: (0, helpers_1.parseJsonField)(j.skills, []) };
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = {};
        if (query.q)
            where.title = { contains: query.q };
        if (query.categoryId)
            where.categoryId = query.categoryId;
        if (query.buyerId)
            where.buyerId = query.buyerId;
        if (query.status)
            where.status = query.status.toUpperCase();
        const { items, total } = await this.repo.findMany(where, skip, take);
        return {
            data: items.map((i) => this.toDto(i)),
            meta: (0, helpers_1.buildPageMeta)(total, page, limit),
        };
    }
    async findById(id) {
        const j = await this.repo.findById(id);
        if (!j)
            throw new common_1.NotFoundException('Job not found');
        return this.toDto(j);
    }
    async create(buyerId, dto) {
        const created = await this.repo.create({
            buyer: { connect: { id: buyerId } },
            category: { connect: { id: dto.categoryId } },
            title: dto.title,
            description: dto.description,
            budget: dto.budget,
            budgetType: dto.budgetType || 'FIXED',
            deadline: dto.deadline ? new Date(dto.deadline) : undefined,
            location: dto.location,
            isOnline: dto.isOnline ?? false,
            skills: (0, helpers_1.stringifyJsonField)(dto.skills || []),
            status: enums_1.JOB_STATUS.OPEN,
        });
        return this.toDto(created);
    }
    async update(id, userId, role, dto) {
        const j = await this.repo.findById(id);
        if (!j)
            throw new common_1.NotFoundException('Job not found');
        if (j.buyerId !== userId && role !== enums_1.ROLE.ADMIN)
            throw new common_1.ForbiddenException();
        const data = { ...dto };
        if (dto.skills) {
            data.skills = (0, helpers_1.stringifyJsonField)(dto.skills);
        }
        if (dto.deadline) {
            data.deadline = new Date(dto.deadline);
        }
        if (dto.categoryId) {
            data.category = { connect: { id: dto.categoryId } };
            delete data.categoryId;
        }
        const updated = await this.repo.update(id, data);
        return this.toDto(updated);
    }
    async delete(id, userId, role) {
        const j = await this.repo.findById(id);
        if (!j)
            throw new common_1.NotFoundException('Job not found');
        if (j.buyerId !== userId && role !== enums_1.ROLE.ADMIN)
            throw new common_1.ForbiddenException();
        await this.repo.delete(id);
        return { message: 'Job deleted' };
    }
    async close(id, userId) {
        const j = await this.repo.findById(id);
        if (!j)
            throw new common_1.NotFoundException('Job not found');
        if (j.buyerId !== userId)
            throw new common_1.ForbiddenException();
        const updated = await this.repo.update(id, { status: enums_1.JOB_STATUS.CLOSED });
        return this.toDto(updated);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jobs_repository_1.JobsRepository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map