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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("../repositories/categories.repository");
const helpers_1 = require("../../../common/utils/helpers");
let CategoriesService = class CategoriesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.findAll();
    }
    async findById(id) {
        const c = await this.repo.findById(id);
        if (!c)
            throw new common_1.NotFoundException('Category not found');
        return c;
    }
    async create(dto) {
        if (await this.repo.findBySlug(dto.slug))
            throw new common_1.ConflictException('Slug already exists');
        return this.repo.create(dto);
    }
    async update(id, dto) {
        await this.findById(id);
        return this.repo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        await this.repo.delete(id);
        return { message: 'Category deleted' };
    }
    async getServices(id) {
        await this.findById(id);
        const services = await this.repo.findServicesInCategory(id);
        return services.map((s) => ({
            ...s,
            images: (0, helpers_1.parseJsonField)(s.images, []),
        }));
    }
    async getJobs(id) {
        await this.findById(id);
        const jobs = await this.repo.findJobsInCategory(id);
        return jobs.map((j) => ({
            ...j,
            skills: (0, helpers_1.parseJsonField)(j.skills, []),
        }));
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map