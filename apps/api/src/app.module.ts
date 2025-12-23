import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, VersionController],
  providers: [AppService, HealthService, VersionService],
})
export class AppModule {}
