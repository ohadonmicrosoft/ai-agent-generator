import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  constructor(private config: ConfigService) {
    super({
      throttlers: [{
        ttl: 60000,
        limit: 20,
      }],
    });
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    // Skip rate limiting in development mode if needed
    // return this.config.isDevelopment;
    return false;
  }
} 