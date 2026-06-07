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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("../services/reviews.service");
const review_dto_1 = require("../dto/review.dto");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(userId, dto) {
        return this.reviewsService.create(userId, dto);
    }
    bySeller(sellerId) {
        return this.reviewsService.getBySeller(sellerId);
    }
    byService(serviceId) {
        return this.reviewsService.getByService(serviceId);
    }
    update(id, uid, dto) {
        return this.reviewsService.update(id, uid, dto);
    }
    delete(id, uid, role) {
        return this.reviewsService.delete(id, uid, role);
    }
    reply(id, uid, dto) {
        return this.reviewsService.reply(id, uid, dto);
    }
    helpful(id) {
        return this.reviewsService.markHelpful(id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create review for completed order' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('seller/:sellerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a seller' }),
    __param(0, (0, common_1.Param)('sellerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "bySeller", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('service/:serviceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a service' }),
    __param(0, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "byService", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update own review' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete own review (or admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)(':id/reply'),
    (0, swagger_1.ApiOperation)({ summary: '[Seller] Reply to review on me' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, review_dto_1.ReplyReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "reply", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.Post)(':id/helpful'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark review as helpful' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "helpful", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map