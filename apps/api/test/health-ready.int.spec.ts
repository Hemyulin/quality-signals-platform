import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import type { Server } from 'http';

describe('GET /health/ready (integration)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 when DB is reachable', async () => {
    const res = await request(server).get('/health/ready').expect(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});
