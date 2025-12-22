import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Health endpoint (int)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  interface HealthResponse {
    status: string;
    uptimeSeconds: number;
  }

  it('GET /health returns status and uptime', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    const body = res.body as HealthResponse;

    expect(body.status).toBe('ok');
    expect(typeof body.uptimeSeconds).toBe('number');
  });
});
