import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('x-request-id test', () => {
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

  it('GET /health includes x-request-id header', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    const headers = res.headers;

    expect(headers['x-request-id']).toBeDefined();
  });

  it('echoes x-request-id when provided', async () => {
    const res = await request(app.getHttpServer())
      .get('/health')
      .set('x-request-id', 'abc123')
      .expect(200);

    expect(res.headers['x-request-id']).toBe('abc123');
  });
});
