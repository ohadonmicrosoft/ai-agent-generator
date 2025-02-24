import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AgentService } from '../agents/agent.service';
import { Chat, Message } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private agentService: AgentService,
  ) {}

  async createChat(userId: string, agentId: string): Promise<Chat> {
    // Verify agent access
    await this.agentService.getAgentById(agentId, userId);

    return this.prisma.chat.create({
      data: {
        userId,
        agentId,
      },
      include: {
        messages: true,
      },
    });
  }

  async getChats(userId: string): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        agent: true,
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getChatById(id: string, userId: string): Promise<Chat> {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        agent: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    if (chat.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return chat;
  }

  async addMessage(
    chatId: string,
    userId: string,
    content: string,
  ): Promise<Message> {
    const chat = await this.getChatById(chatId, userId);

    // Create user message
    const userMessage = await this.prisma.message.create({
      data: {
        chatId,
        content,
        role: 'USER',
      },
    });

    // Generate AI response
    const response = await this.agentService.generateResponse(
      chat.agentId,
      userId,
      content,
    );

    // Create AI message
    const aiMessage = await this.prisma.message.create({
      data: {
        chatId,
        content: response.response,
        role: 'ASSISTANT',
      },
    });

    return aiMessage;
  }

  async deleteChat(id: string, userId: string): Promise<void> {
    const chat = await this.getChatById(id, userId);

    await this.prisma.chat.delete({
      where: { id: chat.id },
    });
  }
} 