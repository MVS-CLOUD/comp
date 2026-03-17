import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FrameworksModule } from '../frameworks/frameworks.module';
import { ReleaseReadinessController } from './release-readiness.controller';
import { ReleaseReadinessService } from './release-readiness.service';
import { ReleaseReadinessRepository } from './release-readiness.repository';
import { ReleaseReadinessWizardService } from './release-readiness-wizard.service';

@Module({
  imports: [AuthModule, FrameworksModule],
  controllers: [ReleaseReadinessController],
  providers: [
    ReleaseReadinessRepository,
    ReleaseReadinessService,
    ReleaseReadinessWizardService,
  ],
  exports: [ReleaseReadinessService, ReleaseReadinessWizardService],
})
export class ReleaseReadinessModule {}
