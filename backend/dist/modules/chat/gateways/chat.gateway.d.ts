import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly chatService;
    private readonly config;
    server: Server;
    private readonly logger;
    private userSockets;
    private socketUsers;
    constructor(jwtService: JwtService, chatService: ChatService, config: ConfigService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    private sendToUser;
    handleJoin(client: Socket, body: {
        conversationId: string;
    }): {
        ok: boolean;
    };
    handleTyping(client: Socket, body: {
        conversationId: string;
    }): void;
    handleSendMessage(client: Socket, body: {
        conversationId: string;
        content: string;
        attachment?: any;
    }): Promise<{
        ok: boolean;
        message?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        message: {
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
        };
        error?: undefined;
    } | {
        ok: boolean;
        error: string;
        message?: undefined;
    }>;
    handlePing(): {
        type: string;
        at: string;
    };
}
