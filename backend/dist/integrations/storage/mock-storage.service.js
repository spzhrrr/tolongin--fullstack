"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStorageService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let MockStorageService = class MockStorageService {
    logger = new common_1.Logger('MockStorageService');
    async uploadFile(buffer, opts) {
        const publicId = `mock_${Date.now()}_${(0, crypto_1.randomBytes)(4).toString('hex')}`;
        const url = `https://picsum.photos/seed/${publicId}/600/400`;
        this.logger.log(`🗄️  [MOCK] uploaded ${opts.filename} (${buffer.length}b) -> ${url}`);
        return { url, publicId, size: buffer.length, contentType: opts.contentType };
    }
    async deleteFile(publicId) {
        this.logger.log(`🗄️  [MOCK] deleted ${publicId}`);
    }
};
exports.MockStorageService = MockStorageService;
exports.MockStorageService = MockStorageService = __decorate([
    (0, common_1.Injectable)()
], MockStorageService);
//# sourceMappingURL=mock-storage.service.js.map