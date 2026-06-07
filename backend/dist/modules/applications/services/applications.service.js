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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const applications_repository_1 = require("../repositories/applications.repository");
const jobs_repository_1 = require("../../jobs/repositories/jobs.repository");
const helpers_1 = require("../../../common/utils/helpers");
const enums_1 = require("../../../common/constants/enums");
let ApplicationsService = class ApplicationsService {
    repo;
    jobsRepo;
    constructor(repo, jobsRepo) {
        this.repo = repo;
        this.jobsRepo = jobsRepo;
    }
    toDto(a) {
        return { ...a, portfolioIds: (0, helpers_1.parseJsonField)(a.portfolioIds, []) };
    }
    async apply(sellerId, dto) {
        const job = await this.jobsRepo.findById(dto.jobId);
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        if (job.status !== enums_1.JOB_STATUS.OPEN)
            throw new common_1.BadRequestException('Job is not open for applications');
        if (job.buyerId === sellerId)
            throw new common_1.BadRequestException('Tidak bisa melamar proyek Anda sendiri');
        const MIN_PCT = 0.5;
        const MAX_PCT = 1.5;
        const minPrice = Math.round(job.budget * MIN_PCT);
        const maxPrice = Math.round(job.budget * MAX_PCT);
        if (dto.proposedPrice < minPrice ||
            dto.proposedPrice > maxPrice) {
            throw new common_1.BadRequestException(`Harga tawaran harus antara Rp${minPrice.toLocaleString('id-ID')} dan Rp${maxPrice.toLocaleString('id-ID')} (50%-150% dari budget proyek)`);
        }
        if (dto.proposedDuration < 1 || dto.proposedDuration > 30) {
            throw new common_1.BadRequestException('Durasi pengerjaan harus 1-30 hari');
        }
        if (!dto.coverLetter || dto.coverLetter.trim().length < 20) {
            throw new common_1.BadRequestException('Surat lamaran minimal 20 karakter');
        }
        const existing = await this.repo.findByJobAndSeller(dto.jobId, sellerId);
        if (existing)
            throw new common_1.ConflictException('Anda sudah melamar proyek ini');
        const created = await this.repo.create({
            job: { connect: { id: dto.jobId } },
            seller: { connect: { id: sellerId } },
            coverLetter: dto.coverLetter,
            proposedPrice: dto.proposedPrice,
            proposedDuration: dto.proposedDuration,
            portfolioIds: (0, helpers_1.stringifyJsonField)(dto.portfolioIds || []),
            status: enums_1.APPLICATION_STATUS.PENDING,
        });
        await this.jobsRepo.incrementApplicationsCount(dto.jobId);
        return this.toDto(created);
    }
    async getMySellerApplications(sellerId) {
        const items = await this.repo.findBySeller(sellerId);
        return items.map((i) => this.toDto(i));
    }
    async getJobApplications(jobId, buyerId) {
        const job = await this.jobsRepo.findById(jobId);
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        if (job.buyerId !== buyerId)
            throw new common_1.ForbiddenException();
        const items = await this.repo.findByJob(jobId);
        return items.map((i) => this.toDto(i));
    }
    async update(id, sellerId, dto) {
        const a = await this.repo.findById(id);
        if (!a)
            throw new common_1.NotFoundException('Application not found');
        if (a.sellerId !== sellerId)
            throw new common_1.ForbiddenException();
        if (a.status !== enums_1.APPLICATION_STATUS.PENDING)
            throw new common_1.BadRequestException('Cannot edit non-pending application');
        const updated = await this.repo.update(id, dto);
        return this.toDto(updated);
    }
    async withdraw(id, sellerId) {
        const a = await this.repo.findById(id);
        if (!a)
            throw new common_1.NotFoundException('Application not found');
        if (a.sellerId !== sellerId)
            throw new common_1.ForbiddenException();
        const updated = await this.repo.update(id, {
            status: enums_1.APPLICATION_STATUS.WITHDRAWN,
        });
        return this.toDto(updated);
    }
    async accept(id, buyerId) {
        const a = await this.repo.findById(id);
        if (!a)
            throw new common_1.NotFoundException('Application not found');
        if (a.job.buyerId !== buyerId)
            throw new common_1.ForbiddenException();
        if (a.status !== enums_1.APPLICATION_STATUS.PENDING)
            throw new common_1.BadRequestException('Already decided');
        const updated = await this.repo.update(id, {
            status: enums_1.APPLICATION_STATUS.ACCEPTED,
            reviewedAt: new Date(),
        });
        return this.toDto(updated);
    }
    async reject(id, buyerId, dto) {
        const a = await this.repo.findById(id);
        if (!a)
            throw new common_1.NotFoundException('Application not found');
        if (a.job.buyerId !== buyerId)
            throw new common_1.ForbiddenException();
        if (a.status !== enums_1.APPLICATION_STATUS.PENDING)
            throw new common_1.BadRequestException('Already decided');
        const updated = await this.repo.update(id, {
            status: enums_1.APPLICATION_STATUS.REJECTED,
            rejectionReason: dto.reason,
            reviewedAt: new Date(),
        });
        return this.toDto(updated);
    }
    findById(id) {
        return this.repo.findById(id);
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [applications_repository_1.ApplicationsRepository,
        jobs_repository_1.JobsRepository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map