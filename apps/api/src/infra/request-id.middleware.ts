import { NextFunction, Request, Response } from 'express';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incoming = req.header('x-request-id');

  if (incoming) {
    res.setHeader('x-request-id', incoming);
  }

  next();
}
