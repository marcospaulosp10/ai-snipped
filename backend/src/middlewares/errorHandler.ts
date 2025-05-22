import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';
  const message = err instanceof AppError ? err.message : 'Internal server error';

  console.error(`[${status}] ${code}: ${message}`);
  res.status(status).json({ error: { code, message } });
}