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
exports.ChatRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ChatRepository = class ChatRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createConversation(participants, orderId) {
        return this.prisma.conversation.create({
            data: { participants: JSON.stringify(participants), orderId },
        });
    }
    findConversation(id) {
        return this.prisma.conversation.findUnique({ where: { id } });
    }
    findConversationsForUser(userId) {
        return this.prisma.conversation.findMany({
            orderBy: { updatedAt: 'desc' },
        });
    }
    findBetween(userA, userB) {
        return this.prisma.conversation.findFirst({
            where: { participants: { contains: userA } },
        });
    }
    updateConversation(id, data) {
        return this.prisma.conversation.update({ where: { id }, data });
    }
    deleteConversation(id) {
        return this.prisma.conversation.delete({ where: { id } });
    }
    createMessage(data) {
        return this.prisma.message.create({
            data,
            include: { sender: { select: { id: true, name: true, avatar: true } } },
        });
    }
    findMessages(conversationId) {
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: { id: true, name: true, avatar: true } } },
        });
    }
    markMessagesRead(conversationId, exceptSenderId) {
        return this.prisma.message.updateMany({
            where: {
                conversationId,
                senderId: { not: exceptSenderId },
                isRead: false,
            },
            data: { isRead: true, readAt: new Date() },
        });
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatRepository);
//# sourceMappingURL=chat.repository.js.map