import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Version endpoint (int)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  interface VersionResponse {
    version: string;
  }

  it('GET /version returns current version of the app', async () => {
    const res = await request(app.getHttpServer()).get('/version').expect(200);

    const body = res.body as VersionResponse;

    expect(body.version).toBeDefined();
    expect(body.version).toBeTypeOf('string');
    expect(body.version.length).toBeGreaterThan(0);
  });
});
