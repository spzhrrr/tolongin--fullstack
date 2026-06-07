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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const services_repository_1 = require("../repositories/services.repository");
const categories_repository_1 = require("../../categories/repositories/categories.repository");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
let ServicesService = class ServicesService {
    repo;
    categoriesRepo;
    constructor(repo, categoriesRepo) {
        this.repo = repo;
        this.categoriesRepo = categoriesRepo;
    }
    toDto(s) {
        return { ...s, images: (0, helpers_1.parseJsonField)(s.images, []) };
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const { skip, take } = (0, helpers_1.paginate)(page, limit);
        const where = { isActive: true };
        if (query.q)
            where.title = { contains: query.q };
        if (query.categoryId)
            where.categoryId = query.categoryId;
        if (query.sellerId)
            where.sellerId = query.sellerId;
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            where.price = {};
            if (query.minPrice !== undefined)
                where.price.gte = query.minPrice;
            if (query.maxPrice !== undefined)
                where.price.lte = query.maxPrice;
        }
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder || 'desc';
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const { items, total } = await this.repo.findMany(where, skip, take, orderBy);
        return {
            data: items.map((i) => this.toDto(i)),
            meta: (0, helpers_1.buildPageMeta)(total, page, limit),
        };
    }
    async findById(id) {
        const s = await this.repo.findById(id);
        if (!s)
            throw new common_1.NotFoundException('Service not found');
        await this.repo.incrementView(id).catch(() => undefined);
        return this.toDto(s);
    }
    async create(sellerId, dto) {
        const cat = await this.categoriesRepo.findById(dto.categoryId);
        if (!cat)
            throw new common_1.NotFoundException('Category not found');
        const created = await this.repo.create({
            seller: { connect: { id: sellerId } },
            category: { connect: { id: dto.categoryId } },
            title: dto.title,
            description: dto.description,
            price: dto.price,
            priceType: dto.priceType || 'FIXED',
            deliveryTime: dto.deliveryTime,
            revisionCount: dto.revisionCount ?? 1,
            images: (0, helpers_1.stringifyJsonField)(dto.images || []),
        });
        return this.toDto(created);
    }
    async update(id, userId, role, dto) {
        const existing = await this.repo.findById(id);
        if (!existing)
            throw new common_1.NotFoundException('Service not found');
        if (existing.sellerId !== userId && role !== enums_1.ROLE.ADMIN) {
            throw new common_1.ForbiddenException('You can only edit your own services');
        }
        const data = { ...dto };
        if (dto.images) {
            data.images = (0, helpers_1.stringifyJsonField)(dto.images);
        }
        if (dto.categoryId) {
            const cat = await this.categoriesRepo.findById(dto.categoryId);
            if (!cat)
                throw new common_1.NotFoundException('Category not found');
            data.category = { connect: { id: dto.categoryId } };
            delete data.categoryId;
        }
        const updated = await this.repo.update(id, data);
        return this.toDto(updated);
    }
    async delete(id, userId, role) {
        const existing = await this.repo.findById(id);
        if (!existing)
            throw new common_1.NotFoundException('Service not found');
        if (existing.sellerId !== userId && role !== enums_1.ROLE.ADMIN) {
            throw new common_1.ForbiddenException('You can only delete your own services');
        }
        await this.repo.delete(id);
        return { message: 'Service deleted' };
    }
    async toggleActive(id, userId) {
        const existing = await this.repo.findById(id);
        if (!existing)
            throw new common_1.NotFoundException('Service not found');
        if (existing.sellerId !== userId)
            throw new common_1.ForbiddenException();
        const updated = await this.repo.update(id, {
            isActive: !existing.isActive,
        });
        return { isActive: updated.isActive };
    }
    async featured() {
        const items = await this.repo.findFeatured();
        return items.map((i) => this.toDto(i));
    }
    async recommended() {
        const items = await this.repo.findRecommended();
        return items.map((i) => this.toDto(i));
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_repository_1.ServicesRepository,
        categories_repository_1.CategoriesRepository])
], ServicesService);
//# sourceMappingURL=services.service.js.map