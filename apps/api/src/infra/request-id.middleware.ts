import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  const incoming = req.header('x-request-id');
  const reqId =
    incoming && incoming.trim().length > 0 ? incoming : randomUUID();

  res.setHeader('x-request-id', reqId);

  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      requestId: reqId,
      level: 'info',
      msg: 'http_request_start',
      method: req.method,
      path: req.originalUrl ?? req.url,
    }),
  );

  res.on('finish', () => {
    const durationMs = Date.now() - start;

    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        requestId: reqId,
        level: 'info',
        msg: 'http_request_end',
        durationMs,
        statusCode: res.statusCode,
      }),
    );
  });

  next();
}
