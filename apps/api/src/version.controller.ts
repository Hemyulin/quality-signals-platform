import { Controller, Get } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller()
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get('/version')
  getVersion() {
    return this.versionService.getVersion();
  }
}
