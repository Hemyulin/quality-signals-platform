import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  getStatus() {
    return { status: 'ok', uptimeSeconds: Math.ceil(process.uptime()) };
  }

  async getReadiness() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      await this.dataSource.query('SELECT 1');
      return { status: 'ok' };
    } catch {
      throw new ServiceUnavailableException({
        status: 'degraded',
        reason: 'db_unreachable',
      });
    }
  }
}
