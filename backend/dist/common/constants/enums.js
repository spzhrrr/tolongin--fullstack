"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFICATION_LEVEL = exports.KYC_STATUS = exports.ORDER_TRANSITIONS = exports.DISPUTE_STATUS_VALUES = exports.DISPUTE_STATUS = exports.NOTIFICATION_TYPE_VALUES = exports.NOTIFICATION_TYPE = exports.WITHDRAWAL_STATUS_VALUES = exports.WITHDRAWAL_STATUS = exports.PAYMENT_STATUS_VALUES = exports.PAYMENT_STATUS = exports.PAYMENT_METHOD_VALUES = exports.PAYMENT_METHOD = exports.DELIVERY_TYPE_VALUES = exports.DELIVERY_TYPE = exports.ORDER_STATUS_VALUES = exports.ORDER_STATUS = exports.APPLICATION_STATUS_VALUES = exports.APPLICATION_STATUS = exports.JOB_STATUS_VALUES = exports.JOB_STATUS = exports.BUDGET_TYPE_VALUES = exports.BUDGET_TYPE = exports.PRICE_TYPE_VALUES = exports.PRICE_TYPE = exports.ROLE_VALUES = exports.ROLE = void 0;
exports.ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};
exports.ROLE_VALUES = Object.values(exports.ROLE);
exports.PRICE_TYPE = { FIXED: 'FIXED', HOURLY: 'HOURLY' };
exports.PRICE_TYPE_VALUES = Object.values(exports.PRICE_TYPE);
exports.BUDGET_TYPE = {
    FIXED: 'FIXED',
    HOURLY: 'HOURLY',
    RANGE: 'RANGE',
};
exports.BUDGET_TYPE_VALUES = Object.values(exports.BUDGET_TYPE);
exports.JOB_STATUS = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    FILLED: 'FILLED',
    EXPIRED: 'EXPIRED',
};
exports.JOB_STATUS_VALUES = Object.values(exports.JOB_STATUS);
exports.APPLICATION_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    HIRED: 'HIRED',
    WITHDRAWN: 'WITHDRAWN',
};
exports.APPLICATION_STATUS_VALUES = Object.values(exports.APPLICATION_STATUS);
exports.ORDER_STATUS = {
    WAITING_CONFIRMATION: 'WAITING_CONFIRMATION',
    ACCEPTED: 'ACCEPTED',
    IN_PROGRESS: 'IN_PROGRESS',
    IN_REVIEW: 'IN_REVIEW',
    REVISION_REQUESTED: 'REVISION_REQUESTED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    DISPUTED: 'DISPUTED',
};
exports.ORDER_STATUS_VALUES = Object.values(exports.ORDER_STATUS);
exports.DELIVERY_TYPE = {
    DIGITAL: 'DIGITAL',
    PHYSICAL: 'PHYSICAL',
};
exports.DELIVERY_TYPE_VALUES = Object.values(exports.DELIVERY_TYPE);
exports.PAYMENT_METHOD = {
    BANK_TRANSFER: 'BANK_TRANSFER',
    CREDIT_CARD: 'CREDIT_CARD',
    GOPAY: 'GOPAY',
    OVO: 'OVO',
    DANA: 'DANA',
    VIRTUAL_ACCOUNT: 'VIRTUAL_ACCOUNT',
};
exports.PAYMENT_METHOD_VALUES = Object.values(exports.PAYMENT_METHOD);
exports.PAYMENT_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    EXPIRED: 'EXPIRED',
    REFUNDED: 'REFUNDED',
};
exports.PAYMENT_STATUS_VALUES = Object.values(exports.PAYMENT_STATUS);
exports.WITHDRAWAL_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    REJECTED: 'REJECTED',
};
exports.WITHDRAWAL_STATUS_VALUES = Object.values(exports.WITHDRAWAL_STATUS);
exports.NOTIFICATION_TYPE = {
    ORDER: 'ORDER',
    PAYMENT: 'PAYMENT',
    MESSAGE: 'MESSAGE',
    REVIEW: 'REVIEW',
    SYSTEM: 'SYSTEM',
    DISPUTE: 'DISPUTE',
    APPLICATION: 'APPLICATION',
    WITHDRAWAL: 'WITHDRAWAL',
    KYC: 'KYC',
};
exports.NOTIFICATION_TYPE_VALUES = Object.values(exports.NOTIFICATION_TYPE);
exports.DISPUTE_STATUS = {
    PENDING: 'PENDING',
    UNDER_REVIEW: 'UNDER_REVIEW',
    RESOLVED: 'RESOLVED',
    REJECTED: 'REJECTED',
};
exports.DISPUTE_STATUS_VALUES = Object.values(exports.DISPUTE_STATUS);
exports.ORDER_TRANSITIONS = {
    WAITING_CONFIRMATION: {
        buyer: ['CANCELLED'],
        seller: ['ACCEPTED', 'CANCELLED'],
        admin: ['CANCELLED', 'DISPUTED'],
    },
    ACCEPTED: {
        seller: ['IN_PROGRESS', 'CANCELLED'],
        admin: ['CANCELLED', 'DISPUTED'],
    },
    IN_PROGRESS: {
        seller: ['IN_REVIEW', 'CANCELLED'],
        admin: ['CANCELLED', 'DISPUTED'],
    },
    IN_REVIEW: {
        buyer: ['COMPLETED', 'REVISION_REQUESTED'],
        seller: [],
        admin: ['DISPUTED'],
    },
    REVISION_REQUESTED: {
        seller: ['IN_REVIEW'],
        buyer: [],
        admin: ['DISPUTED'],
    },
    COMPLETED: { buyer: [], seller: [], admin: [] },
    CANCELLED: { buyer: [], seller: [], admin: [] },
    DISPUTED: { admin: ['COMPLETED', 'CANCELLED'] },
};
exports.KYC_STATUS = {
    NOT_SUBMITTED: 'NOT_SUBMITTED',
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
};
exports.VERIFICATION_LEVEL = {
    NONE: 0,
    CONTACT: 1,
    KTP: 2,
    BANK: 3,
};
//# sourceMappingURL=enums.js.map