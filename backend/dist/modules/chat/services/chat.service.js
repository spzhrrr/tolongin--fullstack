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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_repository_1 = require("../repositories/chat.repository");
const helpers_1 = require("../../../common/utils/helpers");
let ChatService = class ChatService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    toConvDto(c) {
        return { ...c, participants: (0, helpers_1.parseJsonField)(c.participants, []) };
    }
    async listConversations(userId) {
        const all = await this.repo.findConversationsForUser(userId);
        return all
            .map((c) => this.toConvDto(c))
            .filter((c) => c.participants.includes(userId));
    }
    async getConversation(id, userId) {
        const c = await this.repo.findConversation(id);
        if (!c)
            throw new common_1.NotFoundException();
        const dto = this.toConvDto(c);
        if (!dto.participants.includes(userId))
            throw new common_1.ForbiddenException();
        return dto;
    }
    async getMessages(conversationId, userId) {
        await this.getConversation(conversationId, userId);
        const messages = await this.repo.findMessages(conversationId);
        await this.repo.markMessagesRead(conversationId, userId);
        return messages.map((m) => ({
            ...m,
            attachment: m.attachment ? JSON.parse(m.attachment) : null,
        }));
    }
    async sendMessage(conversationId, userId, dto) {
        if (!dto.content && !dto.attachment)
            throw new common_1.BadRequestException('Content or attachment required');
        await this.getConversation(conversationId, userId);
        const message = await this.repo.createMessage({
            conversation: { connect: { id: conversationId } },
            sender: { connect: { id: userId } },
            content: dto.content || '',
            attachment: dto.attachment ? JSON.stringify(dto.attachment) : null,
        });
        const preview = dto.content || `📎 ${dto.attachment?.name || 'File'}`;
        await this.repo.updateConversation(conversationId, {
            lastMessage: preview,
            lastMessageAt: new Date(),
        });
        return {
            ...message,
            attachment: message.attachment ? JSON.parse(message.attachment) : null,
        };
    }
    async markAsRead(conversationId, userId) {
        await this.getConversation(conversationId, userId);
        await this.repo.markMessagesRead(conversationId, userId);
        return { ok: true };
    }
    async deleteConversation(id, userId) {
        await this.getConversation(id, userId);
        await this.repo.deleteConversation(id);
        return { message: 'Conversation deleted' };
    }
    async startConversation(userId, dto) {
        if (dto.recipientId === userId)
            throw new common_1.BadRequestException('Cannot chat with yourself');
        const all = await this.repo.findConversationsForUser(userId);
        const existing = all.find((c) => {
            const parts = (0, helpers_1.parseJsonField)(c.participants, []);
            return parts.includes(userId) && parts.includes(dto.recipientId);
        });
        if (existing)
            return this.toConvDto(existing);
        const created = await this.repo.createConversation([userId, dto.recipientId], dto.orderId);
        return this.toConvDto(created);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_repository_1.ChatRepository])
], ChatService);
//# sourceMappingURL=chat.service.js.map