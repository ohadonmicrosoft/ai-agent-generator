import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Config } from './config.schema';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<Config>) {}

  get<T extends keyof Config>(key: T): Config[T] {
    const value = this.configService.get<Config[T]>(key);
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" is undefined`);
    }
    return value;
  }

  getOptional<T extends keyof Config>(key: T): Config[T] | undefined {
    return this.configService.get<Config[T]>(key);
  }

  // Commonly used config getters
  get port(): number {
    return parseInt(this.get('PORT'), 10);
  }

  get isDevelopment(): boolean {
    return this.get('NODE_ENV') === 'development';
  }

  get isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }

  get isTest(): boolean {
    return this.get('NODE_ENV') === 'test';
  }

  get databaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get jwtExpiresIn(): string {
    return this.get('JWT_EXPIRES_IN');
  }

  get openAiApiKey(): string {
    return this.get('OPENAI_API_KEY');
  }

  get openAiModel(): string {
    return this.get('OPENAI_MODEL');
  }
} 