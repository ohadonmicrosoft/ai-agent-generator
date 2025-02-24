import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.config.openaiApiKey,
    });
  }

  async generateResponse(
    input: string,
    config: {
      model: string;
      temperature: number;
      maxTokens: number;
      systemPrompt: string;
    },
  ): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      messages: [
        {
          role: 'system',
          content: config.systemPrompt,
        },
        {
          role: 'user',
          content: input,
        },
      ],
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  }

  async validatePrompt(prompt: string): Promise<boolean> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        max_tokens: 50,
        messages: [
          {
            role: 'system',
            content: 'You are a prompt validator. Respond with VALID if the prompt is safe and appropriate, or INVALID if it contains harmful or inappropriate content.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const response = completion.choices[0]?.message?.content || '';
      return response.includes('VALID');
    } catch (error) {
      console.error('Error validating prompt:', error);
      return false;
    }
  }
} 