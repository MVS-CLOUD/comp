import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ReleaseReadinessController } from './release-readiness.controller';
import { ReleaseReadinessService } from './release-readiness.service';
import { ReleaseReadinessRepository } from './release-readiness.repository';

@Module({
  imports: [AuthModule],
  controllers: [ReleaseReadinessController],
  providers: [
    ReleaseReadinessRepository,
    ReleaseReadinessService,
  ],
  exports: [ReleaseReadinessService],
})
export class ReleaseReadinessModule {}
