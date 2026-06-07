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
exports.TokenBlacklistService = void 0;
const common_1 = require("@nestjs/common");
let TokenBlacklistService = class TokenBlacklistService {
    blacklist = new Map();
    constructor() {
        setInterval(() => this.sweep(), 60_000).unref?.();
    }
    add(jti, exp) {
        this.blacklist.set(jti, exp * 1000);
    }
    has(jti) {
        const exp = this.blacklist.get(jti);
        if (!exp)
            return false;
        if (Date.now() > exp) {
            this.blacklist.delete(jti);
            return false;
        }
        return true;
    }
    sweep() {
        const now = Date.now();
        for (const [k, v] of this.blacklist) {
            if (now > v)
                this.blacklist.delete(k);
        }
    }
};
exports.TokenBlacklistService = TokenBlacklistService;
exports.TokenBlacklistService = TokenBlacklistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TokenBlacklistService);
//# sourceMappingURL=token-blacklist.service.js.map