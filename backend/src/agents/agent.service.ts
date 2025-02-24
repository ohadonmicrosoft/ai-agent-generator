import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '../config/config.service';
import { OpenAIService } from '../ai/openai.service';
import { AIAgent, User } from '@prisma/client';

@Injectable()
export class AgentService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private openai: OpenAIService,
  ) {}

  async createAgent(
    userId: string,
    data: {
      name: string;
      description?: string;
      config: {
        model: string;
        temperature: number;
        maxTokens: number;
        systemPrompt: string;
      };
    },
  ): Promise<AIAgent> {
    return this.prisma.aIAgent.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getAgents(userId: string): Promise<AIAgent[]> {
    return this.prisma.aIAgent.findMany({
      where: {
        OR: [
          { userId },
          { isPublic: true },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAgentById(id: string, userId: string): Promise<AIAgent> {
    const agent = await this.prisma.aIAgent.findUnique({
      where: { id },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    if (agent.userId !== userId && !agent.isPublic) {
      throw new ForbiddenException('Access denied');
    }

    return agent;
  }

  async updateAgent(
    id: string,
    userId: string,
    data: Partial<{
      name: string;
      description: string;
      config: {
        model: string;
        temperature: number;
        maxTokens: number;
        systemPrompt: string;
      };
      isPublic: boolean;
    }>,
  ): Promise<AIAgent> {
    const agent = await this.getAgentById(id, userId);

    if (agent.userId !== userId) {
      throw new ForbiddenException('Cannot update agent owned by another user');
    }

    return this.prisma.aIAgent.update({
      where: { id },
      data,
    });
  }

  async deleteAgent(id: string, userId: string): Promise<void> {
    const agent = await this.getAgentById(id, userId);

    if (agent.userId !== userId) {
      throw new ForbiddenException('Cannot delete agent owned by another user');
    }

    await this.prisma.aIAgent.delete({
      where: { id },
    });
  }

  async generateResponse(
    agentId: string,
    userId: string,
    input: string,
  ): Promise<{ response: string }> {
    const agent = await this.getAgentById(agentId, userId);

    // Create a chat message
    const chat = await this.prisma.chat.create({
      data: {
        userId,
        agentId,
        messages: {
          create: [
            {
              content: input,
              role: 'USER',
            },
          ],
        },
      },
    });

    // Generate AI response
    const response = await this.openai.generateResponse(
      input,
      agent.config as any,
    );

    // Save AI response
    await this.prisma.message.create({
      data: {
        chatId: chat.id,
        content: response,
        role: 'ASSISTANT',
      },
    });

    return { response };
  }
} 