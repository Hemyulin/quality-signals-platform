import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return { status: 'ok', uptimeSeconds: Math.ceil(process.uptime()) };
  }
}
