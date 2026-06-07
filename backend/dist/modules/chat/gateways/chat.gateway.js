"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../services/chat.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    jwtService;
    chatService;
    config;
    server;
    logger = new common_1.Logger(ChatGateway_1.name);
    userSockets = new Map();
    socketUsers = new Map();
    constructor(jwtService, chatService, config) {
        this.jwtService = jwtService;
        this.chatService = chatService;
        this.config = config;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ||
                client.handshake.query?.token;
            if (!token)
                throw new Error('No token');
            const payload = this.jwtService.verify(token, {
                secret: this.config.get('app.jwt.secret') || 'change-me',
            });
            const uid = payload.sub;
            if (!this.userSockets.has(uid))
                this.userSockets.set(uid, new Set());
            this.userSockets.get(uid).add(client.id);
            this.socketUsers.set(client.id, uid);
            client.data.userId = uid;
            this.logger.log(`WS connect uid=${uid} sid=${client.id}`);
            client.emit('connected', { ok: true });
        }
        catch (e) {
            this.logger.warn(`WS auth failed: ${e.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const uid = this.socketUsers.get(client.id);
        if (uid) {
            this.userSockets.get(uid)?.delete(client.id);
            if (this.userSockets.get(uid)?.size === 0)
                this.userSockets.delete(uid);
            this.socketUsers.delete(client.id);
            this.logger.log(`WS disconnect uid=${uid} sid=${client.id}`);
        }
    }
    sendToUser(userId, event, data) {
        const sids = this.userSockets.get(userId);
        if (!sids)
            return;
        for (const sid of sids)
            this.server.to(sid).emit(event, data);
    }
    handleJoin(client, body) {
        if (body?.conversationId)
            client.join(`conv:${body.conversationId}`);
        return { ok: true };
    }
    handleTyping(client, body) {
        if (!body?.conversationId)
            return;
        client.to(`conv:${body.conversationId}`).emit('typing', {
            conversationId: body.conversationId,
            userId: client.data.userId,
        });
    }
    async handleSendMessage(client, body) {
        const userId = client.data.userId;
        if (!userId)
            return { ok: false };
        try {
            const msg = await this.chatService.sendMessage(body.conversationId, userId, body);
            this.server.to(`conv:${body.conversationId}`).emit('new-message', msg);
            const conv = await this.chatService.getConversation(body.conversationId, userId);
            conv.participants
                .filter((p) => p !== userId)
                .forEach((p) => this.sendToUser(p, 'new-message-notify', msg));
            return { ok: true, message: msg };
        }
        catch (e) {
            return { ok: false, error: e.message };
        }
    }
    handlePing() {
        return { type: 'pong', at: new Date().toISOString() };
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handlePing", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        namespace: '/chat',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        chat_service_1.ChatService,
        config_1.ConfigService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map