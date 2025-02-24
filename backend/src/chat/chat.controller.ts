import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({ status: 201, description: 'Chat created successfully' })
  async createChat(
    @CurrentUser() user: any,
    @Body() data: { agentId: string },
  ) {
    return this.chatService.createChat(user.id, data.agentId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chats for current user' })
  @ApiResponse({ status: 200, description: 'Retrieved chats successfully' })
  async getChats(@CurrentUser() user: any) {
    return this.chatService.getChats(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiResponse({ status: 200, description: 'Retrieved chat successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  async getChat(@Param('id') id: string, @CurrentUser() user: any) {
    return this.chatService.getChatById(id, user.id);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Add a message to a chat' })
  @ApiResponse({ status: 201, description: 'Message added successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  async addMessage(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() data: { content: string },
  ) {
    return this.chatService.addMessage(id, user.id, data.content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chat' })
  @ApiResponse({ status: 200, description: 'Chat deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  async deleteChat(@Param('id') id: string, @CurrentUser() user: any) {
    await this.chatService.deleteChat(id, user.id);
    return { message: 'Chat deleted successfully' };
  }
} 