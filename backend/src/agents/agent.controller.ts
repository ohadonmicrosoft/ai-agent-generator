import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AgentService } from './agent.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('agents')
@Controller('agents')
@UseGuards(JwtAuthGuard)
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new AI agent' })
  @ApiResponse({ status: 201, description: 'Agent created successfully' })
  async createAgent(
    @CurrentUser() user: any,
    @Body()
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
  ) {
    return this.agentService.createAgent(user.id, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accessible AI agents' })
  @ApiResponse({ status: 200, description: 'Retrieved agents successfully' })
  async getAgents(@CurrentUser() user: any) {
    return this.agentService.getAgents(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an AI agent by ID' })
  @ApiResponse({ status: 200, description: 'Retrieved agent successfully' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  async getAgent(@Param('id') id: string, @CurrentUser() user: any) {
    return this.agentService.getAgentById(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an AI agent' })
  @ApiResponse({ status: 200, description: 'Agent updated successfully' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  async updateAgent(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body()
    data: {
      name?: string;
      description?: string;
      config?: {
        model: string;
        temperature: number;
        maxTokens: number;
        systemPrompt: string;
      };
      isPublic?: boolean;
    },
  ) {
    return this.agentService.updateAgent(id, user.id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an AI agent' })
  @ApiResponse({ status: 200, description: 'Agent deleted successfully' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  async deleteAgent(@Param('id') id: string, @CurrentUser() user: any) {
    await this.agentService.deleteAgent(id, user.id);
    return { message: 'Agent deleted successfully' };
  }

  @Post(':id/generate')
  @ApiOperation({ summary: 'Generate a response using an AI agent' })
  @ApiResponse({ status: 200, description: 'Response generated successfully' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  async generateResponse(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() data: { input: string },
  ) {
    return this.agentService.generateResponse(id, user.id, data.input);
  }
} 