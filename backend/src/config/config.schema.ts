import { z } from 'zod';

export const configSchema = z.object({
  // Server configuration
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database configuration
  DATABASE_URL: z.string(),
  
  // JWT configuration
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // OpenAI configuration
  OPENAI_API_KEY: z.string(),
  OPENAI_MODEL: z.string().default('gpt-4-turbo-preview'),
  
  // Optional OAuth configuration
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>; 