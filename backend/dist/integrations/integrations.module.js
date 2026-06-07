"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsModule = void 0;
const common_1 = require("@nestjs/common");
const email_interface_1 = require("./email/email.interface");
const mock_email_service_1 = require("./email/mock-email.service");
const sms_interface_1 = require("./sms/sms.interface");
const mock_sms_service_1 = require("./sms/mock-sms.service");
const payment_interface_1 = require("./payment/payment.interface");
const mock_payment_service_1 = require("./payment/mock-payment.service");
const storage_interface_1 = require("./storage/storage.interface");
const mock_storage_service_1 = require("./storage/mock-storage.service");
let IntegrationsModule = class IntegrationsModule {
};
exports.IntegrationsModule = IntegrationsModule;
exports.IntegrationsModule = IntegrationsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            { provide: email_interface_1.EMAIL_SERVICE, useClass: mock_email_service_1.MockEmailService },
            { provide: sms_interface_1.SMS_SERVICE, useClass: mock_sms_service_1.MockSmsService },
            { provide: payment_interface_1.PAYMENT_SERVICE, useClass: mock_payment_service_1.MockPaymentService },
            { provide: storage_interface_1.STORAGE_SERVICE, useClass: mock_storage_service_1.MockStorageService },
        ],
        exports: [email_interface_1.EMAIL_SERVICE, sms_interface_1.SMS_SERVICE, payment_interface_1.PAYMENT_SERVICE, storage_interface_1.STORAGE_SERVICE],
    })
], IntegrationsModule);
//# sourceMappingURL=integrations.module.js.map