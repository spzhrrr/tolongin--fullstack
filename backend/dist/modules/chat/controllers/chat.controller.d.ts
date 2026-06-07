import { ChatService } from '../services/chat.service';
import { CreateConversationDto, SendMessageDto } from '../dto/chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    list(uid: string): Promise<any[]>;
    start(uid: string, dto: CreateConversationDto): Promise<any>;
    detail(id: string, uid: string): Promise<any>;
    messages(id: string, uid: string): Promise<{
        attachment: any;
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        conversationId: string;
        senderId: string;
    }[]>;
    send(id: string, uid: string, dto: SendMessageDto): Promise<{
        attachment: any;
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        conversationId: string;
        senderId: string;
    }>;
    read(id: string, uid: string): Promise<{
        ok: boolean;
    }>;
    delete(id: string, uid: string): Promise<{
        message: string;
    }>;
}
