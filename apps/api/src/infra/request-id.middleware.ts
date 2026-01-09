import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incoming = req.header('x-request-id');
  const reqId =
    incoming && incoming.trim().length > 0 ? incoming : randomUUID();

  res.setHeader('x-request-id', reqId);

  next();
}
