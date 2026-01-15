import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Mock } from 'node_modules/vitest/dist';

describe('request start and end console logs', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let logSpy: Mock;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log');
    logSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('emits start and end logs correlated by request id', async () => {
    const requestId = 'test-request-id-123';

    const getString = (obj: Record<string, unknown>, key: string) => {
      if (typeof obj[key] === 'string') {
        return obj[key];
      } else {
        return undefined;
      }
    };

    const getNumber = (obj: Record<string, unknown>, key: string) => {
      if (typeof obj[key] === 'number') {
        return obj[key];
      } else {
        return undefined;
      }
    };

    const res = await request(app.getHttpServer())
      .get('/health')
      .set('x-request-id', `${requestId}`)
      .expect(200);

    expect(logSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(res.headers['x-request-id']).toBeDefined();
    expect(res.headers['x-request-id']).toBe(requestId);

    const parsedLogs: Record<string, unknown>[] = [];

    logSpy.mock.calls.forEach((e) => {
      const firstArg: unknown = e[0];
      if (typeof firstArg !== 'string') return;

      try {
        const parsedJson: unknown = JSON.parse(firstArg);

        if (typeof parsedJson === 'object' && parsedJson !== null) {
          parsedLogs.push(parsedJson as Record<string, unknown>);
        }
      } catch {
        return;
      }
    });

    const startEvent = parsedLogs.find(
      (log) =>
        getString(log, 'msg') === 'http_request_start' &&
        getString(log, 'requestId') === requestId,
    );

    expect(startEvent).toBeTruthy();
    expect(getString(startEvent!, 'method')).toBe('GET');
    expect(getString(startEvent!, 'path')).toBeDefined();

    const endEvent = parsedLogs.find(
      (log) =>
        getString(log, 'msg') === 'http_request_end' &&
        getString(log, 'requestId') === requestId,
    );
    expect(endEvent).toBeTruthy();

    const statusCode = getNumber(endEvent!, 'statusCode');
    const durationMs = getNumber(endEvent!, 'durationMs');

    expect(statusCode).toBe(200);
    expect(statusCode).toEqual(expect.any(Number));
    expect(durationMs).toBeGreaterThanOrEqual(0);
    expect(durationMs).toEqual(expect.any(Number));
  });
});
