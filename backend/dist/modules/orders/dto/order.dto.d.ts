import type { DeliveryType } from '../../../common/constants/enums';
export declare class CreateOrderFromServiceDto {
    notes?: string;
    deliveryType?: DeliveryType;
    deliveryAddress?: string;
}
export declare class CancelOrderDto {
    reason: string;
}
export declare class RevisionRequestDto {
    reason: string;
}
