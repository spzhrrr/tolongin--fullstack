import { ChatRepository } from '../repositories/chat.repository';
import { CreateConversationDto, SendMessageDto } from '../dto/chat.dto';
export declare class ChatService {
    private readonly repo;
    constructor(repo: ChatRepository);
    private toConvDto;
    listConversations(userId: string): Promise<any[]>;
    getConversation(id: string, userId: string): Promise<any>;
    getMessages(conversationId: string, userId: string): Promise<{
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
    sendMessage(conversationId: string, userId: string, dto: SendMessageDto): Promise<{
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
    markAsRead(conversationId: string, userId: string): Promise<{
        ok: boolean;
    }>;
    deleteConversation(id: string, userId: string): Promise<{
        message: string;
    }>;
    startConversation(userId: string, dto: CreateConversationDto): Promise<any>;
}
