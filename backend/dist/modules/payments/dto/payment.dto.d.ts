import type { PaymentMethod } from '../../../common/constants/enums';
export declare class CreatePaymentDto {
    orderId: string;
    method: PaymentMethod;
}
