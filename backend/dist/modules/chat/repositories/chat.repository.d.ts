import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ChatRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createConversation(participants: string[], orderId?: string): Prisma.Prisma__ConversationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findConversation(id: string): Prisma.Prisma__ConversationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findConversationsForUser(userId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }[]>;
    findBetween(userA: string, userB: string): Prisma.Prisma__ConversationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateConversation(id: string, data: Prisma.ConversationUpdateInput): Prisma.Prisma__ConversationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteConversation(id: string): Prisma.Prisma__ConversationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string | null;
        participants: string;
        lastMessage: string | null;
        lastMessageAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createMessage(data: Prisma.MessageCreateInput): Prisma.Prisma__MessageClient<{
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        attachment: string | null;
        conversationId: string;
        senderId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findMessages(conversationId: string): Prisma.PrismaPromise<({
        sender: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isRead: boolean;
        readAt: Date | null;
        content: string;
        attachment: string | null;
        conversationId: string;
        senderId: string;
    })[]>;
    markMessagesRead(conversationId: string, exceptSenderId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
