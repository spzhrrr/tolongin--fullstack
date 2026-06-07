export declare const ROLE: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof ROLE)[keyof typeof ROLE];
export declare const ROLE_VALUES: ("ADMIN" | "USER")[];
export declare const PRICE_TYPE: {
    readonly FIXED: "FIXED";
    readonly HOURLY: "HOURLY";
};
export type PriceType = (typeof PRICE_TYPE)[keyof typeof PRICE_TYPE];
export declare const PRICE_TYPE_VALUES: ("FIXED" | "HOURLY")[];
export declare const BUDGET_TYPE: {
    readonly FIXED: "FIXED";
    readonly HOURLY: "HOURLY";
    readonly RANGE: "RANGE";
};
export type BudgetType = (typeof BUDGET_TYPE)[keyof typeof BUDGET_TYPE];
export declare const BUDGET_TYPE_VALUES: ("FIXED" | "HOURLY" | "RANGE")[];
export declare const JOB_STATUS: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly FILLED: "FILLED";
    readonly EXPIRED: "EXPIRED";
};
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export declare const JOB_STATUS_VALUES: ("EXPIRED" | "OPEN" | "CLOSED" | "FILLED")[];
export declare const APPLICATION_STATUS: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
    readonly HIRED: "HIRED";
    readonly WITHDRAWN: "WITHDRAWN";
};
export type ApplicationStatus = (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];
export declare const APPLICATION_STATUS_VALUES: ("PENDING" | "ACCEPTED" | "REJECTED" | "HIRED" | "WITHDRAWN")[];
export declare const ORDER_STATUS: {
    readonly WAITING_CONFIRMATION: "WAITING_CONFIRMATION";
    readonly ACCEPTED: "ACCEPTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly IN_REVIEW: "IN_REVIEW";
    readonly REVISION_REQUESTED: "REVISION_REQUESTED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly DISPUTED: "DISPUTED";
};
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export declare const ORDER_STATUS_VALUES: ("COMPLETED" | "ACCEPTED" | "WAITING_CONFIRMATION" | "IN_PROGRESS" | "IN_REVIEW" | "REVISION_REQUESTED" | "CANCELLED" | "DISPUTED")[];
export declare const DELIVERY_TYPE: {
    readonly DIGITAL: "DIGITAL";
    readonly PHYSICAL: "PHYSICAL";
};
export type DeliveryType = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];
export declare const DELIVERY_TYPE_VALUES: ("DIGITAL" | "PHYSICAL")[];
export declare const PAYMENT_METHOD: {
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly GOPAY: "GOPAY";
    readonly OVO: "OVO";
    readonly DANA: "DANA";
    readonly VIRTUAL_ACCOUNT: "VIRTUAL_ACCOUNT";
};
export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export declare const PAYMENT_METHOD_VALUES: ("BANK_TRANSFER" | "CREDIT_CARD" | "GOPAY" | "OVO" | "DANA" | "VIRTUAL_ACCOUNT")[];
export declare const PAYMENT_STATUS: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly EXPIRED: "EXPIRED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export declare const PAYMENT_STATUS_VALUES: ("PENDING" | "COMPLETED" | "FAILED" | "EXPIRED" | "PROCESSING" | "REFUNDED")[];
export declare const WITHDRAWAL_STATUS: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly REJECTED: "REJECTED";
};
export type WithdrawalStatus = (typeof WITHDRAWAL_STATUS)[keyof typeof WITHDRAWAL_STATUS];
export declare const WITHDRAWAL_STATUS_VALUES: ("PENDING" | "COMPLETED" | "REJECTED" | "PROCESSING")[];
export declare const NOTIFICATION_TYPE: {
    readonly ORDER: "ORDER";
    readonly PAYMENT: "PAYMENT";
    readonly MESSAGE: "MESSAGE";
    readonly REVIEW: "REVIEW";
    readonly SYSTEM: "SYSTEM";
    readonly DISPUTE: "DISPUTE";
    readonly APPLICATION: "APPLICATION";
    readonly WITHDRAWAL: "WITHDRAWAL";
    readonly KYC: "KYC";
};
export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
export declare const NOTIFICATION_TYPE_VALUES: ("ORDER" | "PAYMENT" | "MESSAGE" | "REVIEW" | "SYSTEM" | "DISPUTE" | "APPLICATION" | "WITHDRAWAL" | "KYC")[];
export declare const DISPUTE_STATUS: {
    readonly PENDING: "PENDING";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly RESOLVED: "RESOLVED";
    readonly REJECTED: "REJECTED";
};
export type DisputeStatus = (typeof DISPUTE_STATUS)[keyof typeof DISPUTE_STATUS];
export declare const DISPUTE_STATUS_VALUES: ("PENDING" | "REJECTED" | "UNDER_REVIEW" | "RESOLVED")[];
export declare const ORDER_TRANSITIONS: Record<OrderStatus, Partial<Record<'buyer' | 'seller' | 'admin', OrderStatus[]>>>;
export declare const KYC_STATUS: {
    readonly NOT_SUBMITTED: "NOT_SUBMITTED";
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
};
export type KycStatus = (typeof KYC_STATUS)[keyof typeof KYC_STATUS];
export declare const VERIFICATION_LEVEL: {
    readonly NONE: 0;
    readonly CONTACT: 1;
    readonly KTP: 2;
    readonly BANK: 3;
};
