"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputesModule = void 0;
const common_1 = require("@nestjs/common");
const disputes_controller_1 = require("./controllers/disputes.controller");
const disputes_service_1 = require("./services/disputes.service");
const disputes_repository_1 = require("./repositories/disputes.repository");
const orders_module_1 = require("../orders/orders.module");
let DisputesModule = class DisputesModule {
};
exports.DisputesModule = DisputesModule;
exports.DisputesModule = DisputesModule = __decorate([
    (0, common_1.Module)({
        imports: [orders_module_1.OrdersModule],
        controllers: [disputes_controller_1.DisputesController],
        providers: [disputes_service_1.DisputesService, disputes_repository_1.DisputesRepository],
        exports: [disputes_service_1.DisputesService, disputes_repository_1.DisputesRepository],
    })
], DisputesModule);
//# sourceMappingURL=disputes.module.js.map