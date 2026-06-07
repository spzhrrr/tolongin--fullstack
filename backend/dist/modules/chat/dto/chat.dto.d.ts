export declare class CreateConversationDto {
    recipientId: string;
    orderId?: string;
}
export declare class SendMessageDto {
    content: string;
    attachment?: {
        url: string;
        type: string;
        name: string;
        size: number;
    };
}
