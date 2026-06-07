export declare class CreateReviewDto {
    orderId: string;
    rating: number;
    comment: string;
    images?: string[];
    isAnonymous?: boolean;
}
export declare class UpdateReviewDto {
    rating?: number;
    comment?: string;
}
export declare class ReplyReviewDto {
    reply: string;
}
