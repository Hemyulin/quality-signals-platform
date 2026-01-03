import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import type { Server } from 'http';

describe('GET /health/ready (integration)', () => {
  vi.setConfig({ testTimeout: 20_000 });

  let app: INestApplication;
  let server: Server;

  const ORIGINAL_ENV = process.env;

  beforeAll(async () => {
    process.env = {
      ...ORIGINAL_ENV,
      DB_HOST: '127.0.0.1',
      DB_PORT: '1',
    };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    process.env = ORIGINAL_ENV;
    if (app) await app.close();
  });

  it('returns 503 when DB is unreachable', async () => {
    const res = await request(server).get('/health/ready').expect(503);
    expect(res.body).toMatchObject({
      status: 'degraded',
      reason: 'db_unreachable',
    });
  });
});
