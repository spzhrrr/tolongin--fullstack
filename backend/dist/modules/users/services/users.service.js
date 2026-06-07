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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
const helpers_1 = require("../../../common/utils/helpers");
let UsersService = class UsersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getPublicProfile(id) {
        const u = await this.repo.findById(id);
        if (!u)
            throw new common_1.NotFoundException('User not found');
        const { password, emailOtpHash, phoneOtpHash, ...rest } = u;
        return {
            ...rest,
            skills: (0, helpers_1.parseJsonField)(u.skills, []),
        };
    }
    async getServices(id) {
        const services = await this.repo.findServices(id);
        return services.map((s) => ({
            ...s,
            images: (0, helpers_1.parseJsonField)(s.images, []),
        }));
    }
    getReviews(id) {
        return this.repo.findReviews(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map