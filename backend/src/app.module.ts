import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RateLimitModule } from './rate-limit/rate-limit.module';
import { CustomThrottlerGuard } from './rate-limit/guards/throttler.guard';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    RateLimitModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {} 