import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (config: ConfigService) => ([
        {
          ttl: 60000, // 1 minute
          limit: config.isDevelopment ? 100 : 20, // Higher limit for development
        },
      ]),
      inject: [ConfigService],
    }),
  ],
})
export class RateLimitModule {} 